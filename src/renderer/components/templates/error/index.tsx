import 'twin.macro';
import React from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';

import ErrorCircle from '_/assets/error-circle.svg';

import Messages from './messages';

type Props = {
  title: keyof typeof Messages;
  message: MessageDescriptor;
  values?: Record<string, any>;
};

const ErrorTemplate: React.FC<Props> = (props) => {
  return (
    <main tw="flex flex-col h-full w-full items-center justify-center">
      <ErrorCircle />
      <FormattedMessage tagName="h1" {...Messages[props.title]} />
      <FormattedMessage tagName="p" {...props.message} values={props.values} />
    </main>
  );
};

export default ErrorTemplate;
