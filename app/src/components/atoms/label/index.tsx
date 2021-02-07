import { styled } from 'twin.macro';
import React from 'react';
import Styles from './styles';

type Props = {
  text: string;
  htmlFor: string;
};

const Label: React.FC<Props> = ({ text, children, htmlFor, ...props }) => {
  return (
    <section css={[Styles.Wrapper]} {...props}>
      <label htmlFor={htmlFor} css={[Styles.Label]}>
        {text}
      </label>
      {children}
    </section>
  );
};

export default styled(Label)``;
