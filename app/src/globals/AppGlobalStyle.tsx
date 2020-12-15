import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components';
import FocusRingTwStyle, { FocusRingStyleString } from './ElementFocusStyle';
import ArticleStyle from './ArticleStyles';

const AppGlobalStyle = createGlobalStyle`
  html, body {
    ${tw`bg-gray-100 dark:(bg-gray-800)`}
    ${tw`light:text-black dark:text-gray-300`}
  }

  h1, h2, h3, h4 ,h5 ,h6 {
    ${tw`light:text-gray-900 dark:text-white`}
  }

  h1, h2, h3 {
    ${tw`font-bold`}
  }

  a {
    ${tw`outline-none rounded`}
    &:hover, &:focus{
      text-decoration: underline;
      ${FocusRingTwStyle}
      ${tw`light:bg-blue-50 dark:bg-black`}
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
    ${tw`text-3xl`}
  }
  h2 {
    ${tw`text-2xl`}
  }
  h3 {
    ${tw`text-xl`}
  }
  h4 {
    ${tw`text-lg`}
  }
  h5 {
    ${tw`text-base`}
  }
  h6 {
    ${tw`text-sm`}
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
