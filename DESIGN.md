# Buff-Bugger Design System

This document describes the visual and interaction design principles for Buff-Bugger. It is the source of truth for colors, typography, spacing, voice, and component patterns.

## Design Principles

Four ideas drive every UI decision in Buff-Bugger:

1. **Exploration over data entry.** Bug documentation should feel like an expedition, not a form. Prefer maps, images, and progression over tables and text fields.
2. **Local and personal.** The app is for the Boulder community. Copy should be warm, a little playful, and human — not clinical or corporate.
3. **Respect the outdoors.** The palette and imagery are grounded in natural, field-appropriate colors. Avoid neon, chrome, and default Bootstrap blue.
4. **Competition, not aggression.** Leaderboards and scoring should feel like friendly rivalry, not a high-stakes ranking system. Copy around competition stays light.

---

## Color Palette

### Primary

| Role | Hex | Use |
|------|------|-----|
| **Forest** | `#2C5F2D` | Primary brand color. Buttons, links, headings, emphasis. |
| **Moss** | `#97BC62` | Secondary. Supporting elements, subtle accents, backgrounds on dark surfaces. |
| **Amber** | `#D4A017` | Accent. CTAs, highlights, achievement indicators, map marker pins. Use sparingly. |

### Neutrals

| Role | Hex | Use |
|------|------|-----|
| **Deep Forest** | `#0F1A14` | Dark backgrounds (title slides, hero sections, modals). |
| **Ink** | `#1A2419` | Primary body text on light surfaces. |
| **Warm off-white** | `#F7F6F1` | Page backgrounds on content surfaces. Preferred over pure white. |
| **Muted** | `#6B7563` | Secondary text, captions, de-emphasized UI. |
| **Card border** | `#D9D9D0` | Subtle dividers and card outlines. |

### Usage rules

- **One primary color should dominate (~60% visual weight).** In Buff-Bugger that's Forest for UI chrome and Warm Off-white for backgrounds.
- **Amber is for emphasis only.** If more than 15% of a screen is amber, reduce it.
- **Never use pure black (`#000000`) for text.** Use `#1A2419` (Ink) for better reading on warm off-white backgrounds.
- **Never use default red for errors.** Use a warm terracotta (`#B85042`) to stay on-palette.

---

## Typography

### Type families

- **Headings:** Georgia (serif)
- **Body:** system-ui, Calibri fallback (sans-serif)
- **Code / data:** Consolas, Menlo, monospace

Georgia for headings communicates intentionality and warmth — it's the opposite of the default sans-serif heading that every class project uses. Paired with a clean sans body, it gives Buff-Bugger a distinctive feel without being precious.

### Scale

| Element | Size | Weight |
|---------|------|--------|
| Page title (H1) | 32–44px | 700 |
| Section header (H2) | 22–28px | 700 |
| Card title (H3) | 18–20px | 700 |
| Body | 15–16px | 400 |
| Small / caption | 12–13px | 400 |
| Eyebrow / kicker (all caps) | 11px | 700, letter-spacing 0.08em |

### Spacing

Use an 8px grid. Prefer `8, 16, 24, 32, 48` for padding, margins, and gaps. Avoid ad-hoc values like 13px or 22px.

---

## Component Patterns

### Buttons

- **Primary button:** Forest background, white text, 4px border radius, 12px vertical padding. Hover state darkens the background ~8%.
- **Secondary button:** White background, Forest border (1.5px), Forest text. Same padding.
- **Destructive action:** Terracotta (`#B85042`) background, white text. Used for "delete post," "log out" is secondary, not destructive.

### Cards

- **Background:** White (`#FFFFFF`) on Warm off-white page
- **Border:** 1px solid `#D9D9D0`
- **Radius:** 4px (subtle, not overly rounded)
- **Shadow:** none by default; `0 1px 3px rgba(0,0,0,0.06)` on hover/interactive cards
- **Padding:** 24px
- **Optional accent stripe:** 4px wide amber or forest on the left edge for emphasis

### Map markers

- **Default marker:** Amber (`#D4A017`) pin on a small white circle
- **User's own finds:** Forest pin — distinguishes what you submitted from what others submitted
- **Rare find (future):** add a thin ring in moss green around the pin

### Forms

- **Labels** sit above inputs, never inline — mobile-friendlier and clearer
- **Input height:** 40px minimum (tap target)
- **Focus state:** Forest border, no colored glow
- **Error state:** Terracotta border with an inline error message below the field
- **Required fields** are marked with a small amber asterisk after the label, never with "Required" in the placeholder

### Empty states

Every list, map, and page should have a designed empty state — not just a blank area. Patterns:

- A short sentence ("No bugs here yet.")
- A reason ("Be the first to spot one in this area!")
- A single CTA button linking to the relevant action ("Submit a find")
- An illustration or icon if available — never a big chunk of white space

---

## Voice & Tone

### Principles

- **Warm, not cute.** "Welcome back" is good. "Hey buddy!" is not.
- **Plain, not technical.** "Log in" beats "Authenticate." "Bug find" beats "Specimen record."
- **Specific, not generic.** "No bugs spotted in this area yet" beats "No results found."
- **Honest about errors.** If something breaks, say what broke. Don't say "Oops!"

### Microcopy patterns

| Situation | Bad | Good |
|-----------|-----|------|
| Submitting a post | "Submit" | "Post your find" |
| Empty map | "No data" | "No bugs spotted here yet — be the first?" |
| Login error | "Authentication failed" | "Username or password doesn't match what we have." |
| Required field | Placeholder: "Email (required)" | Label: "Email" with small amber asterisk |
| Loading | Spinner with no text | "Loading the map…" or "Uploading your find…" |
| Success | "Success!" | "Your find is live on the map." |
| Registration success | "Account created" | "Welcome to Buff-Bugger, Molly." |

### What to avoid

- **No exclamation marks** except in celebratory confirmations ("Welcome to Buff-Bugger!")
- **No "Oops" or "Uh oh."** It's dismissive when something genuinely went wrong.
- **No gendered language** in generic copy ("hey guys"). Use "everyone," "folks," or drop the greeting.
- **No jargon on the user-facing surface.** "Session expired" → "Please log in again."

---

## Accessibility Baseline

These are non-negotiables:

- **Contrast:** All body text must meet WCAG AA — 4.5:1 for normal text, 3:1 for large text. Forest (`#2C5F2D`) on Warm off-white clears this.
- **Focus states:** Every interactive element has a visible focus outline. Never `outline: none` without replacing it.
- **Alt text:** Every bug photo must have an `alt` attribute. Default to the common name + "photographed in [location]" if the user didn't provide one.
- **Tap targets:** 44x44px minimum for anything tappable on mobile.
- **Color is never the only signal.** Rare bugs aren't marked *only* by color; they also have a text label or icon.

---

## Out of Scope (for now)

These are design decisions deferred to future work:

- Dark mode
- Animations beyond simple hover transitions
- A full icon set (we use Google Maps default icons + a few Lucide icons as needed)
- Internationalization

---

*This design system is maintained by the BUGMASTERS team. Changes should be proposed via pull request.*
