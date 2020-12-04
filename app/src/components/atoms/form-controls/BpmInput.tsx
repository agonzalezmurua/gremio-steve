import React, { useCallback, useRef } from 'react';
import 'twin.macro';

import InputStyle from './Input.styles';

type BpmInputProps = {
  name: string;
  value: [number?, number?];
  onChange: (event: {
    target: { name: string; value: [number?, number?] };
  }) => void;
};

const BpmInput: React.FC<BpmInputProps> = (props) => {
  const from = useRef<HTMLInputElement>(null);
  const to = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(() => {
    const fromValue =
      (from.current?.value && Number(from.current?.value)) || undefined;
    const toValue =
      (to.current?.value && Number(to.current?.value)) || undefined;

    props.onChange &&
      props.onChange({
        target: {
          name: props.name,
          value: [fromValue, toValue],
        },
      });
  }, []);

  return (
    <section css={[InputStyle.Wrapper, InputStyle.Input]} tw="mt-auto">
      <input type="number" ref={from} onChange={handleChange} tw="w-1/2" />
      <input type="number" ref={to} onChange={handleChange} tw="w-1/2" />
    </section>
  );
};

export default BpmInput;
