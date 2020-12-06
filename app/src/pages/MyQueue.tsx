import React from 'react';
import { FormattedMessage } from 'react-intl';

const MyqueuePage = () => {
  return (
    <main>
      <FormattedMessage
        defaultMessage="My Queue"
        description="Formatted Message header"
        tagName="h1"
      />
    </main>
  );
};

export default MyqueuePage;
