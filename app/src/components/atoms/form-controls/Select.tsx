import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'twin.macro';
import { useClickAway } from 'react-use';

import ChevronDown from '@assets/icons/outline/chevron-down.svg';
import InputStyles from '@components/atoms/form-controls/Input.styles';

import SelectStyles from './Select.styles';

export type SelectOption = {
  icon?: React.FC;
  value: any;
  label: string;
};

export type SelectProps = {
  name?: string;
  value?: any;
  options: SelectOption[];
} & React.HtmlHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<SelectOption | undefined>();
  const [displaying, setDisplaying] = useState(false);
  const handleListDisplay = useCallback(() => {
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
      css={[InputStyles.Wrapper]}
      tw="flex-col relative"
      ref={wrapperRef}
    >
      <input className="sr-only" name={props.name} value={selected?.value} />
      {/* Interactable */}
      <section
        onClick={handleListDisplay}
        css={[InputStyles.Input]}
        tw="flex items-center w-full"
      >
        <span css={[SelectStyles.Selected]}>
          {(selected && (
            <>
              {selected.icon && <selected.icon />}
              <span>{selected.label}</span>
            </>
          )) ||
            props.placeholder}
        </span>
        <ChevronDown tw="h-4 w-4" />
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
            css={[SelectStyles.Item]}
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