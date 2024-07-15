import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                danger: colors.red['700'],
                'danger-hover': colors.red['600'],
                'danger-focus': colors.red['800'],
                primary: colors.emerald['400'],
                'primary-hover': colors.emerald['300'],
                'primary-focus': colors.emerald['500'],
                success: colors.green['600'],
                'dm-primary': '#0E1013',
                'dm-secondary': '#17181B',
                'dm-stroke': '#25272b',
                'lm-primary': colors.gray['50'],
                'lm-secondary': colors.white,
                'lm-stroke': colors.gray['100'],
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            width: {
                100: '25rem',
                150: '38rem',
                200: '50rem',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
} satisfies Config;
