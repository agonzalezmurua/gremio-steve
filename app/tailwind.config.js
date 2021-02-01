const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'media',
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.trueGray,
      },
      keyframes: {
        fadeout: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeout: 'fadeout 200ms ease-in-out forwards',
        fadein: 'fadein 200ms ease-in-out forwards',
      },
    },
  },
  variants: {},
  plugins: [],
};
