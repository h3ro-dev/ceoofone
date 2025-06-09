#!/usr/bin/env node

/**
 * Run Agent Script
 * This script executes an agent task by running the specified prompt
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the prompt from environment variable
const prompt = process.env.CURSOR_BACKGROUND_AGENT_PROMPT;

if (!prompt) {
  console.error(
    '❌ Error: CURSOR_BACKGROUND_AGENT_PROMPT environment variable is required'
  );
  console.error('\nUsage:');
  console.error(
    'CURSOR_BACKGROUND_AGENT_PROMPT="Your prompt here" npm run agent'
  );
  process.exit(1);
}

// Check if we're in a git repository
try {
  require('child_process').execSync('git rev-parse --git-dir', {
    stdio: 'ignore',
  });
} catch (error) {
  console.error(
    '❌ Error: Not in a git repository. Please ensure this is a git repository.'
  );
  process.exit(1);
}

console.log('🤖 Starting Agent Task...');
console.log('📝 Prompt:', prompt.substring(0, 100) + '...\n');

// Create a task file with the prompt for the agent to work with
const taskFile = path.join(process.cwd(), '.current-agent-task.md');
const taskContent = `# Current Agent Task

## Prompt
${prompt}

## Context
- Repository: CEO of One
- Working Directory: ${process.cwd()}
- Timestamp: ${new Date().toISOString()}

## Instructions
1. Complete the task described in the prompt above
2. Create or modify files as needed
3. Follow Utlyze brand guidelines
4. Ensure code quality and proper testing
`;

fs.writeFileSync(taskFile, taskContent);

console.log('✅ Task file created:', taskFile);
console.log('\n📋 Next Steps:');
console.log('1. The agent will work on this task autonomously');
console.log('2. Check the files mentioned in the prompt for completion');
console.log('3. Run "npm run orchestrate" to see next available tasks');

// Note: In a real Cursor background agent, this would launch the agent process
// For now, we're setting up the task file and providing instructions
console.log('\n🚀 Agent task is ready to execute!');
