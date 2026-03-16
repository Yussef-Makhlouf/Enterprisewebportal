Design a complete, professional, enterprise-grade web portal for 
GIG Jordan Insurance Company called "Agents & Brokers Portal". 
This is a B2B insurance management platform used by insurance 
brokers, agents, and GIG internal staff in Jordan.

═══════════════════════════════════════════════
BRAND & VISUAL IDENTITY
═══════════════════════════════════════════════

Company: GIG Insurance — Jordan
Primary Color: #C8102E (GIG Red)
Secondary Color: #0D1F3C (Jordan Navy)
Accent Gold: #C8962A
Success: #00C896
Warning: #F0B030
Error: #FF4060
Info: #0DB4CC

Dark Mode Background: #070E1C to #0F1E35
Light Mode Background: #F0F4FA to #FFFFFF
Card Dark: #0F1A2E
Card Light: #FFFFFF

Typography:
- Arabic: Tajawal (weights: 400, 500, 700, 800)
- English: IBM Plex Sans (weights: 400, 500, 700)
- Numbers/Codes: IBM Plex Mono
- Must support full RTL (Arabic) and LTR (English)

Design Language: "Precision Authority" — institutional, 
trustworthy, modern. NOT generic SaaS. Inspired by Bloomberg 
Terminal meets Gulf government portals. Clean geometry, 
purposeful data density, zero decorative noise.

Deliver BOTH Dark Mode and Light Mode for every screen.
Deliver BOTH Arabic (RTL) and English (LTR) layouts.

═══════════════════════════════════════════════
LAYOUT SYSTEM
═══════════════════════════════════════════════

Global shell layout for all authenticated screens:
- Left side (RTL: Right side): Compact icon rail — 68px wide, 
  dark background, GIG logo gem at top, icon-only navigation 
  with hover tooltips, notification badge on bell icon
- Next to rail: Contextual navigation panel — 240px wide, 
  shows section label + search box + nav items grouped by 
  category, user card with avatar at bottom
- Top: Topbar — 52px height, breadcrumb left, command 
  search bar center (⌘K shortcut visible), lang toggle 
  (AR/EN pill) + theme toggle + notifications + avatar right
- Main content area: fluid, scrollable, 20px padding
- Status bar at very bottom: sync status + timestamp

8px grid system. Border radius: 6px small, 10px medium, 
16px large, 24px extra large.

═══════════════════════════════════════════════
SCREENS TO DESIGN — COMPLETE LIST
═══════════════════════════════════════════════

━━━ GROUP 1: AUTHENTICATION (5 screens) ━━━

SCREEN 1 — LOGIN PAGE
Split layout: left brand panel (60%) + right form panel (40%)

Left brand panel (dark navy):
- Hexagonal geometric pattern overlay (subtle, 4% opacity)
- Radial red glow top-right, gold glow bottom-left
- GIG logo gem (48px, red, rounded square, drop shadow glow)
- Company name + portal name
- Bold headline: Arabic "بوابة الوسطاء المعتمدين" / 
  English "The Authorized Broker Portal"
- Description text
- 3 feature pills: Security / Analytics / Bilingual

Right form panel:
- Language toggle pill (AR/EN) + theme toggle top right
- "Sign In" heading + subtitle
- Login type selector: 2-button toggle 
  "GIG Employee" vs "Broker/Agent"
  
  For GIG Employee: email field + password field + 
  "Sign in via Active Directory" red button
  
  For Broker/Agent: 4 social login buttons stacked:
  Sign in with Google (white/outlined)
  Sign in with Microsoft (white/outlined)  
  Sign in with Apple (white/outlined)
  Sign in with Email OTP (red/filled, primary)

- Footer: "For authorized brokers and agents only"
- Powered by GIG Insurance Group

