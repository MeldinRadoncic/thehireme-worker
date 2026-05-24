# Worker App Development Guidance

## Component Reusability

Build generic reusable components used across multiple screens. Button, input field, card, modal, error message, loading spinner built once, reused everywhere. Consistent styling, behavior, and naming. No duplicate component code. Components accept props for customization — label, color, size, disabled state.

## File and Component Naming

Use kebab-case for files (dashboard-screen.tsx, upload-video-screen.tsx), PascalCase for component names (DashboardScreen, UploadVideoScreen, MediaUpload). Folder structure organized by feature — auth folder has login, registration, location selection. Dashboard folder has dashboard screen, profile edit, media management. Consistent naming throughout codebase.

## Navigation Stack and Back Navigation

React Navigation defines clear navigation hierarchy. Initial stack — location selection screen, splash screen, welcome screen. Authentication stack separate from app stack. Registration stack — step one through five, preview, success screens. Dashboard stack — dashboard, profile edit, media upload, promotions, reviews, settings. Each screen defines explicit back target. From step three, back goes to step two. From dashboard, back goes to welcome. No unexpected navigation jumps. Back button works consistently across entire app. Implement back button override to prevent Android default back behavior causing issues. Test all back flows — rapid back taps, back from different screens, back after data updates.

## Data in Navigation Params

Never pass sensitive data through navigation params. No passwords, authentication tokens, personal info in params. Pass non-sensitive data like screen IDs or indices. Sensitive data fetched from Supabase or secure state after navigation. Navigation URLs safe from SQL injection or data exposure.

## JSON Translation Files

Every single screen must have a corresponding JSON translation file with all static text translated to all supported languages. Example — dashboard-screen.json contains English, Bosnian, Serbian, German translations for all buttons, labels, error messages on dashboard. No hardcoded text in component files. Component imports JSON and references keys dynamically. All UI text — buttons, labels, error messages, empty states, loading states — must be in JSON. Any new text added requires translation file update.

## Environment Variables

All sensitive credentials stored in Supabase dashboard as environment variables. Never hardcode API keys, Clerk keys, Stripe keys, database URLs, or any secrets in code. Use deno.get to fetch environment variables from Supabase at runtime. All three apps (worker, client, admin) fetch same environment variables. Validate that all required environment variables exist on app startup — if missing, show clear error message, don't silently fail. Environment variables include — Clerk API key, Stripe publishable key, Supabase URL, Supabase anon key, Google Maps API key if used.

## Error Handling

All errors caught and logged to backend error logging system through edge functions. User never sees technical error messages. Show user-friendly messages instead. Bad example — "TypeError: Cannot read property of undefined." Good example — "Unable to load your profile, please try again." Error messages in JSON translation files so they're translated. Technical error stack traces logged to admin dashboard for debugging, not shown to user. Loading states shown during async operations. Timeout handling — if request takes too long, show timeout error message, allow retry. Network error handling — show message "Check your internet connection" if offline, allow retry when online.

## Testing

All screens and components tested before deployment. Test user flows end-to-end — complete registration flow from location selection to dashboard, video upload to promotion, review submission. Test edge cases — location permission denied, offline mode, invalid input submission, rapid button taps, network timeout, payment failure, account deletion, session timeout. Use React Native Testing Library to write tests. Tests verify correct screens render, correct data displays, correct errors show, navigation works as expected. Minimum eighty percent code coverage for critical flows.

## Responsiveness and SafeAreaView

Fully responsive for all mobile device sizes and tablets. Small phones 320px width, medium phones 375px, large phones 414px, tablets 768px. No content hidden or cut off at any screen size. Padding and margins scale appropriately. Text readable at all sizes. Buttons and touch targets large enough to tap — minimum 44x44 points. All screens wrapped with SafeAreaView to handle notches, status bars, home indicators. No content hidden behind system UI. Bottom navigation accessible, not covered by keyboard or system bars. Test on multiple real devices, not just simulator.

