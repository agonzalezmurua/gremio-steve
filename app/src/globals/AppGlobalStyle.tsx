import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components';
import FocusRingTwStyle, { FocusRingStyleString } from './ElementFocusStyle';

const AppGlobalStyle = createGlobalStyle`
  html, body {
    ${tw`bg-gray-100`}
  }

  h1, h2, h3, h4 ,h5 ,h6 {
    ${tw`text-gray-900`}
  }

  h1, h2, h3 {
    ${tw`font-bold`}
  }

  a {
    ${tw`font-semibold outline-none rounded`}
    * {
      ${tw`font-normal`}
    }
    &:hover, &:focus{
      text-decoration: underline;
      ${FocusRingTwStyle}
      ${tw`bg-blue-50`}
    }
  }

  p ~ p {
    ${tw`mt-6`}
  };

  strong {
    ${tw`text-gray-900`}
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
    ${tw`focus:outline-none`}
    ${FocusRingStyleString}
  }
`;

export default AppGlobalStyle;
