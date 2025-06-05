#!/usr/bin/env node

/**
 * CEO of One - Dynamic Agent Orchestrator
 * 
 * This script analyzes the current system state, identifies all tasks
 * that can be done in parallel, and generates the exact agent commands needed.
 * 
 * Based on FCRA compliance system's agent architecture for maximum parallelization.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Task Registry with Dependencies
const TASK_REGISTRY = {
  // Design & Branding Tasks
  'design-system': {
    id: 'design-system',
    name: 'Create Design System & Brand Guidelines',
    path: 'frontend/src/styles/design-system.ts',
    dependencies: [],
    estimatedHours: 3,
    priority: 'CRITICAL',
    prompt: 'Create a comprehensive design system for CEO of One. Follow Utlyze brand guidelines: clean minimalist design, lots of white space, primary blue (#4169E1) for trust, accent orange for CTAs. Create design tokens, typography scale, color palette, spacing system, component variants. Save in frontend/src/styles/design-system.ts and create accompanying documentation.',
    completionCheck: () => fs.existsSync('frontend/src/styles/design-system.ts')
  },

  'logo-assets': {
    id: 'logo-assets',
    name: 'Create Logo & Brand Assets',
    dependencies: ['design-system'],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: 'Create logo variations for CEO of One. Design a modern, minimalist logo that conveys leadership and focus. Create SVG versions: primary, white, icon-only. Also create favicon, og-image, and other brand assets. Store in frontend/public/assets/',
    completionCheck: () => fs.existsSync('frontend/public/assets/logo.svg')
  },

  // Content Creation Tasks
  'content-strategy': {
    id: 'content-strategy',
    name: 'Develop Content Strategy & Copy',
    dependencies: [],
    estimatedHours: 4,
    priority: 'CRITICAL',
    prompt: 'Create comprehensive content strategy for CEO of One. Target audience: solo CEOs drowning in 80% that doesn\'t matter. Key messages: focus on critical 20%, AI-powered chief of staff, clarity in chaos. Write all website copy including hero section, pain points, solution, testimonials, CTAs. Reference Utlyze messaging in memories. Save in content/copy/',
    completionCheck: () => fs.existsSync('content/copy/homepage.md')
  },

  'seo-optimization': {
    id: 'seo-optimization',
    name: 'SEO Strategy & Implementation',
    dependencies: ['content-strategy'],
    estimatedHours: 2,
    priority: 'HIGH',
    prompt: 'Create SEO strategy for CEO of One. Research keywords for solo CEOs, one-person businesses, CEO productivity. Create meta descriptions, title tags, structured data. Implement technical SEO best practices. Document in content/seo/',
    completionCheck: () => fs.existsSync('content/seo/seo-strategy.md')
  },

  // Frontend Development Tasks
  'nextjs-setup': {
    id: 'nextjs-setup',
    name: 'Initialize Next.js Project',
    dependencies: [],
    estimatedHours: 2,
    priority: 'CRITICAL',
    prompt: 'Initialize Next.js 14 project with TypeScript, Tailwind CSS, and App Router. Configure for optimal performance and SEO. Set up ESLint, Prettier, and development environment. Ensure it follows Utlyze\'s clean, minimalist design principles.',
    completionCheck: () => fs.existsSync('frontend/package.json') && fs.existsSync('frontend/next.config.js')
  },

  'component-library': {
    id: 'component-library',
    name: 'Build Component Library',
    dependencies: ['nextjs-setup', 'design-system'],
    estimatedHours: 4,
    priority: 'HIGH',
    prompt: 'Create reusable component library: Button, Card, Hero, Section, Modal, Form components. Follow design system tokens. Implement with Tailwind CSS and Radix UI for accessibility. Create Storybook documentation.',
    completionCheck: () => fs.existsSync('frontend/src/components/ui/Button.tsx')
  },

  'landing-page': {
    id: 'landing-page',
    name: 'Build Landing Page',
    dependencies: ['component-library', 'content-strategy'],
    estimatedHours: 4,
    priority: 'CRITICAL',
    prompt: 'Build the CEO of One landing page. Include: Hero section with compelling headline, pain points section, solution overview, how it works, testimonials, trust signals, multiple CTAs for booking consultation. Implement smooth scrolling, animations, and mobile responsiveness.',
    completionCheck: () => fs.existsSync('frontend/src/app/page.tsx')
  },

  'booking-integration': {
    id: 'booking-integration',
    name: 'Consultation Booking Integration',
    dependencies: ['landing-page'],
    estimatedHours: 3,
    priority: 'CRITICAL',
    prompt: 'Integrate consultation booking system. Create booking modal/flow that captures lead info and schedules strategy session. Connect to Calendly or implement custom booking with Supabase. Track conversions and implement confirmation emails.',
    completionCheck: () => fs.existsSync('frontend/src/components/BookingModal.tsx')
  },

  // Backend Development Tasks
  'api-setup': {
    id: 'api-setup',
    name: 'Setup API Infrastructure',
    dependencies: [],
    estimatedHours: 3,
    priority: 'HIGH',
    prompt: 'Set up Express.js API with TypeScript. Configure middleware, error handling, CORS, rate limiting, security headers. Create health check endpoint. Set up for Vercel deployment.',
    completionCheck: () => fs.existsSync('backend/src/api/server.ts')
  },

  'lead-capture-api': {
    id: 'lead-capture-api',
    name: 'Lead Capture & CRM Integration',
    dependencies: ['api-setup'],
    estimatedHours: 3,
    priority: 'HIGH',
    prompt: 'Create lead capture API endpoints. Store leads in Supabase, integrate with CRM (HubSpot/Salesforce), send webhook notifications. Implement email validation and duplicate detection.',
    completionCheck: () => fs.existsSync('backend/src/api/routes/leads.ts')
  },

  'analytics-tracking': {
    id: 'analytics-tracking',
    name: 'Analytics & Conversion Tracking',
    dependencies: ['landing-page'],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: 'Implement comprehensive analytics: Google Analytics 4, conversion tracking, heatmaps, custom events for CTA clicks, scroll depth, time on page. Create dashboard for monitoring performance.',
    completionCheck: () => fs.existsSync('frontend/src/utils/analytics.ts')
  },

  // Infrastructure Tasks
  'deployment-setup': {
    id: 'deployment-setup',
    name: 'Deployment & CI/CD Pipeline',
    dependencies: ['landing-page', 'api-setup'],
    estimatedHours: 3,
    priority: 'HIGH',
    prompt: 'Set up Vercel deployment for frontend and API. Configure custom domain ceoofone.ai. Create GitHub Actions CI/CD pipeline with testing, linting, and automatic deployment. Set up monitoring and alerts.',
    completionCheck: () => fs.existsSync('.github/workflows/deploy.yml')
  },

  'performance-optimization': {
    id: 'performance-optimization',
    name: 'Performance & Optimization',
    dependencies: ['deployment-setup'],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: 'Optimize for Core Web Vitals: implement lazy loading, image optimization, code splitting, caching strategies. Target 95+ Lighthouse score. Implement PWA features for mobile.',
    completionCheck: () => {
      const exists = fs.existsSync('frontend/next.config.js');
      if (exists) {
        const content = fs.readFileSync('frontend/next.config.js', 'utf8');
        return content.includes('images:') && content.includes('compress');
      }
      return false;
    }
  },

  // Testing & Documentation
  'testing-suite': {
    id: 'testing-suite',
    name: 'Testing Implementation',
    dependencies: ['landing-page', 'api-setup'],
    estimatedHours: 3,
    priority: 'MEDIUM',
    prompt: 'Implement comprehensive testing: Jest unit tests, React Testing Library for components, Playwright for E2E tests. Focus on conversion funnel, form submissions, and API endpoints. Achieve 80%+ coverage.',
    completionCheck: () => fs.existsSync('frontend/jest.config.js') && fs.existsSync('frontend/playwright.config.ts')
  },

  'documentation': {
    id: 'documentation',
    name: 'Project Documentation',
    dependencies: [],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: 'Create comprehensive documentation: README with setup instructions, architecture overview, deployment guide, content management guide for non-technical users. Include agent orchestration guide for other "Of One" sites.',
    completionCheck: () => {
      const readme = fs.existsSync('README.md');
      if (readme) {
        const content = fs.readFileSync('README.md', 'utf8');
        return content.length > 1000; // Substantial README
      }
      return false;
    }
  }
};

// Analyze current state and find ready tasks
function findReadyTasks() {
  const readyTasks = [];
  const completedTasks = new Set();
  
  // First pass: identify completed tasks
  for (const [taskId, task] of Object.entries(TASK_REGISTRY)) {
    if (task.completionCheck && task.completionCheck()) {
      completedTasks.add(taskId);
    }
  }
  
  // Second pass: find tasks with all dependencies met
  for (const [taskId, task] of Object.entries(TASK_REGISTRY)) {
    if (completedTasks.has(taskId)) continue; // Skip completed tasks
    
    const dependenciesMet = task.dependencies.every(dep => completedTasks.has(dep));
    if (dependenciesMet) {
      readyTasks.push(task);
    }
  }
  
  // Sort by priority
  const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
  readyTasks.sort((a, b) => {
    return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
  });
  
  return { readyTasks, completedTasks };
}

// Generate agent commands
function generateAgentCommands(tasks) {
  const commands = [];
  
  tasks.forEach((task, index) => {
    const command = {
      terminal: index + 1,
      name: task.name,
      command: `cd "${process.cwd()}" && CURSOR_BACKGROUND_AGENT_PROMPT="${task.prompt}" npm run background`,
      estimatedHours: task.estimatedHours,
      priority: task.priority
    };
    commands.push(command);
  });
  
  return commands;
}

// Main execution
function main() {
  console.log('🚀 CEO of One - Dynamic Agent Orchestrator\n');
  console.log('Analyzing project state...\n');
  
  const { readyTasks, completedTasks } = findReadyTasks();
  const totalTasks = Object.keys(TASK_REGISTRY).length;
  const blockedTasks = totalTasks - completedTasks.size - readyTasks.length;
  
  console.log(`📊 Task Status:`);
  console.log(`   - Total tasks: ${totalTasks}`);
  console.log(`   - Completed: ${completedTasks.size}`);
  console.log(`   - Ready to start: ${readyTasks.length}`);
  console.log(`   - Blocked: ${blockedTasks}\n`);
  
  if (completedTasks.size > 0) {
    console.log('✅ Completed Tasks:');
    for (const taskId of completedTasks) {
      console.log(`   - ${TASK_REGISTRY[taskId].name}`);
    }
    console.log('');
  }
  
  if (readyTasks.length === 0) {
    if (completedTasks.size === totalTasks) {
      console.log('🎉 All tasks completed! CEO of One website is ready for launch.');
      console.log('\n🚀 Next steps:');
      console.log('   1. Run final QA testing');
      console.log('   2. Configure production environment variables');
      console.log('   3. Deploy to production');
      console.log('   4. Set up monitoring and alerts');
    } else {
      console.log('⏸️  No tasks are currently ready. Some tasks may be blocked by dependencies.');
      console.log('\nBlocked tasks:');
      for (const [taskId, task] of Object.entries(TASK_REGISTRY)) {
        if (!completedTasks.has(taskId) && !readyTasks.find(t => t.id === taskId)) {
          console.log(`   - ${task.name} (waiting for: ${task.dependencies.join(', ')})`);
        }
      }
    }
    return;
  }
  
  console.log(`🤖 Deploy ${readyTasks.length} Agents Right Now!\n`);
  
  const commands = generateAgentCommands(readyTasks);
  const totalHours = commands.reduce((sum, cmd) => sum + cmd.estimatedHours, 0);
  const maxHours = Math.max(...commands.map(c => c.estimatedHours));
  
  console.log(`⏱️  Estimated time: ${maxHours} hours (running in parallel)`);
  console.log(`📈 Total work: ${totalHours} hours compressed into parallel execution\n`);
  
  console.log('─'.repeat(80));
  commands.forEach(cmd => {
    console.log(`\n### Agent ${cmd.terminal}: ${cmd.name}`);
    console.log(`Priority: ${cmd.priority} | Estimated: ${cmd.estimatedHours} hours`);
    console.log('```bash');
    console.log(cmd.command);
    console.log('```');
  });
  console.log('\n' + '─'.repeat(80));
  
  console.log('\n📋 Instructions:');
  console.log('1. Open ' + commands.length + ' terminal windows or Cursor background agents');
  console.log('2. Copy and run each command above');
  console.log('3. Agents will work autonomously in parallel');
  console.log('4. Run this orchestrator again to see newly available tasks');
  
  // Save current state
  const stateFile = path.join(process.cwd(), '.agent-orchestrator-state.json');
  const state = {
    timestamp: new Date().toISOString(),
    projectName: 'CEO of One',
    completedTasks: Array.from(completedTasks),
    readyTasks: readyTasks.map(t => t.id),
    blockedTasks,
    totalTasks,
    estimatedCompletion: `${maxHours} hours`,
    commands: commands.map(c => ({ 
      name: c.name, 
      priority: c.priority,
      estimatedHours: c.estimatedHours 
    }))
  };
  
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
  console.log(`\n💾 State saved to ${stateFile}`);
}

// Run the orchestrator
if (require.main === module) {
  main();
}

module.exports = { findReadyTasks, generateAgentCommands, TASK_REGISTRY };