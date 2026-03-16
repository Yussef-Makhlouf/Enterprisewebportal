# GIG Jordan Agents & Brokers Portal - Figma Design Specifications

This document provides complete specifications for building the Figma design system and screens.

---

## TABLE OF CONTENTS
1. [Design System & Tokens](#design-system--tokens)
2. [Component Library](#component-library)
3. [Layout Components](#layout-components)
4. [Screen Specifications](#screen-specifications)
5. [Theme & Localization](#theme--localization)
6. [Implementation Guide](#implementation-guide)

---

## DESIGN SYSTEM & TOKENS

### Brand Colors

| Color | Hex | Usage | Light Theme | Dark Theme |
|-------|-----|-------|-------------|-----------|
| GIG Red (Primary) | #C8102E | Buttons, primary actions, links | Primary color | Primary color |
| GIG Navy | #0D1F3C | Text, backgrounds, navigation | Text/BG | Lighter shade |
| GIG Gold | #C8962A | Secondary, accents, charts | Accent | Accent |
| GIG Success | #00C896 | Success states, positive indicators | Yes | Yes |
| GIG Warning | #F0B030 | Warnings, alerts | Yes | Yes |
| GIG Error | #FF4060 | Errors, destructive actions | Yes | Yes |
| GIG Info | #0DB4CC | Info messages, secondary actions | Yes | Yes |

### Complete Color Palette (CSS Variables)

#### Light Mode (Default)
```
--background: #F0F4FA
--foreground: #0D1F3C
--card: #FFFFFF
--primary: #C8102E
--primary-foreground: #FFFFFF
--secondary: #EEF2F8
--secondary-foreground: #0D1F3C
--muted: #E4EAF3
--muted-foreground: #6B7A9B
--accent: #F5F7FB
--accent-foreground: #0D1F3C
--destructive: #FF4060
--destructive-foreground: #FFFFFF
--border: rgba(13, 31, 60, 0.1)
--input: #EEF2F8
--input-background: #EEF2F8
--switch-background: #C0CBDE
--ring: #C8102E
--surface-0: #F0F4FA
--surface-1: #FFFFFF
--surface-2: #F5F7FB
--surface-3: rgba(13,31,60,0.05)
--rail-bg: #0D1F3C
--nav-bg: #112040
--topbar-bg: #FFFFFF
--text-primary: #0D1F3C
--text-secondary: #4A5878
--text-muted: #8A96B0
--text-on-dark: #E8EDF5

-- Chart Colors
--chart-1: #C8102E (Travel - Red)
--chart-2: #C8962A (Motor - Gold)
--chart-3: #00C896 (Medical - Green)
--chart-4: #0DB4CC (Home - Cyan)
--chart-5: #7B61FF (Other - Purple)
```

#### Dark Mode (.dark class)
```
--background: #070E1C
--foreground: #E8EDF5
--card: #0F1A2E
--card-foreground: #E8EDF5
--popover: #0F1A2E
--popover-foreground: #E8EDF5
--primary: #C8102E (unchanged)
--primary-foreground: #FFFFFF (unchanged)
--secondary: #162035
--secondary-foreground: #E8EDF5
--muted: #162035
--muted-foreground: #6B7A9B
--accent: #1A2840
--accent-foreground: #E8EDF5
--destructive: #FF4060 (unchanged)
--destructive-foreground: #FFFFFF (unchanged)
--border: rgba(255, 255, 255, 0.08)
--input: #162035
--input-background: #162035
--switch-background: #2A3650
--ring: #C8102E (unchanged)
--surface-0: #070E1C
--surface-1: #0F1A2E
--surface-2: #0F1E35
--surface-3: rgba(255,255,255,0.04)
--rail-bg: #060C18
--nav-bg: #09122A
--topbar-bg: #0A1628
--text-primary: #E8EDF5
--text-secondary: #8A96B0
--text-muted: #4A5878
--text-on-dark: #E8EDF5
```

### Typography

#### Typefaces
- **English**: IBM Plex Sans (Regular 400, Medium 500, Bold 600, Bold Italic)
- **Arabic**: Tajawal (Regular 400, Medium 500, Bold 600, Bold Italic)
- **Monospace**: IBM Plex Mono (for data display)

#### Type Scale (based on 14px base)
| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 | 28px (1.75rem) | 700 Bold | 1.3 | Page titles |
| H2 | 22px (1.375rem) | 600 Semi-bold | 1.4 | Section headers |
| H3 | 18px (1.125rem) | 600 Semi-bold | 1.4 | Sub-section headers |
| H4 | 16px (1rem) | 500 Medium | 1.5 | Card titles |
| Body Large | 16px | 400 Regular | 1.5 | Primary text |
| Body Regular | 14px | 400 Regular | 1.5 | Standard text |
| Body Small | 13px | 400 Regular | 1.5 | Secondary text |
| Label | 12px | 500 Medium | 1.5 | Labels, badges |
| Caption | 11px | 400 Regular | 1.5 | Helper text |

### Spacing Scale
```
4px (xs)
8px (sm)
12px (md)
16px (lg)
24px (xl)
32px (2xl)
48px (3xl)
64px (4xl)
```

**Usage Pattern**: Padding/margin multiples of 4px (4, 8, 12, 16, 24, 32, etc.)

### Border Radius
```
--radius-sm: 4px (small elements: badges, inputs)
--radius-md: 6px (standard: inputs, small cards)
--radius-lg: 10px (cards, drawers, modals)
--radius-xl: 16px (large elements)
--radius-2xl: 24px (extra large: brand elements)
--radius-full: 9999px (pills, full circles)
```

### Shadows
```
Elevation Level 1 (subtle): 0 1px 2px rgba(0,0,0,0.05)
Elevation Level 2 (regular): 0 2px 4px rgba(0,0,0,0.1)
Elevation Level 3 (elevated): 0 4px 12px rgba(0,0,0,0.15)
Elevation Level 4 (high): 0 8px 24px rgba(0,0,0,0.2)
Elevation Level 5 (modal): 0 20px 40px rgba(0,0,0,0.3)

Brand Glow (Red): 0 8px 32px rgba(200, 16, 46, 0.5)
Focus Ring: 3px solid ring color with 50% opacity
```

---

## COMPONENT LIBRARY

Create components in Figma with the following variants:

### Button Component

**Variants to Create:**
- Size: default (h-9, px-4), sm (h-8, px-3), lg (h-10, px-6), icon (h-9, w-9)
- Variant: default, destructive, outline, secondary, ghost, link
- State: default (enabled), hover, focus, disabled, loading

**Default Button (Primary)**
- Background: #C8102E
- Text: #FFFFFF
- Size: 36px height (9), 16px padding horizontal, 8px padding vertical
- Border radius: 6px
- Font: 14px, 500 weight, IBM Plex Sans
- Hover: bg-primary/90 (opacity 90%)
- Focus: 3px ring with #C8102E at 50% opacity
- Disabled: opacity 50%, pointer-events none

**Button Variants Details:**
1. **Default (Primary Red)**
   - BG: #C8102E, Text: White, Hover: #A00D25
   
2. **Destructive (Red alert)**
   - BG: #FF4060, Text: White, Hover: darker red
   
3. **Outline (Bordered)**
   - BG: var(--background), Text: var(--foreground), Border: 1px var(--border)
   - Hover: BG becomes var(--accent)
   
4. **Secondary (Light purple/blue)**
   - BG: #EEF2F8 (light), Text: #0D1F3C (dark)
   - Hover: BG becomes #E4EAF3
   
5. **Ghost (Transparent)**
   - BG: transparent, Text: var(--foreground)
   - Hover: BG becomes var(--accent)
   
6. **Link (Text only)**
   - BG: transparent, Text: #C8102E
   - Underline: underline-offset-4
   - Hover: underline visible

**All buttons include:**
- Inline-flex, items-center, justify-center, gap-2
- Icon size: 16px (SVG)
- Transition on hover/focus
- 2px gap between icon and text

### Input Component

**Variants:**
- State: default, focused, disabled, error, filled
- Size: default (h-9)

**Base Input Styling:**
- Height: 36px (9)
- Padding: 12px horizontal, 8px vertical (px-3 py-1)
- Border: 1px solid var(--input-border)
- Border radius: 6px
- Background: var(--input-background) #EEF2F8 (light) / #162035 (dark)
- Font: 14px, 400, IBM Plex Sans
- Text color: var(--text-primary)
- Placeholder color: var(--muted-foreground) #6B7A9B
- Focus: 3px ring with primary color at 50% opacity, border color changes to ring

**Error State:**
- Border color: #FF4060
- Ring color: rgba(255, 64, 96, 0.2)

**Disabled State:**
- Opacity: 50%
- Cursor: not-allowed
- Pointer-events: none

### Select/Dropdown Component

**Structure:**
- Trigger button (shows selected value or placeholder)
- Dropdown content with scrollable list
- Item states: default, hovered, selected, disabled

**Styling:**
- Same sizing as Input (h-9)
- Chevron icon rotates on open (in RTL mode, mirror direction)
- Selected item has background: var(--accent) or primary color
- Hover state: lighter background

### Checkbox Component

**States:**
- Unchecked (empty square)
- Checked (square with checkmark)
- Indeterminate (square with dash)
- Disabled (all states)
- Focus state (ring around checkbox)

**Sizing:**
- Default: 18px × 18px square
- Border radius: 4px
- Border: 1px solid var(--ring) when checked
- Background: #C8102E when checked
- Checkmark: white, 12px

### Radio Group Component

**States:**
- Unselected (empty circle)
- Selected (circle with dot in center)
- Disabled (all states)
- Focus state (ring around radio)

**Sizing:**
- Default: 18px diameter
- Dot size: 8px (when selected)
- Border: 2px solid var(--border)
- When selected: border becomes primary color

### Badge Component

**Variants:**
- default (primary background)
- secondary (secondary background)
- destructive (red background)
- outline (bordered, transparent background)

**Sizing:**
- Padding: 8px horizontal, 4px vertical (px-2 py-0.5)
- Font: 12px, 500 weight
- Border radius: 4px
- Border: 1px solid (outline variant only)

**Examples:**
- "Active" - green background (#00C896), white text
- "Pending" - yellow background (#F0B030), dark text
- "Expired" - red background (#FF4060), white text
- "Blocked" - gray background (#E4EAF3), dark text

### Card Component

**Variants:**
- Basic (just background and border)
- With header (title section)
- With footer (action buttons)
- Elevated (with shadow)

**Base Styling:**
- Background: var(--card) #FFFFFF (light) / #0F1A2E (dark)
- Border: 1px solid var(--border)
- Border radius: 10px
- Padding: 16px or 24px depending on content
- Box shadow: 0 1px 2px rgba(0,0,0,0.05) (subtle)

**Header Section:**
- Font: 16px, 500 weight
- Border-bottom: 1px solid var(--border)
- Padding: 16px bottom

**Footer Section:**
- Border-top: 1px solid var(--border)
- Padding: 16px top
- Gap between buttons: 8px

### Modal/Dialog Component

**Structure:**
- Overlay (semi-transparent backdrop)
- Modal container (centered card)
- Header (title, close button)
- Content area (scrollable)
- Footer (action buttons)

**Sizing:**
- Width: 90% of viewport (max-width: 500px for small, 700px for medium)
- Max height: 80vh
- Border radius: 10px
- Shadow: 0 20px 40px rgba(0,0,0,0.3)
- Overlay: rgba(0,0,0,0.5)

**Header:**
- Font: 18px, 600 weight
- Close button: 32px icon button, top-right
- Padding: 24px

**Content:**
- Padding: 24px
- Scrollable if needed

**Footer:**
- Padding: 16px 24px
- Border-top: 1px solid var(--border)
- Button gap: 8px (primary button right-aligned)

### Toast/Notification Component

**Variants:**
- success (green #00C896)
- error (red #FF4060)
- warning (yellow #F0B030)
- info (blue #0DB4CC)

**Sizing:**
- Min height: 48px
- Width: 320px (desktop), full width (mobile)
- Padding: 12px 16px
- Border radius: 6px
- Border: 1px solid
- Shadow: 0 4px 12px rgba(0,0,0,0.15)

**Layout:**
- Icon (left, 20px) + Title/Description (flex grow) + Close button (right)
- Position: fixed bottom-right (4px margin from edges)
- Max 3 toasts visible at once
- Auto-dismiss after 5 seconds (animation fade out)

### Badge/Chip Component

**States:**
- default (bg-primary)
- secondary (bg-secondary)
- Closeable variant with X icon

**Sizing:**
- Height: 28px
- Padding: 0 12px
- Border radius: full (9999px)
- Font: 12px, 500 weight
- Gap: 4px (if icon present)

### Avatar Component

**Sizes:**
- sm: 32px
- md: 40px
- lg: 48px
- xl: 64px

**Variants:**
- Image (src-based)
- Initials (text in circle, auto color)
- Icon (lucide icon)
- Status badge (small dot: online/offline/away)

**Styling:**
- Border radius: full
- Border: 1px solid var(--border)
- Font: 500 weight, white text
- Auto background colors for initials (rotate through brand colors)

### Table Component

**Structure:**
- Header row (sticky)
- Data rows
- Optional footer row

**Header Cell:**
- Font: 12px, 600 weight, uppercase
- Background: var(--muted) #E4EAF3 (light) / #162035 (dark)
- Padding: 12px 16px
- Border-bottom: 2px solid var(--border)
- Text color: var(--text-muted)

**Data Cell:**
- Font: 14px, 400 weight
- Padding: 12px 16px
- Border-bottom: 1px solid var(--border)
- Text color: var(--text-primary)

**Row Hover:**
- Background: var(--accent) #F5F7FB (light) / #1A2840 (dark)

**Optional Striped Rows:**
- Alternate row background: var(--surface-2)

### Tabs Component

**Structure:**
- Tab list (horizontal, scrollable on mobile)
- Tab triggers (text/icon)
- Tab content panels

**Tab Trigger Styling:**
- Font: 14px, 500 weight
- Padding: 8px 16px
- Border-bottom: 2px solid transparent
- Color: var(--text-secondary)
- Active: border-bottom color #C8102E, text color #0D1F3C
- Hover: background var(--accent)

**Tab Content:**
- Padding: 24px
- Fade in animation

### Tooltip Component

**Styling:**
- Background: var(--foreground) #0D1F3C (light) / #E8EDF5 (dark)
- Text: var(--primary-foreground) white (light) / dark (dark)
- Font: 12px, 400 weight
- Padding: 6px 10px
- Border radius: 4px
- Shadow: 0 4px 12px rgba(0,0,0,0.15)
- Arrow: pointing toward trigger element
- Max width: 200px
- Auto position (top/bottom/left/right based on space)

---

## LAYOUT COMPONENTS

### Icon Rail (Left Sidebar)

**Specifications:**
- Width: 68px (fixed)
- Height: 100vh (full height)
- Background: var(--rail-bg) #0D1F3C (light) / #060C18 (dark)
- Border-right: 1px solid var(--border)
- Position: sticky/fixed
- Vertical layout, center-aligned icons

**Icon Items:**
- Size: 40px × 40px
- Icon size: 20px
- Border radius: 8px
- Background: transparent → var(--primary-foreground) on active
- Color: var(--text-muted) → #C8102E on active
- Gap between items: 8px vertical
- Padding (rail): 12px (top/bottom)
- Tooltip: position right (ltr) or left (rtl), 8px offset
- Hover: background becomes var(--accent)

**Icons to Include (per role):**

**Admin Portal:**
- Dashboard (LayoutDashboard)
- Brokers (Users)
- Roles (Shield)
- Audit (FileText)

**Broker Portal:**
- Dashboard (LayoutDashboard)
- Issuance Hub (Plus)
- Policies (FileText)
- Sub-brokers (Users)
- Statement (DollarSign)
- Notifications (Bell)
- Profile (User)
- Corporate (Building)

**Active Indicator:**
- 2px left border in primary color (ltr) or right border (rtl)
- Full height of the icon item

### Navigation Panel (Left Sidebar)

**Specifications:**
- Width: 240px (expanded) / 68px (collapsed)
- Height: 100vh (full height)
- Background: var(--nav-bg) #112040 (light) / #09122A (dark)
- Border-right: 1px solid var(--border)
- Position: sticky/fixed
- Scrollable content area
- Collapsible via Ctrl/Cmd + B keyboard shortcut
- Collapse state saved in browser cookies

**Structure:**
1. **Portal Header** (top, 56px)
   - Font: 12px, 600 weight, uppercase
   - Text: "Admin Portal" or "Broker Portal"
   - Text color: var(--text-muted)
   - Padding: 12px 16px
   - Border-bottom: 1px solid rgba(255,255,255,0.05)

2. **Search Bar** (optional, below header)
   - Input styling as defined in Components
   - Placeholder: "Search nav..."
   - Size: default input height
   - Margin: 8px 12px

3. **Nav Items Groups**
   - Group label (uppercase, 11px, 600 weight, muted text)
   - Padding: 8px 12px top/bottom, 8px left/right
   - Divider: 1px solid var(--border)

4. **Nav Item**
   - Height: 40px
   - Padding: 8px 12px horizontal
   - Font: 14px, 400 weight
   - Flex layout: icon (20px) + text (flex grow) + optional badge
   - Gap: 12px
   - Icon color: var(--text-secondary)
   - Text color: var(--text-secondary)
   - Border-left: 3px solid transparent
   - Hover: background becomes rgba(255,255,255,0.05)
   - Active: 
     - Background: var(--primary-foreground) #FFFFFF (light) / #0F1A2E (dark)
     - Border-left: 3px #C8102E
     - Text color: #0D1F3C (light) / var(--text-primary) (dark)
     - Icon color: #C8102E

5. **Badge on Nav Item** (optional)
   - Position: right side
   - Size: 20px diameter, 12px font
   - Background: var(--destructive) #FF4060
   - Text: white

6. **User Card** (bottom, 56px)
   - Avatar (32px) + username/email
   - Padding: 12px
   - Border-top: 1px solid var(--border)
   - Hover: background becomes rgba(255,255,255,0.05)
   - Avatar gradient: based on user initials

### Topbar (Header)

**Specifications:**
- Height: 56px (fixed)
- Background: var(--topbar-bg) #FFFFFF (light) / #0A1628 (dark)
- Border-bottom: 1px solid var(--border)
- Position: sticky/fixed top
- Width: 100% - rail width (calc(100% - 68px) if rail visible)
- Display: flex, items-center, justify-between
- Padding: 0 16px
- Z-index: ensure above content but below modals

**Left Section (Breadcrumb):**
- Flex: 1
- Font: 13px, 400 weight
- Text color: var(--text-secondary)
- Items separated by " / " (slash)
- Current page in bold/primary color
- Max width: 50%
- Truncate with ellipsis if too long

**Center Section (Search/Command Palette):**
- Button styling: outlined, icon left
- Icon: Search (18px)
- Text: "Search or press ⌘K" / "ابحث..."
- Width: 300px (shrink on smaller screens)
- Keyboard shortcut shown in button text
- Click opens CommandPalette modal

**Right Section (Controls, flex-end):**
- Gap: 4px between buttons
- Order (LTR): Language → Theme → Notifications → Avatar (RTL: reverse)

**Language Toggle Button:**
- Size: icon (h-9, w-9)
- Icon: Globe2
- Tooltip: "Toggle language" / "تبديل اللغة"
- Current language shown in tooltip

**Theme Toggle Button:**
- Size: icon
- Icon: Sun (light mode) / Moon (dark mode)
- Tooltip: "Toggle theme" / "تبديل المظهر"
- Click toggles dark/light mode

**Notifications Button:**
- Size: icon
- Icon: Bell
- Badge on icon (red, "3" count)
- Click opens notifications drawer/dropdown
- Pulsing animation if has unread

**User Avatar Button:**
- Avatar component (32px)
- Initials or image
- Click opens profile menu/dropdown
- Menu options: Profile, Settings, Logout

### Status Bar (Footer)

**Specifications:**
- Height: 32px
- Background: var(--surface-1) #FFFFFF (light) / #0F1A2E (dark)
- Border-top: 1px solid var(--border)
- Position: sticky/fixed bottom
- Display: flex, items-center, justify-between
- Padding: 0 16px
- Font: 11px, 400 weight
- Text color: var(--text-muted)

**Left Section:**
- Connection status indicator
  - Icon: Circle (6px, filled)
  - Color: green (#00C896) if connected, red (#FF4060) if disconnected, yellow (#F0B030) if connecting
  - Text: "Connected" / "Disconnected" / "Connecting..."

**Right Section:**
- Current date/time
- Format: "Mar 16, 2025 • 2:30 PM" (English) / "16 مارس 2025 • 2:30 م" (Arabic)
- Updates every minute

---

## SCREEN SPECIFICATIONS

### AUTH SCREENS (5 total)

#### 1. Login Page
**Route:** `/auth/login`

**Layout:**
- Split screen on desktop (60% brand panel + 40% form)
- Single column on mobile (brand info hidden, form full width)
- RTL layout mirrored on Arabic

**Left Panel (60%, desktop only):**
- Background: linear-gradient(135deg, #0D1F3C 0%, #070E1C 60%, #0D1F3C 100%)
- Geometric pattern overlay (4% opacity)
- Radial glows at corners (red #C8102E top-right, gold #C8962A bottom-left)

**Elements:**
- GIG Logo: 56px square, rounded 12px, gradient bg (#C8102E to #A00D25), white "G"
- Company name: 18px, 700 weight, white
- Tagline: 12px, 400, white/50%
- Headline: 28-40px (larger for Arabic), 800 weight, white, line-height 1.2
- Subheading: 16px, 400, white/50%, max-width 420px
- Feature pills: 3-4 items with icon + label, border 1px white/20%, background transparent, 8px padding

**Right Form Section (100% mobile, 40% desktop):**
- Background: var(--background)
- Max width: 420px (centered)
- Padding: 48px (desktop) / 24px (mobile)

**Form Elements:**
1. **Heading:** "Welcome back" / "أهلا وسهلا", 24px, 600 weight
2. **Form tabs/toggle:** Employee / Broker (toggle buttons)
   - Height: 36px
   - Background: var(--muted)
   - Selected: background primary color, text white
   - Border radius: 6px
   - Full width
3. **Email/Username Input:**
   - Label: "Email or Username" / "البريد الإلكتروني أو اسم المستخدم", 12px, 500
   - Input: standard sizing, placeholder text
4. **Password Input:**
   - Label: "Password" / "كلمة المرور", 12px, 500
   - Input: password type (toggle show/hide button)
   - Show/hide icon: Eye icon, 16px, toggle on click
5. **Forgot Password Link:**
   - Text: "Forgot your password?" / "هل نسيت كلمة المرور؟", 13px, link style (#C8102E)
   - Position: below password, right-aligned (or left in RTL)
6. **Login Button:**
   - Full width
   - Size: lg (h-10)
   - Text: "Sign in" / "تسجيل الدخول"
   - Loading state: spinner + "Signing in..."
7. **Or Divider:**
   - Text "OR" centered, 12px, muted
   - Border lines on both sides
8. **Social Login Buttons (optional):**
   - Google, Apple, Microsoft icons
   - Text: "Continue with [Provider]"
   - Outline style, full width, stacked

**Top Right Corner (Floating Controls):**
- Language toggle button
- Theme toggle button
- Position: 16px from edges

**Mobile Specifics:**
- Simplified layout, no brand panel
- Smaller padding (16px)
- Stack all elements
- Full width buttons

#### 2. OTP Page
**Route:** `/auth/otp`

**Layout:** Center form, similar to login

**Elements:**
1. **Header:**
   - Heading: "Verify your identity" / "تحقق من هويتك", 24px, 700
   - Subheading: "Enter the 6-digit code sent to your email"
   - Email preview: masked email (first 2 chars + ***@domain)
   
2. **OTP Input Field:**
   - 6 separate input boxes, each 40px × 40px
   - Center-aligned
   - Font: monospace, 18px, 600 weight
   - Border: 1px solid var(--border)
   - Border radius: 6px
   - Focus: border-color primary, ring active
   - Auto-advance to next field on input
   - Backspace clears current and moves to previous

3. **Auto-verify:**
   - Submit button OR auto-submit when all fields filled
   - Loading state with spinner

4. **Resend Section:**
   - Text: "Didn't receive a code?" / "لم تستقبل رمزا؟"
   - Link: "Resend" / "إعادة الإرسال" (disabled with countdown)
   - Countdown timer: "Resend in 45s" (countdown updates every second)

5. **Back Link:**
   - Text: "← Back to login" / "العودة إلى تسجيل الدخول"
   - Link style, left/right aligned based on direction

#### 3. Set Password Page
**Route:** `/auth/set-password`

**Layout:** Center form

**Elements:**
1. **Header:**
   - Heading: "Create your password" / "أنشئ كلمة المرور الخاصة بك", 24px, 700
   - Subheading: "This will be used for future logins"

2. **Password Input:**
   - Label: "New Password" / "كلمة مرور جديدة", 12px, 500
   - Input: password type
   - Show/hide toggle: Eye icon right side
   - Helper text below: "At least 8 characters, including uppercase, lowercase, and numbers"

3. **Password Strength Indicator:**
   - Bar showing strength: Weak (red) → Fair (yellow) → Good (light green) → Strong (green)
   - Height: 4px
   - Width: 100%
   - Rounded ends
   - Label: "Weak" / "Fair" / "Good" / "Strong", 11px, right-aligned

4. **Confirm Password Input:**
   - Label: "Confirm Password" / "تأكيد كلمة المرور", 12px, 500
   - Input: password type
   - Error state if doesn't match (red border, error message)

5. **Requirements Checklist:**
   - 4-5 items (checkmarks for met, unchecked for unmet)
   - Font: 12px, 400
   - Colors: gray (unchecked) → green (checked)
   - Items:
     - At least 8 characters
     - One uppercase letter
     - One lowercase letter
     - One number
     - (Optional) One special character

6. **Submit Button:**
   - Full width, primary style
   - Text: "Set Password" / "تعيين كلمة المرور"
   - Disabled until password meets requirements and passwords match

#### 4. License Expired Page
**Route:** `/auth/license-expired`

**Layout:** Center, minimal form

**Elements:**
1. **Icon:**
   - Large alert/warning icon (48px), color #F0B030 (warning yellow)

2. **Heading:**
   - Text: "License Expired" / "انتهت الرخصة", 24px, 700
   - Color: var(--text-primary)

3. **Message:**
   - Text: "Your license expired on [date]. Please renew it to continue using the portal." / "انتهت رخصتك في [التاريخ]..."
   - Font: 14px, 400
   - Color: var(--text-secondary)
   - Margin: 16px 0

4. **Renewal Button:**
   - Size: lg
   - Text: "Renew License" / "تجديد الرخصة"
   - Full width
   - Click navigates to /auth/license-renewal

5. **Support Contact:**
   - Text: "Need help? Contact support at support@gig.com.jo"
   - Font: 12px, 400
   - Color: var(--text-muted)
   - Email as link (mailto:)
   - Position: bottom of form

#### 5. License Renewal Page
**Route:** `/auth/license-renewal`

**Layout:** Center form with steps

**Elements:**
1. **Progress Steps:**
   - 3 steps: Review Info → License Details → Confirm
   - Horizontal layout on desktop, collapsed on mobile
   - Connected dots/lines
   - Font: 12px, 500
   - Active step highlighted in primary color

2. **Step 1 - Review Info:**
   - Heading: "Review your information" / "راجع معلوماتك"
   - Editable fields (name, email, company, license type)
   - Card layout, padding 16px
   - Edit button (pencil icon) to enable editing

3. **Step 2 - License Details:**
   - Heading: "License details" / "تفاصيل الرخصة"
   - Fields:
     - License number (readonly)
     - Current expiry date (readonly)
     - Renewal period (dropdown: 1 year, 3 years, 5 years)
     - Additional services (checkboxes)
   - Cost breakdown (card showing calculation)

4. **Step 3 - Confirm:**
   - Heading: "Confirm renewal" / "تأكيد التجديد"
   - Summary card with:
     - License info
     - Renewal period
     - Total cost
     - Terms checkbox (required)
   - Action buttons: Back, Confirm

5. **Navigation Buttons (Step Footer):**
   - Left: "← Back" button (secondary style) or hide on step 1
   - Right: "Next →" button (primary style) or "Confirm" on last step
   - Full width on mobile, right-aligned on desktop

---

### ADMIN PORTAL SCREENS (4 total)

#### 1. Admin Dashboard
**Route:** `/admin`

**Layout:** Shell with icon rail + nav panel + topbar + content + status bar

**Content Area:**

1. **Page Header:**
   - Breadcrumb: "Dashboard"
   - Greeting: "Good morning, Ahmed" / greeting varies by time of day

2. **KPI Cards Grid (4 columns, responsive):**
   - Background: var(--card)
   - Border: 1px solid var(--border)
   - Border radius: 10px
   - Padding: 24px
   - Shadow: subtle
   
   **Each Card Contains:**
   - Left stripe (3px wide, color-coded)
   - Icon (32px, top left)
   - Label (12px, 600 weight, muted)
   - Value (28px, 700 weight, primary)
   - Delta (14px, 500, green if positive)
   - Subtext (12px, muted)
   
   **Cards:**
   - Total Brokers: value "24", delta "+3 this month", stripe #C8102E
   - Active Licenses: value "18", delta "+2", stripe #00C896
   - Expiring Soon: value "4", delta "within 30 days", stripe #F0B030
   - License Revenue (JOD): value "142,450", delta "+18.5%", stripe #0DB4CC

3. **Charts Section:**
   - Two columns on desktop, stacked on mobile
   
   **Chart 1: License Issuance Trend (Line Chart)**
   - Title: "License Issuance Trend" / "اتجاه إصدار الرخص", 16px, 600 weight
   - Background: var(--card)
   - Border: 1px solid var(--border)
   - Padding: 24px
   - Border radius: 10px
   - X-axis: months (Jan - Dec)
   - Y-axis: number of licenses
   - Line color: #C8102E
   - Grid lines: light
   - Tooltip on hover
   - Legend below chart
   
   **Chart 2: LOB Distribution (Pie Chart)**
   - Title: "Brokers by Line of Business" / "الوسطاء حسب فئة الأعمال", 16px, 600 weight
   - Same card styling
   - Pie segments:
     - Travel: #C8102E (45%)
     - Motor: #C8962A (30%)
     - Medical: #00C896 (15%)
     - Other: #0DB4CC (10%)
   - Labels outside pie with percentages
   - Click segment to filter data (optional)

4. **Recent Brokers Card:**
   - Title: "Recent Brokers" / "الوسطاء الأخيرون", 16px, 600 weight
   - Card layout, padding 24px
   - Table (not full table, just recent items):
     - Columns: Name, License Type, Status, Actions
     - 5 rows visible
     - Row styling same as defined in components
     - Status badge (Active/Pending/Expired)
     - Actions: View (eye icon) or Edit (pencil icon) icon buttons
   - Footer: "View all brokers →" link

5. **License Expiry Alerts Card:**
   - Title: "Expiring Licenses" / "الرخص التي تنتهي", 16px, 600 weight
   - Card layout, padding 24px
   - List items:
     - Broker name (14px, 600)
     - License type (12px, muted)
     - Days remaining (12px, 600, red if < 7 days)
     - Action button (Renew)
   - 4-5 items visible
   - Badge with count: "4 licenses expiring soon" (top right)

#### 2. Manage Brokers
**Route:** `/admin/brokers`

**Content Layout:**

1. **Page Header:**
   - Breadcrumb: "Admin / Manage Brokers"
   - Heading: "Manage Brokers" / "إدارة الوسطاء", 24px, 700
   - Action button (top right): "+ Add Broker" / "+ إضافة وسيط", primary style

2. **Filters & Search Bar:**
   - Row layout, gap 12px
   - Search input: placeholder "Search by name, email, license..."
   - Filter button: icon + text "Filters", outline style
   - Optional: filter dropdown/popover with:
     - Status dropdown (All, Active, Pending, Expired, Blocked)
     - License Type checkboxes (Travel, Motor, Medical, etc.)
     - Date range picker (License issue date)
   - Sort dropdown: "Sort by: Name, Status, License Expiry, etc."

3. **Brokers Table:**
   - Full width, responsive (horizontal scroll on mobile)
   - Columns: Name, Email, License Type, Status, Renewal Date, Actions
   - Header row: sticky, var(--muted) background
   - Row styles: hover background change, clickable
   - Status badge styling (colored badges)
   - Action icons (right-aligned):
     - View/Detail (eye icon)
     - Edit (pencil icon)
     - Delete/Deactivate (trash icon, confirm modal)
   - Pagination (bottom): "Showing 1-10 of 24"
   - Optional: Bulk selection checkboxes

4. **Broker Detail Drawer** (slide in from right, RTL from left):
   - Width: 400px on desktop, full width on mobile
   - Header: Broker name, close button
   - Content:
     - Broker info card (name, email, phone, company, license type, status)
     - License details (number, issued date, expiry date, renewal button)
     - Commission rate (percentage)
     - Sub-brokers count
     - Documents section (licenses, certificates)
   - Footer buttons: Edit, Deactivate, Close

#### 3. Roles & Permissions
**Route:** `/admin/roles`

**Content Layout:**

1. **Page Header:**
   - Breadcrumb: "Admin / Roles & Permissions"
   - Heading: "Roles & Permissions" / "الأدوار والصلاحيات", 24px, 700
   - Action button: "+ Create Role" / "+ إنشاء دور", primary style

2. **Roles List (as table or card grid):**
   - Columns: Role Name, Description, Users Count, Last Modified, Actions

   **Pre-defined Roles:**
   - Admin (Full access to all features)
   - Broker Manager (Manages brokers, licenses, renewals)
   - Support Staff (View-only access, can manage support tickets)
   - Finance (View commissions, statements, payments)

3. **Permissions Matrix (when clicking a role):**
   - Grid layout: features × permissions
   - Features (rows): Brokers, Licenses, Renewals, Commissions, Reports, Users, Settings, Audit Trail
   - Permissions (columns): View, Create, Edit, Delete
   - Checkboxes (editable in edit mode)
   - Color-coded: checked = green, unchecked = gray

4. **Create/Edit Role Modal:**
   - Modal styling as defined
   - Fields:
     - Role name (text input)
     - Description (textarea)
     - Permissions checkboxes (grouped by feature)
     - Save / Cancel buttons

#### 4. Audit Trail
**Route:** `/admin/audit`

**Content Layout:**

1. **Page Header:**
   - Breadcrumb: "Admin / Audit Trail"
   - Heading: "Audit Trail" / "سجل المراجعة", 24px, 700

2. **Filters:**
   - Row: Search, User dropdown, Action dropdown, Date range picker
   - Search: by username, email, IP address
   - User: dropdown list of users
   - Action: dropdown list (Create, Edit, Delete, Login, Logout, etc.)
   - Date: date picker range

3. **Audit Log Table:**
   - Columns: User, Action, Resource Type, Timestamp, IP Address, Details
   - Row styling: hover background
   - Timestamp format: "Mar 16, 2025 2:30 PM" (or relative: "2 hours ago")
   - Expand icon on each row (chevron) to show full details

4. **Expanded Row Details:**
   - Shows full action details
   - Before/after comparison (if modified data)
   - Full IP address, user agent (browser)
   - Request/response data (if applicable)
   - Code block styling for JSON data

---

### BROKER PORTAL SCREENS (11 total)

#### 1. Broker Dashboard
**Route:** `/broker`

**Content Area:**

1. **License Status Card:**
   - Background: rgba(0, 200, 150, 0.08)
   - Border: 1px solid rgba(0, 200, 150, 0.3)
   - Padding: 12px 16px
   - Flex: icon (check circle) + text (left) + days remaining (right)
   - Text: "License valid until Dec 31, 2025", 13px, 500
   - Days: "292 days remaining", 12px, green

2. **Page Header:**
   - Greeting: "Good morning, Ahmed" / varies by time
   - Subheading: Full date (weekday, month, day, year)
   - Action button (right): "Issue Policy" / "إصدار وثيقة", primary style, icon left

3. **KPI Cards Grid (4 columns):**
   - Same styling as Admin Dashboard
   - Cards:
     - My Active Policies: "47", "+5 this month", stripe #C8102E
     - This Month Premium (JOD): "12,450", "+12.3%", stripe #C8962A
     - My Commissions (JOD): "996", "+8.1% this month", stripe #00C896
     - Pending Renewals: "3", "2 urgent", stripe #F0B030

4. **Charts Section:**
   
   **Chart 1: Policy Issuance Trend (Line Chart)**
   - Title: "My Policy Issuance" / "وثائقي المُصدّرة"
   - 12 months data
   - Line color: #C8102E
   - Grid, legend, tooltip
   
   **Chart 2: LOB Commission Breakdown (Pie Chart)**
   - Title: "Commission by LOB" / "العمولة حسب فئة الأعمال"
   - Segments:
     - Travel: 45% (#C8102E)
     - Motor: 30% (#C8962A)
     - Medical: 15% (#00C896)
     - Home: 10% (#0DB4CC)

5. **Recent Policies Card:**
   - Title: "Recent Policies" / "الوثائق الأخيرة"
   - Table: Policy No., Customer, LOB, Premium, Date, Status
   - Status badge: Active (green), Expired (red)
   - Row hover: clickable, navigates to policy detail
   - 5 rows visible
   - Footer: "View all policies →" link

6. **Sub-Brokers Card:**
   - Title: "My Sub-Brokers" / "وسطائي الفرعيون"
   - Card grid (2-3 columns):
     - Avatar (32px, initials)
     - Name (14px, 600)
     - Policies issued (12px, muted, "12 policies")
     - Commission (12px, muted, "84.00 JOD")
     - Status badge (Active/Inactive)
   - 3 cards visible
   - Footer: "Manage sub-brokers →" link

#### 2. LOB Issuance Hub
**Route:** `/broker/issuance`

**Content Area:**

1. **Page Header:**
   - Breadcrumb: "Broker / Issue Policy"
   - Heading: "Select Line of Business" / "اختر فئة الأعمال", 24px, 700
   - Subheading: "Choose an insurance type to start issuing a policy"

2. **LOB Cards Grid (4 columns on desktop, 2 on tablet, 1 on mobile):**
   - Card background: var(--card)
   - Border: 1px solid var(--border)
   - Padding: 32px
   - Border radius: 10px
   - Shadow: subtle
   - Hover: shadow increase, subtle lift
   - Clickable (cursor pointer)
   - Transition: smooth

   **Card Content:**
   - Icon: 48px (LOB-specific color)
   - Label: 16px, 600 weight
   - Description: 12px, 400, muted (e.g., "Travel insurance for individuals")
   - Action button (bottom): "Get Started" / "ابدأ", primary style, full width

   **LOB Types:**
   - Travel (Plane icon, #C8102E)
   - Motor (Car icon, #C8962A)
   - Medical (Stethoscope icon, #00C896)
   - Home (Home icon, #0DB4CC)

3. **Optional: Recent Issuance (below cards):**
   - Text: "You've issued 127 policies in March"
   - Stats: X% travel, Y% motor, etc.

#### 3. Travel Issuance
**Route:** `/broker/issuance/travel`

**Content Area:**

1. **Page Header:**
   - Breadcrumb: "Broker / Issue Policy / Travel"
   - Heading: "Create Travel Insurance" / "إنشاء تأمين سفر", 24px, 700

2. **Stepper/Progress (optional):**
   - Steps: Traveler Info → Trip Details → Coverage → Review
   - Dot/line indicators, active step highlighted

3. **Form Sections (vertically stacked):**

   **Section 1: Traveler Information**
   - Background: var(--card)
   - Padding: 24px
   - Border: 1px solid var(--border)
   - Border radius: 10px
   - Fields:
     - First Name (text input)
     - Last Name (text input)
     - Email (email input)
     - Phone (tel input)
     - Date of Birth (date picker)
     - Nationality (select dropdown with countries)
     - Passport Number (text)

   **Section 2: Trip Details**
   - Departure Date (date picker)
   - Return Date (date picker)
   - Destination (select, searchable dropdown)
   - Purpose (select: Business, Leisure, Other)
   - Trip Type (select: One-way, Round-trip, Multi-city)

   **Section 3: Coverage Selection**
   - Checkboxes for coverage types:
     - Medical Expenses (checkbox + price/month)
     - Flight Delay (checkbox + price)
     - Luggage Loss (checkbox + price)
     - Travel Cancellation (checkbox + price)
     - Emergency Evacuation (checkbox + price)
   - Each with optional add-on options
   - Real-time premium calculation

   **Section 4: Premium Summary (card style)**
   - Subtotal: JOD X.XX
   - Taxes & Fees: JOD X.XX
   - Total Premium: JOD X.XX (bold, larger)
   - Insurance company fee: X%

4. **Action Buttons:**
   - Left: "← Back" (secondary)
   - Right: "Issue Policy" (primary, full width on mobile)
   - Position: sticky bottom or bottom of form

5. **Confirmation Modal (after "Issue Policy" click):**
   - Title: "Confirm Policy Issuance" / "تأكيد إصدار الوثيقة"
   - Summary: policy details
   - Checkbox: "I confirm this information is correct"
   - Buttons: Cancel, Confirm

6. **Success Screen:**
   - Icon: checkmark circle (green, 48px)
   - Message: "Policy issued successfully!" / "تم إصدار الوثيقة بنجاح!"
   - Policy number: POL-2025-XXXXX (monospace, 14px)
   - Copy button (icon)
   - Action buttons:
     - "Download Policy" (primary)
     - "Issue Another" (secondary)
     - "View My Policies" (link)

#### 4. Motor Issuance
**Route:** `/broker/issuance/motor`

**Similar to Travel Issuance, with Motor-specific fields:**

**Sections:**
- Vehicle Information: VIN, Make, Model, Year, Engine, Mileage
- Driver Information: Name, License number, Driving history
- Coverage: Comprehensive, Third-party, Fire & Theft, etc.
- Premium calculation same as Travel

#### 5. My Policies
**Route:** `/broker/policies`

**Content Area:**

1. **Page Header:**
   - Breadcrumb: "Broker / My Policies"
   - Heading: "My Policies" / "وثائقي", 24px, 700
   - Action button: "Issue New Policy" (primary)

2. **Filters & Search:**
   - Search input: placeholder "Search by policy number, customer, LOB..."
   - Filter button: Status (All, Active, Pending, Expired, Renewed)
   - Sort dropdown: Sort by Issue Date, Premium, LOB, Expiry Date

3. **Policies Table:**
   - Columns: Policy No., Customer, LOB, Premium (JOD), Issue Date, Expiry Date, Status, Actions
   - Header: sticky, muted background
   - Rows: hover background, clickable
   - Status badge: colored (Active green, Expired red, Pending yellow, etc.)
   - Actions: View (eye icon), Edit (pencil icon), Renew (refresh icon), Delete (trash icon)
   - Pagination: "Showing 1-20 of 127"

4. **Policy Detail Drawer** (slide from right, click row or view icon):
   - Header: Policy number, Status badge, Close button
   - Sections (collapsible):
     - Policy Info: Issue date, Expiry date, Premium, Commission, Customer details
     - Insured Details: Name, DOB, Contact info
     - Coverage Details: Breakdown of coverages
     - Documents: Links to download policy PDF, certificates
   - Footer: Edit button, Renew button, Delete button

#### 6. Sub-Brokers
**Route:** `/broker/sub-brokers`

**Content Area:**

1. **Page Header:**
   - Breadcrumb: "Broker / Sub-Brokers"
   - Heading: "My Sub-Brokers" / "الوسطاء الفرعيون", 24px, 700
   - Action button: "+ Add Sub-Broker" (primary)

2. **Sub-Brokers Grid (card view):**
   - Cards per row: 3 (desktop), 2 (tablet), 1 (mobile)
   - Card content:
     - Avatar (48px, initials)
     - Name (16px, 600)
     - Email (12px, muted)
     - Policies issued (12px, "45 policies")
     - Commission earned (12px, "JOD 1,200")
     - Status badge (Active/Inactive)
     - Menu button (⋯) with options: View, Edit, Deactivate, View Details
   - Shadow: subtle
   - Hover: shadow increase

3. **Sub-Broker Detail Drawer:**
   - Name, email, phone, company
   - Commission structure (%)
   - Policies issued (count)
   - Total commission earned (JOD)
   - Last activity date
   - Status toggle (Active/Inactive)
   - Edit button, Deactivate button

4. **Add/Edit Sub-Broker Modal:**
   - Fields:
     - First Name, Last Name
     - Email, Phone
     - Company Name
     - Commission Rate (%)
     - License Type (checkboxes)
     - Status (Active/Inactive)
   - Buttons: Save, Cancel

#### 7. Statement
**Route:** `/broker/statement`

**Content Area:**

1. **Page Header:**
   - Breadcrumb: "Broker / Statement"
   - Heading: "Statement" / "كشف الحساب", 24px, 700

2. **Period Selector:**
   - Text: "Select period:" / "اختر الفترة:"
   - Dropdown: Last 30 days, Last 90 days, Last year, Custom range
   - Date pickers (if custom): From date, To date

3. **Summary Cards (4 columns):**
   - Background: colored (each different)
   - Content:
     - Label: "Premiums" / "الأقساط"
     - Value: "JOD 45,230.50"
     - Change: "+8.2% from last period"
   - Cards:
     - Premiums Collected (blue)
     - Commissions Earned (green)
     - Refunds Issued (yellow)
     - Outstanding Amount (red)

4. **Transaction Table:**
   - Columns: Date, Policy No., Customer, LOB, Premium, Commission, Action, Balance
   - Header: sticky
   - Rows: hover background
   - Expandable: click row to see more details
   - Pagination: "Showing 1-25 of 342"
   - Optional: group by date (collapsed/expanded sections)

5. **Export/Download:**
   - Button (bottom right): "Download Statement" (PDF icon)
   - Button: "Export as CSV" (CSV icon)
   - Options: Period, format

#### 8. Notifications
**Route:** `/broker/notifications`

**Content Area:**

1. **Page Header:**
   - Breadcrumb: "Broker / Notifications"
   - Heading: "Notifications" / "الإشعارات", 24px, 700

2. **Filter Bar:**
   - Tabs: All, Unread, Policies, System, Alerts, Renewals
   - Mark as read (bulk action)

3. **Notifications List:**
   - Card per notification:
     - Left: Icon (bell, info, warning, check) with color-coded background
     - Title (14px, 600): notification title
     - Message (13px, muted): brief description
     - Timestamp (11px, muted): "2 hours ago", "Mar 15, 2025 10:30 AM"
     - Unread indicator: blue dot (left side)
     - Action: click expands to show full details
   - Hover: background color change
   - Dismissible: X button (right side)

4. **Notification Detail (expanded or drawer):**
   - Full message text
   - Related policy/entity link
   - Action button (if applicable): "View Policy", "Renew License", etc.
   - Timestamp
   - Mark as read/unread toggle

5. **Empty State (if no notifications):**
   - Icon: bell with slash
   - Message: "No notifications" / "لا توجد إشعارات"

#### 9. Profile & Settings
**Route:** `/broker/profile`

**Content Area:**

1. **Page Header:**
   - Breadcrumb: "Broker / My Profile"
   - Heading: "My Profile" / "ملفي الشخصي", 24px, 700

2. **Profile Information Section:**
   - Card: var(--card) background
   - Content:
     - Avatar (64px, initials)
     - Name (18px, 600)
     - Email (14px, muted)
     - Phone (14px, muted)
     - Company name (14px, muted)
     - License status (badge)
   - Edit button: "Edit Profile" (secondary style, pencil icon)

3. **Account Settings Section:**
   - Card layout
   - Collapsible sections:
     - **Personal Information:**
       - Fields: First name, last name, email, phone
       - Save button
     - **Change Password:**
       - Current password (password input)
       - New password (password input + strength indicator)
       - Confirm password (password input)
       - Save button
     - **Two-Factor Authentication:**
       - Status toggle (enabled/disabled)
       - Backup codes (show/regenerate)
     - **Login History:**
       - Table: Date, Device, IP Address, Location
       - 10 most recent logins

4. **License Information:**
   - Card: License number, License type, Issue date, Expiry date, Renewal button

5. **Documents Section:**
   - Title: "Documents" / "الوثائق", 16px, 600
   - Upload area (drag-drop):
     - "Drag files here or click to upload"
     - Accepted: PDF, JPG, PNG
   - Document list:
     - Each: document name, upload date, file size, download button, delete button
   - Categories: License, Certificates, Identity, Other

6. **Notification Preferences:**
   - Toggles for:
     - Email notifications (enable/disable)
     - SMS notifications (enable/disable)
     - Policy reminders (enable/disable)
     - Commission updates (enable/disable)

7. **Danger Zone (bottom):**
   - Red background (rgba(255, 64, 96, 0.1))
   - Text: "Close account" / "إغلاق الحساب"
   - Description: "Once you close your account, there is no going back..."
   - Button: "Close Account" (destructive style)
   - Confirmation modal required

#### 10. Corporate Registration
**Route:** `/broker/corporate`

**Content Area:**

1. **Page Header:**
   - Breadcrumb: "Broker / Corporate Clients"
   - Heading: "Corporate Clients" / "العملاء المؤسسيون", 24px, 700
   - Action button: "+ Register Corporate Client" (primary)

2. **Filters:**
   - Search: by company name, contact, email
   - Status: All, Active, Pending, Inactive

3. **Corporate Clients Table:**
   - Columns: Company, Contact, Email, Phone, Industry, Status, Actions
   - Status badge: Active (green), Pending (yellow), Inactive (gray)
   - Actions: View, Edit, Delete

4. **Corporate Client Detail Drawer:**
   - Company info: name, registration number, industry, address
   - Contact person: name, email, phone, designation
   - Policies: count and list
   - Documents: upload area for corporate documents
   - Edit button, Delete button

5. **Registration Form Modal:**
   - Sections:
     - Company Information: Name, Reg. No., Industry, Address
     - Contact Person: Name, Email, Phone, Designation
     - Additional Services: checkboxes for available options
   - Save, Cancel buttons

#### 11. Awaiting Approval
**Route:** `/broker/corporate/awaiting-approval` (or similar)

**Content Area:**

1. **Page Header:**
   - Heading: "Awaiting Approval" / "قيد الانتظار للموافقة", 24px, 700
   - Subheading: "Your corporate client registration is pending admin approval"

2. **Status Card:**
   - Icon: hourglass (orange/warning color)
   - Status: "Pending Approval" / "قيد الانتظار للموافقة"
   - Submitted on: date
   - Expected review date: estimate

3. **Submitted Information (read-only):**
   - Card with company details, contact info
   - Cannot edit while pending

4. **Support Section:**
   - Text: "Questions about this application?"
   - Link: "Contact support" / "تواصل مع الدعم"
   - Email: support@gig.com.jo

---

### DOCUMENTATION SCREENS (2 total)

#### 1. Design System Showcase
**Route:** `/design-system`

**Content Area (Vertical scrolling, no sidebar nav):**

1. **Introduction Section:**
   - Heading: "Design System" / "نظام التصميم", 32px, 700
   - Description: "Comprehensive design tokens and guidelines for GIG Jordan portal"
   - Navigation: Jump links to each section (anchor links)

2. **Color Palette Section:**
   - Heading: "Colors" / "الألوان", 24px, 700
   - Grid of color swatches:
     - Brand colors: GIG Red, Navy, Gold, etc.
     - Semantic colors: Success, Warning, Error, Info
     - Gray scale: several shades
   - Each swatch shows:
     - Color name (14px, 600)
     - Hex value (monospace, 12px)
     - CSS variable name (monospace, 11px, muted)
   - Light/Dark theme comparison (toggle or side-by-side)

3. **Typography Section:**
   - Heading: "Typography" / "الطباعة", 24px, 700
   - Font families: IBM Plex Sans (English), Tajawal (Arabic)
   - Type scale samples:
     - H1, H2, H3, H4 headings (displayed actual size)
     - Body large, regular, small (displayed actual size)
     - Label, caption (displayed actual size)
   - Each shows font family, size, weight, line-height

4. **Spacing Section:**
   - Heading: "Spacing" / "المسافات", 24px, 700
   - Visual grid showing spacing scale (4px, 8px, 12px, 16px, 24px, 32px, etc.)
   - Rectangles representing each size
   - Label with pixel and rem values

5. **Border Radius Section:**
   - Heading: "Border Radius" / "نصف قطر الحدود", 24px, 700
   - Sample boxes with different border radius values
   - Labels: sm (4px), md (6px), lg (10px), xl (16px), 2xl (24px), full

6. **Shadow Elevation Section:**
   - Heading: "Shadows" / "الظلال", 24px, 700
   - 5 cards with increasing shadow levels
   - Labels: Elevation 1, 2, 3, 4, 5
   - CSS shadow values shown

7. **Component Showcase (partial):**
   - Heading: "Components Overview" / "نظرة عامة على المكونات", 24px, 700
   - Grid of component examples:
     - Buttons (all variants and sizes)
     - Input fields (various states)
     - Badge styles
     - Card examples
     - Toast notifications
   - Each with brief description
   - Link to full Components page

#### 2. Components Page
**Route:** `/components`

**Content Area:**

1. **Introduction:**
   - Heading: "Components" / "المكونات", 32px, 700
   - Description: "Interactive component library and usage guide"
   - Navigation: Collapsible sidebar with component list OR tabs

2. **Component Sections (each has similar structure):**

   **Section Template:**
   - Component heading (16px, 600)
   - Description (12px, muted, max 200px width)
   - Live example/preview
   - Code snippet (syntax-highlighted, optional)
   - Variants showcase (if multiple states)
   - Usage notes (optional)

   **Components to Include:**
   - Button (all variants, sizes, states)
   - Input Field (default, focused, error, disabled)
   - Select Dropdown (closed, open, selected)
   - Checkbox (unchecked, checked, indeterminate, disabled)
   - Radio Button (unselected, selected, disabled)
   - Badge (all variants)
   - Card (basic, with header, with footer)
   - Modal/Dialog (basic, with actions)
   - Toast Notification (success, error, warning, info)
   - Avatar (sizes, initials, with status)
   - Tooltip (position variants)
   - Table (header, rows, hover states)
   - Tabs (active, inactive)
   - Loading Skeleton
   - Empty State (variations)
   - Breadcrumb Navigation
   - Pagination
   - Avatar Group (multiple avatars stacked)
   - Status Badge Examples (Active, Pending, Expired, Blocked)
   - LOB Color Legend (Travel, Motor, Medical, Home with colors)

3. **Layout Examples (lower section):**
   - Shell layout (sidebar + topbar + content)
   - Card grid layout
   - Form layout (single column, two column)
   - Table layout
   - Modal over content

4. **Accessibility Notes:**
   - Section: "Accessibility" / "إمكانية الوصول", 16px, 600
   - Color contrast ratios (WCAG AA/AAA compliance)
   - Focus states documentation
   - Keyboard navigation guidelines

5. **RTL/LTR Guide:**
   - Section: "Localization" / "التوطين", 16px, 600
   - Examples of RTL layouts
   - Icon rotation guidance
   - Text alignment patterns
   - Form field directional considerations

---

## THEME & LOCALIZATION

### Light Theme (Default)
- Apply the light mode color palette from tokens
- Light backgrounds (#F0F4FA, #FFFFFF)
- Dark text (#0D1F3C)
- Subtle borders (rgba(13, 31, 60, 0.1))

### Dark Theme
- Apply the dark mode color palette
- Dark backgrounds (#070E1C, #0F1A2E)
- Light text (#E8EDF5)
- Subtle borders (rgba(255, 255, 255, 0.08))
- All colors automatically switch via CSS variables

### RTL/LTR Support
- **LTR (English):** Default flex directions, left-to-right text
- **RTL (Arabic):**
  - Flex directions reverse (flex-row → flex-row-reverse)
  - Icon rails positioned right side (mirror)
  - Nav panels from right side
  - Button icon positions swap (icon right → icon left)
  - Text alignment swap (left → right)
  - Toast notifications: right → left
  - Drawers slide from right (RTL) instead of left (LTR)
  - Tooltips: position adjustments
  - Chevron rotations for icons
  - Padding/margin swaps
  - Border positions swap (left border → right border)

### Language Support
- **English:** IBM Plex Sans font, normal text direction
- **Arabic:** Tajawal font, RTL direction, Arabic translations
- Date formatting: "Mar 15, 2025" (English) vs "15 مارس 2025" (Arabic)
- Number formatting: 1,234.50 (English) vs 1.234,50 (Arabic, optional)

---

## IMPLEMENTATION GUIDE

### Step-by-Step Figma Setup

1. **Create Figma File:**
   - Name: "GIG Jordan Agents & Brokers Portal - Design System & Screens"
   - Team: your team workspace
   - Sharing: set to "Can edit" for team members

2. **Create Page Structure:**
   - Page 1: Design System (tokens, colors, typography, spacing, shadows, radius)
   - Page 2: Components Library (all reusable components with variants)
   - Page 3: Layout Components (Icon Rail, Nav Panel, Topbar, Status Bar, authenticated layout)
   - Page 4: Auth Flows (5 screens)
   - Page 5: Admin Portal (4 screens)
   - Page 6: Broker Portal (11 screens)
   - Page 7: Design Documentation (Design System Showcase + Components Showcase)

3. **Build Design Tokens (Page 1):**
   - Create color swatch library
   - Create typography styles
   - Create spacing reference grid
   - Create shadow samples
   - Create border radius reference
   - Document all tokens with hex values and CSS variable names

4. **Build Component Library (Page 2):**
   - Create main components with variants
   - Use Figma's component and variant features
   - Set up component nesting for complex combinations
   - Document variant naming (ComponentName/Variant/State)

5. **Build Layout Components (Page 3):**
   - Create each layout element as a main component
   - Build authenticated shell layout combining rail + nav + topbar + content + status bar
   - Create layout variations (collapsed nav, RTL, mobile)

6. **Build Screens (Pages 4-6):**
   - Use components from library
   - Maintain consistent spacing and alignment
   - Ensure all color tokens reference the design system
   - Create frames for each screen (canvas width: 1440px for desktop, 375px for mobile)
   - Include responsive variants if needed

7. **Organize & Name Convention:**
   - Use consistent naming: `[Section] / [Screen Name]` for frames
   - Components: `[ComponentName] / [Variant] / [State]`
   - Use groups logically (sections, elements)
   - Add descriptive component descriptions

8. **Document Everything:**
   - Add notes/annotations for complex interactions
   - Include documentation page with guidelines
   - Export design tokens as JSON/CSS (Figma plugins available)
   - Create a README board if needed

9. **Theme Variants:**
   - Option A: Duplicate all screens for dark theme
   - Option B: Use component variants to show light/dark swaps
   - Recommendation: Use Option B (less file size, easier maintenance)

10. **RTL/LTR Variants:**
    - Create RTL versions of direction-sensitive layouts
    - Mirror Icon Rail, Nav Panel, Topbar positions
    - Show both English and Arabic text labels

11. **Setup Handoff:**
    - Enable Figma Dev Mode for developers
    - Export design tokens if needed
    - Create shortcut links to key screens
    - Add version notes

---

## COLOR REFERENCE QUICK LOOKUP

**Brand Colors:**
- GIG Red: #C8102E (primary action, brand)
- GIG Navy: #0D1F3C (text, dark backgrounds)
- GIG Gold: #C8962A (secondary, warmth)
- GIG Success: #00C896 (positive, success states)
- GIG Warning: #F0B030 (caution, warnings)
- GIG Error: #FF4060 (destructive, errors)
- GIG Info: #0DB4CC (informational)

**Semantic Background Colors (Light Mode):**
- Page background: #F0F4FA
- Card background: #FFFFFF
- Input background: #EEF2F8
- Muted background: #E4EAF3
- Accent background: #F5F7FB

**Semantic Text Colors (Light Mode):**
- Primary text: #0D1F3C
- Secondary text: #4A5878
- Muted text: #8A96B0

**Navigation Backgrounds (Light Mode):**
- Rail: #0D1F3C
- Nav panel: #112040
- Topbar: #FFFFFF

---

## NOTES FOR BUILDERS

- Keep the file well-organized with clear naming conventions
- Use Figma components for all reusable UI elements
- Maintain consistent alignment (8px or 4px grid)
- Ensure all typography uses defined type scales
- All colors should reference the design system
- Create component variants for state changes (hover, focus, disabled)
- Test responsive behavior by creating mobile frame variants
- Use Figma plugins for exporting tokens if needed
- Consider accessibility (contrast ratios, focus states)
- Document any interactive behaviors in component descriptions
- Regular backups and version history
- Collaborate with team for feedback and refinements

---

## RESOURCES & REFERENCES

**Files to Reference in Code:**
- `src/styles/theme.css` - All design tokens
- `src/app/components/ui/` - Component implementations
- `src/app/components/layout/Shell.tsx` - App chrome layout
- `src/app/pages/` - All page implementations
- `src/app/context/AppContext.tsx` - Theme, language, localization

**External Libraries Used:**
- Radix UI (headless components)
- class-variance-authority (cva for variants)
- Tailwind CSS (utility classes)
- Lucide React (icons)
- Recharts (charts)

---

**Document Created:** March 16, 2025
**Last Updated:** March 16, 2025
**Version:** 1.0
