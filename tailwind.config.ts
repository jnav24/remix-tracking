import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                blur: 'blur 3s linear infinite',
            },
            backgroundSize: {
                'size-200': '200% 200%',
            },
            backgroundPosition: {
                'pos-0': '0% 0%',
                'pos-100': '100% 100%',
            },
            colors: {
                danger: colors.red['700'],
                'danger-hover': colors.red['600'],
                'danger-focus': colors.red['800'],
                primary: colors.emerald['400'],
                'primary-hover': colors.emerald['300'],
                'primary-focus': colors.emerald['500'],
                warning: colors.yellow['400'],
                'warning-hover': colors.yellow['300'],
                'warning-focus': colors.yellow['500'],
                success: colors.green['600'],
                'dm-primary': '#0E1013',
                'dm-secondary': '#17181B',
                'dm-stroke': '#25272b',
                'dm-text': '#41444c',
                'dm-text-hover': '#575b66',
                'dm-disabled': '#3C3C3C',
                'dm-text-disabled': '#777777',
                'lm-primary': colors.gray['50'],
                'lm-secondary': colors.white,
                'lm-stroke': colors.gray['200'],
                'lm-text': colors.gray['300'],
                'lm-text-hover': colors.gray['500'],
                'lm-disabled': '#E5E5E5',
                'lm-text-disabled': '#ABABAB',
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                blur: {
                    '0%': {
                        opacity: '0.6',
                        transform: 'rotate(0deg)',
                    },
                    '50%': {
                        opacity: '0.75',
                        transform: 'rotate(180deg)',
                    },
                    '100%': {
                        opacity: '0.6',
                        transform: 'rotate(360deg)',
                    },
                },
            },
            width: {
                100: '25rem',
                104: '26rem',
                120: '30rem',
                128: '32rem',
                150: '38rem',
                200: '50rem',
                256: '64rem',
            },
            zIndex: {
                '100': '100',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
} satisfies Config;
