# Payment Requests Management System

## Overview

This project is a prototype web application designed to manage payment requests submitted by external consultants to a public organization.

The system replaces a manual, email-based process with a structured, transparent workflow that enables:
- Submission of payment requests
- Tracking request status
- Managing approval flows
- Monitoring SLA and delays

The application focuses on **business logic, user experience, and process clarity**, rather than full backend implementation.

---

## Target Users

The system supports two main roles:

### 1. Consultant
- Submits payment requests
- Saves drafts and edits them
- Tracks request status

### 2. Organization Employee
- Reviews submitted requests
- Approves / rejects / requests clarification
- Monitors SLA and system performance via dashboard

---

## Technology Stack

- **Frontend Framework:** Angular
- **Language:** TypeScript
- **State Management:** In-memory + LocalStorage (for persistence simulation)
- **Styling:** CSS
- **Deployment:** Vercel

---

## System Structure (Screens)

### 1. Requests List (Main Screen)
A centralized view of all requests.

**Key Features:**
- Table view with status, SLA, urgency, and days open
- Role-based display:
  - Consultants see only their own requests
  - Employees see all requests (excluding drafts)
- Visual indication for:
  - SLA status
  - Stuck requests

---

### 2. Request Form (Create / Edit)

Used by consultants to create and manage requests.

**Key Features:**
- Create new request
- Save as draft
- Submit for review
- Edit existing draft requests
- File attachment support (with file name and preview link)
- Form validation:
  - Required fields
  - Prevention of future execution dates

---

### 3. Request Details & Handling

Detailed view of a specific request.

**Consultant View:**
- Read-only access to request details and status

**Employee View:**
- Ability to:
  - Approve request
  - Reject request
  - Request clarification
- Add internal notes

**Business Rules:**
- "Approved for Payment" is a **final status**
- No further status changes are allowed after approval
- Action buttons are hidden when request is in final state

---

### 4. Dashboard (Control Panel)

Accessible only to organization employees.

**Purpose:**
Provide a high-level overview of system status and identify issues.

**Includes:**
- KPI cards (total, active, in review, approved, SLA breaches, stuck)
- Graph 1: Requests distribution by status
- Graph 2: SLA distribution (normal / warning / breach)
- Table of requests requiring attention

---

## Business Logic Decisions

The following design decisions were made to improve realism and clarity:

### Status Flow
- Draft → Submitted → In Review → Final decision
- Automatic transition from **"Submitted" to "In Review"** when an employee opens the request

---

### Draft Handling
- Draft requests are:
  - Visible only to consultants
  - Editable
  - Not visible to organization employees

---

### Final Status
- "Approved for Payment" is considered **final**
- No further updates or actions are allowed after approval

---

### Stuck Requests Definition
- A request is considered **stuck** if:
  - It has not been updated for more than 14 days
- Request in final states (Approved) are **never considered stuck**

---

### SLA Logic
- SLA is calculated based on submission date
- Visual indicators:
  - Normal
  - Warning
  - Breach

---

### Dashboard Access Control
- Dashboard is available **only to organization employees**
- Consultants cannot access or view system-wide data

---

### Data Persistence
- Data is stored in memory for simplicity
- **LocalStorage is used to simulate persistence**
  - Allows data to remain after page refresh

---

### File Attachments
- Files are handled in a simulated way:
  - File name is displayed
  - Temporary preview link is generated

---

### Last Updated Logic

The `lastUpdatedAt` field was implemented to reflect the last meaningful business action performed on a request.

It is updated in the following scenarios:
- When a new request is created
- When a draft is saved
- When an existing draft is edited
- When a draft is submitted for review
- When a request transitions from "Submitted" to "In Review"
- When an employee performs an action:
  - Approve
  - Reject
  - Request clarification

This field is **not updated on passive viewing**, ensuring it accurately represents real activity.

---

### UX Improvements
- Clear role-based views
- Conditional UI elements (buttons, actions)
- Visual indicators for SLA and stuck requests
- Tooltip explanations for key statuses

---

## Tools Used

During the development process, I used several AI-assisted tools to improve both planning and implementation:

- **ChatGPT** was used to break down the project requirements, structure the solution, and refine business logic and workflows. It helped clarify system behavior, define statuses, and improve overall design decisions.

- **Claude Code together with GitHub Copilot (within VS Code)** was used directly on the codebase to assist with implementation. These tools helped generate structured code, improve readability, detect missing logic, and validate consistency across different parts of the application.

These tools significantly improved development efficiency while allowing a stronger focus on system design, correctness, and user experience.

---

## Additional Design Decisions

- Separation between business logic (service layer) and UI
- Reusable components (status badge, SLA badge)
- Clean and structured layout for readability
- Focus on clarity and usability over complexity

---

## How to Run the Project

```bash
npm install
ng serve