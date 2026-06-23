import { blobKeyframes } from './animation';

/**
 * Returns the full stylesheet for the widget as a single string.
 *
 * Theming and positioning are handled entirely through classes
 * (`hubpop-dark` / `hubpop-light`, `hubpop-bottom-right`, ...), so the
 * stylesheet is theme-agnostic and only needs to be injected once even
 * when multiple widgets with different options are mounted.
 */
export function getStyles(): string {
  return `
/* Fully detach from the host page: ':host { all: initial }' stops every
   inheritable property (direction, font, color, line-height, text-align, ...)
   from leaking across the shadow boundary, so RTL pages or global resets can't
   shift the widget. We then opt back into only what we need below. */
:host {
  all: initial;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

${blobKeyframes}

.hubpop-root {
  position: fixed;
  z-index: 2147483000;
  direction: ltr;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --hp-btn-bg: #24292e;
}

/* ---- positioning ---- */
.hubpop-bottom-right { bottom: 24px; right: 24px; }
.hubpop-bottom-left  { bottom: 24px; left: 24px; }
.hubpop-top-right    { top: 24px; right: 24px; }
.hubpop-top-left     { top: 24px; left: 24px; }

/* ---- themes ---- */
.hubpop-dark {
  --hp-card-bg: rgba(22, 27, 34, 0.95);
  --hp-text: #ffffff;
  --hp-accent: #58a6ff;
  --hp-accent2: #bc8cff;
  --hp-border: rgba(255, 255, 255, 0.08);
  --hp-hover: rgba(255, 255, 255, 0.06);
}
.hubpop-light {
  --hp-card-bg: rgba(255, 255, 255, 0.95);
  --hp-text: #24292e;
  --hp-accent: #0969da;
  --hp-accent2: #54aeff;
  --hp-border: rgba(0, 0, 0, 0.08);
  --hp-hover: rgba(0, 0, 0, 0.04);
}

/* ---- button ---- */
.hubpop-btn {
  width: 56px;
  height: 56px;
  padding: 0;
  cursor: pointer;
  position: relative;
  z-index: 2;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: var(--hp-btn-bg);
  border: 1px solid transparent;
  border-radius: 50%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  animation: hubpop-idle 6s ease-in-out infinite;
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    background 0.25s ease, border-color 0.25s ease;
}
/* glossy highlight that fades in on hover for the "glass" look */
.hubpop-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 55%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 0;
}
.hubpop-btn:hover {
  background: rgba(36, 41, 46, 0.45);
  -webkit-backdrop-filter: blur(10px) saturate(160%);
  backdrop-filter: blur(10px) saturate(160%);
  border-color: rgba(255, 255, 255, 0.30);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.40);
  transform: scale(1.08);
}
.hubpop-btn:hover::before { opacity: 1; }
.hubpop-btn:active { transform: scale(0.96); }
.hubpop-btn:focus-visible { outline: 2px solid var(--hp-accent); outline-offset: 3px; }
.hubpop-open .hubpop-btn { animation: none; border-radius: 50%; }
.hubpop-btn .hubpop-icon { display: block; position: relative; z-index: 1; }

/* ---- card ---- */
.hubpop-card {
  position: absolute;
  width: 240px;
  padding: 18px;
  overflow: hidden;
  color: var(--hp-text);
  background: var(--hp-card-bg);
  border: 1px solid var(--hp-border);
  border-radius: 18px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: scale(0.85);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
}
/* animated glass background: two soft accent blobs drifting behind content */
.hubpop-card::before,
.hubpop-card::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(34px);
  opacity: 0.2;
  pointer-events: none;
  z-index: 0;
}
.hubpop-card::before {
  width: 170px;
  height: 170px;
  top: -55px;
  right: -40px;
  background: var(--hp-accent);
  animation: hubpop-float-a 9s ease-in-out infinite;
}
.hubpop-card::after {
  width: 150px;
  height: 150px;
  bottom: -60px;
  left: -40px;
  background: var(--hp-accent2);
  animation: hubpop-float-b 11s ease-in-out infinite;
}
.hubpop-open .hubpop-card {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: scale(1);
  animation: hubpop-card-in 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
}

/* card anchored to the button corner, growing from it */
.hubpop-bottom-right .hubpop-card,
.hubpop-bottom-left  .hubpop-card { bottom: 70px; }
.hubpop-top-right    .hubpop-card,
.hubpop-top-left     .hubpop-card { top: 70px; }

.hubpop-bottom-right .hubpop-card { right: 0; transform-origin: bottom right; }
.hubpop-bottom-left  .hubpop-card { left: 0;  transform-origin: bottom left; }
.hubpop-top-right    .hubpop-card { right: 0; transform-origin: top right; }
.hubpop-top-left     .hubpop-card { left: 0;  transform-origin: top left; }

/* ---- card contents (kept above the animated background) ---- */
.hubpop-name {
  position: relative;
  z-index: 1;
  margin: 0 0 14px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--hp-text);
  word-break: break-word;
}
.hubpop-links {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.hubpop-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 11px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: var(--hp-text);
  border-radius: 10px;
  transition: background 0.18s ease, color 0.18s ease;
}
.hubpop-link:hover { background: var(--hp-hover); color: var(--hp-accent); }
.hubpop-link .hubpop-icon { flex: 0 0 auto; color: var(--hp-accent); }
.hubpop-link span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ---- attention tooltip ---- */
.hubpop-tooltip {
  position: absolute;
  white-space: nowrap;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--hp-text);
  background: var(--hp-card-bg);
  border: 1px solid var(--hp-border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.25s ease, visibility 0.25s;
  z-index: 3;
}
.hubpop-bottom-right .hubpop-tooltip,
.hubpop-bottom-left  .hubpop-tooltip { bottom: 70px; }
.hubpop-top-right    .hubpop-tooltip,
.hubpop-top-left     .hubpop-tooltip { top: 70px; }
.hubpop-bottom-right .hubpop-tooltip,
.hubpop-top-right    .hubpop-tooltip { right: 0; }
.hubpop-bottom-left  .hubpop-tooltip,
.hubpop-top-left     .hubpop-tooltip { left: 0; }

/* triangle pointer aimed at the button */
.hubpop-tooltip::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}
/* button sits below the tooltip -> arrow points down */
.hubpop-bottom-right .hubpop-tooltip::after,
.hubpop-bottom-left  .hubpop-tooltip::after {
  top: 100%;
  margin-top: -1px;
  border-top-color: var(--hp-card-bg);
}
/* button sits above the tooltip -> arrow points up */
.hubpop-top-right .hubpop-tooltip::after,
.hubpop-top-left  .hubpop-tooltip::after {
  bottom: 100%;
  margin-bottom: -1px;
  border-bottom-color: var(--hp-card-bg);
}
/* align the arrow over the button's center (button is 56px wide) */
.hubpop-bottom-right .hubpop-tooltip::after,
.hubpop-top-right    .hubpop-tooltip::after { right: 22px; }
.hubpop-bottom-left  .hubpop-tooltip::after,
.hubpop-top-left     .hubpop-tooltip::after { left: 22px; }

.hubpop-tip .hubpop-tooltip {
  opacity: 1;
  visibility: visible;
  animation: hubpop-tip-in 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
/* never show the nudge while the card is open */
.hubpop-open .hubpop-tooltip { opacity: 0 !important; visibility: hidden !important; }

/* ---- accessibility: respect reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .hubpop-btn,
  .hubpop-btn:hover,
  .hubpop-open .hubpop-card,
  .hubpop-card::before,
  .hubpop-card::after,
  .hubpop-tip .hubpop-tooltip { animation: none !important; }
}
`;
}
