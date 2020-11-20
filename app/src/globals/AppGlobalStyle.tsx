import tw from "twin.macro";
import { createGlobalStyle } from "styled-components";

const AppGlobalStyle = createGlobalStyle`
  html, body {
    ${tw`text-gray-700 bg-gray-100`}
  }

  h1, h2, h3, h4 ,h5 ,h6 {
    ${tw`text-gray-900`}
  }

  p ~ p {
    ${tw`mt-6`}
  };

  strong {
    ${tw`text-gray-900`}
  }

  h1 {
    font-size: 2.75rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.25rem;
  }
  h5 {
    font-size: 1rem;
  }
  h6 {
    font-size: 0.75rem;
  }
`;

export default AppGlobalStyle;
