# Design System Inspired by Pokémon Poka Poka

## 1. Visual Theme & Atmosphere

The Pokémon Poka Poka design system embodies a whimsical, nature-inspired aesthetic rooted in peaceful countryside charm and cozy gameplay. The visual language combines soft, layered colors with a gentle palette dominated by greens and earth tones, creating an inviting world that celebrates farming, exploration, and relaxation. The design prioritizes warmth and accessibility through rounded, forgiving corners and playful interactive elements that encourage discovery. This system radiates joy and inclusivity, blending contemporary UI patterns with a storybook-like quality that appeals to both casual and dedicated players. The overall atmosphere is serene yet dynamic—a sanctuary where natural environments meet delightful Pokémon encounters.

**Key Characteristics**

- Soft, nature-forward color palette emphasizing greens, purples, and warm earth tones
- Gentle, approachable typography with strong hierarchy and readability
- Rounded interactive elements that soften the interface and encourage engagement
- Layered visual depth through color relationships rather than aggressive shadows
- Accessible contrast ratios with warm neutrals that reduce visual fatigue
- Playful but purposeful use of accent colors for highlighting key actions
- Cozy, inviting atmosphere that prioritizes user comfort and exploration

## 2. Color Palette & Roles

### Primary

- **Brand Purple** (`#80579E`): Core brand color used extensively across UI elements, buttons, containers, and accent areas. Represents the magical, fantastical nature of Pokémon.
- **Secondary Purple** (`#C59BFF`): Lighter, softer variant of brand purple used for secondary actions, backgrounds, and hover states to maintain visual coherence.

### Accent Colors

- **Bright Blue** (`#007AFF`): Energetic accent used for interactive elements, playful buttons, and call-to-action focal points that demand attention.
- **Fresh Lime** (`#C1E36C`): Vibrant natural green representing life, growth, and the game's pastoral setting. Used for highlights and organic UI elements.
- **Sky Cyan** (`#95E1F3`): Cool accent representing water and sky, used sparingly for secondary interactive states and nature-inspired components.

### Interactive

- **Primary Action Blue** (`#007AFF`): Active controls, primary links, and interactive UI elements requiring clear affordance and visibility.
- **Secondary Action Purple** (`#C59BFF`): Alternative interactive states and secondary button variants maintaining brand continuity.

### Neutral Scale

- **Dark Text** (`#585858`): Primary text color used throughout body copy, labels, and standard interface text. Warm dark gray that pairs harmoniously with the color palette.
- **Off-White** (`#FFFFFF`): Clean background and surface color, providing contrast and clarity for content.
- **True Black** (`#000000`): Minimal use for strong emphasis, borders, or high-contrast text on light backgrounds.

### Surface & Borders

- **Warm Beige** (`#DCB680`): Warm neutral used for terrain, containers, and natural-feeling backgrounds that evoke countryside paths and pastoral settings.
- **Earth Brown** (`#A17458`): Grounded, earthy tone used for secondary surfaces, borders, and natural architectural elements within the interface.

### Semantic / Status

- **Error Red** (`#E60012`): Critical error states and warning indicators requiring immediate user attention and action.

## 3. Typography Rules

### Font Family

**Primary:** Noto Sans JP, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

Noto Sans JP provides exceptional support for Japanese characters while maintaining excellent readability and accessibility across Latin scripts. The geometric, open letterforms align with the system's approachable aesthetic.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | Noto Sans JP | 32px | 700 | normal | 0px | Large hero headings; used sparingly for primary page titles |
| Heading / H2 | Noto Sans JP | 32px | 900 | 44.8px | 0px | Bold section headers; strong visual emphasis for major content blocks |
| Body / Paragraph | Noto Sans JP | 18px | 900 | 18px | 0px | Primary content text; generous size ensures accessibility and readability |
| Small Text / Span | Noto Sans JP | 14px | 900 | 14px | 0px | Secondary information, labels, and supplementary text |
| Link / Interactive Text | Noto Sans JP | 16px | 600 | normal | 0px | Inline links and button text; medium weight balances emphasis with legibility |

### Principles

- **Bold hierarchy:** Heavy weights (700–900) create immediate visual distinction between content tiers, reducing cognitive load and guiding user attention.
- **Generous sizing:** 16px+ base sizes ensure comfortable reading on all devices and reduce strain for players during extended sessions.
- **Japanese-first:** Font selection and sizing prioritize accurate rendering of Japanese typography while maintaining Latin character quality.
- **Consistent weight strategy:** Body and UI text favor 600–900 weights to maintain visual strength and legibility in the pastoral, playful context.

