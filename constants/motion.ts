/**
 * TheHireMe Motion System
 * Animation curves and durations for consistent micro-interactions
 * Based on Material Design motion principles
 */

export const MOTION = {
  // Animation durations (in milliseconds)
  duration: {
    // Quick interactions (button tap, toggle)
    fast: 150,
    // Standard interactions (modal open, fade in)
    normal: 300,
    // Elaborate interactions (page transitions, complex animations)
    slow: 500,
    // Long interactions (loading sequences)
    slower: 800,
  },

  // Easing curves for different interaction types
  easing: {
    // Ease in - slow start, fast end (entrance animations)
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    // Ease out - fast start, slow end (exit animations)
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    // Ease in-out - slow start and end, fast middle (emphasis)
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Linear - constant speed (continuous animations)
    linear: 'linear',
    // Sharp - quick deceleration (standard)
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },

  // Preset animation combinations
  transitions: {
    // Fast, subtle transitions
    quick: {
      duration: 150,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    // Standard transitions for most interactions
    standard: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    // Smooth, elegant transitions
    smooth: {
      duration: 500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    // Loading animations
    loading: {
      duration: 1000,
      easing: 'linear',
    },
  },

  // Micro-interaction patterns
  patterns: {
    // Button press feedback
    buttonPress: {
      duration: 150,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    // Fade in/out
    fade: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    // Scale animations (zoom)
    scale: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    // Slide animations
    slide: {
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    // Bounce animations
    bounce: {
      duration: 500,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
};

// Opacity/transparency system
export const OPACITY = {
  // Completely transparent
  none: 0,
  // Hover states
  hover: 0.08,
  // Focus states
  focus: 0.12,
  // Active/selected states
  active: 0.16,
  // Disabled states
  disabled: 0.38,
  // Secondary content
  secondary: 0.6,
  // Primary content
  primary: 1,
};

// Z-index scale for layering
export const Z_INDEX = {
  // Background elements
  background: 0,
  // Content layer
  content: 10,
  // Floating elements (FAB, sticky headers)
  floating: 100,
  // Dropdowns, popovers
  dropdown: 200,
  // Modals, dialogs
  modal: 300,
  // Tooltips, messages that float above everything
  tooltip: 400,
  // Maximum z-index for system overlays
  max: 1000,
};
