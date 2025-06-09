# Task Master Plan: Background Agent Workflow System

## Overview

This plan outlines how AI engineers use the background agent system to complete tasks in parallel, manage dependencies, and achieve 34:1 time compression.

## Core Principles

1. **Parallel Execution**: Multiple agents work simultaneously on independent tasks
2. **Dependency Awareness**: Agents wait for prerequisites before starting blocked tasks
3. **State Synchronization**: All agents share the same state file
4. **Task Specialization**: Each agent focuses on specific task types

## Agent Architecture

### 1. Foundation Agents (Always Ready)

These agents work on tasks with no dependencies:

#### Design System Agent

```bash
# Agent Prompt: "You are the Design System Agent. Focus only on implementing the design system task."
node run-agent.js
```

- Creates Tailwind configuration
- Implements color schemes (#4169E1 primary, #FF6B35 accent)
- Builds component design tokens
- Establishes typography system

#### Content Strategy Agent

```bash
# Agent Prompt: "You are the Content Strategy Agent. Focus only on developing content and messaging."
node run-agent.js
```

- Writes core messaging for solo CEOs
- Creates content templates
- Develops value propositions
- Builds content guidelines

#### API Infrastructure Agent

```bash
# Agent Prompt: "You are the API Infrastructure Agent. Focus only on building the backend API."
node run-agent.js
```

- Sets up Express.js server
- Implements TypeScript configuration
- Creates base routes
- Establishes error handling

#### Next.js Setup Agent

```bash
# Agent Prompt: "You are the Next.js Agent. Focus only on the initial Next.js configuration."
node run-agent.js
```

- Initializes Next.js 14 project
- Configures TypeScript
- Sets up routing structure
- Implements base layouts

### 2. Secondary Wave Agents (After Foundation)

These agents start once foundation tasks complete:

#### Component Library Agent

```bash
# Waits for: design-system
# Agent Prompt: "You are the Component Library Agent. Build the component library using the completed design system."
node run-agent.js
```

#### Landing Page Agent

```bash
# Waits for: design-system, content-strategy, component-library
# Agent Prompt: "You are the Landing Page Agent. Build the landing page with available components and content."
node run-agent.js
```

#### Database Schema Agent

```bash
# Waits for: nextjs-setup
# Agent Prompt: "You are the Database Agent. Set up Supabase schema and connections."
node run-agent.js
```

### 3. Integration Agents (Final Wave)

These complete the system integration:

#### User Flow Agent

```bash
# Waits for: landing-page, user-auth, database-schema
# Agent Prompt: "You are the User Flow Agent. Implement the complete user journey."
node run-agent.js
```

#### Testing Agent

```bash
# Waits for: All other tasks
# Agent Prompt: "You are the Testing Agent. Create comprehensive tests for all components."
node run-agent.js
```

## Workflow Execution Plan

### Phase 1: Foundation Sprint (Hour 1)

Run 4 agents in parallel:

```bash
# Terminal 1
AGENT_ROLE="design-system" node run-agent.js

# Terminal 2
AGENT_ROLE="content-strategy" node run-agent.js

# Terminal 3
AGENT_ROLE="api-infrastructure" node run-agent.js

# Terminal 4
AGENT_ROLE="nextjs-setup" node run-agent.js
```

### Phase 2: Component Wave (Hour 2)

As foundation tasks complete, launch dependent agents:

```bash
# Monitor completion
node check-progress.js

# Launch when ready
AGENT_ROLE="component-library" node run-agent.js
AGENT_ROLE="database-schema" node run-agent.js
AGENT_ROLE="ai-integration" node run-agent.js
```

### Phase 3: Feature Implementation (Hour 3)

Launch feature agents as dependencies clear:

```bash
AGENT_ROLE="landing-page" node run-agent.js
AGENT_ROLE="user-auth" node run-agent.js
AGENT_ROLE="analytics" node run-agent.js
AGENT_ROLE="consulting-integration" node run-agent.js
```

### Phase 4: Integration & Polish (Hour 4)

Final integration and testing:

```bash
AGENT_ROLE="user-flow" node run-agent.js
AGENT_ROLE="deployment-config" node run-agent.js
AGENT_ROLE="testing" node run-agent.js
```

## Agent Instructions Template

Each agent receives:

```
You are a background agent working on the CEO of One project.
Your specific task is: [TASK_NAME]
Focus ONLY on this task. Do not work on other tasks.

Task Details:
- Description: [TASK_DESCRIPTION]
- Dependencies: [DEPENDENCY_LIST]
- Priority: [PRIORITY_LEVEL]

Guidelines:
1. Check if dependencies are complete before starting
2. Update task status when beginning work
3. Commit changes with descriptive messages
4. Mark task complete when finished
5. Do not modify other tasks

Available Context:
- Project briefing in /project-briefing.md
- Design system details in /design-system (if available)
- API structure in /server (if available)
```

## Coordination Mechanisms

### 1. State File Monitoring

```javascript
// check-progress.js monitors all agent progress
const checkProgress = () => {
  const state = JSON.parse(fs.readFileSync('.agent-orchestrator-state.json'));
  console.log('Completed:', state.completedTasks.length);
  console.log('In Progress:', state.inProgressTasks.length);
  console.log('Ready:', state.readyTasks.length);
};
```

### 2. Dependency Resolution

```javascript
// Agents check dependencies before starting
const canStartTask = taskId => {
  const task = tasks[taskId];
  return task.dependencies.every(dep => state.completedTasks.includes(dep));
};
```

### 3. Git Coordination

Each agent:

- Creates a feature branch: `feature/[task-id]`
- Commits frequently with `[TASK_ID] Progress: description`
- Creates PR when complete
- Main branch protected, requires review

## Success Metrics

1. **Time Compression**: 136.5 human hours → 4 parallel hours
2. **Quality Gates**: Each task must pass before dependencies can start
3. **Progress Tracking**: Real-time visibility into all agent work
4. **Error Recovery**: Agents can restart from last checkpoint

## Implementation Checklist

- [ ] Set up 4 terminal windows for Phase 1 agents
- [ ] Configure agent-specific prompts with task focus
- [ ] Monitor state file for completion events
- [ ] Launch dependent agents as gates clear
- [ ] Review completed work in feature branches
- [ ] Merge approved work to main
- [ ] Deploy completed features incrementally

## Troubleshooting

### Agent Stuck on Dependencies

```bash
# Force dependency check
node scripts/check-dependencies.js [TASK_ID]
```

### State File Conflicts

```bash
# Reset to last known good state
cp .agent-orchestrator-state.backup.json .agent-orchestrator-state.json
```

### Git Merge Conflicts

```bash
# Agents should rebase before merging
git checkout feature/[task-id]
git rebase main
# Resolve conflicts maintaining both changes
```

## Scaling to Multiple Repositories

For the full 9-repository suite:

1. Run this same pattern in each repository
2. Use `master-orchestrator.js` to coordinate across repos
3. Total parallel agents: 36-54 working simultaneously
4. Achieve 306:1 time compression at scale
