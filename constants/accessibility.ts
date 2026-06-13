/**
 * TheHireMe Accessibility (a11y) System
 * WCAG 2.1 Level AA compliance guidelines
 * Ensures app is usable by everyone, including people with disabilities
 */

export const A11Y = {
  // Minimum touch target size (WCAG 2.5.5 Target Size)
  // Should be at least 44x44 points for small and essential targets
  touchTargetSize: 44,

  // Minimum color contrast ratios (WCAG 2.1 Level AA)
  contrast: {
    // Normal text (< 18pt or < 14pt bold)
    normal: 4.5,
    // Large text (>= 18pt or >= 14pt bold)
    large: 3,
    // Graphics and UI components
    component: 3,
  },

  // Focus indicators
  focus: {
    // Minimum outline width (visible enough)
    outlineWidth: 2,
    // Focus outline color (high contrast)
    outlineColor: '#06b6d4', // Cyan for visibility
    // Offset from element
    outlineOffset: 2,
  },

  // Keyboard navigation
  keyboard: {
    // Tab order should follow visual order
    // Interactive elements should be reachable with Tab key
    // Enter/Space should activate buttons
    // Arrow keys for lists/radios
    // Escape to close modals/dropdowns
  },

  // ARIA attributes
  ariaLive: {
    // Polite - announce when user finishes current action
    polite: 'polite',
    // Assertive - announce immediately (errors, alerts)
    assertive: 'assertive',
    // Off - don't announce
    off: 'off',
  },

  // Screen reader hints
  screenReader: {
    // Hide from screen readers (decorative elements)
    hidden: { accessibilityElementsHidden: true },
    // Make element focusable for screen readers
    label: { accessible: true },
  },

  // Motion and animation considerations
  motion: {
    // Respect prefers-reduced-motion for users sensitive to motion
    prefersReducedMotion: true,
    // Use meaningful animations, not purely decorative
    // Avoid flashing content (can trigger seizures)
    // Max flash rate: 3 flashes per second
  },

  // Text and readability
  text: {
    // Minimum font size (for readability)
    minSize: 12,
    // Ideal font size (body text)
    bodySize: 14,
    // Maximum line length (for readability)
    maxLineLength: 75,
    // Line height (1.5x for readability)
    lineHeight: 1.5,
    // Letter spacing for dyslexia support
    letterSpacing: 0.02,
  },

  // Color and visibility
  color: {
    // Don't use color alone to convey information
    // Use patterns, text, or icons alongside color
    // Ensure sufficient contrast
    // Consider color blindness (8% male, 0.5% female)
  },

  // Form accessibility
  form: {
    // All inputs must have labels
    // Error messages must be associated with inputs
    // Required fields must be marked
    // Help text should be available
    // Validation should happen on blur, not on character input
  },

  // Error handling
  errors: {
    // Identify errors clearly
    // Suggest corrections
    // Make it easy to fix (pre-fill if possible)
    // Use ARIA live region for dynamic error messages
  },

  // Skip links
  skipLinks: {
    // Allow jumping to main content
    // Allow skipping repetitive navigation
  },

  // Testing
  testing: {
    // Use screen readers: VoiceOver (iOS), TalkBack (Android)
    // Keyboard only navigation
    // Test with actual users with disabilities
    // Automated accessibility testing with tools
  },
};

// Common ARIA roles
export const ARIA_ROLES = {
  button: 'button',
  link: 'link',
  navigation: 'navigation',
  main: 'main',
  region: 'region',
  alert: 'alert',
  alertdialog: 'alertdialog',
  dialog: 'dialog',
  modal: 'dialog',
  tablist: 'tablist',
  tab: 'tab',
  tabpanel: 'tabpanel',
  menuitem: 'menuitem',
  menuitemcheckbox: 'menuitemcheckbox',
  menuitemradio: 'menuitemradio',
  checkbox: 'checkbox',
  radio: 'radio',
  spinbutton: 'spinbutton',
  textbox: 'textbox',
};

// Common ARIA attributes
export const ARIA_ATTRIBUTES = {
  // Label for element
  label: 'aria-label',
  // Reference to labeling element
  labelledBy: 'aria-labelledby',
  // Describes element
  describedBy: 'aria-describedby',
  // Is element required
  required: 'aria-required',
  // Is element disabled
  disabled: 'aria-disabled',
  // Current state (checked, pressed, selected)
  current: 'aria-current',
  // Live region announcement priority
  live: 'aria-live',
  // Is element expanded/collapsed
  expanded: 'aria-expanded',
  // Controls which element
  controls: 'aria-controls',
  // Owns child elements
  owns: 'aria-owns',
  // Has popup menu
  hasPopup: 'aria-haspopup',
  // Currently active descendant
  activedescendant: 'aria-activedescendant',
  // Error message for input
  invalid: 'aria-invalid',
  // Loading state
  busy: 'aria-busy',
};

// WCAG levels
export const WCAG_LEVELS = {
  // Level A - basic
  A: 'WCAG 2.1 Level A',
  // Level AA - enhanced (recommended)
  AA: 'WCAG 2.1 Level AA',
  // Level AAA - enhanced (best)
  AAA: 'WCAG 2.1 Level AAA',
};

// Current target
export const A11Y_TARGET = WCAG_LEVELS.AA;
