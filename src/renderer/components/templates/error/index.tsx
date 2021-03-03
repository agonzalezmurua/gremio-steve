import 'twin.macro';
import React from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';

import ErrorCircle from '_/assets/error-circle.svg';

import Messages from './messages';

type Props = {
  title: MessageDescriptor;
  message: MessageDescriptor;
};

const ErrorTemplate: React.FC<Props> = (props) => {
  return (
    <main tw="p-4 h-full flex flex-col justify-center items-center">
      <ErrorCircle />
      <FormattedMessage tagName="h1" {...props.title} />
      <p tw="whitespace-pre-line">
        <FormattedMessage {...props.message} />
      </p>
    </main>
  );
};

export default ErrorTemplate;