## 4. Component Stylings

### Buttons

**Primary Button**
- Background: `#80579E`
- Text Color: `#FFFFFF`
- Font Size: `16px`
- Font Weight: `600`
- Padding: `16px 24px`
- Border Radius: `15px`
- Border: `0px none`
- Box Shadow: `none`
- Hover State: Background `#6B4A82`, Text `#FFFFFF`
- Active State: Background `#5A3D6F`, Text `#FFFFFF`

**Secondary Button**
- Background: `#C59BFF`
- Text Color: `#585858`
- Font Size: `16px`
- Font Weight: `600`
- Padding: `16px 24px`
- Border Radius: `15px`
- Border: `0px none`
- Box Shadow: `none`
- Hover State: Background `#B388FF`, Text `#585858`
- Active State: Background `#A375E8`, Text `#585858`

**Ghost Button**
- Background: `transparent`
- Text Color: `#007AFF`
- Font Size: `16px`
- Font Weight: `600`
- Padding: `8px 16px`
- Border Radius: `15px`
- Border: `2px solid #007AFF`
- Box Shadow: `none`
- Hover State: Background `rgba(0, 122, 255, 0.1)`, Text `#007AFF`
- Active State: Background `rgba(0, 122, 255, 0.2)`, Text `#007AFF`

**Icon Button**
- Background: transparent
- Text Color: `#007AFF`
- Font Size: `24px`
- Padding: `8px`
- Border Radius: `50%`
- Hover State: Background `rgba(0, 122, 255, 0.1)`
- Active State: Background `rgba(0, 122, 255, 0.2)`

### Cards & Containers

**Content Card**
- Background: `#FFFFFF`
- Border: `0px none`
- Border Radius: `12px`
- Padding: `20px`
- Text Color: `#585858`
- Box Shadow: `0px 2px 8px rgba(0, 0, 0, 0.08)`
- Hover State: Box Shadow `0px 4px 16px rgba(0, 0, 0, 0.12)`

**Accent Card (Purple)**
- Background: `#C59BFF`
- Border Radius: `20px`
- Padding: `24px`
- Text Color: `#585858`
- Box Shadow: `none`

**Natural Surface Card (Beige)**
- Background: `#DCB680`
- Border Radius: `12px`
- Padding: `16px`
- Text Color: `#585858`
- Box Shadow: `none`

### Inputs & Forms

**Text Input**
- Background: `#FFFFFF`
- Border: `2px solid #80579E`
- Border Radius: `8px`
- Padding: `12px 16px`
- Font Size: `16px`
- Font Weight: `600`
- Text Color: `#585858`
- Placeholder Color: `#95E1F3`
- Focus State: Border `2px solid #007AFF`, Box Shadow `0px 0px 0px 4px rgba(0, 122, 255, 0.1)`
- Error State: Border `2px solid #E60012`

**Select / Dropdown**
- Background: `#FFFFFF`
- Border: `2px solid #80579E`
- Border Radius: `8px`
- Padding: `12px 16px`
- Font Size: `16px`
- Font Weight: `600`
- Text Color: `#585858`
- Hover State: Border `2px solid #6B4A82`

**Checkbox**
- Background (Unchecked): `#FFFFFF`
- Border: `2px solid #80579E`
- Border Radius: `4px`
- Width: `20px`
- Height: `20px`
- Background (Checked): `#80579E`
- Icon Color (Checked): `#FFFFFF`
- Focus State: Box Shadow `0px 0px 0px 4px rgba(128, 87, 158, 0.1)`

### Navigation

**Header Navigation Link**
- Font Size: `16px`
- Font Weight: `600`
- Text Color: `#585858`
- Padding: `8px 16px`
- Border Radius: `8px`
- Hover State: Background `rgba(128, 87, 158, 0.1)`, Text Color `#80579E`
- Active State: Background `#80579E`, Text Color `#FFFFFF`

**Hero Action Link**
- Font Size: `16px`
- Font Weight: `600`
- Text Color: `#FFFFFF`
- Border Radius: `15px`
- Padding: `12px 20px`
- Background: `#80579E`
- Hover State: Background `#6B4A82`

### Badges & Labels

**Status Badge (Success)**
- Background: `#C1E36C`
- Text Color: `#585858`
- Font Size: `12px`
- Font Weight: `700`
- Padding: `6px 12px`
- Border Radius: `20px`

**Status Badge (Accent)**
- Background: `#95E1F3`
- Text Color: `#585858`
- Font Size: `12px`
- Font Weight: `700`
- Padding: `6px 12px`
- Border Radius: `20px`