SCREEN 2 — OTP VERIFICATION
Same split layout, right panel shows:
- Phone/email icon in red circle
- "Identity Verification" title
- "Enter the 6-digit code sent to your email"
- Email shown masked: ah****@gig.com.jo
- 6 large OTP input boxes side by side (mono font, 
  large digits, red border on focus)
- Countdown timer: "Resend in 2:47"
- Verify button (red, full width)
- Back link

SCREEN 3 — FIRST LOGIN / CHANGE PASSWORD
Centered card on dark background:
- Shield icon
- "Set Your Password" title
- Password policy checklist (live validation, 
  checkmarks turn green as criteria met):
  ✓ Minimum 8 characters
  ✓ Uppercase letter
  ✓ Number
  ✓ Special character
- New password field + confirm field (show/hide toggle)
- Strength meter bar (red → amber → green)
- Continue button

SCREEN 4 — LICENSE EXPIRED BLOCKER
Centered full-screen overlay (not dismissible):
- Large warning illustration: broken document/shield
- Red badge: "LICENSE EXPIRED"
- Broker name + license number (mono font)
- Expiry date in large red text
- Message: "Your license expired. Upload new documents 
  to restore access."
- Two buttons: "Renew License Now" (red primary) + 
  "Contact GIG Support" (outlined)
- Decorative: faint red pulse animation on the badge

SCREEN 5 — LICENSE RENEWAL FLOW
3-step progress indicator at top:
Step 1: Upload Documents (active)
Step 2: Enter Details
Step 3: Awaiting Approval

Content for Step 1:
- Current license info card (read-only): 
  license no., expired date, LOBs
- New expiry date field
- LOB checkboxes grid (6 LOBs):
  ✈️ Travel | 🚗 Motor | 🏥 Medical
  🏠 Home | 👷 Domestic Worker | 🔧 Home Assistance
- Document upload drop zone:
  "Drag & drop or click to upload"
  PDF, JPG, PNG · Max 10MB
- Next step button

━━━ GROUP 2: ADMIN PORTAL (8 screens) ━━━

SCREEN 6 — ADMIN DASHBOARD
Page header: "Good morning, Ahmed 👋" + date

Alert banner (amber): "3 broker licenses expiring within 
30 days" with "View Now →" button

4 KPI Bento cards row:
Each card has: colored left border stripe, 
mono-font large number, label, sub-info, 
delta badge (up/down arrow + percentage):
1. Total Brokers — 148 — red stripe
2. Active Policies — 2,847 — gold stripe  
3. Monthly Premium (JOD) — 1.2M — green stripe
4. Pending Tasks — 23 — blue stripe

2-column chart row:
Left (wider): "Monthly Premium Volume" bar chart 
  — 12 months, 2 datasets (Premium bars red, 
  Commission bars gold), axis labels in mono font
Right: "LOB Distribution" donut chart 
  — 5 segments with legend below

2-column bottom row:
Left: "Recently Added Brokers" mini table 
  — avatar + name + type + status chip, 5 rows, 
  "View All" link
Right: "License Expiry Alerts" widget
  — 3 progress bars with broker name, 
  days remaining, color-coded bars

SCREEN 7 — MANAGE BROKERS/AGENTS
Page header + "Send Invitation" red button + "Export" ghost button

Summary strip (3 horizontal stat cards):
Total: 148 | Active: 124 (green) | Expired: 11 (red)

Filter chips row: All (148) | Broker | Agent | Active | 
Pending | Blocked | Expired

Table card (card wraps full table):
Table toolbar: search input + status dropdown filter + 
columns button

Data table columns:
□ checkbox | Broker/Agent (avatar+name+email) | Type | 
Status chip | LOBs (colored tags, +N overflow) | 
License Expiry (mono, amber if <30d, red if expired) | 
Commission % (green mono) | Invitation (sent chip OR send button) |
Actions (view icon, edit icon, roles icon, toggle)

