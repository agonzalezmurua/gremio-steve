import React, { useCallback, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';
import { useClickAway, useKey } from 'react-use';

import ChevronDown from '@assets/icons/outline/chevron-down.svg';

import Styles from './styles';
import { handleKey } from '@utils';
import useKeyDownHotkey from '@hooks/useKeydownHotkey';

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
  const wrapper = useRef<HTMLDivElement>(null);
  const optionsWrapper = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<SelectOption | undefined>();
  const [isDisplaying, setDisplaying] = useState(false);
  const diplayList = useCallback(() => {
    if (props.disabled) {
      return;
    }
    setDisplaying(true);
  }, []);
  const handleItemClick = useCallback(
    (option: SelectOption) => () => {
      props.onChange &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        props.onChange({ target: { name: props.name, value: option.value } });
      setSelected(option);
      setDisplaying(false);
    },
    [props.onChange]
  );

  useEffect(() => {
    if (props.value) {
      // If controlled
      const _selected = props.options.find(
        (option) => option.value === props.value
      );
      if (_selected) {
        setSelected(_selected);
      } else {
        setSelected(undefined);
      }
    }
  }, [props.value, props.options]);

  const handleNavigation = useCallback(
    (direction: 'up' | 'down') => (event: React.KeyboardEvent<HTMLElement>) => {
      const { current: el } = optionsWrapper;
      if (el && el.hidden === false) {
        event.preventDefault();
        if (el.contains(document.activeElement)) {
          let element: HTMLDivElement | null;
          switch (direction) {
            case 'down':
              element = document.activeElement?.nextSibling as HTMLDivElement;
              break;
            case 'up':
              element = document.activeElement
                ?.previousSibling as HTMLDivElement;
              break;
            default:
              element = null;
              break;
          }
          element?.focus();
        } else {
          (el.firstChild as HTMLDivElement).focus();
        }
      }
    },
    []
  );

  useClickAway(wrapper, () => setDisplaying(false));
  useKeyDownHotkey(wrapper, ' ', (event) => {
    event.preventDefault();
    setDisplaying(true);
  });
  useKeyDownHotkey(wrapper, 'ArrowUp', handleNavigation('up'));
  useKeyDownHotkey(wrapper, 'ArrowDown', handleNavigation('down'));

  return (
    <section
      role="listbox"
      css={[Styles.Wrapper, props.disabled && Styles.DisabledBackground]}
      aria-disabled={props.disabled}
      ref={wrapper}
      tabIndex={0}
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !wrapper.current!.contains(event.relatedTarget as Node)
        ) {
          setDisplaying(false);
        }
      }}
    >
      <input
        tabIndex={-1}
        className="visually-hidden"
        readOnly
        name={props.name}
        value={selected?.value || ''}
      />
      {/* Input */}
      <section onClickCapture={diplayList} css={[Styles.ListBoxWrapper]}>
        <span
          css={[Styles.Selected, props.disabled && Styles.DisabledBackground]}
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
        role="select"
        hidden={isDisplaying === false}
        css={[Styles.OptionsWrapper]}
        ref={optionsWrapper}
      >
        {props.options.map((option) => (
          <section
            role="option"
            key={option.value}
            css={[Styles.Option]}
            aria-selected={selected?.value === option.value}
            tabIndex={0}
            onKeyDown={handleKey(['Enter', ' '], (event) => {
              event.preventDefault();
              handleItemClick(option)();
              wrapper.current!.focus();
            })}
            onClick={handleItemClick(option)}
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