**Status Badge (Error)**
- Background: `#E60012`
- Text Color: `#FFFFFF`
- Font Size: `12px`
- Font Weight: `700`
- Padding: `6px 12px`
- Border Radius: `20px`

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Scale:** 4px, 8px, 12px, 16px, 20px, 24px, 32px, 36px, 40px, 60px, 72px, 80px

**Usage Context:**
- **4px, 8px:** Micro-spacing within components (padding inside inputs, gap between inline elements)
- **12px, 16px:** Standard padding for buttons, form fields, and small containers
- **20px, 24px:** Card padding, section spacing, and component internal margins
- **32px, 36px:** Gap between distinct content blocks, section separators
- **40px, 60px:** Vertical rhythm between major sections, generous breathing room
- **72px, 80px:** Full-screen section breaks, hero spacing, maximum vertical separation

### Grid & Container

- **Max Width:** `1200px` for main content containers
- **Column Strategy:** 12-column flexible grid supporting 1, 2, 3, 4, and 6 column layouts depending on viewport
- **Section Patterns:** Full-bleed header/hero sections followed by centered max-width content areas; alternating full-width and constrained sections create visual rhythm
- **Gutter:** `24px` horizontal spacing between columns, `32px` between major sections

### Whitespace Philosophy

Generous whitespace is fundamental to the design system's peaceful, exploratory nature. Spacing is used deliberately to create breathing room, reduce cognitive load, and guide attention. Content is never cramped; sections are clearly delineated through vertical rhythm rather than borders. Horizontal padding is balanced across mobile and desktop to ensure readability without overwhelming users.

### Border Radius Scale

- **Minimal/Sharp:** `0px` – Utility components, grid overlays, technical elements
- **Subtle:** `4px` – Form inputs, small badges, secondary UI elements
- **Friendly:** `8px` – Cards, secondary containers, modal backgrounds
- **Rounded:** `12px` – Primary cards, larger containers, prominent surfaces
- **Playful/Full:** `15px` – Buttons, call-to-action containers, hero interactive elements
- **Circular:** `50%` – Icon buttons, avatars, circular badges

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Ground (None) | No shadow; flat surfaces | Form inputs, neutral backgrounds, text-only areas |
| Raised (+1) | `0px 2px 8px rgba(0, 0, 0, 0.08)` | Cards, light containers, subtle elevation |
| Elevated (+2) | `0px 4px 16px rgba(0, 0, 0, 0.12)` | Hovered cards, featured content, modals |
| Floating (+3) | `0px 8px 24px rgba(0, 0, 0, 0.16)` | Floating action buttons, popovers, dropdown menus |
| Lifted (+4) | `0px 12px 32px rgba(0, 0, 0, 0.20)` | Dialogs, overlays, highest-priority content |

**Shadow Philosophy**

The design system uses subtle, soft shadows to create gentle depth without overwhelming the warm, pastoral aesthetic. Shadows are warm-toned and transparent rather than harsh black, supporting the cozy, inviting atmosphere. Elevation is reserved for interactive or transient content; most surfaces remain flat to maintain visual clarity and reduce visual noise. Shadows increase minimally across elevation levels, creating nuanced rather than dramatic depth changes.

## 7. Do's and Don'ts

### Do

- Use **#80579E (Brand Purple)** as the primary visual anchor across all major interactive elements and headers
- Pair **#585858 (Dark Gray)** text with **#FFFFFF (Off-White)** backgrounds for optimal readability and comfort
- Apply **16px padding** as standard for card containers and main content areas; scale up to **24px** for hero sections
- Use **15px border radius** consistently on buttons and call-to-action elements to reinforce playful, friendly brand personality
- Implement the spacing scale religiously; never arbitrary spacings between `4px` and `80px`
- Maintain `16px` minimum font size for body text to support accessibility and reduce eye strain
- Use **#C1E36C (Fresh Lime)** and **#95E1F3 (Sky Cyan)** sparingly as highlights for secondary actions or organic elements
- Stack navigation and action items vertically on mobile; maintain horizontal layouts only above `768px` breakpoint
- Always provide visual feedback (hover, active, focus states) on interactive elements using the secondary color variants

### Don't

