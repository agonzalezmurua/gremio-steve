import React, { createContext, useEffect, useMemo, useState } from 'react';
import tw, { styled } from 'twin.macro';
import Button from './Button';

import Circle from '@assets/icons/steve/circle.svg';

type FormProgressProps = {
  className?: string;
  steps: string[];
};

const FormProgress: React.FC<FormProgressProps> = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = useMemo(() => {
    return currentStep === props.steps.length - 1;
  }, [currentStep]);

  return (
    <section tw="w-full space-y-4" className={props.className}>
      {/* Progress */}
      <section tw="flex relative items-center h-8">
        <progress
          tw="w-full pl-1 pr-1"
          value={currentStep}
          max={props.steps.length - 1}
        />
        <section tw="flex justify-between items-center absolute w-full h-full">
          {props.steps.map((step, index) => (
            <Circle
              name="progress-circle"
              tw="h-5 w-5"
              data-active={index <= currentStep}
              key={step}
            />
          ))}
        </section>
      </section>

      {/* Actions */}
      <section tw="flex justify-between space-x-2 w-full">
        <Button
          name="previous form step"
          type="button"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        {(isLastStep && <Button type="submit">Save</Button>) || (
          <Button
            name="next form step"
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next
          </Button>
        )}
      </section>

      {/* Content */}
      <section>
        {React.Children.map(props.children, (child, index) => (
          <section key={props.steps[index]} hidden={index !== currentStep}>
            {child}
          </section>
        ))}
      </section>
    </section>
  );
};

FormProgress.defaultProps = {
  steps: [],
};

export default styled(FormProgress)`
  progress[value] {
    ${tw`h-1`}
    &::-webkit-progress-bar,
    &::-webkit-progress-value {
      ${tw`rounded bg-gray-300`}
    }
    &::-webkit-progress-value {
      ${tw`bg-purple-500`}
      transition : width 300ms ease-in-out;
    }
  }
  svg {
    &[name='progress-circle'] {
      &[data-active='true'] {
        ${tw`text-purple-500`}
      }
      &[data-active='false'] {
        ${tw`text-white text-gray-300 transition-colors duration-500`}
      }
    }
  }
`;