Status chips 5 states:
🟢 Active — green | 🟡 Pending — amber | 
⚫ Inactive — grey | 🔴 Expired — red | 
🚫 Blocked — red with pattern

Pagination: "Showing 1-10 of 148" + page numbers

SCREEN 8 — BROKER DETAIL DRAWER
Right-side drawer (440px) slides over content:
Header: "Broker Details" + close X button

Content:
- Large avatar (50px, colored initials) + name + status chip
- Tabs: Details | LOBs | Sub-Brokers | History

Details tab:
Info rows: Type | Email | Phone | License No. | 
License Expiry | Commission % | Invitation Status | 
Registration Date

LOBs tab:
LOB cards grid 2x3, each shows:
LOB emoji + name + toggle (active/inactive)

Sub-Brokers tab:
Mini table of sub-brokers with name, status, toggle

Drawer footer: Cancel button + Save Changes button

SCREEN 9 — EDIT BROKER (LICENSE + LOBs)
Full drawer content:
- Alert: "Changes take effect immediately"
- License section:
  License Number (read-only, mono font)
  License Valid Date (date picker)
  License Expiry Date (date picker, future only)
  Upload License Document (drop zone, shows existing file)
  Commission Rate (read-only, from ESKA)
  
- CBJ License Types (multi-select checkboxes in grid)

- LOBs section:
  6 LOB cards as toggle buttons:
  ✈️ Travel | 🚗 Motor | 🏥 Medical
  🏠 Home | 👷 Domestic | 🔧 Assistance
  Each shows: emoji + name + on/off toggle

- Footer: Cancel + Save Changes

SCREEN 10 — SEND INVITATION CONFIRMATION
Small modal (centered, 480px wide):
- Send icon (animated paper plane)
- "Send Portal Invitation" title
- Info card:
  To: broker name + email address
  Validity: 72 hours
  Language: Arabic / English toggle
- Preview of invitation email (collapsed, expandable)
- Warning: "Previous invitation will be deactivated"
- Cancel + "Send Invitation Now" buttons

SCREEN 11 — ROLES & PERMISSIONS
Page header + "Create Role" button + "Add GIG User" ghost button

6 role cards in 3x2 grid:
Each card:
- Role icon + color coding + role name + description
- Permission tags (small pills): 
  Dashboard | Brokers | Policies | Audit | Roles
- User avatars stack (3 shown, +N more)
- Active/inactive toggle top right
- User count bottom right

Role card colors:
Super Admin — red
Admin User — blue  
Travel Broker — gold
Motor Broker — grey
Medical Broker — green
Multi-Line Broker — purple

SCREEN 12 — CREATE/EDIT ROLE DRAWER
Drawer with:
- Role Name (EN) field — English only validation
- Role Name (AR) field — Arabic only validation
- Icon selector (emoji grid)
- Color selector (6 swatches)
- Permissions section (expandable accordion groups):
  PORTAL MANAGEMENT: Dashboard ☑ | Roles □ | Audit □
  BROKER MANAGEMENT: View ☑ | Edit □ | Invite ☑
  POLICY ISSUANCE: Travel ☑ | Motor □ | Medical □ | 
    Home ☑ | Domestic ☑
  REPORTS: Statement ☑ | Export □
- Assign Users section: 
  Search & add users from dropdown
  Assigned users shown as removable chips
- Footer: Cancel + Save

SCREEN 13 — AUDIT TRAIL
Page header + Export button

2-column layout:
Left filter sidebar (220px):
- Action Type dropdown: All / Login / Edit / Invite / Approval
- User dropdown: All users or specific
- Date range: From + To date pickers
- Status filter chips
- Apply Filter button

Right: Timeline view (card):
Each audit item:
- Icon in circle (🔐 🔑 ✏️ ✅ 📩)
- Action name (bold)
- Detail description
- User name + timestamp
- Connecting vertical line between items
- Color coding: auth=blue, edit=gold, invite=green, 
  block=red

