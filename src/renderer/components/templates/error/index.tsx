import 'twin.macro';
import React from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';

import ErrorCircle from '_/assets/error-circle.svg';

import Messages from './messages';

type Props = {
  statusCode: number;
  title: MessageDescriptor;
  message: MessageDescriptor;
};

const ErrorTemplate: React.FC<Props> = (props) => {
  return (
    <main tw="p-4 h-full flex flex-col justify-center items-center space-y-4">
      <section tw="relative">
        <ErrorCircle />
        <span
          tw="absolute top-1/2 left-1/2 text-8xl"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {props.statusCode}
        </span>
      </section>
      <FormattedMessage tagName="h1" {...props.title} />
      <p style={{ whiteSpace: 'pre' }}>
        <FormattedMessage {...props.message} />
      </p>
    </main>
  );
};

export default ErrorTemplate;
