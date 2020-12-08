import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const UserProfilePage = () => {
  return (
    <main tw="p-4">
      <FormattedMessage
        id="pages.user.profile.titleHeader"
        defaultMessage="User"
        description="User profile page header"
        tagName="h1"
      />
    </main>
  );
};

export default UserProfilePage;