━━━ GROUP 3: BROKER PORTAL (15 screens) ━━━

SCREEN 14 — BROKER DASHBOARD
Different KPI cards relevant to broker:
1. My Active Policies — 47
2. This Month Premium (JOD) — 12,450
3. My Commissions (JOD) — 996
4. Pending Renewals — 3

Charts:
Left: "My Policies by Month" line chart (12 months)
Right: "Commission Breakdown by LOB" donut

Bottom:
Left: "Recent Policies" mini table
Right: "My Sub-Brokers" performance widget

License status card (always visible):
If valid: green pill "License valid until Dec 31, 2025"
If <30 days: amber warning "Expires in 28 days — Renew now"

SCREEN 15 — LOB ISSUANCE HUB
"Issue New Policy" title + subtitle

6 LOB tiles in 3x2 grid (larger cards):
Each tile:
- Background: subtle gradient unique to each LOB
- Large emoji (40px)
- LOB name (bold, 16px)
- Description + product count
- "Available" green chip OR "Not Licensed" grey chip
- Arrow → hover reveals
- Hover state: card lifts, border glows red

Travel: Worldwide Gold, Schengen Plus, Schengen VISA, 
  Elite, Platinum, Silver, Middle East (7 products)
Motor: New Policy, Renewal, Corporate
Medical: Individual, Group, Renewal
Home Insurance
Domestic Worker Insurance  
Home Assistance

SCREEN 16 — TRAVEL ISSUANCE: STEP 1 TRAVEL DETAILS
4-step progress bar: 
① Travel Details (active) → ② Traveler Info → 
③ Pricing → ④ Issue

2-column layout:
Left (wider): Travel Details Form
- Policy Type dropdown: Individual / Family
- Travel Coverage dropdown:
  Worldwide Gold | Schengen Plus | Schengen VISA | 
  Elite | Platinum | Silver | Middle East
- Destination dropdown (filtered by coverage, searchable)
- Policy Start Date (date picker)
  Validation note: "Cannot be more than 6 months from today"
- Travel Period dropdown: 
  Up to 5 Days / 7 / 10 / 15 / 21 / 31 / 45 / 92 / 
  184 / 1 Year / 2 Years etc.
- Extra Days (only for 6m+ periods, shaded otherwise)
  Shows tooltip: ℹ️ "Extension charges apply above 92 days"
- Promo Code field (optional, hidden/shown toggle)

Right: Summary sidebar card (sticky):
- Selected coverage badge
- Selected destination
- Selected period
- Estimated price range: "JOD 13 – 22"
- "Continue to Traveler Details" button

SCREEN 17 — TRAVEL ISSUANCE: STEP 2 TRAVELER INFO
Step indicator: ① done → ② active → ③ → ④

Data entry method toggle at top:
[Enter Manually] [Upload Passport (OCR)]

For OCR selected:
- Large passport upload drop zone
  "Take a clear photo of the passport main page"
  Supported: JPEG, JPG, PNG, PDF
  Shows loading state with scanning animation
  Then shows extracted data in editable form

Traveler form (scrollable for multiple travelers):
Traveler #1 card:
- Relation: Self (default, shaded for individual) / 
  Spouse / Child
- Nationality dropdown (alphabetical, searchable)
- National ID / Residence No. (10 digits)
- Passport Number
- Passport Expiry Date (must be 6+ months from today)
- First Name EN | Second Name EN | Third Name EN | 
  Last Name EN
- First Name AR | Second Name AR (only if Jordanian)
- Date of Birth (age validation shown)
- Mobile Number
- Email Address
- Passport Image upload

For Family policy: "Add Traveler +" button
Max 1 spouse (18-65) + 4 children (0-18)
Each additional traveler in collapsible card

Age restriction tooltip per coverage type

Back button + Next button

SCREEN 18 — TRAVEL ISSUANCE: STEP 3 PRICING & REVIEW
Step indicator: ① done → ② done → ③ active → ④

