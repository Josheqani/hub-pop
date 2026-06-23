import type { HubPopOptions, HubPopInstance } from './index';
import { getStyles } from './styles';

const STYLE_ID = 'hubpop-styles';

/** Official GitHub mark, inlined so the package has zero runtime deps. */
function githubIcon(size: number): string {
  return `<svg class="hubpop-icon" width="${size}" height="${size}" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`;
}

/** Simple globe glyph for the website link. */
function globeIcon(size: number): string {
  return `<svg class="hubpop-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
}

/** Inject the shared stylesheet once per document. */
function ensureStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = getStyles();
  document.head.appendChild(style);
}

/** Build a single anchor row (icon + label) for the card. */
function createLink(href: string, label: string, icon: string): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = 'hubpop-link';
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.innerHTML = icon;
  const text = document.createElement('span');
  text.textContent = label;
  link.appendChild(text);
  return link;
}

/**
 * Creates, injects and wires up a single widget instance.
 * @internal — consumers should call the public {@link HubPop} function.
 */
export function createWidget(options: HubPopOptions): HubPopInstance {
  const {
    name,
    github,
    website,
    position = 'bottom-right',
    theme = 'dark',
  } = options;

  if (typeof document === 'undefined') {
    throw new Error('[hub-pop] HubPop can only run in a browser environment.');
  }
  if (!name || !github) {
    throw new Error('[hub-pop] "name" and "github" options are required.');
  }

  ensureStyles();

  // ---- structure ----
  const root = document.createElement('div');
  root.className = `hubpop-root hubpop-${position} hubpop-${theme}`;

  const card = document.createElement('div');
  card.className = 'hubpop-card';
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-label', `${name} — links`);

  const nameEl = document.createElement('div');
  nameEl.className = 'hubpop-name';
  nameEl.textContent = name;

  const links = document.createElement('div');
  links.className = 'hubpop-links';
  links.appendChild(createLink(github, 'GitHub', githubIcon(18)));
  if (website) {
    links.appendChild(createLink(website, 'Website', globeIcon(18)));
  }

  card.appendChild(nameEl);
  card.appendChild(links);

  const btn = document.createElement('button');
  btn.className = 'hubpop-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Toggle GitHub card');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = githubIcon(26);

  const tooltip = document.createElement('div');
  tooltip.className = 'hubpop-tooltip';
  tooltip.textContent = "hey i'm here :)";

  root.appendChild(card);
  root.appendChild(tooltip);
  root.appendChild(btn);

  // ---- mount (defer until <body> exists) ----
  const mount = (): void => {
    document.body.appendChild(root);
  };
  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  }

  // ---- behavior ----
  let isOpen = false;

  // Periodic "hey i'm here :)" nudge until the user first opens the card.
  let engaged = false;
  let hideTipTimer: ReturnType<typeof setTimeout> | undefined;
  const showTip = (): void => {
    if (engaged || isOpen) return;
    root.classList.add('hubpop-tip');
    hideTipTimer = setTimeout(() => root.classList.remove('hubpop-tip'), 4000);
  };
  const firstTipTimer = setTimeout(showTip, 2500);
  const tipInterval = setInterval(showTip, 12000);
  const stopTips = (): void => {
    engaged = true;
    clearTimeout(firstTipTimer);
    clearTimeout(hideTipTimer);
    clearInterval(tipInterval);
    root.classList.remove('hubpop-tip');
  };

  const open = (): void => {
    isOpen = true;
    stopTips();
    root.classList.add('hubpop-open');
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = (): void => {
    isOpen = false;
    root.classList.remove('hubpop-open');
    btn.setAttribute('aria-expanded', 'false');
  };
  const toggle = (): void => (isOpen ? close() : open());

  const onButtonClick = (e: MouseEvent): void => {
    e.stopPropagation();
    toggle();
  };
  const onCardClick = (e: MouseEvent): void => e.stopPropagation();
  const onDocClick = (e: MouseEvent): void => {
    if (isOpen && !root.contains(e.target as Node)) close();
  };
  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && isOpen) close();
  };

  btn.addEventListener('click', onButtonClick);
  card.addEventListener('click', onCardClick);
  document.addEventListener('click', onDocClick);
  document.addEventListener('keydown', onKeyDown);

  const destroy = (): void => {
    clearTimeout(firstTipTimer);
    clearTimeout(hideTipTimer);
    clearInterval(tipInterval);
    document.removeEventListener('click', onDocClick);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('DOMContentLoaded', mount);
    root.remove();
  };

  return { open, close, toggle, destroy };
}
