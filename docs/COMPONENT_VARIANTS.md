# CEO of One - Component Variants Guide

## 🧩 Button Components

### Primary Button (CTA)

**Use for**: Main calls-to-action, form submissions, primary user actions

```jsx
// React/JSX
<button className="btn-primary">
  Get Your Free CEO Strategy Session
</button>

// Alternative with icon
<button className="btn-primary flex items-center gap-2">
  <BookIcon className="w-5 h-5" />
  Book Consultation
</button>

// Large variant
<button className="btn-primary text-lg px-8 py-4">
  Start Free Trial
</button>
```

**CSS Classes**:

```css
.btn-primary
.btn-primary:hover
.btn-primary:focus
.btn-primary:active
```

### Secondary Button

**Use for**: Secondary actions, "Learn More" links, supporting CTAs

```jsx
// Standard secondary button
<button className="btn-secondary">
  Learn More
</button>

// With icon
<button className="btn-secondary flex items-center gap-2">
  <PlayIcon className="w-5 h-5" />
  Watch Demo
</button>

// Small variant
<button className="btn-secondary text-sm px-4 py-2">
  View Details
</button>
```

### Ghost Button

**Use for**: Tertiary actions, navigation links, subtle interactions

```jsx
// Standard ghost button
<button className="btn-ghost">
  Download Toolkit
</button>

// With icon
<button className="btn-ghost flex items-center gap-2">
  <DownloadIcon className="w-4 h-4" />
  Download Free Guide
</button>

// Navigation variant
<button className="btn-ghost text-sm">
  Back to Home
</button>
```

---

## 🃏 Card Components

### Primary Card

**Use for**: Content sections, feature highlights, testimonials

```jsx
// Basic card
<div className="card">
  <h3 className="text-h4 text-neutral-800 mb-4">
    Morning Briefing
  </h3>
  <p className="text-body text-neutral-600 mb-6">
    Start each day knowing your top 3 priorities
  </p>
  <button className="btn-secondary">
    Learn More
  </button>
</div>

// Card with image
<div className="card">
  <img
    src="/feature-image.jpg"
    alt="Feature"
    className="w-full h-48 object-cover rounded-lg mb-4"
  />
  <h3 className="text-h4 text-neutral-800 mb-2">
    Decision Support
  </h3>
  <p className="text-body text-neutral-600">
    Get data-driven insights for critical choices
  </p>
</div>

// Testimonial card
<div className="card text-center">
  <div className="mb-4">
    <img
      src="/avatar.jpg"
      alt="Jennifer"
      className="w-16 h-16 rounded-full mx-auto mb-3"
    />
    <h4 className="text-h5 text-neutral-800">Jennifer Martinez</h4>
    <p className="text-body-sm text-neutral-500">CEO, TechStart</p>
  </div>
  <blockquote className="text-body-lg text-neutral-700 italic">
    "Eliminated 80% of daily tasks and doubled revenue in 90 days."
  </blockquote>
</div>
```

### Feature Card

**Use for**: Premium features, highlighted content, special offers

```jsx
// Feature highlight
<div className="card-feature text-center">
  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
    <TargetIcon className="w-8 h-8 text-primary-500" />
  </div>
  <h3 className="text-h3 text-neutral-800 mb-4">
    Strategic Focus
  </h3>
  <p className="text-body-lg text-neutral-600 mb-8">
    Finally have time for the work only you can do
  </p>
  <button className="btn-primary">
    Get Started
  </button>
</div>

// Pricing card
<div className="card-feature relative">
  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
    <span className="bg-accent-500 text-white px-4 py-2 rounded-full text-body-sm font-semibold">
      Most Popular
    </span>
  </div>
  <div className="text-center pt-4">
    <h3 className="text-h4 text-neutral-800 mb-2">Professional</h3>
    <div className="mb-6">
      <span className="text-display text-primary-500">$297</span>
      <span className="text-body text-neutral-500">/month</span>
    </div>
    <ul className="text-left space-y-3 mb-8">
      <li className="flex items-center gap-3">
        <CheckIcon className="w-5 h-5 text-success-500" />
        <span className="text-body">Daily priority briefings</span>
      </li>
      <li className="flex items-center gap-3">
        <CheckIcon className="w-5 h-5 text-success-500" />
        <span className="text-body">AI decision support</span>
      </li>
      <li className="flex items-center gap-3">
        <CheckIcon className="w-5 h-5 text-success-500" />
        <span className="text-body">Task automation</span>
      </li>
    </ul>
    <button className="btn-primary w-full">
      Start Free Trial
    </button>
  </div>
</div>
```

