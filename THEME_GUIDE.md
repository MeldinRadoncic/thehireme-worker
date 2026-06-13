# TheHireMe Theme System Guide

## Overview

All design tokens (colors, typography, spacing) are centralized in the `/constants` folder for consistency and easy maintenance.

**When you need to change a design token globally, change it in ONE place and it applies everywhere.**

## File Structure

```
constants/
├── colors.ts        # Color definitions (primary, secondary, status, etc.)
├── typography.ts    # Font families, sizes, weights, presets
├── spacing.ts       # Spacing units, components sizes, border radius
└── theme.ts         # Central export of all design tokens
```

## How to Use

### Import the Theme

```tsx
import { THEME } from '@/constants/theme';
```

### Using Colors

```tsx
import { THEME } from '@/constants/theme';

// In TypeScript/JavaScript:
const myColor = THEME.colors.primary.main;        // #3b82f6
const textColor = THEME.colors.text.primary;      // #ffffff
const bgColor = THEME.colors.background.primary;  // #0f172a

// In JSX with className (Tailwind):
<Text className={THEME.classNames.text.primary}>
  Hello World
</Text>

// Or use color aliases for quick access:
const primaryColor = THEME.colorAliases.accentBlue;
```

### Using Typography

```tsx
import { THEME } from '@/constants/theme';

// Get font size:
const fontSize = THEME.typography.h1.fontSize;  // 40

// Get complete preset:
const headingStyle = THEME.typography.h2;
// Returns: { fontSize: 32, fontWeight: 900, lineHeight: 1.2, letterSpacing: -0.3 }

// Font weights:
const boldWeight = THEME.fonts.weight.bold;  // '700'
const semiboldWeight = THEME.fonts.weight.semibold;  // '600'
```

### Using Spacing

```tsx
import { THEME } from '@/constants/theme';

// Individual spacing values:
const padding = THEME.spacing.lg;  // 16
const margin = THEME.spacing.xl;   // 20

// Component sizes:
const buttonHeight = THEME.componentSizes.button.medium;  // 44
const avatarSize = THEME.componentSizes.avatar.large;    // 80

// Border radius:
const cardRadius = THEME.spacingPresets.radius.xl;  // 20
const buttonRadius = THEME.spacingPresets.radius.md; // 12
```

## Practical Examples

### Example 1: Create a Button

```tsx
import { THEME } from '@/constants/theme';
import { TouchableOpacity, Text } from 'react-native';

export function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: THEME.colors.primary.main,
        paddingVertical: THEME.spacing.md,
        paddingHorizontal: THEME.spacing.lg,
        borderRadius: THEME.spacingPresets.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{
        color: THEME.colors.text.primary,
        fontSize: THEME.typography.button.fontSize,
        fontWeight: THEME.fonts.weight.bold,
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
```

### Example 2: Create a Card with Tailwind

```tsx
import { THEME } from '@/constants/theme';
import { View, Text } from 'react-native';

export function Card({ title, subtitle }) {
  return (
    <View className={`${THEME.classNames.card.bordered} gap-2`}>
      <Text className={`${THEME.classNames.text.primary} font-black text-xl`}>
        {title}
      </Text>
      <Text className={`${THEME.classNames.text.tertiary}`}>
        {subtitle}
      </Text>
    </View>
  );
}
```

### Example 3: Create an Input Field

```tsx
import { THEME } from '@/constants/theme';
import { TextInput, View, Text } from 'react-native';

export function Input({ label, placeholder, value, onChange }) {
  return (
    <View>
      <Text style={{
        color: THEME.colors.text.primary,
        fontSize: THEME.typography.label.fontSize,
        fontWeight: THEME.fonts.weight.bold,
        marginBottom: THEME.spacing.sm,
      }}>
        {label}
      </Text>
      <TextInput
        className={THEME.classNames.input.base}
        placeholder={placeholder}
        placeholderTextColor={THEME.colors.text.muted}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
```

## Changing Design Tokens

### Change Primary Color Globally

1. Open `/constants/colors.ts`
2. Update the primary color:

```ts
primary: {
  main: '#3b82f6',    // Change this
  light: '#60a5fa',
  dark: '#1e40af',
}
```

3. **That's it!** All screens using `THEME.colors.primary.main` will update automatically.

### Change Typography Size

1. Open `/constants/typography.ts`
2. Update the font size:

```ts
h2: {
  fontSize: 32,        // Change this
  fontWeight: FONTS.weight.black,
  ...
}
```

3. All heading 2 text will resize everywhere.

### Change Spacing

1. Open `/constants/spacing.ts`
2. Update the spacing value:

```ts
export const SPACING = {
  lg: 16,   // Change from 16 to 20 (for example)
  ...
}
```

3. All screens using `THEME.spacing.lg` update automatically.

## Design Tokens Reference

### Color Categories
- `primary` - Main brand color (blue)
- `secondary` - Accent colors (cyan, yellow, purple)
- `background` - Background layers
- `text` - Text colors (primary, secondary, tertiary, muted, disabled)
- `borders` - Border colors
- `status` - Status colors (error, success, warning)

### Typography Presets
- `h1` - Hero/Page titles (40px, black weight)
- `h2` - Section titles (32px, black weight)
- `h3` - Card titles (24px, black weight)
- `h4` - Form labels (18px, bold weight)
- `body` - Regular text (16px, normal weight)
- `bodySmall` - Smaller text (14px, normal weight)
- `caption` - Captions (12px, medium weight)
- `button` - Button text (16px, bold weight)
- `label` - Input labels (12px, bold weight)

### Spacing Scale
- `xs` = 4px
- `sm` = 8px
- `md` = 12px
- `lg` = 16px (default screen padding)
- `xl` = 20px
- `2xl` = 24px
- `3xl` = 32px
- `4xl` = 40px
- `5xl` = 48px
- `6xl` = 64px

## Best Practices

✅ **DO:**
- Always import from `@/constants/theme`
- Use `THEME.*` for all design tokens
- Update tokens in constants files, not in component files
- Use Tailwind className presets when possible
- Create reusable component presets for common patterns

❌ **DON'T:**
- Hardcode colors (`#3b82f6` directly in components)
- Hardcode spacing values (16 directly in style)
- Hardcode font sizes
- Create local color/spacing definitions
- Change styles per-screen

## Maintenance

When adding new design tokens:
1. Add to the appropriate file (colors.ts, typography.ts, or spacing.ts)
2. Export it from theme.ts
3. Document in this guide
4. Update THEME.classNames if adding Tailwind variants

## Questions?

If you need to add a new token or preset:
1. Identify which file it belongs in
2. Add it following the existing pattern
3. Export it from theme.ts
4. Use it in components
