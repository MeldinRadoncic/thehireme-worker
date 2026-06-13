# TheHireMe Component Library Guide

**Professional, Enterprise-Grade Components for Consistent UI Development**

This guide documents all reusable components, their props, accessibility features, and best practices.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Button Component](#button-component)
3. [Input Component](#input-component)
4. [Card Component](#card-component)
5. [Text Component](#text-component)
6. [Label Component](#label-component)
7. [ErrorMessage Component](#errormessage-component)
8. [LoadingSpinner Component](#loadingspinner-component)
9. [Accessibility (a11y)](#accessibility-a11y)
10. [Best Practices](#best-practices)

---

## Overview

All components are:
- **Theme-aware** - Reference centralized design tokens (THEME)
- **Accessible** - WCAG 2.1 Level AA compliant
- **Flexible** - Customizable with props for different use cases
- **Type-safe** - Full TypeScript support
- **Performant** - Optimized for React Native

### Importing Components

```typescript
import { Button, Input, Card, Text, Label, ErrorMessage, LoadingSpinner } from '@/components';
import { THEME } from '@/constants/theme';
```

---

## Button Component

Flexible button component with multiple variants, sizes, and states.

### Basic Usage

```typescript
<Button
  title="Get Started"
  onPress={() => handlePress()}
  variant="primary"
  size="large"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Button text |
| `onPress` | `() => void` | **Required** | Callback when pressed |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Disable button |
| `loading` | `boolean` | `false` | Show loading state |
| `icon` | `ReactNode` | `undefined` | Icon element |
| `iconPosition` | `'left' \| 'right'` | `'right'` | Icon placement |
| `fullWidth` | `boolean` | `true` | Make button full width |
| `accessibilityLabel` | `string` | `title` | Screen reader label |
| `accessibilityHint` | `string` | `undefined` | Screen reader hint |
| `testID` | `string` | Auto-generated | Test identifier |

### Examples

```typescript
// Primary button with icon
<Button
  title="Sign In"
  onPress={handleSignIn}
  variant="primary"
  size="large"
  icon={<Ionicons name="arrow-forward" size={20} color="white" />}
/>

// Secondary button
<Button
  title="Cancel"
  onPress={handleCancel}
  variant="secondary"
  size="medium"
/>

// Ghost button (outlined)
<Button
  title="Learn More"
  onPress={handleLearnMore}
  variant="ghost"
  size="small"
/>

// Loading button
<Button
  title="Saving..."
  onPress={() => {}}
  loading={true}
  disabled={true}
/>

// Disabled button
<Button
  title="Disabled"
  onPress={() => {}}
  disabled={true}
/>
```

### States

- **Normal** - Default appearance
- **Hover** - Pressed state (darker color, shadow)
- **Disabled** - Reduced opacity, not interactive
- **Loading** - Shows spinner instead of text

### Accessibility

- ✅ Touch target size: 44x44 (WCAG 2.5.5)
- ✅ Screen reader support (accessible, accessibilityRole)
- ✅ Semantic button role
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Loading state announcement

---

## Input Component

Text input with validation, error display, and password toggle support.

### Basic Usage

```typescript
const [email, setEmail] = useState('');
const [error, setError] = useState('');

<Input
  type="email"
  label="Email Address"
  placeholder="you@example.com"
  value={email}
  onChangeText={setEmail}
  error={error}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Input label |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `value` | `string` | **Required** | Current value |
| `onChangeText` | `(text: string) => void` | **Required** | Change callback |
| `type` | `'text' \| 'email' \| 'password' \| 'phone' \| 'number'` | `'text'` | Input type |
| `error` | `string` | `undefined` | Error message |
| `helperText` | `string` | `undefined` | Helper text below input |
| `disabled` | `boolean` | `false` | Disable input |
| `required` | `boolean` | `false` | Mark as required |
| `icon` | `string` | `undefined` | Ionicon name |
| `multiline` | `boolean` | `false` | Multi-line input |
| `numberOfLines` | `number` | `1` | Number of lines |
| `accessibilityLabel` | `string` | `label` | Screen reader label |
| `accessibilityHint` | `string` | Auto | Screen reader hint |
| `testID` | `string` | Auto-generated | Test identifier |

### Examples

```typescript
// Email input
<Input
  type="email"
  label="Email"
  placeholder="name@example.com"
  value={email}
  onChangeText={setEmail}
  required={true}
/>

// Password input (auto password toggle)
<Input
  type="password"
  label="Password"
  placeholder="••••••••"
  value={password}
  onChangeText={setPassword}
/>

// Phone input
<Input
  type="phone"
  label="Phone Number"
  placeholder="+1 (555) 123-4567"
  value={phone}
  onChangeText={setPhone}
/>

// Input with error
<Input
  type="email"
  label="Email"
  value={email}
  onChangeText={setEmail}
  error="Please enter a valid email"
/>

// Input with helper text
<Input
  type="password"
  label="Password"
  value={password}
  onChangeText={setPassword}
  helperText="At least 8 characters"
/>

// Disabled input
<Input
  label="Disabled Field"
  value="Cannot edit"
  onChangeText={() => {}}
  disabled={true}
/>

// Multi-line input
<Input
  type="text"
  label="Description"
  multiline={true}
  numberOfLines={4}
  value={description}
  onChangeText={setDescription}
/>
```

### States

- **Default** - Empty or with value
- **Focused** - Blue border, active state
- **Error** - Red border, error message
- **Disabled** - Reduced opacity, not interactive
- **Filled** - Has value

### Keyboard Types

- `text` - Standard keyboard
- `email` - Email keyboard (@ symbol)
- `password` - Secure text entry
- `phone` - Phone pad
- `number` - Numeric keyboard

### Accessibility

- ✅ Touch target size: 44x44 (WCAG 2.5.5)
- ✅ Label association
- ✅ Required field indication
- ✅ Error message linked with aria-describedby
- ✅ Password visibility toggle (keyboard accessible)
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Helper text support

---

## Card Component

Container component for grouping related content.

### Basic Usage

```typescript
<Card>
  <Text variant="h3">Card Title</Text>
  <Text variant="body">Card content goes here</Text>
</Card>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Card content |
| `variant` | `'default' \| 'bordered' \| 'elevated'` | `'default'` | Card style |
| `padding` | `'compact' \| 'normal' \| 'spacious'` | `'normal'` | Padding size |

### Examples

```typescript
// Default card
<Card variant="default" padding="normal">
  <Text>Default card</Text>
</Card>

// Bordered card
<Card variant="bordered" padding="spacious">
  <Text>Bordered card with emphasis</Text>
</Card>

// Elevated card (with shadow)
<Card variant="elevated">
  <Text>Elevated card</Text>
</Card>
```

---

## Text Component

Typography component for all text content.

### Basic Usage

```typescript
<Text variant="h1">Heading 1</Text>
<Text variant="body">Body text</Text>
<Text variant="caption">Small caption</Text>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Text content |
| `variant` | See table below | `'body'` | Typography style |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'muted' \| 'error' \| 'success'` | `'primary'` | Text color |
| `weight` | `'light' \| 'normal' \| 'bold' \| 'black'` | Variant-based | Font weight |

### Variants

| Variant | Size | Weight | Use Case |
|---------|------|--------|----------|
| `h1` | 40px | Black | Main page title |
| `h2` | 32px | Black | Section heading |
| `h3` | 24px | Bold | Subsection heading |
| `h4` | 20px | Bold | Small heading |
| `body` | 16px | Normal | Body text |
| `bodySmall` | 14px | Normal | Secondary text |
| `caption` | 12px | Normal | Captions, labels |
| `label` | 12px | Bold | Form labels |
| `button` | 16px | Bold | Button text |

### Examples

```typescript
// Headings
<Text variant="h1">Main Title</Text>
<Text variant="h2">Section</Text>

// Body text with colors
<Text variant="body" color="primary">Primary text</Text>
<Text variant="body" color="secondary">Secondary text</Text>
<Text variant="body" color="muted">Muted text</Text>

// Error text
<Text variant="body" color="error">Error message</Text>

// Success text
<Text variant="body" color="success">Success!</Text>

// Small captions
<Text variant="caption">This is a caption</Text>
```

---

## Label Component

Form label with optional required indicator.

### Basic Usage

```typescript
<Label text="Full Name" required={true} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **Required** | Label text |
| `required` | `boolean` | `false` | Show required indicator |
| `color` | `string` | `THEME.colors.text.primary` | Text color |

---

## ErrorMessage Component

Error display with icon and styling.

### Basic Usage

```typescript
{error && <ErrorMessage message={error} />}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | **Required** | Error message |
| `showIcon` | `boolean` | `true` | Show alert icon |

---

## LoadingSpinner Component

Loading indicator with optional message.

### Basic Usage

```typescript
{loading && <LoadingSpinner message="Loading..." />}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `undefined` | Loading message |
| `size` | `'small' \| 'large'` | `'large'` | Spinner size |
| `color` | `string` | Primary color | Spinner color |

---

## Accessibility (a11y)

All components are built with WCAG 2.1 Level AA compliance:

### Universal Requirements

1. **Touch Targets** - Minimum 44x44 points
2. **Color Contrast** - 4.5:1 for normal text, 3:1 for large text
3. **Keyboard Navigation** - All interactive elements keyboard accessible
4. **Screen Readers** - Proper ARIA labels and roles
5. **Focus Indicators** - Visible focus states
6. **Error Messages** - Linked with aria-describedby

### Component-Specific Features

#### Buttons
- Semantic `button` role
- Accessible state (disabled, busy)
- Touch target: 44x44 minimum

#### Inputs
- Linked labels (aria-labelledby)
- Error message association (aria-describedby)
- Keyboard-accessible password toggle
- Required field indication

#### Forms
- Required field markers
- Error message placement
- Helper text support
- Focus management

### Screen Reader Support

All components work with:
- ✅ VoiceOver (iOS)
- ✅ TalkBack (Android)
- ✅ NVDA (Windows)
- ✅ JAWS (Windows)

---

## Best Practices

### 1. Always Use Theme Tokens

❌ Don't:
```typescript
style={{ color: '#3b82f6', padding: 16 }}
```

✅ Do:
```typescript
style={{ color: THEME.colors.primary.main, padding: THEME.spacing.lg }}
```

### 2. Provide Accessibility Labels

❌ Don't:
```typescript
<Button title="Go" onPress={handlePress} />
```

✅ Do:
```typescript
<Button
  title="Go"
  onPress={handlePress}
  accessibilityLabel="Navigate to next screen"
/>
```

### 3. Always Label Inputs

❌ Don't:
```typescript
<Input value={name} onChangeText={setName} placeholder="Name" />
```

✅ Do:
```typescript
<Input
  label="Full Name"
  placeholder="John Doe"
  value={name}
  onChangeText={setName}
  required={true}
/>
```

### 4. Handle Errors Properly

❌ Don't:
```typescript
{error && <Text>{error}</Text>}
```

✅ Do:
```typescript
{error && <ErrorMessage message={error} />}
```

### 5. Use Consistent Spacing

❌ Don't:
```typescript
style={{ gap: 16, padding: 12, margin: 8 }}
```

✅ Do:
```typescript
style={{ gap: THEME.spacing.lg, padding: THEME.spacing.md, margin: THEME.spacing.sm }}
```

### 6. Test Accessibility

Always test with:
- Screen readers (VoiceOver/TalkBack)
- Keyboard navigation (Tab, Enter, Escape)
- Touch targets (44x44 minimum)
- Color contrast (use tools like WebAIM)

### 7. Follow WCAG Guidelines

- Don't rely on color alone for information
- Provide text alternatives for icons
- Ensure keyboard accessible
- Test with actual users with disabilities

---

## Testing

All components include testID props for testing:

```typescript
<Button testID="button-submit" title="Submit" onPress={handleSubmit} />

// In tests
const button = getByTestId('button-submit');
fireEvent.press(button);
```

---

## Version History

- **v1.0.0** - Initial release with Button, Input, Card, Text, Label, ErrorMessage, LoadingSpinner
- All components WCAG 2.1 Level AA compliant
- Full TypeScript support
- Theme-aware design system

---

## Questions?

Refer to:
- `THEME` - Design tokens
- `A11Y` - Accessibility guidelines
- Component source code - Full implementation details
