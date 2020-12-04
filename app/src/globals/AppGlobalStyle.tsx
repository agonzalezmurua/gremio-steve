import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components';
import FocusStyle from './ElementFocusStyle';

const AppGlobalStyle = createGlobalStyle`
  html, body {
    ${tw`text-gray-700 bg-gray-100`}
  }

  h1, h2, h3, h4 ,h5 ,h6 {
    ${tw`text-gray-900`}
  }

  a:hover {
    text-decoration: underline;
  }

  p ~ p {
    ${tw`mt-6`}
  };

  strong {
    ${tw`text-gray-900`}
  }

  h1 {
    font-size: 2.25rem;
    ${tw`mb-2`}
  }
  h2 {
    font-size: 1.75rem;
    ${tw`mb-2`}
  }
  h3 {
    font-size: 1.5rem;
    ${tw`mb-1`}
  }
  h4 {
    font-size: 1.25rem;
    ${tw`mb-1`}
  }
  h5 {
    font-size: 1rem;
  }
  h6 {
    font-size: 0.75rem;
  }

  legend {
    ${tw`font-bold`}
    font-size: 1.25rem;
  }

  .sr-only {
    clip: rect(0 0 0 0);
    overflow: hidden;
    position: absolute;
    height: 1px;
    width: 1px;
  }

  input, button, textarea, section {
    ${tw`focus:outline-none`}
  }
`;

export default AppGlobalStyle;