Left: Complete Review Summary
Collapsible sections:

▸ Travel Details
  Coverage: Worldwide Gold
  Destination: United States
  Period: 14 days
  Type: Individual
  
▸ Traveler Information  
  Name: Ahmad Mohammad Al-Ahmad
  DOB: 15/06/1985 (Age: 39)
  Passport: A123456789
  
▸ Pricing Breakdown (table):
  Base Premium: JOD 185.00
  Taxes (16%): JOD 29.60
  Total: JOD 214.60
  Agent Commission (8%): JOD 14.80

Center: Large Pricing Card:
- Total label (uppercase, spaced)
- JOD 214.60 (massive mono font, red color)
- "Includes 16% sales tax"
- Green pill: "Your commission: JOD 14.80"

Payment Method selection:
◉ Credit — "Send payment link to customer's mobile"
○ Debit — "Charge to customer's portal account"

Back + Issue Policy button

SCREEN 19 — TRAVEL ISSUANCE: STEP 4 SUCCESS
Centered success state:
- Animated checkmark (green circle, draw animation)
- "Policy Issued Successfully!" (large, green)
- Policy number (mono font, large): POL-2025-45182
- "Policy sent to: +962 79 xxx xxxx & email@domain.com"

Quick actions row:
📄 View Policy | 🖨 Print | 📧 Email Copy | 📱 WhatsApp

"Issue Another Policy" button (red, prominent)
"View All Policies" ghost button

SCREEN 20 — MOTOR ISSUANCE: STEP 1 VEHICLE LICENSE OCR
Motor-specific step indicator (6 steps):
① Vehicle ② Customer ③ Accidents ④ Coverage ⑤ Quote ⑥ Issue

Step 1 — Vehicle Information:

Upload section (2 upload zones side by side):
[Front of Vehicle License]    [Back of Vehicle License]
Each: drag/drop zone with camera icon
Supported: JPG, PNG, PDF

OCR Processing state:
Loading spinner → "Extracting vehicle data..."
Then extracted fields auto-populate below

Vehicle Details form (auto-populated, editable):
- Plate Number (read-only from OCR)
- Chassis Number (read-only)
- Car Make | Car Model | Production Year
- Registration Date | Registration Expiry
- Car Type (dropdown)

Market Value Section (prominent):
- "Estimated Market Value Range:"
  Min: JOD 8,500 ←——●——→ Max: JOD 11,200
  Slider to select sum insured
  Validation: cannot exceed max or go below min

Vehicle Ownership Question:
"Are you the owner of this vehicle?"
◉ Yes — National ID must match JOIF records
○ No — Any ID accepted (warning shown)

Ineligible vehicle warning (if triggered):
Red alert card listing restriction reason

Next button

SCREEN 21 — MOTOR: STEP 2 CUSTOMER & DRIVING LICENSE
Step ② active

2 sections:

Upload driving license:
[Front of Driving License]    [Back of Driving License]
OCR extracts: National ID, Name AR/EN, DOB, 
License Expiry, Nationality

OR manual entry toggle

Customer Details form (auto-populated):
- National/Residence ID
- Full Name (Arabic) — 4 parts
- Full Name (English) — 4 parts  
- Date of Birth | Age shown automatically
- Driving License Number
- License Expiry Date
- Nationality
- Mobile | Email

Validation messages shown inline (friendly, not harsh):
✓ "ID verified with ESKA system"
⚠️ "Name mismatch — please verify"

Back + Next

SCREEN 22 — MOTOR: STEP 3 ACCIDENT HISTORY
Step ③ active

System is checking... (loading state):
"Checking accident history for vehicle and customer..."
Animated progress: Vehicle History | Customer History

Results card:

Vehicle History:
If no accidents: Green card "No accidents found"
If accidents: 
  Table of accidents: Date | Type | Damage Areas | At-Fault
  Each at-fault row shows: +15% premium impact
  Each no-fault: +5% premium impact

