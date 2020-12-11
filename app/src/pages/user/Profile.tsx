import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useAsync } from 'react-use';
import { RouteComponentProps } from 'react-router-dom';
import api from '@api';
import UserProfileTemplate from '@components/templates/user/Profile';

type Props = {
  id: string;
};

const UserProfilePage: React.FC<RouteComponentProps<Props>> = (props) => {
  const { value } = useAsync(async () => {
    return (await api.user.profile(props.match.params.id)).data;
  });
  return (
    <main>
      <UserProfileTemplate user={value} />
    </main>
  );
};

export default UserProfilePage;
