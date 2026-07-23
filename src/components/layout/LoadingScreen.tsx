'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/logo/Logo';
import { useI18n } from '@/i18n/LanguageProvider';

const SESSION_KEY = 'loremed-intro-seen';
const MIN_MS = 650; // just enough for the fade to register — not an artificial stall
const MAX_MS = 2000; // hard ceiling per brief
const EXIT_MS = 750;

export function LoadingScreen() {
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const [visible, setVisible] = useState(true);
  const [removed, setRemoved] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    // Already greeted this session → hide instantly, no flash.
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* ignore */
    }
    if (seen) {
      setInstant(true);
      setVisible(false);
      return;
    }

    const root = document.documentElement;
    root.dataset.loading = 'true';
    document.body.style.overflow = 'hidden';

    const start = performance.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, (reduce ? 0 : MIN_MS) - elapsed);
      window.setTimeout(() => {
        root.dataset.loading = 'false';
        setVisible(false);
        try {
          sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          /* ignore */
        }
      }, wait);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }
    const cap = window.setTimeout(finish, MAX_MS);

    return () => {
      window.clearTimeout(cap);
      window.removeEventListener('load', finish);
      root.dataset.loading = 'false';
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (removed) return null;

  return (
    <motion.div
      aria-hidden={!visible}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible || reduce ? 1 : 0.965 }}
      transition={{ duration: instant ? 0 : visible ? 0 : EXIT_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      onAnimationComplete={() => {
        if (!visible) {
          setRemoved(true);
          document.body.style.overflow = '';
        }
      }}
    >
      {/* Soft breathing glow behind the mark */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[46rem] w-[46rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(236,105,29,0.12), rgba(84,62,132,0.10) 45%, rgba(255,255,255,0) 70%)',
        }}
        animate={reduce ? undefined : { scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4.4, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={reduce ? undefined : { scale: [1, 1.025, 1] }}
            transition={{ duration: 4.4, ease: 'easeInOut', repeat: Infinity }}
          >
            <Logo orientation="stacked" markClassName="h-[4.5rem]" wordClassName="text-4xl" />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center gap-1"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.28 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="text-xs font-semibold uppercase tracking-[0.42em] text-ink-muted sm:text-sm"
          >
            {t('loading.line1')}
          </motion.p>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="text-2xl font-extrabold uppercase tracking-[0.16em] text-primary-800 sm:text-[2rem]"
          >
            <span className="text-gradient">{t('loading.line2')}</span>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
