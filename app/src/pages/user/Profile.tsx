import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useAsync } from 'react-use';
import { RouteComponentProps } from 'react-router-dom';
import api from '_api';
import UserProfileTemplate from '_components/templates/user-profile';
import links from '_links';

type Props = {
  id: string;
};

const UserProfilePage: React.FC<RouteComponentProps<Props>> = (props) => {
  const { value, error } = useAsync(async () => {
    return (await api.user.profile(props.match.params.id)).data;
  });

  if (error) {
    props.history.push(links.pages.not_found());
  }

  return (
    <main>
      <UserProfileTemplate user={value} />
    </main>
  );
};

export default UserProfilePage;
