# Countries and Languages

## JSON File Structure

Each screen has corresponding JSON file in languages folder. Filename matches screen name with .json extension. Example — welcome-screen.json, worker-dashboard-screen.json, services-list-screen.json. Each JSON file contains object with language codes as keys — en (English), bs (Bosnian), hr (Croatian), me (Montenegrin), de (German), fr (French), nl (Dutch), pl (Polish). Under each language key, all static text strings for that screen. Example structure:

```json
{
  "en": {
    "welcomeButton": "Welcome",
    "browseServicesButton": "Browse Services",
    "browseVideosButton": "Browse Videos",
    "registerButton": "Register as Client",
    "errorNoWorkers": "No workers found in your location",
    "errorNetworkFailed": "Unable to load, check your connection"
  },
  "bs": {
    "welcomeButton": "Dobrodošli",
    "browseServicesButton": "Pretraži usluge",
    "etc": "..."
  },
  "de": {
    "etc": "..."
  }
}
```

## Component Implementation

Component imports JSON file. On render, gets current language from app state or local storage. References translation key dynamically. Example — text={translations[currentLanguage].welcomeButton} instead of hardcoded text. All static text comes from JSON — buttons, labels, error messages, empty states, loading messages, validation errors.

## Adding New Text

Developer adds new key-value pair to JSON file for all eight languages. No code changes needed. Text displays dynamically from JSON key reference. Translation happens in JSON file, not in component code.

## Error Message Translation

All error messages stored in JSON. Backend errors logged technically to admin dashboard. Frontend shows user-friendly translated error message from JSON. Example — network error code shows "Unable to load, check your connection" in user's language.

## Supported Languages and Countries

JSON supports eight language objects — en, bs, hr, me, de, fr, nl, pl. Each language translates all content for that screen completely. No partial translations. If new country added later, add new language object to all JSON files.

## Naming Conventions

JSON keys use camelCase — welcomeButton, browseServicesButton, errorMessage. No spaces or special characters in keys. Keys descriptive of what text displays — loginErrorInvalidEmail, reviewSuccessMessage.

## Fallback Language

If language key missing, fallback to English. Log warning to admin dashboard so developers know translation missing.

## Device Language Detection

On app startup, detect device language using React Native getLocales(). Match device language against supported languages. If match, use that language. If no match, default to English. Store language preference in local storage so persists across sessions.

## Language Switching

Language switcher button allows user to change language. User picks from dropdown of eight supported languages. App state updates, all JSON references update, screen re-renders in new language instantly. Language preference saved to local storage.

## Services and Countries Translation

**Only countries and services are translated from Supabase database.** When requesting countries or services, include the desired language in the API request. Supabase returns the data in the requested language. Example — GET /services?language=bs returns services with Bosnian names. Services table has columns — service_name_en, service_name_bs, service_name_hr, service_name_me, service_name_de, service_name_fr, service_name_nl, service_name_pl. Countries table has same structure. No other backend data is translated.

## User-Generated Content

User-generated content — worker bios, client reviews, job descriptions — are NOT translated by Supabase. Content is stored in the language the user submitted it. No automatic translation. Users see content in original submission language.

## Date and Time Handling

**Important:** Supabase saves dates in US timezone by default. This causes timezone mismatches. Date formatting approach to be determined — will address this separately to ensure correct user timezone handling.

## Testing Translations

Test each screen in all eight languages. Verify text displays correctly, no missing keys, text fits screen width in all languages. German text longer than English, ensure buttons and inputs scale. Test language switching — change language mid-screen, verify all text updates instantly. Test countries and services API requests with different language parameters — verify correct language returned.
