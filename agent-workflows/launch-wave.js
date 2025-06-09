#!/usr/bin/env node

/**
 * Launch Wave - Automatically launches the next wave of agents based on dependencies
 * Maximizes parallelization while respecting task dependencies
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const chalk = require('chalk');

// Task configurations
const TASKS = {
  'design-system': { dependencies: [], priority: 'CRITICAL' },
  'content-strategy': { dependencies: [], priority: 'CRITICAL' },
  'api-infrastructure': { dependencies: [], priority: 'HIGH' },
  'nextjs-setup': { dependencies: [], priority: 'CRITICAL' },
  'component-library': { dependencies: ['design-system'], priority: 'HIGH' },
  'landing-page': {
    dependencies: ['design-system', 'content-strategy', 'component-library'],
    priority: 'HIGH',
  },
  'database-schema': { dependencies: ['nextjs-setup'], priority: 'MEDIUM' },
  'ai-integration': { dependencies: ['api-infrastructure'], priority: 'HIGH' },
  'user-auth': {
    dependencies: ['database-schema', 'component-library'],
    priority: 'MEDIUM',
  },
  analytics: { dependencies: ['nextjs-setup'], priority: 'LOW' },
  'consulting-integration': {
    dependencies: ['landing-page'],
    priority: 'HIGH',
  },
  'user-flow': {
    dependencies: ['landing-page', 'user-auth', 'database-schema'],
    priority: 'MEDIUM',
  },
  'seo-optimization': { dependencies: ['landing-page'], priority: 'MEDIUM' },
  'deployment-config': {
    dependencies: ['landing-page', 'api-infrastructure'],
    priority: 'HIGH',
  },
  testing: {
    dependencies: ['component-library', 'api-infrastructure', 'user-flow'],
    priority: 'LOW',
  },
};

// Read current state
function getState() {
  try {
    const stateFile = path.join(
      process.cwd(),
      '.agent-orchestrator-state.json'
    );
    return JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
  } catch (error) {
    return {
      completedTasks: [],
      inProgressTasks: [],
      readyTasks: [],
    };
  }
}

// Get currently active agents
function getActiveAgents() {
  const agents = [];
  const files = fs.readdirSync(process.cwd());

  files.forEach(file => {
    if (file.startsWith('.agent-') && file.endsWith('.active')) {
      try {
        const agentData = JSON.parse(fs.readFileSync(file, 'utf-8'));
        agents.push(agentData.taskId);
      } catch (error) {
        // Ignore invalid files
      }
    }
  });

  return agents;
}

// Find tasks ready to run
function getReadyTasks(state, activeAgents) {
  const ready = [];

  Object.entries(TASKS).forEach(([taskId, task]) => {
    // Skip if already completed, in progress, or actively running
    if (
      state.completedTasks.includes(taskId) ||
      state.inProgressTasks.includes(taskId) ||
      activeAgents.includes(taskId)
    ) {
      return;
    }

    // Check if all dependencies are complete
    const depsComplete = task.dependencies.every(dep =>
      state.completedTasks.includes(dep)
    );

    if (depsComplete) {
      ready.push({ id: taskId, ...task });
    }
  });

  // Sort by priority
  return ready.sort((a, b) => {
    const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

// Launch an agent
function launchAgent(taskId) {
  console.log(chalk.green(`🚀 Launching agent for: ${taskId}`));

  // Create launch script
  const launchScript = `
echo "🤖 Starting ${taskId} agent..."
export AGENT_ROLE="${taskId}"
node agent-workflows/agent-runner.js
  `;

  const scriptPath = path.join(process.cwd(), `.launch-${taskId}.sh`);
  fs.writeFileSync(scriptPath, launchScript);
  fs.chmodSync(scriptPath, '755');

  // Launch in new terminal (macOS)
  const terminal = spawn('osascript', [
    '-e',
    `tell app "Terminal" to do script "cd '${process.cwd()}' && ./.launch-${taskId}.sh"`,
  ]);

  return taskId;
}

// Main execution
async function launchWave() {
  console.log(chalk.bold.cyan('\n🌊 Agent Wave Launcher\n'));

  const state = getState();
  const activeAgents = getActiveAgents();
  const readyTasks = getReadyTasks(state, activeAgents);

  console.log(`📊 Current Status:`);
  console.log(`   • Completed: ${state.completedTasks.length}`);
  console.log(`   • In Progress: ${state.inProgressTasks.length}`);
  console.log(`   • Active Agents: ${activeAgents.length}`);
  console.log(`   • Ready Tasks: ${readyTasks.length}\n`);

  const maxAgents = 4;
  const slotsAvailable = maxAgents - activeAgents.length;

  if (slotsAvailable <= 0) {
    console.log(chalk.yellow('⚠️  Maximum agents already running (4)'));
    console.log('Wait for some to complete before launching more.\n');
    return;
  }

  if (readyTasks.length === 0) {
    console.log(chalk.yellow('⚠️  No tasks ready to run'));
    console.log(
      'All available tasks are either completed, in progress, or waiting for dependencies.\n'
    );
    return;
  }

  // Launch agents up to available slots
  const toLaunch = readyTasks.slice(0, slotsAvailable);

  console.log(chalk.bold(`🚀 Launching ${toLaunch.length} agents:\n`));

  toLaunch.forEach(task => {
    console.log(`   • ${task.id} [${task.priority}]`);
    if (task.dependencies.length > 0) {
      console.log(`     Dependencies: ${task.dependencies.join(', ')}`);
    }
  });

  console.log('\n' + chalk.gray('Starting agents in new terminal windows...'));

  // Launch each agent
  const launched = toLaunch.map(task => launchAgent(task.id));

  console.log(
    chalk.green(`\n✅ Launched ${launched.length} agents successfully!`)
  );

  // Show next wave preview
  const remainingReady = readyTasks.slice(slotsAvailable);
  if (remainingReady.length > 0) {
    console.log(chalk.cyan('\n📋 Next wave preview:'));
    remainingReady.slice(0, 3).forEach(task => {
      console.log(`   • ${task.id} [${task.priority}]`);
    });
    if (remainingReady.length > 3) {
      console.log(`   • ... and ${remainingReady.length - 3} more`);
    }
  }

  // Show blocked tasks
  const blockedTasks = Object.entries(TASKS).filter(([taskId, task]) => {
    if (
      state.completedTasks.includes(taskId) ||
      state.inProgressTasks.includes(taskId) ||
      readyTasks.find(t => t.id === taskId)
    ) {
      return false;
    }
    return true;
  });

  if (blockedTasks.length > 0) {
    console.log(chalk.red('\n🔒 Blocked tasks (waiting for dependencies):'));
    blockedTasks.slice(0, 3).forEach(([taskId, task]) => {
      const missingDeps = task.dependencies.filter(
        dep => !state.completedTasks.includes(dep)
      );
      console.log(`   • ${taskId} needs: ${missingDeps.join(', ')}`);
    });
  }

  console.log(
    chalk.gray(
      '\n💡 Run "node agent-workflows/monitor-agents.js" to track progress'
    )
  );
  console.log(
    chalk.gray(
      '💡 Run this command again when agents complete to launch the next wave\n'
    )
  );

  // Clean up launch scripts after a delay
  setTimeout(() => {
    launched.forEach(taskId => {
      const scriptPath = path.join(process.cwd(), `.launch-${taskId}.sh`);
      if (fs.existsSync(scriptPath)) {
        fs.unlinkSync(scriptPath);
      }
    });
  }, 5000);
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Agent Wave Launcher

Automatically launches the next wave of agents based on task dependencies
and priority. Respects the maximum of 4 parallel agents.

Usage:
  node agent-workflows/launch-wave.js

The launcher will:
1. Check current task status
2. Identify tasks with met dependencies  
3. Launch up to 4 agents in parallel
4. Prioritize CRITICAL and HIGH priority tasks

Each agent runs in its own terminal window for easy monitoring.
  `);
  process.exit(0);
}

// Run the launcher
launchWave().catch(console.error);
