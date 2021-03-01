import { FocusRingFlatStyle } from '_/globals/styles/focus';
import tw, { styled, css } from 'twin.macro';
import { DefaultStyles, LinkStyles, IconStyles } from './styles';

export type Props = React.HTMLProps<HTMLButtonElement> & {
  color?: 'red' | 'default' | 'blue';
  variant?: 'default' | 'link' | 'icon';
  magnitude?: 'normal' | 'small' | 'self-contained';
  active?: boolean;
  fullWidth?: boolean;
};

const Button = styled.button<Props>((props) => {
  return [
    css`
      svg {
        ${tw`h-4 w-4`}
      }
    `,
    tw`
      transition-colors
      duration-200
      ease-in-out
      outline-none
      font-bold
      ring-offset-1
    `,
    props.fullWidth && tw`w-full`,
    props.magnitude === 'normal' && tw`p-2 p-2`,
    props.magnitude === 'small' && tw`p-1 px-1 text-sm`,
    props.variant === 'default' && DefaultStyles(props),
    props.variant === 'link' && LinkStyles(props),
    props.variant === 'icon' && IconStyles(props),
    FocusRingFlatStyle,
  ];
});

Button.defaultProps = {
  color: 'default',
  magnitude: 'normal',
  active: false,
  variant: 'default',
  type: 'button',
};

export default Button;
