import 'twin.macro';
import React from 'react';
import InputStyles from './Input.styles';

type InputProps = {
  icon?: JSX.Element;
  error?: boolean;
  message?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FunctionComponent<InputProps> = ({
  icon,
  error,
  message,
  ...props
}) => (
  <section css={[InputStyles.Wrapper]}>
    <input css={[InputStyles.Input]} {...props} />
    {icon && (
      <section aria-hidden css={[InputStyles.Icon]}>
        {icon}
      </section>
    )}
    {message && <section>{message}</section>}
  </section>
);

export default Input;
