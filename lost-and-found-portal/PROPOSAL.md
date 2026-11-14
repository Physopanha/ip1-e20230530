# ITC Student Lost and Found Portal

## Problem
When students lose items on campus, they are turned into the Student Association, but there is no digital way for students to check inventory or claim their belongings. This system provides a secure, verified platform for students to find and claim their lost items.

## Users and roles
Requester (Student): Logs in with their Student ID to browse found items, submit claims with proof, and comment on their cases.
Agent (SA Staff): Manages the category/tag trees of found inventory, reviews student claims, and updates ticket statuses (Open, In Progress, Resolved).

## User stories
1. As a Student, I want to log in using my Student ID so that I can securely access the portal.
2. As a Student, I want to open a claim ticket with my item's description and an optional image so that I can prove ownership.
3. As a Student, I want to search and page through my submitted claims so that I can track their status.
4. As a Student, I want to add public comments to my claim so that I can provide extra details to the staff.
5. As an SA Staff, I want to see all student claims in a global inbox so that I can verify ownership and transition their status.
6. As an SA Staff, I want to add internal notes to a claim so that I can record physical bin numbers without students seeing them.
7. As an SA Staff, I want to create Categories and Tags so that students can browse the currently held inventory.
8. As an Admin, I want to permanently delete spam claims so that the system remains clean.

Accepted when:
* Login accepts Student ID and password, returning a JWT on success.
* Claim creation accepts an optional image file of at most 2 MB.
* Students can only view their own claims; accessing another student's claim returns 404.

## MVP scope
Must have: stories 1, 2, 3, 5, 7
Nice to have: stories 4, 6, 8

## Entities
| Entity | Main attributes | Relations |
|---|---|---|
| User | studentId, passwordHash, role | has many Tickets, has many Comments |
| Ticket | title, description, status, imageUrl | belongs to User, belongs to Category, has many Comments |
| Category | name, isActive | has many Tickets |
| Comment | content, isInternal | belongs to Ticket, belongs to User |

## Stretch feature
File upload
What it does in this app: Allows students to upload a photo (up to 2MB) of their lost item or proof of ownership when submitting a claim ticket.

## Repository
https://github.com/Physopanha/ip1-e20230530