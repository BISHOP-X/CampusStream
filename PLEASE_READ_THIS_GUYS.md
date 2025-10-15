# 👋 Hey Guys!

So this is basically the **first iteration** with the UI fully built out. The backend is currently under development, but I wanted to share where we're at so everyone's on the same page.

## � Current Status

**UI is complete** - All 12 pages are built and functional with mock data. Production-ready design with dark mode, animations, mobile-responsive, the whole deal.

**Backend integration** is next - Setting up Supabase for auth, database, and real-time features.

## �️ Tech Stack & Dev Style

**Frontend:**
- ⚛️ React 18 + TypeScript (strict typing, no `any` types)
- 🎨 Tailwind CSS (utility-first, no custom CSS files)
- 🧩 shadcn/ui components (copy-paste philosophy, full control)
- �️ React Router v6
- � React Query (for server state management)
- 🎯 Lucide React (consistent icons)

**Backend (In Progress):**
- 🔥 Supabase (PostgreSQL + Auth + Real-time + Storage)

**Development Approach:**
- 📱 **Mobile-first** - Everything built for touch, then scaled up
- � **Component-driven** - Small, reusable, single-responsibility components
- � **Type-safe** - TypeScript everywhere, interfaces for all data structures
- ⚡ **Performance-focused** - Lazy loading, code splitting, optimized renders
- 🎯 **User-centric** - Loading states, error boundaries, empty states for every scenario
- 🧪 **Production mindset** - Error handling, null safety, edge cases covered

**Code Style:**
- Clean, readable code over clever tricks
- Descriptive naming (no abbreviations unless obvious)
- Comments only when "why", not "what"
- Consistent formatting (Prettier-friendly)
- Hooks over classes
- Composition over inheritance

**Folder Structure:**
```
src/
├── components/      # Reusable UI (Navbar, NewsCard, etc.)
│   └── ui/         # shadcn components
├── pages/          # Route components
├── hooks/          # Custom hooks (use-infinite-scroll, etc.)
├── lib/            # Utils, helpers, mock data
└── main.tsx        # Entry point
```

## 🏃 Quick Start

```bash
npm install
npm run dev
```

App runs at `http://localhost:8080`

## 🤝 Want to Contribute?

**Just let me know!** Whether it's:
- Backend integration (Supabase setup)
- New features or improvements
- Bug fixes
- Testing
- Documentation

I'm happy to add collaborators or review PRs. - if you want to help build this, you're in.

### Contributing Flow
1. Fork or ask for collaborator access
2. Create feature branch (`feature/your-feature`)
3. Make your changes
4. Commit with clear messages
5. Push and open PR (or commit directly if you're a collaborator)

## 📝 Notes

- Mock data in `src/lib/mockData.ts` mirrors future DB schema
- All interfaces are ready for Supabase integration
- Error boundaries catch crashes gracefully
- Loading/empty states everywhere for polish

---

**I hope that wasn't too much!** 😅

Yeah, so if you wanna contribute and commit to this project, **just tell me** and we'll get you set up! 🚀

— BISHOP-X

