import React from 'react';
import tw, { styled } from 'twin.macro';

type LabelProps = {
  text: string;
  htmlFor: string;
};

const Label: React.FC<LabelProps> = ({ text, children, htmlFor, ...props }) => {
  return (
    <section {...props}>
      <label htmlFor={htmlFor}>{text}</label>
      {children}
    </section>
  );
};

export default styled(Label)`
  ${tw`space-y-1`}
`;
