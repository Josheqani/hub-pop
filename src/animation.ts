/**
 * CSS keyframes powering the liquid/blob animations.
 *
 * - `hubpop-idle`  — a slow, subtle blob pulse while the button sits idle.
 * - `hubpop-card-in` — the card morphs from a circle (matching the button)
 *   into a rounded rectangle while scaling + fading in, giving a "blob pop".
 * - `hubpop-float-a` / `hubpop-float-b` — the two soft blobs drifting behind
 *   the card content to create an animated glass background.
 * - `hubpop-tip-in` — the attention tooltip popping in with a slight overshoot.
 */
export const blobKeyframes = `
@keyframes hubpop-idle {
  0%, 100% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
  50%      { border-radius: 56% 44% 47% 53% / 53% 46% 54% 47%; }
}

@keyframes hubpop-card-in {
  0%   { opacity: 0; transform: scale(0.6); border-radius: 50%; }
  55%  { opacity: 1; border-radius: 28px; }
  100% { opacity: 1; transform: scale(1); border-radius: 18px; }
}

@keyframes hubpop-float-a {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(-14px, 12px) scale(1.18); }
}

@keyframes hubpop-float-b {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(16px, -12px) scale(1.12); }
}

@keyframes hubpop-tip-in {
  0%   { opacity: 0; transform: translateY(6px) scale(0.9); }
  60%  { transform: translateY(-2px) scale(1.03); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
`;
