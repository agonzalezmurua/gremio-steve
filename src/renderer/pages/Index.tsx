import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const HomePage: React.FunctionComponent = () => (
  <main tw="p-4">
    <FormattedMessage
      defaultMessage="Title"
      description="Home page Title"
      tagName="h1"
    />
    <p>
      <FormattedMessage
        defaultMessage="Hello fellow mappers"
        description="Test message"
      />
    </p>
  </main>
);

HomePage.displayName = 'HomePage';

export default HomePage;
