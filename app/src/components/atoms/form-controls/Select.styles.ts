import tw, { css } from 'twin.macro';

const Option = css`
  ${tw`relative text-sm cursor-pointer bg-white flex flex-row items-center h-8 space-x-1 px-2 hover:(bg-gray-300)`}
  &[aria-selected="true"] {
    ${tw`bg-blue-300`}
  }
  > svg {
    ${tw`h-4 w-4`}
  }
`;

const Select = css``;

const Wrapper = css``;

const DisabledBackground = css`
  ${tw`bg-gray-200`}
`;

const MapModeSelectStyles = {
  Option: Option,
  Wrapper: Wrapper,
  Select: Select,
  DisabledBackground: DisabledBackground,
};

export default MapModeSelectStyles;
