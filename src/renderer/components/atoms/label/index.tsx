import { styled } from 'twin.macro';
import React from 'react';
import Styles from './styles';

type Props = {
  text: string;
  htmlFor: string;
  required?: boolean;
};

const Label: React.FC<Props> = ({
  text,
  required,
  children,
  htmlFor,
  ...props
}) => {
  return (
    <section css={[Styles.Wrapper]} {...props}>
      <label htmlFor={htmlFor} css={[Styles.Label]}>
        {text}
        {required && <span tw="font-bold"> *</span>}
      </label>
      {children}
    </section>
  );
};

Label.defaultProps = {
  required: false,
};

export default styled(Label)``;
