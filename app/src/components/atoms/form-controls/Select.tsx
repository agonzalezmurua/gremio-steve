import React from 'react';

type Option = {
  icon?: JSX.Element;
  value: string | number;
  label: string;
};

type SelectProps = {
  options: Option[];
} & React.HtmlHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({ options, ...props }) => {
  return (
    <select {...props}>
      {options.map((option) => (
        <option key={option.value}>
          {option.icon && <>{option.icon} -</>}
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
