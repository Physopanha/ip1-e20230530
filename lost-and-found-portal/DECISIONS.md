# Architecture and Design Decisions

2026-10-31: Authentication Strategy
Decision: To strictly limit access to ITC students while satisfying the base project's JWT/email requirement, the system will use the database's `email` field to store the Student ID formatted as an email (e.g., `e20230530@itc.edu.kh`). The login form will just ask for "Student ID" and append the domain behind the scenes before sending it to the NestJS API.

2026-10-31: CSS Framework
Decision: Used Tailwind CSS v4 instead of v3. This required explicitly installing `@tailwindcss/postcss` to integrate with Vite, but provides better performance and a cleaner `main.css` file.