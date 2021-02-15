import tw, { css, styled } from 'twin.macro';

const RoundOutStyle = css`
  content: '';
  position: absolute;
  bottom: 0;
  width: 10px;
  height: 10px;
`;

const colors = {
  neutral: tw`light:(bg-gray-100) dark:(bg-gray-700)`,
  selected: tw`light:(bg-gray-200) dark:(bg-gray-800)`,
};

export const ListItem = styled.li<{ selected: boolean }>`
  ${tw`relative rounded-t-lg select-none cursor-pointer p-2 items-center`}
  ${colors.neutral}
  ${(props) => props.selected && colors.selected}

  &::after {
    ${RoundOutStyle}
    right: -10px;
    z-index: 1;
    ${colors.selected}
  }

  &::before {
    ${RoundOutStyle}
    left: -10px;
    z-index: 1;
    ${colors.selected}
  }

  section {
    &::after {
      ${RoundOutStyle}
      right: -10px;
      z-index: 2;
      ${colors.neutral}
      ${tw`rounded-bl-lg`}
    }
    &::before {
      ${RoundOutStyle}
      left: -10px;
      z-index: 1;
      ${colors.neutral}
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
      ${({ selected }) => (selected ? colors.selected : colors.neutral)}
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
