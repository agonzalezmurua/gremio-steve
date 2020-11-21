import React from 'react';
import 'twin.macro';

type InputProps = {
  icon: JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FunctionComponent<InputProps> = ({ icon, ...props }) => (
  <section tw="flex bg-white rounded shadow items-center">
    {icon && (
      <section aria-hidden tw="p-2">
        {icon}
      </section>
    )}
    <input tw="bg-transparent pl-2 pr-2 text-sm flex-grow h-8" {...props} />
  </section>
);

export default Input;
