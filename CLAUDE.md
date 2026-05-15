# Ice & Tao Wedding Invitation

## Design Context

This project is a **bilingual (Thai + English) digital wedding invitation** for Waranphat (Ice) & Rakpon (Tao), 27 June 2026, beach ceremony in Thailand.

Register: **brand** (the design IS the product).

Before any design or implementation work, read:
- **[PRODUCT.md](./PRODUCT.md)** — strategic context: users, purpose, brand personality, anti-references, design principles, accessibility requirements.
- **[DESIGN.md](./DESIGN.md)** — visual system (currently a SEED, pending implementation): Creative North Star "The Long Look at Golden Hour," palette direction, typography rules, named rules, do's and don'ts.

The skill `/impeccable` (and its sub-commands `shape`, `craft`, `polish`, `live`, etc.) automatically load both files.

## Project Facts

- **Couple**: Waranphat (Ice) & Rakpon (Tao)
- **Date**: 27 June 2026
- **Venue**: ศาลาประชาคมอ่าวอุดม (Ao Udom Community Hall) — `https://www.google.com/maps?ftid=0x3102b9dc66aab801:0x324502b197b41df8`
- **Ceremony timeline**:
  - 07:09 — พิธีสงฆ์ (Buddhist monk ceremony)
  - 09:09 — พิธีแห่ขันหมาก (Khan Maak procession)
  - 10:09 — ยกน้ำชา (Tea ceremony)
  - 12:00 — รับประทานอาหาร (Reception lunch)
- **Ambient audio (opt-in only, never autoplay)**: New West — *Those Eyes*

## Binding Rules (Quick Reference)

From DESIGN.md, every visual decision honors:

- **The No-Gold Rule** — no metallic gold, foil, or sparkle. Warmth comes from photography.
- **The One Lead Rule** — amber or terracotta leads any screen; never both at the same dominance.
- **The Tinted-Neutral Rule** — every neutral is tinted warm. No `#000` or `#fff`.
- **The Slate Rule** — monospace small-caps appear only for the four ceremony timestamps.
- **The Equal Tongues Rule** — Thai and English are visual equals at every level.
- **The Three Displays Rule** — the display face appears at most three times in the entire card.
- **The Flat-by-Default Rule** — no card shadows, no hover lifts, no parallax. Only the hero photo gets a single ground shadow.

## When ready to build

Run `/impeccable shape` to plan the page structure and interactions, then `/impeccable craft` to implement. Re-run `/impeccable document` once tokens and components exist to replace the seed DESIGN.md with the real visual system.
