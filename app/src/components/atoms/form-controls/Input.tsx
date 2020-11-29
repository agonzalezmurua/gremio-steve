import React from 'react';
import 'twin.macro';
import InputStyles from './Input.styles';

type InputProps = {
  icon?: JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FunctionComponent<InputProps> = ({ icon, ...props }) => (
  <section css={[InputStyles.Wrapper]}>
    {icon && (
      <section aria-hidden css={[InputStyles.Icon]}>
        {icon}
      </section>
    )}
    <input css={[InputStyles.Input]} {...props} />
  </section>
);

export default Input;
