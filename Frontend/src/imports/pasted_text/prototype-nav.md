# CLICKABLE PROTOTYPE & PAGE NAVIGATION

IMPORTANT: This must be designed as a **fully connected interactive prototype**, not a collection of separate static screens.

Every important button, navigation item, card, link, and action should be clickable and connected to the appropriate page.

## Navigation Bar

The top navigation must work as follows:

* **BloodLink Logo** → Home Page
* **Home** → Home Page
* **Find Donors** → Find Donors Page
* **Blood Requests** → Blood Requests Page
* **How It Works** → How It Works section/page
* **About** → About section/page
* **Login** → Login Page
* **Register** → Registration Page

## Landing Page Buttons

**Find a Donor** → Find Donors Page

**Become a Donor** → Registration Page

**View Blood Requests** → Blood Requests Page

**Learn More** → About/How It Works section

## Login Page

**Login** → Appropriate Dashboard based on selected user role.

For prototype purposes, demonstrate navigation to:

* Donor Dashboard
* Individual Requester Dashboard
* Hospital/Organization Dashboard
* Admin Dashboard

**Register** → Registration Page

**Forgot Password** → Forgot Password Page

## Registration Page

Role selection should be interactive.

When the user selects:

**Blood Donor**
→ Show donor-specific registration fields.

**Individual Requester**
→ Show requester-specific fields.

**Hospital / Organization**
→ Show organization-specific fields.

**Create Account** → Appropriate dashboard or registration-success page.

**Already have an account? Login** → Login Page

## Donor Dashboard

Sidebar navigation must be clickable:

* Dashboard → Donor Dashboard
* My Profile → Donor Profile
* Availability → Availability Page/Section
* Blood Requests → Donation Requests Page
* Notifications → Notifications Page
* Donation History → Donation History Page
* Settings → Settings Page
* Logout → Login/Home Page

Dashboard request cards:

**View Request** → Blood Request Details Page

**Accept** → Request status changes to Accepted in the prototype.

**Reject** → Request status changes to Rejected in the prototype.

## Donor Profile

**Edit Profile** → Edit Profile Page/Modal

**Update Availability** → Availability Page/Modal

**Back to Dashboard** → Donor Dashboard

## Find Donors Page

Search and filter controls should be visually interactive.

Each donor card should have:

**View Profile** → Donor Profile View Page

**Request Donation** → Create/Send Donation Request Page or confirmation modal

**Back** → Previous page

## Donor Profile View

**Send Donation Request** → Donation Request form/modal

**Back to Donors** → Find Donors Page

## Create Blood Request

**Submit Blood Request** → Request Submitted/Success screen and then My Blood Requests Page

**Cancel** → Previous page

## Blood Request Details

Show clickable actions depending on the user's role:

* Accept Request
* Reject Request
* Cancel Request
* Mark as Completed
* Contact/Request Donor
* Back

Status should visually update when an action is selected.

Example:

**Pending**
↓
**Accepted**
↓
**In Progress**
↓
**Completed**

Alternative states:

**Pending → Rejected**

**Pending → Cancelled**

## My Blood Requests

Each request should have:

**View** → Blood Request Details

**Edit** → Edit Blood Request

**Cancel** → Confirmation modal

## Donation Requests

Each incoming request should have:

**View Details** → Blood Request Details

**Accept** → Accepted state

**Reject** → Rejected state

## Notifications

Each notification should be clickable.

Examples:

**New Donation Request** → Related Blood Request Details

**Request Accepted** → Related Request Details

**Emergency Blood Request** → Emergency Request Details

**Mark all as read** → Notifications become read

## Hospital / Organization Dashboard

Sidebar must be fully clickable:

* Dashboard
* Organization Profile
* Create Blood Request
* Find Donors
* Active Requests
* Request History
* Notifications
* Reports
* Settings
* Logout

**Create Emergency Request** → Create Blood Request Page

**Find Donors** → Find Donors Page

**Active Requests** → Active Requests Page

## Admin Dashboard

Sidebar navigation must be clickable:

* Dashboard
* Users
* Donors
* Blood Requests
* Organizations
* Reports
* Notifications
* Settings
* Logout

Dashboard statistic cards should also be clickable.

For example:

**Total Users** → User Management

**Total Donors** → Donor Management

**Active Requests** → Blood Request Management

**Reported Accounts** → Reports Page

## Admin User Management

Each user row should have:

**View** → User Details

**Edit** → Edit User

**Deactivate** → Confirmation modal

**Delete** → Confirmation modal

## Admin Blood Request Management

Each request row should have:

**View** → Request Details

**Edit** → Edit Request

**Delete/Remove** → Confirmation modal

## Reports Management

Each report should have:

**Review** → Report Details

**Resolve** → Resolved state

**Reject Report** → Rejected state

## Settings

Clickable settings:

* Account Settings
* Change Password
* Notification Preferences
* Privacy Settings
* Logout

## FOOTER LINKS

Make footer links clickable:

* About
* How It Works
* Contact
* Privacy Policy
* Terms & Conditions
* Help

## INTERACTION REQUIREMENTS

Use realistic prototype interactions such as:

* Button hover states
* Button pressed states
* Dropdown menus
* Search/filter interactions
* Form validation states
* Success messages
* Error messages
* Confirmation dialogs
* Notification states
* Availability toggle
* Accept/reject confirmation
* Cancel request confirmation
* Logout confirmation
* Mobile navigation menu

## PAGE TRANSITIONS

Use clean and professional transitions between screens.

Avoid excessive animations.

The prototype should feel like a real web application.

## IMPORTANT FOR THE FINAL PROTOTYPE

Every major screen must have a clear way to navigate to another relevant screen.

The user should never become stuck on a page.

The complete prototype should allow the evaluator to follow realistic workflows such as:

### Donor Workflow

Home
→ Register
→ Login
→ Donor Dashboard
→ Blood Requests
→ View Request
→ Accept Request
→ Request Status
→ Donation History

### Requester Workflow

Home
→ Login
→ Requester Dashboard
→ Create Blood Request
→ Submit Request
→ Find Donors
→ View Donor
→ Send Donation Request
→ Track Request

### Hospital Workflow

Home
→ Register
→ Hospital Dashboard
→ Create Emergency Request
→ Find Donors
→ Send Requests
→ Monitor Responses
→ Complete Request

### Admin Workflow

Login
→ Admin Dashboard
→ Users
→ Donors
→ Blood Requests
→ Reports
→ Review Report
→ Resolve Report

Make the entire Figma prototype **clickable and interconnected** so that clicking buttons and navigation elements takes the user to the correct screen.