import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

const HomePage: React.FunctionComponent = () => (
  <main tw="p-4">
    <Helmet>
      <title>Home</title>
    </Helmet>
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
