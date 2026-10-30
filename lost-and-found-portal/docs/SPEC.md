# System Specification: ITC Student Lost and Found Portal

## Roles
1. **Requester (Student):** Can log in with Student ID, submit claims, view their own claims, and post public comments.
2. **Agent (SA Staff):** Can view all claims, assign them, change status, post internal notes, and manage the category/tag trees.
3. **Admin:** Can do everything an Agent can do, plus permanently delete claims.

## User Stories & Acceptance Criteria

**US-01: Secure Student Authentication**
As a student, I want to log in using my Student ID and password, so that I can securely access the portal.
* **AC1:** Login accepts Student ID and password, returning a JWT on success.
* **AC2:** Invalid credentials return a 401 error.
* **AC3:** API responses never include the hashed password.

**US-02: Check and Claim an Item**
As a student, I want to open a ticket (claim) with my item's description, category, and an optional image.
* **AC1:** Creates a claim with status `OPEN` and assigns the current student as the requester.
* **AC2:** Accepts an optional image file of at most 2 MB (png, jpg, jpeg, webp).
* **AC3:** Rejecting files larger than 2 MB or invalid formats with a 400 error.

**US-03: List and Filter Claims**
As a student, I want to search and page through my submitted claims.
* **AC1:** List only shows claims belonging to the logged-in student.
* **AC2:** Supports filtering by status and pagination.
* **AC3:** Empty results display a clear UI empty state.

**US-04: View Claim and Comment**
As a student, I want to open my claim and add public comments. As SA Staff, I want to leave internal notes.
* **AC1:** Students can only view their own claims. Accessing another student's claim ID returns 404.
* **AC2:** SA Staff can post internal notes on any claim.
* **AC3:** Students cannot see internal notes.

**US-05: Edit a Claim**
As a student, I want to edit my claim's description while it is still OPEN.
* **AC1:** Students can edit their claim only if the status is `OPEN`.
* **AC2:** Editing an in-progress or closed claim as a student returns a 400 error.
* **AC3:** SA Staff can edit any claim at any status.

**US-06: Manage SA Inventory Queue**
As SA Staff, I want to see all student claims in a global inbox and transition statuses.
* **AC1:** SA Staff and Admins can list all claims in the system.
* **AC2:** SA Staff can update status to `IN_PROGRESS`, `RESOLVED`, or `CLOSED`.
* **AC3:** A student attempting to view the global inbox receives a 403 error.

**US-07: Post Found Items via Trees**
As SA Staff, I want to create Categories and Tags when items are turned in.
* **AC1:** SA Staff can add, rename, or deactivate nodes in the Category and Tag trees.
* **AC2:** A deactivated category is hidden from the claim creation form but remains on existing claims.

**US-08: Permanently Delete Claim**
As an Admin, I want to permanently delete spam claims.
* **AC1:** Admin can trigger a hard delete on a claim, which returns 204.
* **AC2:** Deleting a claim also removes its comments, tags, and image file from the disk.
* **AC3:** SA Staff and Students attempting a delete receive a 403 error.