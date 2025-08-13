# Project Structure & Development Guidelines

This document outlines the folder structure and coding guidelines for maintaining a scalable, type-safe, and industry-standard codebase.

---

## 📂 Folder Structure

```
project-root/
│
├── src/
│   ├── app/                      # Next.js App Router (routes, layouts, metadata)
│   │   ├── (public)/             # Public-facing routes
│   │   ├── (auth)/               # Authentication-related routes (login, register, etc.)
│   │   ├── (dashboard)/          # Protected routes for logged-in users
│   │   ├── api/                  # Route handlers (Next.js API or tRPC endpoints)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Base UI components (shadcn/ui, buttons, inputs, etc.)
│   │   └── common/               # Shared components across the app (Navbar, Footer, etc.)
│   │
│   ├── features/                 # Feature modules containing domain logic + UI
│   │   └── feature-name/
│   │       ├── components/       # UI for the feature
│   │       ├── hooks/            # Custom hooks for the feature
│   │       ├── services/         # API calls or server actions for this feature
│   │       └── types.ts          # Types for the feature
│   │
│   ├── lib/                       # Utility functions, config, and helpers
│   │   ├── db/                   # Database connection logic
│   │   ├── auth/                 # Better-Auth setup and helpers
│   │   ├── validations/          # Zod schemas for validation
│   │   ├── logger.ts             # Logging utility
│   │   └── utils.ts              # Generic helper functions
│   │
│   ├── models/                   # Mongoose models
│   │   └── User.ts
│   │
│   ├── services/                 # Business logic not tied to UI (e.g., email sending)
│   │   ├── userService.ts
│   │   └── postService.ts
│   │
│   ├── store/                    # Zustand or global state management
│   │   └── useUserStore.ts
│   │
│   ├── styles/                   # Global CSS/Tailwind config
│   │   └── globals.css
│   │
│   ├── types/                    # Global TypeScript types
│   │   └── index.d.ts
│   │
│   └── middleware.ts             # Next.js middleware (auth checks, logging, etc.)
│
├── public/                       # Static files (images, icons, etc.)
│
├── .env                          # Environment variables
├── .env.example                  # Example env variables for onboarding
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

---

## 📜 Development Guidelines

### 1. **Component Guidelines**
- Place **pure UI components** in `components/ui`.
- **Common/shared components** (e.g., Navbar, Footer) go in `components/common`.
- **Feature-specific components** go inside `features/<feature-name>/components`.

### 2. **Logic Placement**
- **Business logic** (e.g., database queries, complex data processing) → `services/`.
- **Server actions / API endpoints** → `app/api/` (or `features/<feature>/services` if tied to one feature).
- **State management** → `store/` (Zustand slices per feature).
- **Validation logic** → `lib/validations` (Zod schemas for forms and API).
- **Database models** → `models/`.

### 3. **Naming Conventions**
- Files and folders: **kebab-case** (`user-profile.tsx`).
- Components: **PascalCase** (`UserProfile.tsx`).
- Hooks: Start with `use` (`useUserStore.ts`).
- Services: End with `Service` (`userService.ts`).

### 4. **Type Safety**
- Always define types in `types/` or inside the feature folder’s `types.ts`.
- Use `zod` for runtime validation + TypeScript inference.

### 5. **Env Variables**
- Use `process.env.VAR_NAME` **only in server code**.
- Keep `.env.example` updated for onboarding.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Validation**: Zod
- **Forms**: React Hook Form

### **Backend**
- **Auth**: Better-Auth
- **Database**: MongoDB (Mongoose)
- **API**: Next.js API routes or tRPC
- **Server Actions**: Native Next.js server actions

### **Tooling**
- **Linting/Formatting**: Biome or ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Package Manager**: Bun or pnpm
- **Type Safety**: TypeScript end-to-end
