module.exports = {
  darkMode: 'media',
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    maxHeight: {
      24: '6rem',
    },
    extend: {
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
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
