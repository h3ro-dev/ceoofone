# Agent Coordination Guide

## 🤖 The Parallel Agent Architecture

This guide explains how to replicate the CEO of One agent system for other "Of One" websites.

### Core Concept
Instead of one developer building sequentially, we deploy multiple specialized agents working in parallel:
- **10x faster delivery** - 40 hours of work compressed into 4 hours
- **Specialized expertise** - Each agent focuses on what they do best
- **Smart dependencies** - Orchestrator ensures work happens in the right order
- **Continuous progress** - As tasks complete, new tasks unlock

## 🏗️ Setting Up a New "Of One" Site

### 1. Create Project Structure
```bash
# Create new project directory
mkdir DirectorOfOne  # or VPOfOne, vCFOofOne, etc.
cd DirectorOfOne

# Initialize with same structure
mkdir -p scripts docs infrastructure/{terraform,docker} \
  frontend/{src/{components,pages,hooks,config,styles},public/assets} \
  backend/{src/{api,services,middleware,utils},config} \
  shared/{types,constants} agent-tasks content/{copy,seo}

# Initialize git
git init
```

### 2. Copy Core Files
From CEO of One, copy and modify:
- `scripts/agent-orchestrator.js` - Update task registry for new site
- `package.json` - Update name and description
- `docs/PROJECT_BRIEFING.md` - Customize for target audience

### 3. Customize Task Registry

Each site needs a customized TASK_REGISTRY in the orchestrator. Example for Director of One:

```javascript
const TASK_REGISTRY = {
  'content-strategy': {
    id: 'content-strategy',
    name: 'Develop Director of One Content',
    dependencies: [],
    priority: 'CRITICAL',
    prompt: 'Create content for Director of One. Target: directors/managers who are one-person departments. Pain: overloaded with admin, no time for strategy. Solution: AI automation for routine tasks. Focus on operational efficiency.',
    completionCheck: () => fs.existsSync('content/copy/homepage.md')
  },
  // ... more tasks specific to Director of One
}
```

## 📋 Task Templates by Site Type

### Executive Sites (CEO, VP, Director)
Focus on:
- Strategic messaging
- Leadership positioning  
- Time/focus optimization
- Decision support features

### Functional Sites (CFO, HR, Legal)
Focus on:
- Compliance and accuracy
- Domain expertise
- Risk mitigation
- Specific tool integrations

### Aspirational Sites (Unicorn, Company)
Focus on:
- Inspirational messaging
- Community building
- Success stories
- Growth strategies

## 🚀 Agent Deployment Pattern

### Phase 1: Foundation (No Dependencies)
Deploy all agents with no dependencies simultaneously:
```bash
# Typically 4-6 agents:
- Design System Agent
- Content Strategy Agent  
- API Setup Agent
- Documentation Agent
- Next.js Setup Agent
```

### Phase 2: Integration (Some Dependencies)
As foundation completes, deploy:
```bash
# Typically 3-5 agents:
- Component Library Agent (needs design system)
- SEO Agent (needs content)
- API Routes Agent (needs API setup)
```

### Phase 3: Polish (Final Dependencies)
Final touches:
```bash
# Typically 2-4 agents:
- Landing Page Agent (needs components + content)
- Analytics Agent (needs landing page)
- Deployment Agent (needs frontend + backend)
```

## 🎯 Customization Points

### 1. Messaging
Each site needs unique messaging in PROJECT_BRIEFING.md:

**CEO of One**: "Focus on what matters"
**CFO of One**: "Financial clarity without the complexity"  
**HR of One**: "People operations made simple"
**Lawyer of One**: "Legal confidence for non-lawyers"

### 2. Color Schemes
While maintaining Utlyze blue:
- **Executive roles**: Blue + Orange (energy)
- **Financial roles**: Blue + Green (growth)
- **Legal/Compliance**: Blue + Gray (trust)
- **Creative roles**: Blue + Purple (innovation)

### 3. CTAs
Customize primary CTA per audience:
- CEO: "Get Your Strategy Session"
- CFO: "Get Your Financial Clarity Session"
- HR: "Get Your HR Relief Session"
- Legal: "Get Your Legal Health Check"

### 4. Trust Signals
Vary by role sensitivity:
- Financial: Security certifications
- Legal: Attorney oversight messaging
- HR: Privacy compliance
- Executive: Success stories

## 🔄 Reusable Components

Create a shared component library:

```
shared-components/
├── Hero.tsx          # Customizable hero section
├── PainPoints.tsx    # Problem/solution layout
├── Features.tsx      # Feature grid
├── Testimonials.tsx  # Social proof section
├── CTASection.tsx    # Call-to-action blocks
└── BookingModal.tsx  # Consultation booking
```

These can be styled differently per site while maintaining consistent functionality.

## 📊 Orchestrator Enhancements

For managing multiple sites, enhance the orchestrator:

```javascript
// Multi-site orchestrator
const SITES = ['ceo', 'cfo', 'director', 'vp', 'hr', 'legal'];

function orchestrateAll() {
  SITES.forEach(site => {
    console.log(`\n=== ${site.toUpperCase()} of One ===`);
    const tasks = require(`./${site}-tasks.js`);
    analyzeAndReport(tasks);
  });
}
```

## 🎨 Design System Variations

Create a base design system with variants:

```typescript
// design-system.ts
export const themes = {
  ceo: {
    primary: '#4169E1',
    accent: '#FF6B35',
    message: 'Leadership & Focus'
  },
  cfo: {
    primary: '#4169E1', 
    accent: '#00A878',
    message: 'Financial Clarity'
  },
  // ... more themes
}
```

## 📈 Scaling Considerations

### Agent Pool Management
With 10 sites and 15 agents each = 150 potential agents

Best practices:
1. **Stagger deployments** - Don't launch all sites at once
2. **Reuse agents** - Same agent can work on similar tasks across sites
3. **Priority queue** - Critical sites first (CEO, CFO) then others
4. **Resource limits** - Max 20-30 agents active at once

### Code Sharing
Use monorepo structure:
```
of-one-suite/
├── packages/
│   ├── shared-ui/        # Shared components
│   ├── shared-utils/     # Common utilities
│   └── shared-content/   # Reusable content blocks
├── sites/
│   ├── ceo-of-one/
│   ├── cfo-of-one/
│   └── ...
└── orchestrator/         # Multi-site orchestrator
```

## 🚦 Quality Assurance

Before deploying agents:
1. **Validate task registry** - Ensure dependencies are correct
2. **Check completion criteria** - Must be measurable
3. **Review prompts** - Clear, specific, achievable
4. **Test locally** - Run orchestrator to verify logic

## 💡 Pro Tips

1. **Start simple** - Get one site working before scaling
2. **Document everything** - Agents work better with clear context
3. **Monitor progress** - Check in every few hours
4. **Merge carefully** - Agents work on branches, review before merging
5. **Iterate quickly** - Launch MVP then enhance

Remember: The goal is parallel execution with intelligent coordination. Let the orchestrator handle dependencies while agents focus on their specialized tasks.