Customer History:
Same format

If 6+ accidents: Red blocking card:
"Policy cannot be issued — exceeds 5 accident limit"
Contact GIG team button

If acceptable:
Premium loading percentage shown
"Estimated premium adjustment: +15%"

Back + Continue to Coverage

SCREEN 23 — MOTOR: STEP 4 COVERAGE SELECTION
Step ④ active

Mandatory Coverage section (cannot deselect):
Grey background, lock icon, cannot toggle off
- Third Party Liability (mandatory)
- Road Assistance (mandatory)

Optional Coverage section:
Each coverage as a selectable card:
Toggle + Name + Description + Price Impact
- Own Damage Cover: +JOD 45
- Glass Coverage: +JOD 12
- Personal Accident: +JOD 15
- Natural Perils: +JOD 8
- Fire & Theft: +JOD 22

Running total sidebar (sticky):
Updates live as options toggled:
Mandatory: JOD 180
Selected options: +JOD 77
Total: JOD 257

Back + Calculate Quote

SCREEN 24 — MOTOR: STEP 5 QUOTE & SAVE
Step ⑤ active

Left: Full quote breakdown:
- Vehicle: Make Model Year
- Chassis: XXXXX
- Sum Insured: JOD 10,000
- Policy Duration: 1 Year
Coverage list with individual prices
Accident loading: +15%
Subtotal | Tax | Total premium
Agent Commission: JOD 20.56

Right: Large quote card (saves automatically):
"Your Quote"
JOD 257.00 (mono, large, red)
Quote Reference: QT-2025-8821 (mono)
"Quote saved automatically"
Valid for: 30 days

Upload Receipt (optional):
- "Upload payment proof if collected"
- Drop zone, 5MB max

2 buttons:
"Save Quote & Continue Later" (ghost)
"Proceed to Video Upload" (red)

SCREEN 25 — MOTOR: STEP 6 VIDEO UPLOAD
Step ⑥ active

Instructions card (prominent):
"Please record a short video of the vehicle showing:
All 4 sides | Front/rear plates visible | 
Existing damage if any | Odometer reading"

Video upload zone:
Large area with camera/video icon
Accepted: MP4, MOV — Max 5MB
"Tap to record" OR "Upload existing video"

Upload progress (when uploading):
Progress bar + file size + "Uploading... 67%"

Uploaded state:
Video thumbnail + filename + checkmark
"Replace" link

Important notice (amber):
"After submission, GIG team will review your video 
within 24 hours before policy is issued."

Back + Submit for GIG Approval (red)

SCREEN 26 — AWAITING GIG APPROVAL
Full page status screen:

Icon: hourglass animation
Status badge: "Under Review" (amber, pulsing)
Case number: CASE-2025-4421
Submitted: Today at 14:35

Timeline:
✅ Quote Created — 14:30
✅ Video Uploaded — 14:34
⏳ GIG Review (current) — Started 14:35
○ Policy Issuance — Pending
○ Policy Delivered — Pending

"You will receive an email/SMS when approved"

While waiting section:
"Issue another policy" button
"View all pending cases" link

SCREEN 27 — MY POLICIES
Page header + "New Policy" button + "Export" button

Filter tabs: All | Travel ✈️ | Motor 🚗 | Medical 🏥 | 
Home 🏠 | Domestic 👷

Filters row:
Search input (policy no. or name) + Date range + Status dropdown

Data table:
Policy No. (mono, red) | Type (emoji+name) | 
Insured Name | Premium JOD (mono) | 
Issue Date | Expiry Date | Status chip |
Actions (view👁 print🖨 email📧)

Status chips: Active🟢 | Expired🔴 | Cancelled⚫ | 
Pending⏳

Pagination

SCREEN 28 — POLICY DETAIL DRAWER
Right drawer (480px):