---

## 📝 Form Components

### Input Fields

```jsx
// Standard input
<div className="space-y-2">
  <label className="block text-body font-medium text-neutral-700">
    Email Address
  </label>
  <input
    type="email"
    className="input w-full"
    placeholder="Enter your email"
  />
</div>

// Input with error state
<div className="space-y-2">
  <label className="block text-body font-medium text-neutral-700">
    Company Name
  </label>
  <input
    type="text"
    className="input error w-full"
    placeholder="Enter company name"
  />
  <p className="text-body-sm text-error-500">
    Company name is required
  </p>
</div>

// Large input for hero sections
<input
  type="email"
  className="input w-full text-lg p-4"
  placeholder="Enter your email to get started"
/>
```

### Select Dropdowns

```jsx
// Standard select
<div className="space-y-2">
  <label className="block text-body font-medium text-neutral-700">
    Company Size
  </label>
  <select className="input w-full">
    <option>Select company size</option>
    <option>1-5 employees</option>
    <option>6-20 employees</option>
    <option>21-50 employees</option>
  </select>
</div>

// Multi-select appearance
<div className="space-y-2">
  <label className="block text-body font-medium text-neutral-700">
    Biggest Challenges
  </label>
  <div className="space-y-2">
    <label className="flex items-center gap-3">
      <input type="checkbox" className="rounded border-neutral-300" />
      <span className="text-body">Too many emails</span>
    </label>
    <label className="flex items-center gap-3">
      <input type="checkbox" className="rounded border-neutral-300" />
      <span className="text-body">No time for strategy</span>
    </label>
    <label className="flex items-center gap-3">
      <input type="checkbox" className="rounded border-neutral-300" />
      <span className="text-body">Overwhelmed by tasks</span>
    </label>
  </div>
</div>
```

### Form Layouts

```jsx
// Contact form
<form className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-body font-medium text-neutral-700 mb-2">
        First Name
      </label>
      <input type="text" className="input w-full" />
    </div>
    <div>
      <label className="block text-body font-medium text-neutral-700 mb-2">
        Last Name
      </label>
      <input type="text" className="input w-full" />
    </div>
  </div>

  <div>
    <label className="block text-body font-medium text-neutral-700 mb-2">
      Email
    </label>
    <input type="email" className="input w-full" />
  </div>

  <div>
    <label className="block text-body font-medium text-neutral-700 mb-2">
      Message
    </label>
    <textarea
      className="input w-full h-32 resize-none"
      placeholder="Tell us about your biggest challenge..."
    ></textarea>
  </div>

  <button type="submit" className="btn-primary w-full">
    Send Message
  </button>
</form>

// Newsletter signup (inline)
<div className="bg-primary-50 rounded-xl p-8">
  <div className="text-center mb-6">
    <h3 className="text-h3 text-neutral-800 mb-2">
      Stay Focused
    </h3>
    <p className="text-body text-neutral-600">
      Weekly tips for solo CEOs
    </p>
  </div>
  <div className="flex gap-3">
    <input
      type="email"
      className="input flex-1"
      placeholder="Enter your email"
    />
    <button className="btn-primary">
      Subscribe
    </button>
  </div>
</div>
```

---

## 📊 Layout Components

### Hero Sections

