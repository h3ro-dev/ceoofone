#!/usr/bin/env node

/**
 * Agent Runner - Executes a specific agent with task focus
 * Usage: AGENT_ROLE="design-system" node agent-runner.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Agent role configurations
const AGENT_CONFIGS = {
  'design-system': {
    taskId: 'design-system',
    prompt: `You are the Design System Agent for CEO of One. Your ONLY job is to implement the design system.

Focus areas:
1. Create a comprehensive Tailwind CSS configuration
2. Use Utlyze brand colors: #4169E1 (primary blue), #FF6B35 (accent orange)
3. Build a complete token system for spacing, typography, shadows
4. Create CSS custom properties for dynamic theming
5. Set up responsive breakpoints

Do NOT work on any other tasks. Update the orchestrator state when you begin and complete your work.`,
    files: ['tailwind.config.js', 'styles/globals.css', 'styles/tokens.css']
  },
  
  'content-strategy': {
    taskId: 'content-strategy',
    prompt: `You are the Content Strategy Agent for CEO of One. Your ONLY job is to develop content and messaging.

Focus areas:
1. Create compelling headlines for solo CEOs
2. Write value propositions focusing on the 80/20 principle
3. Develop content for key sections: hero, features, benefits, CTA
4. Create microcopy for UI elements
5. Build a content style guide

Target audience: Solo CEOs drowning in the 80% that doesn't matter.
Key message: Focus on critical 20%, AI handles the rest.

Do NOT work on any other tasks. Create content in a structured format.`,
    files: ['content/messages.json', 'content/copy-guide.md', 'content/sections/']
  },
  
  'api-infrastructure': {
    taskId: 'api-infrastructure',
    prompt: `You are the API Infrastructure Agent for CEO of One. Your ONLY job is to build the backend API.

Focus areas:
1. Set up Express.js with TypeScript
2. Create base route structure (/api/health, /api/v1/)
3. Implement error handling middleware
4. Set up CORS and security headers
5. Create API documentation structure

Do NOT implement specific features, just the infrastructure.`,
    files: ['server/index.ts', 'server/routes/', 'server/middleware/', 'server/config/']
  },
  
  'nextjs-setup': {
    taskId: 'nextjs-setup',
    prompt: `You are the Next.js Setup Agent for CEO of One. Your ONLY job is initial Next.js configuration.

Focus areas:
1. Configure Next.js 14 with TypeScript
2. Set up app directory structure
3. Create base layouts and loading states
4. Configure next.config.js for optimization
5. Set up environment variables structure

Do NOT build actual pages or components, just the setup.`,
    files: ['next.config.js', 'app/layout.tsx', 'app/loading.tsx', '.env.example']
  },
  
  'component-library': {
    taskId: 'component-library',
    prompt: `You are the Component Library Agent. Build reusable components using the completed design system.

Required components:
1. Button (primary, secondary, ghost variants)
2. Card (feature, testimonial, pricing variants)  
3. Navigation (header, mobile menu)
4. Form elements (input, textarea, select)
5. Section containers
6. AnimatedSection wrapper

Use the design tokens from the design-system task. Each component should have:
- TypeScript interfaces
- Multiple variants
- Responsive behavior
- Accessibility features`,
    dependencies: ['design-system'],
    files: ['components/ui/', 'components/index.ts']
  },
  
  'landing-page': {
    taskId: 'landing-page',
    prompt: `You are the Landing Page Agent. Build the complete landing page using available components and content.

Page sections:
1. Hero with compelling headline and CTA
2. Problem/solution section (80/20 principle)
3. Features grid (AI capabilities)
4. Benefits section (time saved, focus gained)
5. Social proof/testimonials
6. Pricing (if applicable)
7. Final CTA section

Use components from component-library and content from content-strategy.`,
    dependencies: ['design-system', 'content-strategy', 'component-library'],
    files: ['app/page.tsx', 'app/sections/']
  }
};

// Get agent role from environment
const agentRole = process.env.AGENT_ROLE;
if (!agentRole || !AGENT_CONFIGS[agentRole]) {
  console.error('Please specify a valid AGENT_ROLE environment variable');
  console.log('Available roles:', Object.keys(AGENT_CONFIGS).join(', '));
  process.exit(1);
}

const config = AGENT_CONFIGS[agentRole];

// Check dependencies
function checkDependencies() {
  if (!config.dependencies || config.dependencies.length === 0) {
    return true;
  }
  
  try {
    const stateFile = path.join(process.cwd(), '.agent-orchestrator-state.json');
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
    
    const missingDeps = config.dependencies.filter(dep => 
      !state.completedTasks.includes(dep)
    );
    
    if (missingDeps.length > 0) {
      console.log(`⏳ Waiting for dependencies: ${missingDeps.join(', ')}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking dependencies:', error.message);
    return false;
  }
}

// Update task status
function updateTaskStatus(status) {
  try {
    const stateFile = path.join(process.cwd(), '.agent-orchestrator-state.json');
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
    
    if (status === 'in-progress') {
      if (!state.inProgressTasks.includes(config.taskId)) {
        state.inProgressTasks.push(config.taskId);
      }
      state.readyTasks = state.readyTasks.filter(t => t !== config.taskId);
    } else if (status === 'complete') {
      if (!state.completedTasks.includes(config.taskId)) {
        state.completedTasks.push(config.taskId);
      }
      state.inProgressTasks = state.inProgressTasks.filter(t => t !== config.taskId);
    }
    
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
    console.log(`✅ Updated task status: ${config.taskId} -> ${status}`);
  } catch (error) {
    console.error('Error updating task status:', error.message);
  }
}

// Main execution
async function runAgent() {
  console.log(`🤖 Starting ${agentRole} Agent`);
  console.log(`📋 Task: ${config.taskId}`);
  
  // Check dependencies
  if (!checkDependencies()) {
    console.log('❌ Dependencies not met. Please run dependent tasks first.');
    process.exit(1);
  }
  
  // Update status to in-progress
  updateTaskStatus('in-progress');
  
  // Display agent prompt
  console.log('\n📝 Agent Instructions:');
  console.log('------------------------');
  console.log(config.prompt);
  console.log('------------------------\n');
  
  // Show files to work on
  console.log('📁 Files to create/modify:');
  config.files.forEach(file => console.log(`   - ${file}`));
  
  console.log('\n🚀 Agent is now ready to work!');
  console.log('💡 Run this in Cursor as a background agent with the above prompt.');
  
  // Create a marker file for the agent
  const markerFile = path.join(process.cwd(), `.agent-${agentRole}.active`);
  fs.writeFileSync(markerFile, JSON.stringify({
    role: agentRole,
    taskId: config.taskId,
    startTime: new Date().toISOString(),
    prompt: config.prompt
  }, null, 2));
  
  console.log(`\n✅ Agent marker created: ${markerFile}`);
  console.log('🔄 When task is complete, run: npm run complete-task ' + config.taskId);
}

// Run the agent
runAgent().catch(console.error);