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
      },
      animation: {
        fadeout: 'fadeout 1s ease-in-out forwards',
      },
    },
  },
  variants: {},
  plugins: [],
};
