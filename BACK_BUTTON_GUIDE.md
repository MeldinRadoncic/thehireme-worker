# Back Button Navigation System

**Professional & Modern Back Button Implementation**

This guide explains how the back button navigation system works and how to implement it in any screen.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Components & Hooks](#components--hooks)
3. [How to Use](#how-to-use)
4. [Navigation Rules](#navigation-rules)
5. [Edge Cases](#edge-cases)

---

## Overview

The back button system implements **industry-standard navigation patterns** from Instagram, Twitter, and Uber:

- ✅ Back button reverses the last navigation action
- ✅ Entry points (Welcome, Dashboard) have NO back button
- ✅ Multi-step flows save progress locally
- ✅ Confirmation dialogs for critical data loss
- ✅ Consistent across all screens

---

## Components & Hooks

### **1. useBackButton Hook**

**Location:** `hooks/useBackButton.ts`

**Purpose:** Handle back navigation logic based on screen type

**Properties:**

```typescript
const { 
  shouldShowBack,        // Boolean - show back button?
  handleBack,           // Function - handle back press
  showConfirmation,     // Boolean - show confirmation dialog?
  confirmAndGoBack,     // Function - confirm and navigate
  cancelBack,           // Function - cancel back navigation
  screen                // Current screen identifier
} = useBackButton({
  screen: 'login',                    // Required: which screen
  onBeforeBack: async () => true,     // Optional: custom logic before back
  hasUnsavedChanges: false,           // Optional: warn before leaving
  showConfirmationOnBack: false       // Optional: show confirmation dialog
});
```

### **2. BackButton Component**

**Location:** `components/BackButton.tsx`

**Purpose:** Reusable back button UI with accessibility

**Props:**

```typescript
<BackButton
  onPress={handleBack}           // Required: handle press
  showButton={shouldShowBack}    // Required: show/hide button
  size="medium"                  // Optional: small | medium | large
  style={customStyle}            // Optional: override styles
  accessibilityLabel="Go back"   // Optional: custom a11y label
/>
```

### **3. ConfirmationDialog Component**

**Location:** `components/ConfirmationDialog.tsx`

**Purpose:** Confirmation modal for data loss prevention

**Props:**

```typescript
<ConfirmationDialog
  visible={showConfirmation}
  title="Discard Progress?"
  message="Your changes will not be saved. Continue?"
  confirmText="Yes, Discard"
  cancelText="Keep Editing"
  onConfirm={confirmAndGoBack}
  onCancel={cancelBack}
  isDangerous={true}
/>
```

---

## How to Use

### **Step 1: Import Hook & Components**

```typescript
import { Button, Text, BackButton } from '@/components';
import { useBackButton } from '@/hooks/useBackButton';
```

### **Step 2: Initialize Hook**

```typescript
const { shouldShowBack, handleBack } = useBackButton({
  screen: 'profile',  // Your screen name
});
```

### **Step 3: Add BackButton to JSX**

```typescript
<BackButton
  onPress={handleBack}
  showButton={shouldShowBack}
  size="medium"
/>
```

### **Step 4: For Multi-Step Forms (Optional)**

```typescript
const { 
  shouldShowBack, 
  handleBack, 
  showConfirmation, 
  confirmAndGoBack, 
  cancelBack 
} = useBackButton({
  screen: 'onboarding-step-2',
  hasUnsavedChanges: formHasChanges,
  showConfirmationOnBack: true,
});

// In JSX:
<BackButton onPress={handleBack} showButton={shouldShowBack} />
<ConfirmationDialog
  visible={showConfirmation}
  title="Discard Progress?"
  message="You will lose unsaved changes. Continue?"
  onConfirm={confirmAndGoBack}
  onCancel={cancelBack}
/>
```

---

## Navigation Rules

### **Entry Points (No Back Button)**

These screens are the start of a navigation flow:

```
✗ welcome           (entry to auth flow)
✗ onboarding-step-1 (entry to onboarding flow)
✗ dashboard         (root of main app)
```

No back button is shown on these screens.

### **Authentication Flow**

```
welcome (entry)
  ↓
login ← back
signup ← back
verify-email ← back
  ↓
onboarding-step-1
```

Back button goes to previous screen.

### **Onboarding Flow**

```
onboarding-step-1 (entry)
  ↓
onboarding-step-2 ← back (shows confirmation if unsaved)
onboarding-step-3 ← back (shows confirmation)
onboarding-step-4 ← back (shows confirmation)
onboarding-step-5 ← back (shows confirmation)
  ↓
success → auto-navigates to dashboard
```

Back saves progress locally, shows confirmation on step 1.

### **Main App Flow**

```
dashboard (root)
  ↓
profile ← back → dashboard
settings ← back → dashboard
media ← back → dashboard
promotions ← back → dashboard
```

Back button navigates through stack.

---

## Edge Cases

### **Case 1: Welcome Screen (Entry Point)**

```typescript
const { shouldShowBack } = useBackButton({ screen: 'welcome' });
// shouldShowBack = false (no button shown)
```

### **Case 2: Multi-Step Onboarding**

```typescript
const { 
  shouldShowBack,           // true
  handleBack,              // goes to previous step
  showConfirmation,        // shows if unsaved changes
  confirmAndGoBack,        // saves progress then navigates
} = useBackButton({
  screen: 'onboarding-step-3',
  hasUnsavedChanges: true,
  showConfirmationOnBack: true,
});
```

### **Case 3: Viewing Settings (No Confirmation)**

```typescript
const { shouldShowBack, handleBack } = useBackButton({
  screen: 'settings',
  // No showConfirmationOnBack - settings can be viewed again
});
```

### **Case 4: Custom Logic Before Back**

```typescript
const { shouldShowBack, handleBack } = useBackButton({
  screen: 'profile',
  onBeforeBack: async () => {
    // Custom validation
    if (!profileComplete) {
      Alert.alert('Profile required', 'Complete profile first');
      return false; // Prevent back
    }
    return true; // Allow back
  }
});
```

---

## Screen Types (Enum)

Update the `ScreenType` in `hooks/useBackButton.ts` when adding new screens:

```typescript
type ScreenType =
  | 'welcome'
  | 'login'
  | 'signup'
  | 'verify-email'
  | 'onboarding-step-1'
  | 'onboarding-step-2'
  | 'onboarding-step-3'
  | 'onboarding-step-4'
  | 'onboarding-step-5'
  | 'onboarding-success'
  | 'dashboard'
  | 'profile'
  | 'settings'
  | 'media'
  | 'promotions'
  | 'other'; // Add new screens here
```

---

## Implementation Checklist

When adding back button to a new screen:

- [ ] Import `BackButton` component
- [ ] Import `useBackButton` hook
- [ ] Initialize hook with screen name
- [ ] Add BackButton to JSX
- [ ] Add ConfirmationDialog if multi-step form
- [ ] Test back navigation
- [ ] Test confirmation dialog (if applicable)
- [ ] Verify screen type in hook enum

---

## Testing

### **Test Entry Points**
- Welcome screen: No back button shown ✓
- Onboarding step 1: No back button shown ✓
- Dashboard: No back button shown ✓

### **Test Navigation**
- Back from signup → goes to welcome ✓
- Back from step 3 → goes to step 2 ✓
- Back from settings → goes to dashboard ✓

### **Test Confirmation**
- Back from step 1 with unsaved changes → shows confirmation ✓
- Confirm → saves progress and navigates ✓
- Cancel → stays on screen ✓

---

## Reference

**Files:**
- Hook: `hooks/useBackButton.ts`
- Component: `components/BackButton.tsx`
- Dialog: `components/ConfirmationDialog.tsx`
- Index: `components/index.ts`

**Implemented in:**
- `app/(auth)/welcome.tsx`
- `app/(auth)/login.tsx`
- `app/(auth)/signup.tsx`
- `app/(auth)/verify-email.tsx`

---

**Version:** 1.0.0  
**Last Updated:** 2026-06-14