- Don't use **#E60012 (Error Red)** outside of critical error states or warnings; it carries semantic weight
- Don't apply shadows stronger than `0px 12px 32px rgba(0, 0, 0, 0.20)` anywhere in the interface
- Don't mix fonts; Noto Sans JP is the sole typeface across all text and UI elements
- Don't set font sizes below `14px` for any user-facing text; maintain legibility as a core principle
- Don't use pure black (`#000000`) for body text; always use the warm **#585858 (Dark Gray)** for better visual comfort
- Don't apply border radius below `8px` on interactive elements; maintain a minimum roundness that supports the friendly aesthetic
- Don't cluster more than 3 major call-to-action buttons in a single view; prioritize action hierarchy
- Don't reduce padding below `12px` in form fields or button interiors; maintain comfortable touch targets and readable spacing
- Don't overlay content on the hero image without a semi-transparent overlay; always ensure text legibility

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 320px–479px | Single-column layout; 16px padding; 18px body text; stacked navigation; full-width cards |
| Tablet | 480px–767px | Two-column layout option; 20px padding; maintained typography; horizontal navigation top or side |
| Desktop | 768px–1199px | Three-column grid; 24px padding; full navigation bar; max-width containers centered |
| Wide | 1200px+ | Four-column grid; maximum content width `1200px` enforced; optimal spacing throughout |

### Touch Targets

- **Minimum Interactive Size:** `44px × 44px` for all buttons, links, and interactive elements
- **Recommended Size:** `48px × 48px` for primary call-to-action buttons and navigation items
- **Compact Threshold:** `36px × 36px` only for secondary or tertiary interactive elements
- **Spacing Between Targets:** Minimum `8px` gap between adjacent interactive elements to prevent accidental misactivation
- **Icon Buttons:** `44px` square minimum with `8px` padding around icon content

### Collapsing Strategy

- **Hero Section:** Reduce padding from `72px` to `40px` on tablet; `24px` on mobile
- **Card Layouts:** Maintain 2 columns on tablet (480px+); collapse to 1 column below `480px`
- **Typography:** Keep hierarchy intact; scale heading sizes minimally (`28px` on mobile, `32px` on tablet+)
- **Navigation:** Transform horizontal top nav to hamburger menu below `768px`; reveal full nav in sidebar or dropdown on mobile
- **Sections:** Maintain `32px` gap between sections on mobile; scale to `60px` on desktop
- **Images:** Scale images to 100% width on mobile with aspect ratio preservation; fixed widths on tablet+

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Brand Purple (`#80579E`)
- **Secondary CTA:** Secondary Purple (`#C59BFF`)
- **Interactive Highlights:** Bright Blue (`#007AFF`)
- **Background (Default):** Off-White (`#FFFFFF`)
- **Background (Natural/Accent):** Warm Beige (`#DCB680`)
- **Body Text:** Dark Gray (`#585858`)
- **Success/Growth Accent:** Fresh Lime (`#C1E36C`)
- **Water/Nature Accent:** Sky Cyan (`#95E1F3`)
- **Heading Text:** Dark Gray (`#585858`)
- **Error/Warning:** Error Red (`#E60012`)

### Iteration Guide

1. **Always use `Noto Sans JP` across all text layers.** No typeface substitution or fallback usage outside the defined stack.

2. **Apply the spacing scale strictly:** `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `36px`, `40px`, `60px`, `72px`, `80px`. No arbitrary values between these increments.

3. **Primary buttons must be `#80579E` with `15px` border radius, `16px` font size, `600` weight, and `16px` vertical padding.** Maintain this formula across all branded primary CTAs.

4. **Body text is always `18px`, weight `900` in heading contexts or `16px`, weight `600` in body/link contexts.** Typography hierarchy relies on size and weight variation, never color alone.

5. **Form inputs use `2px solid #80579E` borders, `8px` border radius, and `12px 16px` padding.** Maintain consistent form styling to reduce cognitive load.

6. **Shadow hierarchy is subtle and warm:** Ground level = no shadow; Raised = `0px 2px 8px rgba(0, 0, 0, 0.08)`; Elevated = `0px 4px 16px rgba(0, 0, 0, 0.12)`. Never exceed `0px 12px 32px rgba(0, 0, 0, 0.20)`.

7. **Cards and containers default to `12px` border radius with `20px` padding.** Hero and primary containers scale padding to `24px` or `40px` for visual emphasis.

8. **Hover and active states for interactive elements shift to secondary color variants:** `#6B4A82` (darker purple) or `#B388FF` (lighter purple) with maintained border radius and shadow elevation.

9. **Mobile-first responsive design:** Collapse layouts to single-column below `480px`, maintain max-width of `1200px` above desktop threshold, and scale all spacing values proportionally with breakpoints.

10. **All interactive elements must have a minimum `44px × 44px` touch target with consistent visual feedback (color shift, shadow change, or outline).** Test accessibility contrast ratios; maintain WCAG AA standard minimum (`4.5:1` for body text).
