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
      <label htmlFor={htmlFor}>{text}</label>
      {children}
    </section>
  );
};

export default styled(Label)`
  ${tw`space-y-1`}
`;
