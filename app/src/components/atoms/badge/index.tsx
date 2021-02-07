import 'twin.macro';
import React from 'react';

const Badge: React.FC = (props) => {
  return (
    <section tw="relative">
      <section tw="rounded-full bg-green-500 absolute w-7 h-7 border-white border-4 -right-0 -bottom-0" />
      {props.children}
    </section>
  );
};

export default Badge;
