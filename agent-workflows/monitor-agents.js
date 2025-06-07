#!/usr/bin/env node

/**
 * Agent Monitor - Real-time monitoring of all background agents
 * Shows progress, dependencies, and recommendations
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Task definitions
const TASKS = {
  'design-system': {
    name: 'Design System',
    description: 'Tailwind config, color tokens, typography',
    dependencies: [],
    priority: 'CRITICAL',
    estimatedTime: '45 min'
  },
  'content-strategy': {
    name: 'Content Strategy', 
    description: 'Messaging, copy, value props',
    dependencies: [],
    priority: 'CRITICAL',
    estimatedTime: '30 min'
  },
  'api-infrastructure': {
    name: 'API Infrastructure',
    description: 'Express.js setup, routes, middleware',
    dependencies: [],
    priority: 'HIGH',
    estimatedTime: '45 min'
  },
  'nextjs-setup': {
    name: 'Next.js Setup',
    description: 'Next.js 14 config, layouts, structure',
    dependencies: [],
    priority: 'CRITICAL',
    estimatedTime: '30 min'
  },
  'component-library': {
    name: 'Component Library',
    description: 'Reusable UI components',
    dependencies: ['design-system'],
    priority: 'HIGH',
    estimatedTime: '60 min'
  },
  'landing-page': {
    name: 'Landing Page',
    description: 'Complete landing page with sections',
    dependencies: ['design-system', 'content-strategy', 'component-library'],
    priority: 'HIGH',
    estimatedTime: '90 min'
  },
  'database-schema': {
    name: 'Database Schema',
    description: 'Supabase setup and schema',
    dependencies: ['nextjs-setup'],
    priority: 'MEDIUM',
    estimatedTime: '30 min'
  },
  'ai-integration': {
    name: 'AI Integration',
    description: 'AI chief of staff features',
    dependencies: ['api-infrastructure'],
    priority: 'HIGH',
    estimatedTime: '60 min'
  },
  'user-auth': {
    name: 'User Authentication',
    description: 'Auth flow with Supabase',
    dependencies: ['database-schema', 'component-library'],
    priority: 'MEDIUM',
    estimatedTime: '45 min'
  },
  'analytics': {
    name: 'Analytics Setup',
    description: 'Tracking and analytics',
    dependencies: ['nextjs-setup'],
    priority: 'LOW',
    estimatedTime: '20 min'
  },
  'consulting-integration': {
    name: 'Consulting Integration',
    description: 'Consultation booking flow',
    dependencies: ['landing-page'],
    priority: 'HIGH',
    estimatedTime: '30 min'
  },
  'user-flow': {
    name: 'User Flow Implementation',
    description: 'Complete user journey',
    dependencies: ['landing-page', 'user-auth', 'database-schema'],
    priority: 'MEDIUM',
    estimatedTime: '45 min'
  },
  'seo-optimization': {
    name: 'SEO Optimization',
    description: 'Meta tags, sitemap, robots.txt',
    dependencies: ['landing-page'],
    priority: 'MEDIUM',
    estimatedTime: '20 min'
  },
  'deployment-config': {
    name: 'Deployment Config',
    description: 'Vercel deployment setup',
    dependencies: ['landing-page', 'api-infrastructure'],
    priority: 'HIGH',
    estimatedTime: '20 min'
  },
  'testing': {
    name: 'Testing Suite',
    description: 'Unit and integration tests',
    dependencies: ['component-library', 'api-infrastructure', 'user-flow'],
    priority: 'LOW',
    estimatedTime: '60 min'
  }
};

// Read current state
function getState() {
  try {
    const stateFile = path.join(process.cwd(), '.agent-orchestrator-state.json');
    return JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
  } catch (error) {
    return {
      completedTasks: [],
      inProgressTasks: [],
      readyTasks: []
    };
  }
}

// Check active agents
function getActiveAgents() {
  const agents = [];
  const files = fs.readdirSync(process.cwd());
  
  files.forEach(file => {
    if (file.startsWith('.agent-') && file.endsWith('.active')) {
      try {
        const agentData = JSON.parse(fs.readFileSync(file, 'utf-8'));
        agents.push({
          ...agentData,
          file
        });
      } catch (error) {
        // Ignore invalid files
      }
    }
  });
  
  return agents;
}

// Get ready tasks (dependencies met)
function getReadyTasks(state) {
  const readyTasks = [];
  
  Object.entries(TASKS).forEach(([taskId, task]) => {
    if (state.completedTasks.includes(taskId) || 
        state.inProgressTasks.includes(taskId)) {
      return;
    }
    
    const depsComplete = task.dependencies.every(dep => 
      state.completedTasks.includes(dep)
    );
    
    if (depsComplete) {
      readyTasks.push({ id: taskId, ...task });
    }
  });
  
  return readyTasks.sort((a, b) => {
    const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

// Calculate progress
function calculateProgress(state) {
  const total = Object.keys(TASKS).length;
  const completed = state.completedTasks.length;
  const inProgress = state.inProgressTasks.length;
  const percentage = Math.round((completed / total) * 100);
  
  return { total, completed, inProgress, percentage };
}

// Display dashboard
function displayDashboard() {
  console.clear();
  const state = getState();
  const activeAgents = getActiveAgents();
  const readyTasks = getReadyTasks(state);
  const progress = calculateProgress(state);
  
  console.log(chalk.bold.cyan('\n🎯 CEO of One - Agent Task Monitor\n'));
  
  // Progress bar
  const progressBar = '█'.repeat(Math.floor(progress.percentage / 5)) + 
                     '░'.repeat(20 - Math.floor(progress.percentage / 5));
  console.log(chalk.bold('Overall Progress:'));
  console.log(`[${progressBar}] ${progress.percentage}% (${progress.completed}/${progress.total} tasks)\n`);
  
  // Active agents
  console.log(chalk.bold.green('🤖 Active Agents:'));
  if (activeAgents.length === 0) {
    console.log(chalk.gray('   No agents currently running'));
  } else {
    activeAgents.forEach(agent => {
      const runtime = Math.floor((Date.now() - new Date(agent.startTime)) / 1000 / 60);
      console.log(`   • ${chalk.yellow(agent.role)} - ${TASKS[agent.taskId].name} (${runtime} min)`);
    });
  }
  console.log('');
  
  // Completed tasks
  console.log(chalk.bold.blue('✅ Completed Tasks:'));
  if (state.completedTasks.length === 0) {
    console.log(chalk.gray('   None yet'));
  } else {
    state.completedTasks.forEach(taskId => {
      console.log(`   • ${TASKS[taskId].name}`);
    });
  }
  console.log('');
  
  // In progress
  console.log(chalk.bold.yellow('🔄 In Progress:'));
  if (state.inProgressTasks.length === 0) {
    console.log(chalk.gray('   None'));
  } else {
    state.inProgressTasks.forEach(taskId => {
      console.log(`   • ${TASKS[taskId].name} - ${TASKS[taskId].estimatedTime}`);
    });
  }
  console.log('');
  
  // Ready to deploy
  console.log(chalk.bold.magenta('🚀 Ready to Deploy (dependencies met):'));
  if (readyTasks.length === 0) {
    console.log(chalk.gray('   No tasks ready'));
  } else {
    readyTasks.forEach(task => {
      const priority = task.priority === 'CRITICAL' ? chalk.red(task.priority) :
                      task.priority === 'HIGH' ? chalk.yellow(task.priority) :
                      chalk.gray(task.priority);
      console.log(`   • ${task.name} [${priority}] - ${task.estimatedTime}`);
      console.log(`     ${chalk.gray(task.description)}`);
      console.log(`     ${chalk.cyan(`AGENT_ROLE="${task.id}" node agent-workflows/agent-runner.js`)}`);
    });
  }
  console.log('');
  
  // Recommendations
  console.log(chalk.bold.white('💡 Recommendations:'));
  if (activeAgents.length < 4 && readyTasks.length > 0) {
    console.log(chalk.green(`   • You can run ${4 - activeAgents.length} more agents in parallel`));
  }
  if (readyTasks.filter(t => t.priority === 'CRITICAL').length > 0) {
    console.log(chalk.red('   • Critical tasks are ready - prioritize these!'));
  }
  if (progress.percentage > 80 && readyTasks.length > 0) {
    console.log(chalk.yellow('   • Nearly done! Deploy remaining tasks to finish'));
  }
  
  // Time estimate
  const totalRemaining = readyTasks.reduce((sum, task) => {
    const time = parseInt(task.estimatedTime) || 30;
    return sum + time;
  }, 0);
  const parallelTime = Math.ceil(totalRemaining / 4);
  console.log(`\n⏱️  Estimated time remaining: ${parallelTime} minutes (with 4 parallel agents)`);
  
  console.log('\n' + chalk.gray('Refreshing every 5 seconds... (Ctrl+C to exit)'));
}

// Main monitoring loop
function startMonitoring() {
  displayDashboard();
  setInterval(displayDashboard, 5000);
}

// Handle exit
process.on('SIGINT', () => {
  console.log('\n\n👋 Monitoring stopped');
  process.exit(0);
});

// Start monitoring
console.log(chalk.bold.cyan('Starting agent monitor...'));
startMonitoring();