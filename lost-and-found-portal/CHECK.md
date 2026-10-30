# Check 1
Tag: check-1 
Commit: (Add your commit hash here after you commit)

## Done
[x] docs/SPEC.md: 6-10 user stories with acceptance criteria, at least 2 roles
[x] Wireframes for the main screens in docs/wireframes/
[x] frontend/ runs with npm run dev from a fresh clone
[x] First static screens built from the spec (no real data yet)
[x] AI_LOG.md and DECISIONS.md have real entries
[x] Small commits with meaningful messages, tag check-1 pushed

## AI use this period (2-3 main AI_LOG entries)
1. Used AI to adapt the Helpdesk spec into the Lost and Found Portal constraints.
2. Used AI to troubleshoot the Vue 3 and Tailwind CSS v4 initialization.

## One decision I made and why
I decided to store the Student ID in the required database `email` field by formatting it as `e20230530@itc.edu.kh`. This satisfies the strict JWT login requirement of the assignment while ensuring the UI only prompts for the Student ID, restricting access to verified students.

## What I would show if asked to explain one thing
I would show my static Vue 3 template for the "Submit Claim" screen, explaining how the Tailwind CSS utility classes format the form and how the UI clearly limits the image upload to 2 MB to match the backend specification.