Policy header:
- Policy type icon (large emoji)
- Policy number (mono, large)
- Status chip + issue date

Tabs: Overview | Customer | Coverage | Payment | History

Overview tab:
Clean info rows:
Policy Type | Coverage | Destination/Vehicle | 
Period | Sum Insured

Customer tab:
Customer name EN/AR | National ID | DOB | 
Mobile | Email | Passport/Vehicle info

Payment tab:
Premium breakdown table | Payment method | 
Commission earned (green, prominent)

History tab:
Mini timeline of policy events

Footer buttons:
🖨 Print | 📧 Email | 📱 WhatsApp | Close

SCREEN 29 — SUB-BROKER MANAGEMENT
Page header + "Add Sub-Broker" button

Info banner (blue):
"Sub-brokers automatically inherit your 
lines of business and permissions"

Sub-broker cards (grid layout, not table):
Each card:
- Avatar (initials + color)
- Name + email
- Mobile number
- Status toggle (active/inactive)
- LOB badges (inherited, non-editable, greyed out)
- "Edit" pencil icon (only email/mobile editable)
- Date added

Add Sub-Broker drawer:
Full name | National ID | Mobile | Email
Mandatory fields, validation per field
Alert: "LOBs inherited from your account"

SCREEN 30 — STATEMENT OF ACCOUNT
Page header + Export PDF button + date range picker

3 summary KPI cards:
Current Balance: JOD 1,234.50 (green)
Total Commissions: JOD 174.00 (gold)
Withdrawals: JOD 500.00 (red)

Transaction table:
Date | Description | Debit (red) | Credit (green) | Balance
Each credit row: subtle green left border
Each debit row: subtle red left border
Totals row at bottom

SCREEN 31 — NOTIFICATION CENTER
Page header + "Mark All Read" button

Filter tabs: All (5) | Unread (2) | Licenses | Approvals | System

Notification list:
Each item:
- Unread dot (red, left edge)
- Icon in colored rounded square
- Title (bold) + description
- Timestamp (mono, right aligned)
- Hover reveals: "Mark read" + "Go to related page →"

Notification types and colors:
⚠️ License Warning — amber
📋 Approval Request — red
✅ Action Completed — green
⚙️ System Update — blue
🔴 Account Blocked — dark red

SCREEN 32 — MY PROFILE
2-column layout:

Left column (fixed):
- Avatar card:
  Large avatar (60px, colored initials)
  Full name + role badge
  Email (non-editable)
  "Change Photo" button
  
- License Status card:
  License number (mono)
  Expiry date
  Status chip
  Days remaining countdown
  "Renew License" button (if <30 days: amber, if expired: red)
  
- Quick Links:
  My Policies link
  Statement of Account link

Right column:
- Personal Information card:
  Full Name | Email (locked) | Mobile | Job Title (locked)
  
- Security card:
  Current Password | New Password | Confirm Password
  Two-Factor Auth toggle
  
- Notification Preferences card:
  Email notifications toggle
  SMS notifications toggle  
  Push notifications toggle

Save Changes button (sticky bottom)

SCREEN 33 — CORPORATE CUSTOMER REGISTRATION
Multi-section form (for motor/medical corporate policies):

Header: "Register Corporate Account"
Step indicator: ① Company Details → ② Contact Person → ③ Verify

Step 1:
Customer Type: Corporate (fixed)
Company National ID (9 digits exactly)
Commercial ID
"Validate with KINZ API" button → shows loading → 
shows verified badge or error

After verification:
OTP modal appears: "Select mobile number to receive OTP"
Shows masked numbers from KINZ response
OTP input → confirmed

Company Details form:
Company Name (EN) | Company Name (AR)
Nationality | Commercial Employees (from API)
Capital Amount | Commercial Name
Country/City/Area (cascading dropdowns)
Company Email | Land Phone | Address
Upload Commercial Registration (mandatory)

