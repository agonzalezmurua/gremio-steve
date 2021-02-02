import tw, { css, styled } from 'twin.macro';

const RoundOutStyle = css`
  content: '';
  position: absolute;
  bottom: 0;
  width: 10px;
  height: 10px;
`;

export const ListItem = styled.li<{ selected: boolean }>`
  ${tw`relative rounded-t-lg select-none cursor-pointer p-1 p-2 items-center light:(bg-gray-100) dark:(bg-gray-700)`}
  ${(props) => props.selected && tw`light:(bg-gray-200) dark:(bg-gray-800)`}

  &::after {
    ${RoundOutStyle}
    right: -10px;
    z-index: 1;
    ${tw`light:bg-gray-200 dark:bg-gray-800`}
  }
  &::before {
    ${RoundOutStyle}
    left: -10px;
    z-index: 1;
    ${tw`light:bg-gray-200  bg-gray-800`}
  }

  section {
    &::after {
      ${RoundOutStyle}
      right: -10px;
      z-index: 2;
      ${tw`light:bg-gray-100 dark:bg-gray-700`}
      ${tw`rounded-bl-lg`}
    }
    &::before {
      ${RoundOutStyle}
      left: -10px;
      z-index: 1;
      ${tw`light:bg-gray-100 bg-gray-700`}
      ${tw`rounded-br-lg`}
    }
  }

  &:first-child::before,
  &:first-child section::before {
    content: none;
  }
  &:last-child {
    section:after {
      ${tw`light:bg-white dark:bg-gray-900`}
    }

    ::after {
      ${({ selected }) =>
        selected
          ? tw`light:bg-gray-200 dark:bg-gray-800`
          : tw`light:bg-gray-100 dark:bg-gray-700`}
    }
  }

  ${({ selected }) =>
    !selected &&
    css`
      &::before,
      :not(:last-child)::after,
      :not(:last-child) section::after,
      section::before {
        content: none;
      }
    `}
`;

ListItem.displayName = 'GameMaptable.ListItem';
