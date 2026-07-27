'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * SSR-safe wrapper around framer-motion's `useReducedMotion`.
 *
 * `useReducedMotion()` reads a media query, so it is always `false` during
 * server rendering but can be `true` on the client's very first render. Any
 * component that branches its markup on it (initial styles, `animate` props,
 * and the `will-change` framer-motion derives from them) therefore renders
 * different HTML on the server than on the client, and React fails hydration
 * for every visitor who has "reduce motion" enabled — discarding the
 * server-rendered document and re-rendering the whole page on the client.
 *
 * Reporting `false` until after mount keeps the first client render identical
 * to the server's. The real preference is applied on the next commit, which
 * happens immediately after hydration, so reduced-motion users still get
 * static visuals.
 */
export function useSafeReducedMotion(): boolean {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? Boolean(prefersReduced) : false;
}
