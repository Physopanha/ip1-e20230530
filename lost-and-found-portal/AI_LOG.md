# AI Usage Log

## 2026-10-31
Project Proposal and Spec Alignment
Tool: Gemini
Asked: Help adapting the generic Helpdesk Tickets spec into a Student Lost and Found Portal while keeping all strict technical constraints (like the 2MB image limit and role rules).
Kept: The 8 modified user stories and the exact role mapping (Student = Requester, SA Staff = Agent).
Rejected: I rejected generating a complete backend schema right now; I just kept the spec alignment for the proposal.
Checked by: Read the generated proposal to ensure it met the SPEC.pdf constraints.

## 2026-10-31
Vue Setup and Tailwind v4 Config
Tool: Gemini
Asked: How to set up Vue 3 with Tailwind CSS v4 and PostCSS.
Kept: The `vite` initialization command flags (Router, Pinia, Linter, Prettier) and the manual `postcss.config.js` and `tailwind.config.js` file creation.
Rejected: The AI suggested fixing a node engine error by forcing `npx tailwindcss@latest init -p`, but I rejected it and created the files manually to save time.
Checked by: Ran `npm run dev` and verified the Tailwind CSS rendered correctly in the browser.