## Accessibility

All screens fully accessible to users with disabilities. Text contrast ratio minimum 4.5:1 for normal text, 3:1 for large text. Font sizes minimum 16sp for body text, larger for readability. Color not used as only way to convey information — use icons or text labels too. All interactive elements have accessible labels. Buttons have descriptive text or aria-labels. Form inputs have associated labels. Images have alt text. Tab order logical — tabbing through inputs goes in correct order. Screen reader compatible — VoiceOver on iOS, TalkBack on Android work with app. Test with screen readers enabled.

## Input Validation

All user inputs validated before sending to backend. Email format validated — check @ symbol, domain. Phone number validated — correct length and format for country. Text fields validated — required fields not empty, length limits enforced. Numbers validated — only digits where appropriate. Show error messages inline next to invalid field. Error message in translation JSON. Clear error when user fixes input. Server-side validation also enforces same rules.

## Loading and Disabled States

Show loading spinner while fetching data or processing requests. Disable buttons during loading — button text changes to "Loading..." or shows spinner. Prevent double-tap — button disabled until request completes. Loading screens prevent interaction while data loads. Empty state messages — show "No videos yet" if worker has no videos, "No reviews yet" if no reviews. Error states show error message with retry button.

## Local Caching

Cache location selection, language preference, authentication token locally using AsyncStorage. Persist temp registration data during multi-step flow. Cache services and countries list with reasonable TTL so repeated requests don't hit backend. Clear cache on logout. Validate cached data — if expired or invalid, refetch from backend.

## Asset Optimization

Compress images before uploading. Don't display full-resolution images—scale to appropriate size for screen. Lazy load screens not immediately needed. Code splitting to reduce bundle size. Test app startup time and screen transition performance.

## Code Style and Formatting

Use consistent code formatting. Prettier auto-formats code on save. ESLint catches common mistakes. No console.logs in production code. Comments for complex logic, avoid obvious comments. Consistent indentation and spacing.

## Local Caching with Long TTL

Cache rarely changing data like services and country lists. Use a cache layer with a long time-to-live (TTL), such as 2 to 3 days, to avoid frequent API calls. Always validate cached data after TTL expiration and refresh from the backend. Services list cached for 3 days — if user hasn't opened app in 3 days, refresh on next open. Countries list cached for 3 days. Worker's own profile cached for shorter TTL like 1 hour since it changes more frequently. This strategy significantly reduces database queries and prevents unnecessary charges.

## Rule for API Usage

Strictly avoid unnecessary API calls to minimize database costs. Use a cache layer wherever possible to prevent redundant calls. Set appropriate rate limits to avoid overload and ensure the app fetches only when necessary. All other data should use the cache unless explicitly expired. Never blindly trust user requests — always validate server-side that requests are legitimate before executing. Don't make an API call for every user action. Batch requests where possible. Debounce search inputs to avoid searching on every keystroke. Implement request throttling to prevent rapid repeated calls from the same user session.

## Rate Limiting

Implement strict rate limiting on all API endpoints to prevent abuse and control database costs. Rate limit by user ID — limit each user to X requests per minute. Example: limit to 60 requests per minute per user. Return 429 (Too Many Requests) error if limit exceeded. Client receives 429 error and must wait before retrying. Show user message — "You're requesting too frequently, please wait a moment." Implement exponential backoff on client — wait 1 second, then 2 seconds, then 4 seconds before retrying. Different endpoints can have different rate limits — authentication endpoints stricter, public endpoints more lenient. Video upload endpoints rate limited heavily to prevent spam. Worker profile updates rate limited to prevent accidental duplicate submissions. Payment endpoints rate limited to prevent accidental duplicate charges. Log rate limit violations in error table for monitoring abuse patterns. Don't trust user claims about request validity — always validate on server that the request makes sense before executing.
