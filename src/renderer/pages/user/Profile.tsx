import 'twin.macro';
import React from 'react';
import { useAsync } from 'react-use';
import { RouteComponentProps } from 'react-router-dom';
import Api from '@/services/api';
import UserProfileTemplate from '@/components/templates/user-profile';
import links from '@/services/links';

type Props = {
  id: string;
};

const UserProfilePage: React.FC<RouteComponentProps & Props> = (props) => {
  const { value, error } = useAsync(async () => {
    return (await Api.Operations.getOneUserById({ path: { id: props.id } }))
      .data;
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
