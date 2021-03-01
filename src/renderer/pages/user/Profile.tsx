import 'twin.macro';
import React from 'react';
import { useAsync } from 'react-use';
import { RouteComponentProps } from 'react-router-dom';
import Api from '_/services/api';
import UserProfileTemplate from '_/components/templates/user-profile';
import links from '_/services/links';

type Props = {
  id: string;
};

const UserProfilePage: React.FC<RouteComponentProps<Props>> = (props) => {
  const { value, error, loading } = useAsync(
    async () =>
      Api.Operations.getOneUserById({ path: { id: props.match.params.id } }),
    []
  );

  if (error) {
    props.history.push(links.pages.not_found());
  }

  return <UserProfileTemplate user={loading ? null : value.data} />;
};

export default UserProfilePage;
