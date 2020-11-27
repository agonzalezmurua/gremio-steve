import React from 'react';
import 'twin.macro';

const Editor: React.FC = (props) => {
  return (
    <section tw="h-16">
      <textarea {...props} />
    </section>
  );
};

export default Editor;
