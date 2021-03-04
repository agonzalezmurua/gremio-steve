import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components';
import FocusRingTwStyle, { FocusRingStyleString } from './globals/styles/focus';
import ArticleStyle from './globals/styles/article';

const AppGlobalStyle = createGlobalStyle`
  html, body, #root {
    ${tw`light:(bg-white) dark:(bg-gray-800)`}
    ${tw`light:text-black dark:text-gray-300`}
  }
  #root {
    ${tw`h-screen w-screen`}
  }

  h1, h2, h3, h4 ,h5 ,h6 {
    ${tw`light:text-gray-900 dark:text-white font-bold`}
  }

  a {
    &:focus {
      ${FocusRingTwStyle}
    }
    &:hover, &:focus{
      text-decoration: underline;
    }
  }

  article {
    ${ArticleStyle}
  }

  p ~ p {
    ${tw`mt-6`}
  };

  strong {
    ${tw`light:text-gray-900 dark:text-gray-100`}
  }

  h1 {
    ${tw`(text-2xl font-bold)!`}
  }
  h2 {
    ${tw`(text-xl font-bold)!`}
  }
  h3 {
    ${tw`(text-lg font-bold)!`}
  }
  h4 {
    ${tw`(text-base! font-bold)`}
  }
  h5 {
    ${tw`(text-sm font-bold)!`}
  }
  h6 {
    ${tw`(text-xs font-bold)!`}
  }

  legend {
    ${tw`font-bold`}
    font-size: 1.25rem;
  }

  .visually-hidden {
    clip: rect(0 0 0 0);
    overflow: hidden;
    position: absolute;
    height: 1px;
    width: 1px;
  }

  input, button, textarea, section {
    ${tw`bg-transparent focus:outline-none transition-colors duration-300`}
    ${FocusRingStyleString}
  }
`;

export default AppGlobalStyle;
