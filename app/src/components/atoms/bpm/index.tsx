import React, { useCallback, useEffect, useRef } from 'react';
import 'twin.macro';

import InputStyle from '../input/styles';

type BpmInputProps = {
  id: string;
  name: string;
  value: number[];
  onChange: (event: {
    target: { name: string; value: [number?, number?] };
  }) => void;
};

const BpmInput: React.FC<BpmInputProps> = (props) => {
  const from = useRef<HTMLInputElement>(null);
  const to = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.value) {
      from.current!.defaultValue = String(props.value[0]);
      to.current!.defaultValue = String(props.value[1]) || '';
    }
  }, []);

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
      <input
        id={props.id}
        name={props.name}
        type="number"
        ref={from}
        onChange={handleChange}
        tw="w-1/2 text-center"
        placeholder="min"
        min={0}
        step={10}
        max={to.current?.value}
      />
      <section tw="w-4 mx-2 bg-gray-50 h-full border-r border-l dark:(bg-gray-700 border-gray-500)" />
      <input
        id={props.id}
        type="number"
        ref={to}
        onChange={handleChange}
        tw="w-1/2 text-center"
        placeholder="max"
        step={10}
        min={from.current?.value}
      />
    </section>
  );
};

export default BpmInput;
