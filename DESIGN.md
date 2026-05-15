<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->
---
name: Ice & Tao
description: Cinematic, warm bilingual wedding invitation for 27 June 2026, beach ceremony.
---

# Design System: Ice & Tao

## 1. Overview

**Creative North Star: "The Long Look at Golden Hour."**

The invitation behaves like a single, long-held film shot of golden hour at the beach. Warmth, light, and intimacy belong to the photograph and to time itself, never to ornament. Every visual decision answers one question: does this deepen the held look, or does it interrupt it?

Density is low. Spacing is generous. The rhythm is unhurried so the recipient feels the air settle before they read. The card is both a notice and a keepsake; it earns the second opening, the screenshot, the forward to family group chats, by feeling like a film someone made for the couple, not a template downloaded for them.

It rejects, by name: stock wedding-builder sites with cursive scripts and gold foil, glittering metallic gradients and animated sparkles, pastel watercolor washes with copperplate scripts, oversized monogram-in-a-circle layouts, identical card grids, and the clean-white-with-rounded-buttons SaaS look. These are the absolute disqualifiers.

**Key Characteristics:**
- One committed warm anchor carries 30 to 60 percent of every surface.
- Bilingual integrity: Thai and English are visual equals at every level.
- One held shot: the hero is a single photograph, not a carousel.
- Cinematic captions: the ceremony timeline reads like a film slate.
- Quiet motion by default. One slow hero fade. `prefers-reduced-motion` drops to instant.

## 2. Colors

A committed warm anchor, against a sand-cream field, with the photograph carrying the rest. No gold anywhere.

### Primary
- **Last-Light Amber** (`[to be resolved during implementation]`): the committed warm. Carries 30 to 60 percent of every surface as page tint, large overlays on photography, and the headline color when it must run warm.

### Secondary
- **Sun-on-Skin Terracotta** (`[to be resolved during implementation]`): a deeper, redder warm. Used for emphasized moments (the date, the RSVP affirmation, the one ceremony moment that needs to land). Never simultaneously dominant with the amber; one leads, the other supports.

### Neutral
- **Sand Cream** (`[to be resolved during implementation]`): the calm field, the breath between warm passages. The reading surface for older relatives.
- **Driftwood Ink** (`[to be resolved during implementation]`): warm near-black for body type and small marks. Never `#000`; always tinted toward amber so it belongs to the same world.
- **Tide Shadow** (`[to be resolved during implementation]`): a deep, cool, warm-shadow color, used sparingly as the cool counterweight in an otherwise hot palette. The night side of golden hour. Photo backgrounds, one ribbon under the hero.

### Named Rules
**The No-Gold Rule.** Warmth comes from photography and light. No metallic gold, no foil gradients, no shimmering anything. If something wants to be gold, make it deeper amber instead.

**The One Lead Rule.** Amber or terracotta leads any given screen, never both at the same dominance. The other supports, in smaller doses.

**The Tinted-Neutral Rule.** Every neutral is tinted toward amber (chroma 0.005 to 0.01 in OKLCH terms). Pure black or pure white at any point is a defect.

## 3. Typography

**Display Font:** wide-set serif at large size, light weight (specific family `[to be chosen at implementation]`).
**Body Font:** warm humanist sans (specific family `[to be chosen at implementation]`).
**Timestamp Font:** monospace small-caps (specific family `[to be chosen at implementation]`), used ONLY for the four ceremony timestamps.
**Thai Pairing:** a Thai display + body pair sized and tracked to sit as a true equal to the Western pair (`[to be chosen at implementation]`).

**Character:** the display face reads like the title card at the start of a film. The body is unhurried and warm, generous in line-height. Mono is the slate timestamp, never a stylistic flourish.

### Hierarchy
- **Display** (light weight, very large with `clamp(...)`, generous tracking, line-height ~0.95): names ("Ice & Tao"), the date, and the closing line. Used at most three times in the entire card.
- **Headline** (regular weight, medium size, line-height ~1.1): section openings (Schedule, Venue, Hosts).
- **Body** (regular, 17px on phone, line-height ~1.6, line length capped at 60 to 72ch): all reading copy.
- **Body Thai** (regular, ~1.05x the body size, line-height ~1.7 to accommodate tone marks): every Thai body string.
- **Timestamp** (mono, small-caps, tracking ~+0.05em): used ONLY for the four ceremony timestamps (07:09, 09:09, 10:09, 12:00) and the venue line label.

