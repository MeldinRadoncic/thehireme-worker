# Language System Implementation Guide

**Status:** Ready to implement
**Supported Languages:** 8 (English, Bosnian, Croatian, Montenegrin, German, French, Dutch, Polish)

---

## 📋 Overview

The worker app supports **8 languages** with a JSON-based translation system:

- **en** - English
- **bs** - Bosnian
- **hr** - Croatian
- **me** - Montenegrin
- **de** - German
- **fr** - French
- **nl** - Dutch
- **pl** - Polish

---

## 🏗️ System Architecture

### **How It Works:**

1. **LanguageContext** - Manages current language state
   - Detects device language on startup
   - Loads saved language preference from AsyncStorage
   - Provides `useLanguage()` hook for all components

2. **JSON Files** - Store all translations
   - Location: `languages/` folder
   - Filename format: `{screen-name}.json`
   - Example: `welcome-screen.json`, `login-screen.json`

3. **Component Usage** - Access translations via hook
   ```typescript
   const { language } = useLanguage();
   const translations = require(`@/languages/${screenName}.json`);
   const text = translations[language].welcomeButton;
   ```

---

## 📁 JSON File Structure

Each JSON file contains all 8 languages with translations:

```json
{
  "en": {
    "welcomeTitle": "Welcome to TheHireMe",
    "welcomeSubtitle": "Build your reputation and earn more",
    "getStartedButton": "Get Started",
    "signInButton": "Sign In"
  },
  "bs": {
    "welcomeTitle": "Dobrodošli na TheHireMe",
    "welcomeSubtitle": "Zgradite svoju reputaciju i zarađujte više",
    "getStartedButton": "Početi",
    "signInButton": "Prijava"
  },
  "hr": {
    "welcomeTitle": "Dobrodošli na TheHireMe",
    "welcomeSubtitle": "Izgradi svoju reputaciju i zarađuj više",
    "getStartedButton": "Započni",
    "signInButton": "Prijava"
  },
  "me": { "..." },
  "de": { "..." },
  "fr": { "..." },
  "nl": { "..." },
  "pl": { "..." }
}
```

---

## 🎯 Implementation Steps

### **Phase 1: Create JSON Files**
- [ ] Create `welcome-screen.json`
- [ ] Create `login-screen.json`
- [ ] Create `signup-screen.json`
- [ ] Create `verify-email-screen.json`
- [ ] Create additional screen files as needed

### **Phase 2: Update Components**
- [ ] Import language hook in each screen
- [ ] Replace hardcoded strings with JSON references
- [ ] Add language switcher component
- [ ] Test language switching

### **Phase 3: Service & Country Translations**
- [ ] API calls include language parameter
- [ ] Services fetched in current language from Supabase
- [ ] Countries fetched in current language from Supabase

### **Phase 4: Error Messages**
- [ ] Create `error-messages.json` with all error translations
- [ ] Replace all hardcoded error messages with JSON references
- [ ] Fallback to English if key missing

---

## 🗂️ Current Folder Structure

```
languages/
├── welcome-screen.json        (to be created)
├── login-screen.json          (to be created)
├── signup-screen.json         (to be created)
├── verify-email-screen.json   (to be created)
├── onboarding-step-1.json     (to be created)
├── onboarding-step-2.json     (to be created)
├── ...
└── error-messages.json        (to be created)
```

---

## 💡 Key Features

### **Automatic Language Detection**
- Detects device language on app startup
- Matches against supported languages
- Defaults to English if device language not supported

### **Language Persistence**
- Saves language preference to AsyncStorage
- Restores on app reload
- User preference persists across sessions

### **Language Switching**
- Language switcher button in settings
- Changes all screen text instantly
- No page reload needed
- Updates to new language immediately

### **Fallback to English**
- If translation key missing → shows English
- Logs warning to admin dashboard
- Ensures app never breaks due to missing translations

### **Database Translations**
- Services table: service_name_en, service_name_bs, service_name_hr, etc.
- Countries table: name_en, name_bs, name_hr, etc.
- API requests include language parameter
- Backend returns data in requested language

### **User-Generated Content**
- Worker bios, reviews, descriptions NOT translated
- Content stored in submission language
- Users see original language content
- No automatic translation of user content

---

## 🚀 Usage in Components

### **Basic Example:**

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

export default function WelcomeScreen() {
  const { language } = useLanguage();
  const translations = require('@/languages/welcome-screen.json');
  const t = translations[language];

  return (
    <View>
      <Text>{t.welcomeTitle}</Text>
      <Button title={t.getStartedButton} />
    </View>
  );
}
```

### **With useLanguage Hook Helper:**

```typescript
import { useLanguageTranslations } from '@/hooks/useLanguageTranslations';

export default function LoginScreen() {
  const t = useLanguageTranslations('login-screen');

  return (
    <View>
      <Text>{t.signInTitle}</Text>
      <Input placeholder={t.emailPlaceholder} />
    </View>
  );
}
```

---

## 📝 JSON Key Naming Conventions

- **camelCase** - use camelCase for all keys
- **Descriptive** - key name should describe the text
- **No spaces** - no spaces or special characters in keys
- **Prefixes** - use prefixes for clarity:
  - `title` - screen titles
  - `subtitle` - secondary headings
  - `button` - button text
  - `label` - form labels
  - `placeholder` - input placeholders
  - `error` - error messages
  - `success` - success messages
  - `hint` - helper text

### **Examples:**
- ✅ `welcomeTitle`
- ✅ `signInButton`
- ✅ `emailPlaceholder`
- ✅ `errorInvalidEmail`
- ❌ `Welcome Title` (spaces)
- ❌ `sign-in-button` (kebab-case)
- ❌ `signinBtn` (abbreviation)

---

## 🧪 Testing Translations

1. **Test Each Screen in All Languages**
   - Switch language in settings
   - Verify all text displays correctly
   - Check text fits screen width
   - Ensure no keys are missing

2. **Test Language Switching**
   - Change language mid-screen
   - Verify all text updates instantly
   - Check persistence after reload

3. **Test API Calls**
   - Request services in each language
   - Request countries in each language
   - Verify correct translations returned

4. **Test Fallback**
   - Add missing key to component
   - Verify English fallback displayed
   - Check console warning logged

---

## 📚 Reference Files

- **LanguageContext**: `contexts/LanguageContext.tsx`
- **Documentation**: `Countries_and_Languages.md`
- **App Flow**: `../docs/APP_COMPLETE_FLOW.md`

---

## 🔄 Language Context API

```typescript
// Hook
const { language, setLanguage, isLoading } = useLanguage();

// language: current language ('en', 'bs', 'hr', etc.)
// setLanguage: (lang: Language) => Promise<void>
// isLoading: boolean (true while initializing)
```

---

## Next Steps

1. ✅ Create JSON files for all screens
2. ✅ Create `useLanguageTranslations` hook helper
3. ✅ Update all components to use JSON translations
4. ✅ Add language switcher component
5. ✅ Test language switching across all screens
6. ✅ Implement Supabase language parameter for API calls
7. ✅ Create error messages JSON

---

**Version:** 1.0.0  
**Last Updated:** 2026-06-14  
**Status:** Ready for Implementation
