# TheHireMe Design System

**Professional, Enterprise-Grade Design System for Consistent, Scalable Development**

This document defines all design tokens, principles, and guidelines for TheHireMe Worker App.

---

## 📋 Table of Contents

1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing System](#spacing-system)
5. [Shadows & Elevation](#shadows--elevation)
6. [Motion & Animation](#motion--animation)
7. [Responsive Design](#responsive-design)
8. [Accessibility](#accessibility)
9. [Component States](#component-states)
10. [Usage Guidelines](#usage-guidelines)

---

## Design Principles

### 1. **Consistency**
All UI elements follow the same design language defined in THEME.

### 2. **Clarity**
Visual hierarchy, spacing, and typography make content scannable.

### 3. **Accessibility**
WCAG 2.1 Level AA compliance ensures usability for all users.

### 4. **Performance**
Tokens are centralized for faster development and updates.

### 5. **Scalability**
Design system supports growth from startup to enterprise.

### 6. **Professionalism**
Every detail is intentional and production-ready.

---

## Color System

### Palette

```typescript
import { THEME } from '@/constants/theme';

// Primary color (main brand color)
THEME.colors.primary.main        // #3b82f6 (Blue)
THEME.colors.primary.light       // #60a5fa (Light Blue)
THEME.colors.primary.dark        // #1e40af (Dark Blue)

// Secondary colors (accents)
THEME.colors.secondary.cyan      // #06b6d4 (Cyan)
THEME.colors.secondary.yellow    // #facc15 (Yellow)
THEME.colors.secondary.purple    // #a78bfa (Purple)

// Backgrounds
THEME.colors.background.primary   // #0f172a (Dark Slate - main bg)
THEME.colors.background.secondary // #1e293b (Slate - cards)
THEME.colors.background.tertiary  // #334155 (Light Slate - hover)

// Text colors
THEME.colors.text.primary        // #ffffff (White - headings)
THEME.colors.text.secondary      // #e5e7eb (Light Gray - secondary)
THEME.colors.text.tertiary       // #d1d5db (Gray - body)
THEME.colors.text.muted          // #9ca3af (Dark Gray - placeholders)
THEME.colors.text.disabled       // #6b7280 (Disabled text)

// Status colors
THEME.colors.status.error        // #ef4444 (Red - errors)
THEME.colors.status.errorLight   // #fee2e2 (Light Red - error bg)
THEME.colors.status.success      // #10b981 (Green - success)
THEME.colors.status.warning      // #f59e0b (Orange - warnings)

// Borders
THEME.colors.borders.light       // #334155 (Slate-700)
THEME.colors.borders.medium      // #475569 (Slate-600)
```

### Color Contrast (WCAG AA)

All colors meet minimum contrast ratios:

| Use Case | Contrast Ratio | Compliance |
|----------|----------------|-----------|
| Normal text | 4.5:1 | WCAG AA |
| Large text | 3:1 | WCAG AA |
| Graphics | 3:1 | WCAG AA |

### Using Colors

```typescript
// ✅ Correct - Use color tokens
<Text style={{ color: THEME.colors.text.primary }}>
  Hello
</Text>

// ❌ Wrong - Don't hardcode colors
<Text style={{ color: '#ffffff' }}>
  Hello
</Text>
```

---

## Typography System

### Font Families

```typescript
THEME.fonts.family.display // Bold, modern font for headings
THEME.fonts.family.body    // Readable font for body text
```

### Font Sizes

```typescript
THEME.typography = {
  h1: { fontSize: 40, fontWeight: 'black', lineHeight: 1.2 },     // Main title
  h2: { fontSize: 32, fontWeight: 'black', lineHeight: 1.3 },     // Section
  h3: { fontSize: 24, fontWeight: 'bold', lineHeight: 1.3 },      // Subsection
  h4: { fontSize: 20, fontWeight: 'bold', lineHeight: 1.4 },      // Small heading
  body: { fontSize: 16, fontWeight: 'normal', lineHeight: 1.5 },  // Body text
  bodySmall: { fontSize: 14, fontWeight: 'normal', lineHeight: 1.5 }, // Secondary
  caption: { fontSize: 12, fontWeight: 'normal', lineHeight: 1.5 }, // Captions
  label: { fontSize: 12, fontWeight: 'bold', lineHeight: 1.5 },    // Labels
  button: { fontSize: 16, fontWeight: 'bold', lineHeight: 1.5 },   // Buttons
}
```

### Using Typography

```typescript
// Use Text component with variants
<Text variant="h1">Main Title</Text>
<Text variant="body">Body text</Text>
<Text variant="caption">Small text</Text>

// Or use THEME directly
<Text style={{
  fontSize: THEME.typography.h1.fontSize,
  fontWeight: THEME.typography.h1.fontWeight,
  lineHeight: THEME.typography.h1.lineHeight,
}}>
  Title
</Text>
```

---

## Spacing System

### Scale (4px base unit)

```typescript
THEME.spacing = {
  xs: 4,      // Extra small
  sm: 8,      // Small
  md: 12,     // Medium
  lg: 16,     // Large
  xl: 20,     // Extra large
  '2xl': 24,  // 2X large
  '3xl': 32,  // 3X large
  '4xl': 40,  // 4X large
  '5xl': 48,  // 5X large
  '6xl': 64,  // 6X large
}

// Component presets
THEME.componentSizes = {
  button: { small: 36, medium: 44, large: 52 },
  avatar: { small: 40, medium: 56, large: 80 },
  iconButton: { small: 32, medium: 40, large: 48 },
}
```

### Border Radius

```typescript
THEME.spacingPresets.radius = {
  sm: 8,      // Subtle rounding
  md: 12,     // Standard
  lg: 16,     // Large (cards)
  xl: 20,     // Extra large
  full: 999,  // Circle
}
```

### Using Spacing

```typescript
// ✅ Correct
style={{
  padding: THEME.spacing.lg,
  margin: THEME.spacing.md,
  gap: THEME.spacing.sm,
  borderRadius: THEME.spacingPresets.radius.md,
}}

// ❌ Wrong - Don't hardcode
style={{
  padding: 16,
  margin: 12,
  gap: 8,
}}
```

---

## Shadows & Elevation

### Shadow Levels

```typescript
THEME.shadows = {
  none: { elevation: 0 },                      // No shadow
  sm: { elevation: 2, shadowRadius: 2 },       // Subtle
  md: { elevation: 4, shadowRadius: 4 },       // Small
  lg: { elevation: 8, shadowRadius: 8 },       // Medium
  xl: { elevation: 16, shadowRadius: 16 },     // Large
  '2xl': { elevation: 24, shadowRadius: 24 },  // Extra large
}

// Aliases
THEME.shadowAliases = {
  card: THEME.shadows.sm,      // Card shadows
  active: THEME.shadows.md,    // Active/pressed
  floating: THEME.shadows.lg,  // Floating elements
  modal: THEME.shadows.xl,     // Modals
  overlay: THEME.shadows['2xl'], // Full overlays
}
```

### Using Shadows

```typescript
// Card with shadow
<View style={{
  ...THEME.shadows.sm,
  borderRadius: THEME.spacingPresets.radius.lg,
}}>
  Card content
</View>

// Floating button
<View style={{
  ...THEME.shadows.lg,
  position: 'absolute',
}}>
  FAB
</View>
```

---

## Motion & Animation

### Durations

```typescript
THEME.motion.duration = {
  fast: 150,    // Button taps
  normal: 300,  // Standard animations
  slow: 500,    // Elaborate animations
  slower: 800,  // Loading sequences
}
```

### Easing Curves

```typescript
THEME.motion.easing = {
  in: 'cubic-bezier(0.4, 0, 1, 1)',       // Entrance
  out: 'cubic-bezier(0, 0, 0.2, 1)',      // Exit
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',  // Emphasis
  linear: 'linear',                        // Constant speed
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',  // Standard
}
```

### Opacity

```typescript
THEME.opacity = {
  none: 0,          // Transparent
  hover: 0.08,      // Hover states
  focus: 0.12,      // Focus states
  active: 0.16,     // Active states
  disabled: 0.38,   // Disabled elements
  secondary: 0.6,   // Secondary content
  primary: 1,       // Full opacity
}
```

### Z-Index (Layering)

```typescript
THEME.zIndex = {
  background: 0,      // Background
  content: 10,        // Main content
  floating: 100,      // Floating elements
  dropdown: 200,      // Dropdowns
  modal: 300,         // Modals
  tooltip: 400,       // Tooltips
  max: 1000,          // Max layer
}
```

---

## Responsive Design

### Breakpoints

```typescript
THEME.breakpoints = {
  xs: 320,   // Extra small phones
  sm: 480,   // Small phones
  md: 600,   // Tablets
  lg: 840,   // Large tablets
  xl: 1120,  // Desktop
  '2xl': 1440, // Large desktop
}

THEME.screenConfig = {
  xs: { name: 'Extra Small', padding: 12, spacing: 'compact' },
  sm: { name: 'Small', padding: 16, spacing: 'normal' },
  md: { name: 'Medium', padding: 20, spacing: 'normal' },
  lg: { name: 'Large', padding: 24, spacing: 'spacious' },
  xl: { name: 'Extra Large', padding: 32, spacing: 'spacious' },
  '2xl': { name: 'Extra Extra Large', padding: 40, spacing: 'spacious' },
}
```

### Responsive Typography

Font sizes adapt to screen size:

```typescript
THEME.responsiveFontSizes.h1 = {
  xs: 24,   // Small screens
  sm: 28,
  md: 32,
  lg: 36,
  xl: 40,   // Large screens
}
```

### Responsive Spacing

Spacing adapts to screen size:

```typescript
THEME.responsiveSpacing = {
  xs: { sm: 8, md: 12, lg: 16, xl: 20 },
  sm: { sm: 8, md: 12, lg: 16, xl: 20 },
  md: { sm: 12, md: 16, lg: 20, xl: 24 },
  lg: { sm: 16, md: 20, lg: 24, xl: 32 },
  xl: { sm: 20, md: 24, lg: 32, xl: 40 },
}
```

---

## Accessibility

### WCAG 2.1 Level AA Compliance

All components meet these standards:

```typescript
THEME.a11y = {
  touchTargetSize: 44,        // Min 44x44 for touch
  contrast: { normal: 4.5, large: 3, component: 3 },
  focus: { outlineWidth: 2, outlineColor: '#06b6d4', outlineOffset: 2 },
}
```

### Keyboard Navigation

- **Tab** - Navigate between interactive elements
- **Enter/Space** - Activate buttons
- **Arrow keys** - Navigate lists/menus
- **Escape** - Close modals/dropdowns

### Screen Reader Support

- VoiceOver (iOS)
- TalkBack (Android)
- NVDA (Windows)
- JAWS (Windows)

### ARIA Attributes

```typescript
// All common ARIA attributes defined in THEME.ariaAttributes
THEME.ariaRoles = {
  button: 'button',
  link: 'link',
  alert: 'alert',
  modal: 'dialog',
  // ... more roles
}

THEME.ariaAttributes = {
  label: 'aria-label',
  describedBy: 'aria-describedby',
  invalid: 'aria-invalid',
  // ... more attributes
}
```

---

## Component States

### Button States

| State | Appearance | Use Case |
|-------|-----------|----------|
| **Normal** | Primary color | Default |
| **Hover** | Darker color | Mouse over |
| **Active/Pressed** | Darkest color + shadow | User pressing |
| **Disabled** | Gray + reduced opacity | Can't interact |
| **Loading** | Spinner + disabled | Processing |
| **Focus** | Outline + highlight | Keyboard nav |

### Input States

| State | Appearance | Use Case |
|-------|-----------|----------|
| **Empty** | Border only | Initial |
| **Filled** | With value | User entered data |
| **Focused** | Blue border | Active input |
| **Error** | Red border + message | Invalid data |
| **Disabled** | Gray + reduced opacity | Can't edit |
| **Success** | Green indicator | Valid data |

---

## Usage Guidelines

### ✅ DO

1. **Use THEME tokens** - Never hardcode values
2. **Reference THEME** - For colors, spacing, typography
3. **Test accessibility** - Use screen readers, keyboard nav
4. **Follow components** - Use Button, Input, Card, etc.
5. **Maintain consistency** - Use same spacing/colors everywhere
6. **Document changes** - Update this guide when changing tokens

### ❌ DON'T

1. **Hardcode colors** - `'#ffffff'` instead of THEME
2. **Use magic numbers** - `16` instead of THEME.spacing.lg
3. **Create new variants** - Extend existing ones
4. **Mix token systems** - Use THEME everywhere
5. **Ignore accessibility** - a11y is non-negotiable
6. **Skip testing** - Test with real devices/screen readers

### Example: Building a Complete Screen

```typescript
import { View, ScrollView } from 'react-native';
import { Button, Input, Text, Card } from '@/components';
import { THEME } from '@/constants/theme';

export default function LoginScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME.colors.background.primary }}>
      <View style={{ paddingHorizontal: THEME.spacing.lg, paddingVertical: THEME.spacing.xl }}>
        
        {/* Header */}
        <Text variant="h1" style={{ marginBottom: THEME.spacing.md }}>
          Sign In
        </Text>
        <Text variant="body" color="secondary">
          Welcome back to TheHireMe
        </Text>

        {/* Form */}
        <View style={{ marginTop: THEME.spacing.xl, gap: THEME.spacing.lg }}>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Button */}
        <Button
          title="Sign In"
          onPress={handleSignIn}
          variant="primary"
          size="large"
          style={{ marginTop: THEME.spacing.xl }}
        />
      </View>
    </ScrollView>
  );
}
```

---

## Maintenance

### Updating Design Tokens

1. **Edit token file** - `/constants/theme.ts` or specific file
2. **Update THEME** - Export changes in theme.ts
3. **Update this guide** - Document changes
4. **Test everywhere** - Verify all screens reflect update
5. **Commit changes** - Git commit with clear message

### Adding New Tokens

1. **Identify pattern** - What tokens do you need?
2. **Create file** - `/constants/new-tokens.ts`
3. **Add to theme** - Import and export in theme.ts
4. **Document** - Add section to this guide
5. **Update components** - Use new tokens

---

## Resources

- **Components** - See `COMPONENT_GUIDE.md`
- **Theme** - `constants/theme.ts`
- **Colors** - `constants/colors.ts`
- **Typography** - `constants/typography.ts`
- **Spacing** - `constants/spacing.ts`
- **Shadows** - `constants/shadows.ts`
- **Motion** - `constants/motion.ts`
- **Responsive** - `constants/responsive.ts`
- **Accessibility** - `constants/accessibility.ts`

---

## Questions?

Refer to component implementations or reach out to the design system maintainers.

**Version:** 1.0.0  
**Target:** WCAG 2.1 Level AA  
**Last Updated:** 2026-06-13