```jsx
// Main hero
<section className="section-spacing bg-gradient-to-br from-primary-50 to-white">
  <div className="container-site text-center">
    <h1 className="text-display text-neutral-800 mb-6">
      Wearing Every Hat?<br />
      Focus on the One That Actually<br />
      <span className="text-primary-500">Grows Your Business</span>
    </h1>
    <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto mb-8">
      CEO of One gives solo leaders AI-powered leverage to escape the 80%
      that doesn't matter and double down on the 20% that does.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="btn-primary text-lg px-8 py-4">
        Get Your Free CEO Strategy Session
      </button>
      <button className="btn-ghost text-lg px-8 py-4">
        Watch 2-Minute Demo
      </button>
    </div>
  </div>
</section>

// Feature hero
<section className="section-spacing">
  <div className="container-site">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-h1 text-neutral-800 mb-6">
          Turn Overwhelm Into
          <span className="text-primary-500"> Focus and Results</span>
        </h1>
        <p className="text-body-lg text-neutral-600 mb-8">
          What if you could focus only on decisions that grow your business?
          CEO of One acts as your intelligent chief of staff.
        </p>
        <button className="btn-primary">
          Start Your Free Trial
        </button>
      </div>
      <div>
        <img
          src="/hero-image.jpg"
          alt="Focused CEO"
          className="w-full rounded-xl shadow-lg"
        />
      </div>
    </div>
  </div>
</section>
```

### Feature Grids

```jsx
// 3-column feature grid
<section className="section-spacing bg-neutral-50">
  <div className="container-site">
    <div className="text-center mb-16">
      <h2 className="text-h2 text-neutral-800 mb-4">Your AI Chief of Staff</h2>
      <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
        Not another task manager - an intelligent filter for what actually
        matters
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="card text-center">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6">
          <MorningIcon className="w-6 h-6 text-primary-500" />
        </div>
        <h3 className="text-h4 text-neutral-800 mb-3">Morning Briefing</h3>
        <p className="text-body text-neutral-600">
          Start each day knowing your top 3 priorities based on your goals and
          deadlines
        </p>
      </div>

      <div className="card text-center">
        <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-6">
          <DecisionIcon className="w-6 h-6 text-accent-500" />
        </div>
        <h3 className="text-h4 text-neutral-800 mb-3">Decision Support</h3>
        <p className="text-body text-neutral-600">
          Get data-driven insights for critical choices with impact analysis
        </p>
      </div>

      <div className="card text-center">
        <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-6">
          <AutomationIcon className="w-6 h-6 text-success-500" />
        </div>
        <h3 className="text-h4 text-neutral-800 mb-3">Task Triage</h3>
        <p className="text-body text-neutral-600">
          AI handles routine tasks so you don't have to think about them
        </p>
      </div>
    </div>
  </div>
</section>
```

### Testimonial Sections

```jsx
// Single testimonial highlight
<section className="section-spacing bg-primary-500 text-white">
  <div className="container-site text-center">
    <blockquote className="text-h2 font-light mb-8">
      "I eliminated 80% of my daily tasks and doubled revenue in 90 days.
      CEO of One gave me back my strategic thinking time."
    </blockquote>
    <div className="flex items-center justify-center gap-4">
      <img
        src="/jennifer-avatar.jpg"
        alt="Jennifer Martinez"
        className="w-16 h-16 rounded-full"
      />
      <div className="text-left">
        <div className="text-h5 font-semibold">Jennifer Martinez</div>
        <div className="text-body opacity-90">CEO, TechStart Solutions</div>
      </div>
    </div>
  </div>
</section>

// Three-column testimonials
<section className="section-spacing">
  <div className="container-site">
    <h2 className="text-h2 text-neutral-800 text-center mb-16">
      Loved by Solo CEOs
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="card">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 text-warning-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-body text-neutral-700 mb-6">
          "Finally took a vacation without the business falling apart.
          The AI briefings kept everything running smoothly."
        </blockquote>
        <div className="flex items-center gap-3">
          <img
            src="/sarah-avatar.jpg"
            alt="Sarah Chen"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="text-body-sm font-medium text-neutral-800">Sarah Chen</div>
            <div className="text-caption text-neutral-500">CEO, DesignFlow</div>
          </div>
        </div>
      </div>

      {/* Additional testimonial cards... */}
    </div>
  </div>
</section>
```

---

## 🎨 Typography Examples

### Heading Hierarchy

