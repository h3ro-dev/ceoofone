#!/usr/bin/env node

/**
 * Generate all "Of One" site repositories
 * This script creates repositories for each site with customized orchestrators
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load site configurations
const configPath = path.join(__dirname, '../docs/SITE_CONFIGURATIONS.json');
const { sites } = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Base directory for all sites
const SITES_BASE_DIR = path.join(__dirname, '../../..');

function createSiteRepository(siteKey, siteConfig) {
  console.log(`\n🚀 Creating repository for ${siteConfig.name}...`);
  
  const siteDirName = siteKey.charAt(0).toUpperCase() + siteKey.slice(1);
  const siteDir = path.join(SITES_BASE_DIR, siteDirName);
  
  // Skip if already exists
  if (fs.existsSync(siteDir)) {
    console.log(`  ⏭️  ${siteDirName} already exists, skipping...`);
    return;
  }
  
  try {
    // Create directory structure
    console.log('  📁 Creating directory structure...');
    execSync(`mkdir -p "${siteDir}"`, { cwd: SITES_BASE_DIR });
    execSync(`cd "${siteDir}" && mkdir -p scripts docs infrastructure/{terraform,docker} frontend/{src/{components,pages,hooks,config,styles},public/assets} backend/{src/{api,services,middleware,utils},config} shared/{types,constants} agent-tasks content/{copy,seo} .github/workflows`, { shell: true });
    
    // Initialize git
    console.log('  🔧 Initializing git repository...');
    execSync(`cd "${siteDir}" && git init`, { shell: true });
    
    // Create customized orchestrator
    console.log('  🤖 Creating agent orchestrator...');
    const orchestratorContent = generateOrchestrator(siteConfig);
    fs.writeFileSync(path.join(siteDir, 'scripts/agent-orchestrator.js'), orchestratorContent);
    execSync(`chmod +x "${path.join(siteDir, 'scripts/agent-orchestrator.js')}"`, { shell: true });
    
    // Create package.json
    console.log('  📦 Creating package.json...');
    const packageJson = generatePackageJson(siteConfig);
    fs.writeFileSync(path.join(siteDir, 'package.json'), JSON.stringify(packageJson, null, 2));
    
    // Create README
    console.log('  📄 Creating README...');
    const readmeContent = generateReadme(siteConfig);
    fs.writeFileSync(path.join(siteDir, 'README.md'), readmeContent);
    
    // Create project briefing
    console.log('  📋 Creating project briefing...');
    const briefingContent = generateBriefing(siteConfig);
    fs.writeFileSync(path.join(siteDir, 'docs/PROJECT_BRIEFING.md'), briefingContent);
    
    // Copy common files
    console.log('  📂 Copying common files...');
    fs.copyFileSync(
      path.join(__dirname, '../.gitignore'),
      path.join(siteDir, '.gitignore')
    );
    
    console.log(`  ✅ ${siteConfig.name} repository created successfully!`);
    
  } catch (error) {
    console.error(`  ❌ Error creating ${siteConfig.name}:`, error.message);
  }
}

function generateOrchestrator(siteConfig) {
  const template = fs.readFileSync(path.join(__dirname, 'template-orchestrator.js'), 'utf8');
  
  return template
    .replace(/\[SITE_NAME\]/g, siteConfig.name)
    .replace(/\[DOMAIN\]/g, siteConfig.domain)
    .replace(/\[TARGET_AUDIENCE\]/g, siteConfig.targetAudience)
    .replace(/\[ACCENT\]/g, siteConfig.accentColor)
    .replace(/\[CUSTOMIZE_PAIN_POINTS\]/g, `Pain points: ${siteConfig.painPoints.join(', ')}`)
    .replace(/\[CUSTOMIZE_SOLUTION\]/g, `Solution: ${siteConfig.solution}`)
    .replace(/\[CUSTOMIZE_KEY_BENEFITS\]/g, siteConfig.keyFeatures.join(', '))
    .replace(/\[CUSTOMIZE_SECTIONS\]/g, 'Hero, pain points, solution, features, testimonials, CTAs');
}

function generatePackageJson(siteConfig) {
  return {
    name: siteConfig.domain.replace('.ai', '').replace('.com', ''),
    version: '1.0.0',
    description: siteConfig.tagline,
    scripts: {
      orchestrate: 'node scripts/agent-orchestrator.js',
      background: 'echo "Background agent started with prompt:" && echo $CURSOR_BACKGROUND_AGENT_PROMPT',
      dev: 'cd frontend && npm run dev',
      build: 'cd frontend && npm run build',
      test: 'jest',
      lint: 'eslint . --ext .ts,.tsx,.js,.jsx'
    },
    keywords: siteConfig.name.toLowerCase().split(' '),
    author: 'Utlyze',
    license: 'MIT'
  };
}

function generateReadme(siteConfig) {
  return `# ${siteConfig.name}

> ${siteConfig.tagline}

## 🎯 Project Overview

${siteConfig.name} is a landing page and conversion funnel designed for ${siteConfig.targetAudience}.

### Value Proposition
${siteConfig.solution}

### Target Audience
${siteConfig.targetAudience}

### Key Pain Points
${siteConfig.painPoints.map(p => `- ${p}`).join('\n')}

### Hero Message
"${siteConfig.heroHeadline}"

### Primary CTA
"${siteConfig.primaryCTA}"

## 🚀 Quick Start

1. Run the orchestrator to see available tasks:
\`\`\`bash
npm run orchestrate
\`\`\`

2. Deploy agents based on orchestrator output

3. Monitor progress and run orchestrator again for new tasks

## 🎨 Design

- **Primary Color**: #4169E1 (Utlyze Blue)
- **Accent Color**: ${siteConfig.accentColor}
- **Style**: Clean, minimalist, professional

## 📊 Key Features

${siteConfig.keyFeatures.map(f => `- ${f}`).join('\n')}

## 🏗️ Architecture

Uses parallel agent architecture for rapid development:
- Design Agent
- Content Agent  
- Frontend Agents
- Backend Agent
- SEO Agent
- DevOps Agent

---

Part of the Utlyze "Of One" suite - empowering solo professionals everywhere.
`;
}

function generateBriefing(siteConfig) {
  return `# ${siteConfig.name} - Project Briefing

## Core Value Proposition
${siteConfig.solution}

## Target Audience
${siteConfig.targetAudience}

## Pain Points to Address
${siteConfig.painPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

## Hero Messaging
**Headline**: "${siteConfig.heroHeadline}"
**Primary CTA**: "${siteConfig.primaryCTA}"

## Key Features
${siteConfig.keyFeatures.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## Design Direction
- Primary: Utlyze Blue (#4169E1)
- Accent: ${siteConfig.accentColor}
- Maintain clean, professional aesthetic
- Focus on clarity and conversion

## Content Tone
- Empathetic understanding of challenges
- Professional but approachable
- Focus on transformation and results
- Build trust through competence and warmth

## Conversion Goals
- Primary: Book consultation
- Secondary: Download resource
- Tertiary: Newsletter signup

Remember: We're selling transformation, not just tools.
`;
}

// Main execution
function main() {
  console.log('🏗️  Generating "Of One" Site Repositories\n');
  console.log('This will create repositories for all configured sites.\n');
  
  const siteKeys = Object.keys(sites);
  console.log(`Found ${siteKeys.length} sites to generate:`);
  siteKeys.forEach(key => console.log(`  - ${sites[key].name}`));
  
  // Skip ceoofone as it already exists
  const sitesToGenerate = siteKeys.filter(key => key !== 'ceoofone');
  
  console.log(`\nGenerating ${sitesToGenerate.length} new repositories...`);
  
  sitesToGenerate.forEach(siteKey => {
    createSiteRepository(siteKey, sites[siteKey]);
  });
  
  console.log('\n✅ All repositories generated!');
  console.log('\nNext steps for each site:');
  console.log('1. cd into the site directory');
  console.log('2. Run: npm run orchestrate');
  console.log('3. Deploy agents based on the output');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { createSiteRepository, generateOrchestrator };