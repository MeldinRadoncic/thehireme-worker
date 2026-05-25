# The Hire Me Worker App

**GitHub Repository:** https://github.com/MeldinRadoncic/thehireme-worker

## The Hire Me Worker App Overview

This worker app is a dedicated React Native mobile application for The Hire Me platform. It allows skilled service workers to register, create profiles, upload videos and images, buy credits, and manage their offerings for clients.

This project has its own separate GitHub repository, its own docs folder, and its own development rules.

### Before Writing Any Code

Fully read and analyze:

- The main CLAUDE.md file in the root The Hire Me folder
- The docs folder inside this worker project
- Every single documentation file inside the worker docs folder
- The main project documentation inside the root /docs folder

**Especially read and fully understand:**
- APP_COMPLETE_FLOW.md
- Worker_App_Development_Guidance.md
- Countries_and_Languages.md

Do not start coding before fully understanding the worker app flow, profile management, video uploads, and credit system.

## GitHub Rules

This worker app has its own separate GitHub repository.

**Never ask:**
- "Do you want me to push?"
- "Should I commit this?"
- "Should I push to GitHub?"

**Only commit or push when the owner explicitly instructs:**
- "Commit this"
- "Push to GitHub"
- "Commit and push"

No automatic commits or pushes.

## React Native and UI Rules

This app is built using:
- React Native
- Tailwind CSS
- Expo
- Supabase
- Clerk Authentication

**The worker app must be:**
- Fully responsive for all device sizes
- Sleek and modern in design
- Intuitive and simple to use
- Fast and efficient

Use your frontend design skills for UX/UI to ensure:
- Clean layouts
- Excellent spacing
- Consistent modern colors
- Easy navigation
- Intuitive touch controls

## Responsiveness and Safe Areas

Ensure the app works seamlessly across:
- Small devices
- Medium devices
- Large devices
- Tablets

Use SafeAreaView so content never hides behind:
- Top status bars
- Bottom navigation

Ensure all content is always fully visible and accessible.

## Accessibility

Accessibility is mandatory. The app must:
- Use readable fonts
- Maintain strong contrast
- Provide clear touch targets
- Support screen readers (VoiceOver, TalkBack)
- Keep the interface simple and understandable for all users

## Error Handling

Error messages must be professional and user-friendly. Never expose technical errors to users. Users should only see friendly, clear messages like:
- "Unable to load, please try again."

Technical details must be logged internally for admin review.

## Security Rules

Security is paramount. Never:
- Hardcode API keys
- Expose secrets in code
- Trust client-side validation alone

Always:
- Use environment variables (no hardcoding)
- Sanitize inputs
- Prevent SQL injection
- Keep URLs clean and simple

## Simplicity Rules

Do not overcomplicate anything.

If something is becoming too complex:
- Stop and simplify
- Focus on clarity and maintainability
- Don't overengineer solutions

If multiple developers are needed, assign tasks appropriately.

## Supabase Cost Optimization

Keep Supabase costs minimal. Avoid frequent API calls.

Implement caching for:
- Services list (cache 1–3 days)
- Countries list (cache 1–3 days)

Use pagination, rate limiting, debouncing. Always optimize for cost efficiency.

## Development Workflow

Before any implementation:

1. Read the related documentation thoroughly—understand the full workflow, backend interactions, and app flow.
2. Ensure you fully understand how user profiles, video uploads, and credit purchases work.
3. Check the docs folder in the worker app project, and review all files inside.
4. Ensure you follow the guidelines on security, error handling, and performance optimization.
5. If you hit a roadblock or something is unclear, you have full permission to consult official framework docs online—never stall without finding a solution.
6. Once a feature is implemented, document everything in the project's docs folder.
7. Every change, implementation, or decision must be fully documented—this is required for long-term maintenance.

## Final Development Goal

Our worker app must be:

- Professional
- User-friendly for workers
- Beautiful in design
- Fast and responsive
- Secure from backend to frontend
- Simple, never overcomplicated
- Scalable for future growth

Every decision should be made with these principles in mind.

@AGENTS.md