```jsx
<div className="space-y-8">
  <h1 className="text-display text-neutral-800">Display Heading (64px)</h1>
  <h1 className="text-h1 text-neutral-800">Heading 1 (48px)</h1>
  <h2 className="text-h2 text-neutral-800">Heading 2 (36px)</h2>
  <h3 className="text-h3 text-neutral-800">Heading 3 (30px)</h3>
  <h4 className="text-h4 text-neutral-800">Heading 4 (24px)</h4>
  <h5 className="text-h5 text-neutral-800">Heading 5 (20px)</h5>
  <h6 className="text-h6 text-neutral-800">Heading 6 (18px)</h6>
</div>
```

### Body Text Variants

```jsx
<div className="space-y-4">
  <p className="text-body-lg text-neutral-600">
    Large body text for hero descriptions and important content (18px)
  </p>
  <p className="text-body text-neutral-600">
    Standard body text for paragraphs and general content (16px)
  </p>
  <p className="text-body-sm text-neutral-500">
    Small body text for captions and secondary information (14px)
  </p>
  <p className="text-caption text-neutral-400">
    Caption text for timestamps and fine print (12px)
  </p>
</div>
```

---

## 📱 Responsive Patterns

### Mobile Navigation

```jsx
// Mobile-first navigation
<nav className="bg-white border-b border-neutral-100">
  <div className="container-site">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-2">
        <Logo className="h-8 w-auto" />
        <span className="text-h5 font-bold text-neutral-800">CEO of One</span>
      </div>

      {/* Mobile menu button */}
      <button className="md:hidden p-2">
        <MenuIcon className="w-6 h-6 text-neutral-600" />
      </button>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#features"
          className="text-body text-neutral-600 hover:text-primary-500"
        >
          Features
        </a>
        <a
          href="#pricing"
          className="text-body text-neutral-600 hover:text-primary-500"
        >
          Pricing
        </a>
        <a
          href="#about"
          className="text-body text-neutral-600 hover:text-primary-500"
        >
          About
        </a>
        <button className="btn-primary">Get Started</button>
      </div>
    </div>
  </div>
</nav>
```

### Responsive Grid Patterns

```jsx
// Auto-fit grid for features
<div className="grid grid-cols-auto-fit-300 gap-6">
  {features.map(feature => (
    <div key={feature.id} className="card">
      {/* Feature content */}
    </div>
  ))}
</div>

// Responsive image and text
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  <div className="order-2 lg:order-1">
    {/* Text content */}
  </div>
  <div className="order-1 lg:order-2">
    {/* Image content */}
  </div>
</div>

// Stack on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-4">
  <button className="btn-primary flex-1">Primary Action</button>
  <button className="btn-ghost flex-1">Secondary Action</button>
</div>
```

---

## ♿ Accessibility Examples

### Keyboard Navigation

```jsx
// Focus management
<div className="space-y-4">
  <button className="btn-primary focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
    Accessible Button
  </button>

  <input
    className="input focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    aria-label="Email address"
  />

  <div
    role="button"
    tabIndex={0}
    className="card cursor-pointer focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    onKeyDown={e => e.key === 'Enter' && handleClick()}
  >
    Interactive card content
  </div>
</div>
```

### Screen Reader Support

```jsx
// Proper labeling and descriptions
<form>
  <div className="space-y-2">
    <label htmlFor="email" className="text-body font-medium text-neutral-700">
      Email Address
    </label>
    <input
      id="email"
      type="email"
      className="input w-full"
      aria-describedby="email-help"
      aria-required="true"
    />
    <p id="email-help" className="text-body-sm text-neutral-500">
      We'll use this to send you your daily CEO briefing
    </p>
  </div>

  <button
    type="submit"
    className="btn-primary"
    aria-describedby="submit-help"
  >
    Start Free Trial
  </button>
  <p id="submit-help" className="sr-only">
    Clicking this button will start your 14-day free trial
  </p>
</form>

// Loading states
<button
  className="btn-primary"
  disabled={isLoading}
  aria-label={isLoading ? 'Submitting form...' : 'Submit form'}
>
  {isLoading ? (
    <>
      <SpinnerIcon className="w-5 h-5 animate-spin mr-2" />
      Submitting...
    </>
  ) : (
    'Submit Form'
  )}
</button>
```

---

_This component guide provides practical examples for implementing the CEO of One design system consistently across all user interfaces._