### Named Rules
**The Slate Rule.** Mono small-caps appear only for the four ceremony timestamps and the venue label. Anywhere else, they are forbidden. They are the slate marks of the film, not a stylistic flourish.

**The Equal Tongues Rule.** Thai and English share rank, never hierarchy. The same word in both languages has visually equivalent presence. Thai is sized ~1.05x to compensate for stroke density and stretched in line-height to ~1.7 so tone marks have room. Thai is never set in a Western font; English is never set in a Thai font.

**The Three Displays Rule.** The display face appears at most three times across the entire card: the hero greeting (or names), the date, and the closing line. A fourth instance cheapens all three.

## 4. Elevation

Flat by default. Depth comes from photography, from warm-on-warm color layering, and from the held quality of the layout, not from shadows. The one exception is a single, barely-visible warm shadow under the hero photograph to ground it as a physical object on the page. Not a card shadow. Not a hover lift. Not parallax.

### Named Rules
**The Flat-by-Default Rule.** Surfaces are flat at rest. No card shadows, no hover elevations, no parallax depth tricks. Photography alone carries dimensionality.

**The One Ground Rule.** Only the hero photograph receives a warm, low-contrast ground shadow. Every other element rests on the surface unadorned.

## 5. Components

Components are deferred until first implementation. On the next pass with real code, `/impeccable document` will scan and document the actual button, navigation, schedule-row, photo-frame, and audio-toggle primitives.

Until then, treat the rules above (No-Gold, One Lead, Tinted-Neutral, Slate, Equal Tongues, Three Displays, Flat-by-Default, One Ground) as the binding constraints on any component a shape session proposes.

## 6. Do's and Don'ts

### Do:
- **Do** let one held photograph carry every section. The recipient sees a film, not a stock-photo grid.
- **Do** let the warm anchor (amber or terracotta) lead the surface, with sand-cream as the breath between warm passages.
- **Do** treat Thai and English as visual equals. Match weight, match presence, match care.
- **Do** reserve mono small-caps for the four ceremony timestamps (07:09, 09:09, 10:09, 12:00) and nothing else.
- **Do** default to flat surfaces. Photography handles dimensionality.
- **Do** honor `prefers-reduced-motion: reduce` by replacing the hero fade with instant content. The composition must hold without motion.
- **Do** size body type at 17 to 18px on phone, with Thai at ~1.05x of the Western body, so older relatives read without zooming.
- **Do** keep ambient audio opt-in only. A visible mute toggle, never autoplay, never override system mute.

### Don't:
- **Don't** use metallic gold, gold foil, or shimmering gradients. (See: The No-Gold Rule.)
- **Don't** use cursive script display fonts. The cinematic feeling comes from a serif title card, not calligraphy.
- **Don't** use spinning hearts, animated florals, glitter, sparkles, or any wedding-builder ornament.
- **Don't** use `#000` or `#fff` anywhere. Every neutral is tinted warm. (See: The Tinted-Neutral Rule.)
- **Don't** set Thai in a Western font, or English in a Thai font. (See: The Equal Tongues Rule.)
- **Don't** make Thai smaller, lighter, or grayer than English. Thai is never a translation afterthought.
- **Don't** use mono anywhere except the ceremony timestamps. (See: The Slate Rule.)
- **Don't** use the display face more than three times in the entire card. (See: The Three Displays Rule.)
- **Don't** carousel the photographs. One held shot per section.
- **Don't** add card shadows, hover elevations, or parallax. (See: The Flat-by-Default Rule.)
- **Don't** use oversized monogram-in-a-circle layouts, identical card grids, or any SaaS-clean white-with-rounded-buttons treatment.
- **Don't** autoplay the ambient audio. Visible toggle, default off, honor system mute.
- **Don't** use side-stripe borders (`border-left` greater than 1px as a colored accent). Use full borders, background tints, or nothing.
- **Don't** apply `background-clip: text` with a gradient. Solid color only. Emphasis comes from scale and weight.
