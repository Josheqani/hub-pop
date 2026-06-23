import { createWidget } from './widget';

/** Corner the floating button is anchored to. */
export type Position = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

/** Visual theme of the card. */
export type Theme = 'dark' | 'light';

/** Configuration options for {@link HubPop}. */
export interface HubPopOptions {
  /** Display name shown big and bold at the top of the card. Required. */
  name: string;
  /** Full URL to the GitHub profile. Required. */
  github: string;
  /** Optional full URL to a personal website. The website row is hidden if omitted. */
  website?: string;
  /** Corner to anchor the button to. Defaults to `'bottom-right'`. */
  position?: Position;
  /** Color theme. Defaults to `'dark'`. */
  theme?: Theme;
}

/** Handle returned by {@link HubPop} for programmatic control. */
export interface HubPopInstance {
  /** Open the card. */
  open: () => void;
  /** Close the card. */
  close: () => void;
  /** Toggle the card open/closed. */
  toggle: () => void;
  /** Remove the widget from the DOM and detach all listeners. */
  destroy: () => void;
}

/**
 * Mount a floating GitHub card widget in a corner of the page.
 *
 * @example
 * HubPop({ name: 'Ali', github: 'https://github.com/ali', website: 'https://ali.dev' });
 */
export function HubPop(options: HubPopOptions): HubPopInstance {
  return createWidget(options);
}

export default HubPop;
