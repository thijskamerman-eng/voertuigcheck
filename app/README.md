# Voertuigcheck

Dagelijkse rijklaarheidscontrole voor truck en trailer. React + TypeScript PWA, built with Vite.

Implements the design in `../project/Voertuigcheck App.dc.html` (see `../README.md` and `../chats/chat1.md` for the full design history).

## Stack

- **React 19 + TypeScript**, built with Vite.
- **Zustand** for app state (single store, see `src/store/useAppStore.ts`).
- **CSS Modules** for styling, with design tokens in `src/styles/tokens.css`.
- **vite-plugin-pwa** for installability (manifest + service worker).

This is a **frontend-only prototype with mocked data** — there is no backend. Login, submission, and the seeded admin reports/history are simulated in-memory. Photos are captured for real via the browser's file input (`capture="environment"` opens the camera on mobile) and kept in memory as data URLs — nothing is uploaded.

## Run it

```bash
npm install
npm run dev      # dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

- `src/data/checklist.ts` — the 17 checkpoints, grouped into 6 categories (buitenkant/binnenkant/klein materiaal × truck/trailer), plus the priority mapping used by the admin view.
- `src/i18n/translations.ts` — NL/EN/PL/RO dictionaries. Language switching only affects the driver-facing form, matching the source design.
- `src/store/useAppStore.ts` — all app state: driver form fields, checklist status/notes/photos, damage reports, and the admin view (login, search, archiving, history, active report, lightbox).
- `src/selectors/derive.ts` + `src/hooks/useAdminData.ts` — pure derivation of progress, admin report groups, and history from raw store state (not stored redundantly).
- `src/components/driver/` — the chauffeur-facing check form.
- `src/components/admin/` — the admin/backend overview (login → dashboard → history → report detail).
- `src/components/shared/` — language flags, photo capture + thumbnails, the fullscreen photo lightbox, priority badges.

## Known simplifications vs. the design prototype

- No fake phone status bar (clock/battery) — that was a device-frame mockup detail in the design tool, not part of the real UI.
- The driver-form total is **17** checkpoints (not 18): the prototype's total included one legacy checkpoint (`Vaste combinatie`) that had been removed from the UI but was still counted in the denominator, which meant a completed check could never be visually shown as 100%. This is a bug fix, not a feature change.
- Damage sub-sections ("+ Schade toevoegen") only render while their parent category is expanded, so nothing appears attached to a collapsed section — see the source's own README (`../project/design_handoff_voertuigcheck/README.md`) which documents it as content shown "under the checkpoints" (i.e. inside the expanded list), and the git history in `../chats/chat1.md` which never asks for it to appear outside that context.

## Not implemented (out of scope for this pass)

Per the design handoff, these are explicitly for a later production step: real authentication, a real backend/API and database, and real photo upload/storage. See `../project/design_handoff_voertuigcheck/README.md` for the full intended data model.
