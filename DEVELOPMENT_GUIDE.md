# TheHireMe Worker App - Professional Development Guide

**Complete guide for building professional, production-grade UI in TheHireMe Worker App**

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Architecture](#architecture)
3. [Design System](#design-system)
4. [Component Library](#component-library)
5. [Building Screens](#building-screens)
6. [Accessibility](#accessibility)
7. [Best Practices](#best-practices)
8. [Common Patterns](#common-patterns)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

- Node.js 16+
- React Native & Expo
- TypeScript
- NativeWind (Tailwind for React Native)

### Installation

```bash
cd worker
npm install
npm run web  # Start development server
```

### Project Structure

```
worker/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication screens
│   ├── (onboarding)/      # Onboarding flow
│   ├── (root)/            # Main app screens
│   └── (tabs)/            # Bottom tab navigation
├── components/            # Reusable components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── index.ts          # Barrel export
├── constants/            # Design tokens and theme
│   ├── theme.ts          # Main export
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── shadows.ts
│   ├── motion.ts
│   ├── responsive.ts
│   ├── accessibility.ts
│   └── index.ts          # Convenient exports
├── DESIGN_SYSTEM.md      # Complete design documentation
├── COMPONENT_GUIDE.md    # Component documentation
└── DEVELOPMENT_GUIDE.md  # This file
```

---

## Architecture

### Design System First

The app is built on a **centralized design system** with:

1. **Design Tokens** - Single source of truth for all design values
2. **Component Library** - Reusable, flexible components
3. **Theme System** - Unified styling across entire app
4. **Accessibility** - WCAG 2.1 Level AA compliance built-in

### Dependency Flow

```
Design System (tokens)
    ↓
Component Library (uses tokens)
    ↓
Screens (uses components)
    ↓
App (complete UI)
```

**Key Principle:** Never hardcode design values. Always use tokens.

---

## Design System

### One File to Rule Them All

```typescript
import { THEME } from '@/constants/theme';

// Everything is in THEME
THEME.colors        // All colors
THEME.typography    // All font sizes, weights
THEME.spacing       // All padding, margins, gaps
THEME.shadows       // All elevation
THEME.motion        // All animations
THEME.breakpoints   // All responsive sizes
THEME.a11y          // All accessibility values
```

### Organized Into Modules

Each design aspect has its own file:

- `colors.ts` - Color palette
- `typography.ts` - Font sizes, families
- `spacing.ts` - Padding, margins, border radius
- `shadows.ts` - Elevation and depth
- `motion.ts` - Animation curves, durations
- `responsive.ts` - Breakpoints, responsive values
- `accessibility.ts` - WCAG guidelines, touch targets

### Why This Matters

✅ **Single Source of Truth** - Change colors once, apply everywhere  
✅ **Consistency** - Every screen looks identical  
✅ **Scalability** - Add new features without breaking UI  
✅ **Maintainability** - Update design in seconds  
✅ **Professional** - Enterprise-level quality  

---

## Component Library

### Available Components

| Component | Purpose | File |
|-----------|---------|------|
| **Button** | Interactive element | `Button.tsx` |
| **Input** | Text input with validation | `Input.tsx` |
| **Card** | Content container | `Card.tsx` |
| **Text** | Typography wrapper | `Text.tsx` |
| **Label** | Form label | `Label.tsx` |
| **ErrorMessage** | Error display | `ErrorMessage.tsx` |
| **LoadingSpinner** | Loading indicator | `LoadingSpinner.tsx` |

### Component Philosophy

**Every component must:**

1. ✅ Use THEME tokens for all styling
2. ✅ Be accessible (WCAG AA)
3. ✅ Support multiple variants/states
4. ✅ Have TypeScript types
5. ✅ Work on all screen sizes
6. ✅ Handle disabled/loading states
7. ✅ Provide ARIA labels

### Example: Button Component

```typescript
import { Button } from '@/components';

<Button
  title="Sign In"
  onPress={handleSignIn}
  variant="primary"           // primary, secondary, ghost
  size="large"                // small, medium, large
  disabled={loading}
  loading={loading}
  icon={<Ionicons name="arrow-forward" />}
  accessibilityLabel="Sign in to your account"
/>
```

### Example: Input Component

```typescript
import { Input } from '@/components';

<Input
  label="Email Address"
  type="email"                // text, email, password, phone, number
  placeholder="you@example.com"
  value={email}
  onChangeText={setEmail}
  required={true}
  error={error}
  helperText="We'll never share your email"
  accessibilityLabel="Email address input"
/>
```

---

## Building Screens

### Screen Template

```typescript
import { View, ScrollView } from 'react-native';
import { Button, Input, Text, Card } from '@/components';
import { THEME } from '@/constants/theme';

export default function MyScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: THEME.colors.background.primary,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          paddingHorizontal: THEME.spacing.lg,
          paddingVertical: THEME.spacing.xl,
        }}
      >
        {/* Header */}
        <Text variant="h1" style={{ marginBottom: THEME.spacing.md }}>
          Screen Title
        </Text>
        <Text variant="body" color="secondary">
          Subtitle or description
        </Text>

        {/* Content */}
        <View style={{ marginTop: THEME.spacing.xl, gap: THEME.spacing.lg }}>
          {/* Add content here */}
        </View>

        {/* Actions */}
        <Button
          title="Action"
          onPress={handleAction}
          style={{ marginTop: THEME.spacing.xl }}
        />
      </View>
    </ScrollView>
  );
}
```

### Do's and Don'ts

#### ✅ DO - Use Theme Tokens

```typescript
// Colors
style={{ color: THEME.colors.text.primary }}

// Spacing
style={{ padding: THEME.spacing.lg, gap: THEME.spacing.md }}

// Border radius
style={{ borderRadius: THEME.spacingPresets.radius.lg }}

// Shadows
style={{ ...THEME.shadows.md }}
```

#### ❌ DON'T - Hardcode Values

```typescript
// Colors
style={{ color: '#ffffff' }}         // ❌ Wrong

// Spacing
style={{ padding: 16, gap: 12 }}     // ❌ Wrong

// Border radius
style={{ borderRadius: 16 }}          // ❌ Wrong

// Shadows
style={{                              // ❌ Wrong
  shadowColor: '#000',
  elevation: 8,
}}
```

### Full Screen Example: Login

```typescript
import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, Text, ErrorMessage } from '@/components';
import { THEME } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Email and password required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Authenticate...
      router.replace('/(root)');
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: THEME.colors.background.primary,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          paddingHorizontal: THEME.spacing.lg,
          paddingVertical: THEME.spacing.xl,
        }}
      >
        {/* Header */}
        <Text variant="h2" style={{ marginBottom: THEME.spacing.md }}>
          Welcome Back
        </Text>
        <Text variant="body" color="secondary" style={{ marginBottom: THEME.spacing.xl }}>
          Sign in to your TheHireMe account
        </Text>

        {/* Form */}
        <View style={{ gap: THEME.spacing.lg, marginBottom: THEME.spacing.xl }}>
          <Input
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            disabled={loading}
            required={true}
          />

          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            disabled={loading}
            required={true}
          />

          {error && <ErrorMessage message={error} />}
        </View>

        {/* Actions */}
        <Button
          title="Sign In"
          onPress={handleSignIn}
          variant="primary"
          size="large"
          loading={loading}
          disabled={!email || !password}
        />

        {/* Link */}
        <Text
          variant="body"
          color="secondary"
          style={{ marginTop: THEME.spacing.xl, textAlign: 'center' }}
        >
          Don't have an account?{' '}
          <Text
            variant="body"
            color="primary"
            onPress={() => router.push('/(auth)/signup')}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
```

---

## Accessibility

### WCAG 2.1 Level AA Compliance

All components are built with accessibility from the start.

### Essential Components

Every interactive element needs:

```typescript
// Buttons
<Button
  accessibilityLabel="Sign in"           // What is it?
  accessibilityHint="Navigate to login"  // What does it do?
/>

// Inputs
<Input
  label="Email"                          // Label (required)
  required={true}                        // Mark required
  error={error}                          // Show errors
  helperText="We'll never spam you"     // Helper text
/>

// Text
<Text
  accessible={true}
  accessibilityRole="text"
  accessibilityLabel="Description"
>
  Content
</Text>
```

### Testing Accessibility

1. **Screen Readers**
   - iOS: VoiceOver (Settings → Accessibility)
   - Android: TalkBack (Settings → Accessibility)

2. **Keyboard Navigation**
   - Tab through all elements
   - Enter/Space activates buttons
   - Escape closes modals

3. **Touch Targets**
   - Minimum 44x44 points
   - Use `THEME.a11y.touchTargetSize`

4. **Color Contrast**
   - All colors use 4.5:1 ratio
   - Never rely on color alone

### Accessibility Checklist

- ✅ All interactive elements have labels
- ✅ Colors meet 4.5:1 contrast ratio
- ✅ Touch targets are 44x44+
- ✅ Screen readers work
- ✅ Keyboard navigation works
- ✅ Focus indicators visible
- ✅ Error messages clear
- ✅ No flashing content

---

## Best Practices

### 1. Always Import from @/components

```typescript
// ✅ Correct
import { Button, Input } from '@/components';

// ❌ Wrong - Don't import directly from files
import Button from '@/components/Button';
```

### 2. Use Barrel Exports

```typescript
// ✅ Easy to read
import { Button, Input, Card, Text } from '@/components';

// ❌ Verbose
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Text from '@/components/Text';
```

### 3. Organize Imports

```typescript
// 1. React/React Native
import { useState } from 'react';
import { View, ScrollView } from 'react-native';

// 2. Routing
import { useRouter } from 'expo-router';

// 3. External libraries
import { Ionicons } from '@expo/vector-icons';

// 4. Custom components
import { Button, Input } from '@/components';

// 5. Design tokens
import { THEME } from '@/constants/theme';
```

### 4. Structure Spacing

```typescript
// Bad - inconsistent spacing
<View style={{ marginTop: 16, gap: 12, padding: 8 }}>

// Good - consistent from THEME
<View style={{
  marginTop: THEME.spacing.lg,
  gap: THEME.spacing.md,
  padding: THEME.spacing.sm,
}}>
```

### 5. Extract Complex Styles

```typescript
// For complex styling, extract to constants
const styles = {
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background.primary,
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.xl,
  },
  header: {
    marginBottom: THEME.spacing.md,
  },
};

// Use in component
<View style={styles.container}>
  <Text variant="h1" style={styles.header}>Title</Text>
</View>
```

### 6. Handle States Properly

```typescript
// Always handle loading and error states
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

// Show error
{error && <ErrorMessage message={error} />}

// Show loading
<Button
  title="Save"
  loading={loading}
  disabled={loading}
  onPress={handleSave}
/>
```

---

## Common Patterns

### Form Pattern

```typescript
const [form, setForm] = useState({
  name: '',
  email: '',
  password: '',
});
const [errors, setErrors] = useState({});

const handleChange = (field: string, value: string) => {
  setForm(prev => ({ ...prev, [field]: value }));
};

const handleSubmit = async () => {
  // Validate
  const newErrors = {};
  if (!form.name) newErrors.name = 'Name required';
  if (!form.email) newErrors.email = 'Email required';
  
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  // Submit
  try {
    await api.createUser(form);
  } catch (err) {
    setErrors({ submit: err.message });
  }
};

return (
  <View>
    <Input
      label="Name"
      value={form.name}
      onChangeText={(name) => handleChange('name', name)}
      error={errors.name}
    />
    <Input
      label="Email"
      type="email"
      value={form.email}
      onChangeText={(email) => handleChange('email', email)}
      error={errors.email}
    />
    {errors.submit && <ErrorMessage message={errors.submit} />}
    <Button title="Create" onPress={handleSubmit} />
  </View>
);
```

### Loading State Pattern

```typescript
if (loading) {
  return <LoadingSpinner message="Loading..." />;
}

if (error) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ErrorMessage message={error} />
      <Button title="Retry" onPress={refetch} />
    </View>
  );
}

return (
  // Content
);
```

### Responsive Layout Pattern

```typescript
import { useWindowDimensions } from 'react-native';
import { THEME } from '@/constants/theme';

export default function MyScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < THEME.breakpoints.md;
  const padding = isMobile ? THEME.spacing.md : THEME.spacing.xl;

  return (
    <View style={{ paddingHorizontal: padding }}>
      {/* Content adapts to screen size */}
    </View>
  );
}
```

---

## Troubleshooting

### Components Not Appearing

**Problem:** Styles not applied

**Solution:**
- Check THEME import
- Verify `backgroundColor` or `color` set
- Use inline styles, not className
- Check z-index (THEME.zIndex)

### Text Overflowing

**Problem:** Text not wrapping

**Solution:**
```typescript
<Text style={{ flex: 1 }}>
  Long text wraps now
</Text>
```

### Input Not Responding

**Problem:** Input doesn't update on text change

**Solution:**
```typescript
const [value, setValue] = useState('');

<Input
  value={value}
  onChangeText={setValue}  // Make sure this is set
/>
```

### Accessibility Issues

**Problem:** Screen reader doesn't announce buttons

**Solution:**
```typescript
<Button
  title="Sign In"
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Sign in to your account"
/>
```

### Styles Not Updating

**Problem:** Changes not appearing

**Solution:**
```bash
# Clear cache and restart
npm run web -- --clear
```

---

## Summary

### The Professional Way

1. ✅ Use `@/components` for all UI elements
2. ✅ Use `THEME` for all design values
3. ✅ Follow accessibility guidelines
4. ✅ Test on real devices
5. ✅ Document changes
6. ✅ Keep it consistent

### Quick Links

- **Design System:** `DESIGN_SYSTEM.md`
- **Components:** `COMPONENT_GUIDE.md`
- **Theme:** `constants/theme.ts`
- **Colors:** `constants/colors.ts`

---

**You're building professional, enterprise-grade UI. Everything is documented. Follow the system, and you'll build something great.**

Version: 1.0.0  
Last Updated: 2026-06-13
