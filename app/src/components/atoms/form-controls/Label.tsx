import React from 'react';
import tw, { styled } from 'twin.macro';
import Styles from './Label.styles';

type LabelProps = {
  text: string;
  htmlFor: string;
};

const Label: React.FC<LabelProps> = ({ text, children, htmlFor, ...props }) => {
  return (
    <section css={[Styles.Wrapper]} {...props}>
      <label htmlFor={htmlFor} css={[Styles.Label]}>
        {text}
      </label>
      {children}
    </section>
  );
};

export default Label;
