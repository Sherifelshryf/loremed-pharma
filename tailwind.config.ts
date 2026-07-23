import type { Config } from 'tailwindcss';

/**
 * Loremed Pharma — Design System
 * ------------------------------------------------------------------
 * Every token below is derived from the official Loremed logo.
 *   Primary  = the logo's deep indigo-violet  (#322353)
 *   Secondary= the logo's vivid pharma orange  (#EC691D)
 * Neutrals carry a faint violet tint so grays feel part of the brand.
 * Scales run 50 → 950 and are fully Tailwind-compatible.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        // ---- PRIMARY · Loremed Purple (brand = 800) --------------------
        primary: {
          50: '#F6F4FB',
          100: '#EBE6F6',
          200: '#D8CFEC',
          300: '#B9A9DB',
          400: '#927BC0',
          500: '#6D51A2',
          600: '#543E84',
          700: '#3F2E66',
          800: '#322353', // official brand purple
          900: '#231A3B',
          950: '#16102A',
          DEFAULT: '#322353',
        },
        // ---- SECONDARY · Loremed Orange (brand = 500) ------------------
        secondary: {
          50: '#FEF4EC',
          100: '#FDE7D3',
          200: '#FACBA6',
          300: '#F6AB70',
          400: '#F18841',
          500: '#EC691D', // official brand orange
          600: '#D2540F',
          700: '#AE410F',
          800: '#8B3513',
          900: '#722D13',
          950: '#3D1507',
          DEFAULT: '#EC691D',
        },
        // ---- NEUTRAL · violet-tinted ink -------------------------------
        neutral: {
          50: '#F8F8FC',
          100: '#F1F1F7',
          200: '#E5E4EE',
          300: '#D0CFDD',
          400: '#A2A0B5',
          500: '#726F88',
          600: '#565368',
          700: '#403D50',
          800: '#2A2838',
          900: '#1A1826',
          950: '#0E0D16',
        },
        // ---- SEMANTIC --------------------------------------------------
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#16A34A',
          600: '#15803D',
          700: '#166534',
          DEFAULT: '#16A34A',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          DEFAULT: '#F59E0B',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#E5484D',
          600: '#DC2626',
          700: '#B91C1C',
          DEFAULT: '#DC2626',
        },
        info: {
          50: '#EEF1FE',
          100: '#E0E5FC',
          500: '#5B6EE1',
          600: '#4453C4',
          700: '#37409E',
          DEFAULT: '#5B6EE1',
        },
        // ---- SURFACE / SEMANTIC UI TOKENS ------------------------------
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8F8FC',
          sunken: '#F1F1F7',
          inverse: '#231A3B',
        },
        ink: {
          DEFAULT: '#1A1826',
          soft: '#565368',
          muted: '#726F88',
          inverse: '#FFFFFF',
        },
        line: {
          DEFAULT: '#E7E5F0',
          strong: '#D0CFDD',
          inverse: 'rgba(255,255,255,0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 7vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-xl': ['clamp(2.5rem, 5.4vw, 4.25rem)', { lineHeight: '1.05', letterSpacing: '-0.028em', fontWeight: '700' }],
        'display-lg': ['clamp(2.1rem, 4.2vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm': ['clamp(1.4rem, 2.2vw, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        eyebrow: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '600' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26,24,38,0.04), 0 6px 20px -6px rgba(26,24,38,0.08)',
        card: '0 2px 4px rgba(26,24,38,0.03), 0 18px 40px -16px rgba(35,26,59,0.16)',
        lift: '0 24px 60px -20px rgba(50,35,83,0.30)',
        glow: '0 0 0 1px rgba(50,35,83,0.05), 0 28px 64px -24px rgba(50,35,83,0.40)',
        'glow-orange': '0 18px 48px -16px rgba(236,105,29,0.50)',
        ring: '0 0 0 4px rgba(109,81,162,0.18)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.6)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, rgba(255,255,255,0.9))',
        'brand-gradient':
          'linear-gradient(135deg, #322353 0%, #543E84 45%, #EC691D 130%)',
        'brand-gradient-soft':
          'linear-gradient(135deg, #F6F4FB 0%, #FDE7D3 100%)',
        'sheen':
          'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-soft': 'cubic-bezier(0.65, 0, 0.35, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.5deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-22px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        breathe: 'breathe 4.5s ease-in-out infinite',
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float-slow 11s ease-in-out infinite',
        shimmer: 'shimmer 2.2s infinite',
        'gradient-pan': 'gradient-pan 9s ease infinite',
        marquee: 'marquee 38s linear infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
