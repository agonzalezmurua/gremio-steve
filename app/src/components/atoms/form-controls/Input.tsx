import 'twin.macro';
import React from 'react';
import Styles from './Input.styles';

type InputProps = {
  icon?: JSX.Element | React.FC;
  error?: string;
  message?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FunctionComponent<InputProps> = ({
  icon,
  error,
  message,
  ...props
}) => (
  <section css={[Styles.Wrapper, error && Styles.ErrorWrapper]}>
    {(message || error) && (
      <section css={[Styles.Messsage]}>{message || error}</section>
    )}
    <input css={[Styles.Input]} {...props} />
    {icon && (
      <section aria-hidden css={[Styles.Icon]}>
        {icon}
      </section>
    )}
  </section>
);

export default Input;
