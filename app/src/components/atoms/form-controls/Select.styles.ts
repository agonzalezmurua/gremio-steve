import tw, { css } from 'twin.macro';
import InputStyles from './Input.styles';

const OptionsWrapper = tw`bg-white absolute w-full shadow-md rounded border z-50`;

const OptionHoverStyle = css`
  &:active,
  &:focus,
  &:hover {
    ${tw`bg-blue-200`}
  }
`;

const Option = css`
  ${tw`relative text-sm cursor-pointer bg-white flex flex-row items-center h-8 space-x-1 px-2`}
  ${OptionHoverStyle}
  &[aria-selected='true'] {
    ${tw`bg-blue-50`}
    ${OptionHoverStyle}
  }
  > svg {
    ${tw`h-4 w-4`}
  }
`;

const Input = css`
  ${Option}
  ${tw`flex-grow p-0 hover:(bg-transparent) border-r border-gray-300 mr-2`}
`;

const ListBoxWrapper = css`
  ${InputStyles.Input}
  ${tw`flex items-center w-full`}
  input {
    ${tw`cursor-pointer select-none`}
  }
`;

const Wrapper = css`
  ${InputStyles.Wrapper}
  ${tw`cursor-pointer flex-col relative`}
`;

const DisabledBackground = css`
  ${tw`bg-gray-200`}
`;

const MapModeSelectStyles = {
  Option: Option,
  Wrapper: Wrapper,
  OptionsWrapper: OptionsWrapper,
  ListBoxWrapper: ListBoxWrapper,
  Selected: Input,
  DisabledBackground: DisabledBackground,
};

export default MapModeSelectStyles;
