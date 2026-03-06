# Accessibility Audit Report

## Checklist Results

- **Keyboard Navigation**: Interactive elements use `<Link>` and `<button>` and are naturally focusable.
- **Color Contrast**: Text contrast ratios meet or exceed WCAG AA standards (e.g. text-gray-900 on white backgrounds, and white on teal-400 gradients).
- **ARIA Labels**: Present on icon-only interactive elements (e.g. `aria-label="Close menu"` in Header, `aria-label="Follow Paxway on Meta"` in Footer).
- **Screen Reader Compatibility**: Next.js `<Image>` components all include descriptive `alt` tags. Background decorative SVGs and elements use `aria-hidden="true"` (e.g., gradient background in page.tsx line 58).
- **Heading Hierarchy**: The structure follows logical cascading order (H1 -> H2 -> H3).

## Findings
The website passes all automated and manual accessibility checks reviewed. No critical issues were found.
