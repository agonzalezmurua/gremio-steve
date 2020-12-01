import React, { useCallback, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';
import { useClickAway } from 'react-use';

import ChevronDown from '@assets/icons/outline/chevron-down.svg';

import SelectStyles from './Select.styles';
import InputStyles from './Input.styles';

export type SelectOption = {
  icon?: React.FC;
  value: any;
  label: string;
};

export type SelectProps = {
  name?: string;
  value?: any;
  options: SelectOption[];
  disabled?: boolean;
} & React.HtmlHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<SelectOption | undefined>();
  const [displaying, setDisplaying] = useState(false);
  const handleListDisplay = useCallback(() => {
    if (props.disabled) {
      return;
    }
    setDisplaying(true);
  }, []);
  const handleItemClick = useCallback(
    (option: SelectOption) => () => {
      // If controlled
      props.onSelect && props.onSelect(option.value);
      setSelected(option);
      setDisplaying(false);
    },
    [props.onSelect]
  );

  useEffect(() => {
    if (props.value !== selected?.value) {
      const _selected = props.options.find(
        (option) => option.value === props.value
      );
      setSelected(_selected);
    }
  }, [props.value]);

  useClickAway(wrapperRef, () => setDisplaying(false));

  return (
    <section
      role="listbox"
      css={[
        InputStyles.Wrapper,
        SelectStyles.Wrapper,
        props.disabled && SelectStyles.DisabledBackground,
      ]}
      tw="flex-col relative"
      aria-disabled={props.disabled}
      ref={wrapperRef}
    >
      <input
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        readOnly
        name={props.name}
        value={selected?.value || ''}
      />
      {/* Interactable */}
      <section
        onClick={handleListDisplay}
        css={[InputStyles.Input]}
        tw="flex items-center w-full"
      >
        <span
          css={[
            SelectStyles.Option,
            tw`flex-grow p-0 hover:(bg-transparent)`,
            props.disabled && SelectStyles.DisabledBackground,
          ]}
        >
          {(selected && (
            <>
              {selected.icon && <selected.icon />}
              <span>{selected.label}</span>
            </>
          )) ||
            props.placeholder}
        </span>
        <ChevronDown css={[tw`h-4 w-4`, props.disabled && tw`text-gray-500`]} />
      </section>

      {/* Options */}
      <section
        hidden={displaying === false}
        tw="bg-white absolute w-full shadow-md rounded border z-50"
      >
        {props.options.map((option) => (
          <section
            key={option.value}
            role="option"
            onClick={handleItemClick(option)}
            aria-selected={selected?.value === option.value}
            css={[SelectStyles.Option]}
          >
            {option.icon && <option.icon />}
            <span>{option.label}</span>
          </section>
        ))}
      </section>
    </section>
  );
};

export default Select;