Step 2: Contact Person Details (same as individual fields)

━━━ GROUP 4: GLOBAL COMPONENTS ━━━

COMPONENT: Empty States (6 variants)
Each empty state has:
- Illustration (simple line art)
- Title
- Description
- CTA button

Variants:
No Brokers Yet → "Send your first invitation"
No Policies Yet → "Issue your first policy"  
No Notifications → "You're all caught up"
No Search Results → "Try different keywords"
License Required → "Contact GIG to activate LOBs"
No Data for Period → "Try a different date range"

COMPONENT: Command Palette (⌘K)
Full-screen overlay, blurred backdrop:
- Search input (large, centered)
- Results grouped by:
  PAGES: (icons + page names)
  QUICK ACTIONS: Send Invitation | New Policy | etc.
  RECENT: last 3 visited pages
- Keyboard navigation indicators
- Footer: ↑↓ navigate | ↵ select | Esc close

COMPONENT: Toast Notifications (4 types)
Bottom-right, stack up to 3:
✅ Success — green left border
⚠️ Warning — amber left border
❌ Error — red left border
ℹ️ Info — blue left border
Each: icon + title + description + dismiss X
Auto-dismiss after 5 seconds (progress bar shown)

COMPONENT: Confirmation Modal
Small modal (400px):
Warning icon (amber for caution, red for destructive)
Title (e.g., "Deactivate Broker Account?")
Description
Cancel (ghost) + Confirm (colored based on severity)

COMPONENT: Onboarding Tooltip
First-time user guide:
Spotlight highlight on UI element
Bubble with: Step X of Y | Title | Description
Previous | Next | Skip

═══════════════════════════════════════════════
DESIGN PRINCIPLES — APPLY TO ALL SCREENS
═══════════════════════════════════════════════

1. DATA HIERARCHY: Numbers are first-class. 
   Key metrics always visible without scrolling.

2. STATUS ALWAYS VISIBLE: Every broker, policy, 
   license always shows current status with color.

3. CONTEXTUAL ACTIONS: Actions appear where data is, 
   not in separate menus.

4. PROGRESSIVE DISCLOSURE: Complex forms broken into 
   steps. Never show everything at once.

5. ERROR PREVENTION: Validate in real-time, show 
   restrictions before the user hits them.

6. RTL NATIVE: Icons, arrows, flow, shadows all 
   mirror correctly in Arabic. Not just text flip.

7. MONO FOR DATA: All numbers, codes, dates, IDs 
   use IBM Plex Mono for instant scanability.

8. CONSISTENT ELEVATION:
   Page background: level 0
   Cards: level 1  
   Floating cards: level 2
   Modals/Drawers: level 3
   Tooltips/Toasts: level 4

9. MEANINGFUL ANIMATION:
   Page transitions: 250ms ease
   Drawers: 300ms slide
   Modals: 200ms scale+fade
   NO decorative animations

10. ACCESSIBILITY:
    All interactive elements min 44x44px touch target
    Color never sole indicator (always + icon/text)
    Focus states visible and styled (red outline)

═══════════════════════════════════════════════
DELIVERABLE STRUCTURE
═══════════════════════════════════════════════

Organize Figma pages as follows:

Page 1: 🎨 Design System
  - Color styles (dark + light)
  - Typography scale
  - Spacing tokens
  - All components library

Page 2: 🔐 Authentication
  - All 5 auth screens × 2 modes (dark/light)

Page 3: 🏢 Admin Portal
  - All 8 admin screens × 2 modes

Page 4: 🤝 Broker Portal  
  - All 15 broker screens × 2 modes

Page 5: 🧩 Components
  - Empty states, modals, toasts, tooltips

Page 6: 📱 Responsive (optional)
  - Mobile breakpoint for key screens

Frame sizes: 1440×900px (desktop, standard)
All frames named clearly in English

Use auto-layout throughout. All components 
properly componentized with variants.