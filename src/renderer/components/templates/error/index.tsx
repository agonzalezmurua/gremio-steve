import tw, { css, theme } from 'twin.macro';
import React from 'react';
import { useMedia } from 'react-use';
import { FormattedMessage, MessageDescriptor } from 'react-intl';

import ErrorCircleLight from '_/assets/error-circle-light.svg';
import ErrorCircleDark from '_/assets/error-circle-dark.svg';

import Messages from './messages';

type Props = {
  statusCode: number;
  title: MessageDescriptor;
  message: MessageDescriptor;
};

const ErrorTemplate: React.FC<Props> = (props) => {
  const isDark = useMedia('(prefers-color-scheme: dark)');

  return (
    <main tw="p-4 h-full flex flex-col justify-center items-center space-y-4">
      <section tw="relative">
        {isDark ? <ErrorCircleDark /> : <ErrorCircleLight />}
        <span
          css={[
            tw`absolute top-1/2 left-1/2 text-8xl font-bold transform[translate(-50%, -50%)] select-none`,
            isDark
              ? [
                  tw`text-blue-500`,
                  css({
                    '-webkit-text-stroke': `.25rem white`,
                  }),
                ]
              : [
                  tw`text-white`,
                  css({
                    '-webkit-text-stroke': `.25rem ${theme`colors.blue.500`}`,
                  }),
                ],
          ]}
        >
          {props.statusCode}
        </span>
      </section>
      <h1>
        <FormattedMessage {...props.title} />
      </h1>
      <p style={{ whiteSpace: 'pre' }}>
        <FormattedMessage {...props.message} />
      </p>
    </main>
  );
};

export default ErrorTemplate;
