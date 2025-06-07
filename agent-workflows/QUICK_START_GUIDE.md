# Quick Start Guide: Background Agent System

## 🚀 For Engineers: Get Started in 2 Minutes

### Step 1: Check Current Status
```bash
node agent-workflows/monitor-agents.js
```
This shows you what's completed, in progress, and ready to run.

### Step 2: Launch Your First Wave
```bash
node agent-workflows/launch-wave.js
```
This automatically launches up to 4 agents working on tasks with met dependencies.

### Step 3: Work as a Background Agent
When a terminal opens with agent instructions:
1. **Read the focused prompt** - Each agent has ONE specific task
2. **Start implementing** - Begin with the files listed
3. **Commit frequently** - Use descriptive commit messages
4. **Don't overthink** - Focus only on your assigned task

### Step 4: Complete Your Task
When done with your task:
```bash
npm run complete-task [task-id]
```

## 🎯 Key Commands

**Monitor all agents:**
```bash
node agent-workflows/monitor-agents.js
```

**Launch next wave:**
```bash
node agent-workflows/launch-wave.js
```

**Run specific agent:**
```bash
AGENT_ROLE="design-system" node agent-workflows/agent-runner.js
```

**Complete a task:**
```bash
npm run complete-task design-system
```

## 📋 Task Execution Order

### Wave 1 (Foundation - Run All 4)
1. `design-system` - Tailwind, colors, tokens
2. `content-strategy` - Messaging and copy
3. `api-infrastructure` - Express.js setup
4. `nextjs-setup` - Next.js configuration

### Wave 2 (Building - After Wave 1)
1. `component-library` - UI components
2. `database-schema` - Supabase setup
3. `ai-integration` - AI features
4. `analytics` - Tracking setup

### Wave 3 (Integration - After Wave 2)
1. `landing-page` - Full landing page
2. `user-auth` - Authentication
3. `consulting-integration` - Booking flow
4. `seo-optimization` - SEO setup

### Wave 4 (Final - After Wave 3)
1. `user-flow` - Complete user journey
2. `deployment-config` - Vercel setup
3. `testing` - Test suite

## 🤖 Working as an Agent

### DO:
- Focus ONLY on your assigned task
- Read the design system if building components
- Use the content strategy for copy
- Commit with `[TASK_ID] description` format
- Update task status when done

### DON'T:
- Work on other tasks
- Refactor unrelated code
- Create unnecessary abstractions
- Wait for perfection - iterate later

## 💡 Pro Tips

1. **Run monitor in separate terminal** - Keep it open to see real-time progress
2. **Use launch-wave** - It picks the best tasks automatically
3. **Commit early and often** - Small commits are easier to review
4. **Trust the dependencies** - The system ensures correct order
5. **Focus on shipping** - Don't over-engineer

## 🔧 Troubleshooting

**"Dependencies not met"**
- Check monitor to see what needs to complete first
- Run `launch-wave` to start prerequisite tasks

**"Maximum agents running"**
- Wait for current agents to complete
- Monitor shows estimated completion times

**"Task already in progress"**
- Another agent is working on it
- Pick a different ready task

## 📊 Success Metrics

- **4 agents running** = Maximum efficiency
- **All critical tasks first** = Correct prioritization  
- **15 tasks in 4 hours** = On track
- **No blocked agents** = Good dependency management

---

Ready? Run `node agent-workflows/launch-wave.js` and let's build! 🚀