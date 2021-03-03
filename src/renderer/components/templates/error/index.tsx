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
    <main>
      <ErrorCircle />
      <FormattedMessage tagName="h1" {...props.title} />
      <section>
        <FormattedMessage tagName="p" {...props.message} />
      </section>
    </main>
  );
};

export default ErrorTemplate;
