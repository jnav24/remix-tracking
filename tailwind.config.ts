import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                danger: colors.red['700'],
                'danger-hover': colors.red['600'],
                'danger-focus': colors.red['800'],
                primary: colors.orange['400'],
                'primary-hover': colors.orange['300'],
                'primary-focus': colors.orange['500'],
                success: colors.green['600'],
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
