import tw, { css } from 'twin.macro';

const Item = css`
  ${tw`relative text-sm cursor-pointer bg-white flex flex-row items-center h-8 space-x-1 px-2 hover:(bg-gray-300)`}
  &[aria-selected="true"] {
    ${tw`bg-blue-300`}
  }
  > svg {
    ${tw`h-4 w-4`}
  }
`;

const Selected = css`
  ${Item}

  ${tw`flex-grow p-0 hover:(bg-transparent)`}
`;

const MapModeSelectStyles = {
  Item: Item,
  Selected: Selected,
};

export default MapModeSelectStyles;
