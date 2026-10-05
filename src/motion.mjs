/** Shared canvas/SWF foreground state; y is pixels and alpha is in [0, 1]. */
export function frameState(timeSeconds, duration, motion, height) {
  if (motion === 'still') return { alpha: 1, y: 0 };
  const progress = Math.max(0, Math.min(1, timeSeconds / 0.7, (duration - timeSeconds) / 0.7));
  const eased = progress * progress * (3 - 2 * progress);
  return {
    alpha: Math.round(eased * 256) / 256,
    y: motion === 'rise' ? Math.round(Math.min(40, height * 0.06) * (1 - eased) * 20) / 20 : 0,
  };
}
