import 'twin.macro';
import React from 'react';
import Markdown from '@components/atoms/Markdown';
import Avatar from '@components/atoms/Avatar';

type Props = {
  user?: User;
};

const UserProfileTemplate: React.FC<Props> = (props) => {
  return (
    <section tw="space-y-4">
      <section tw="flex flex-col justify-center items-center">
        <Avatar size="jumbo" src={props.user?.avatar.url} />
        <h1>{props.user?.name}</h1>
      </section>

      <article>
        {props.user?.description && <Markdown value={props.user.description} />}
      </article>
    </section>
  );
};

export default UserProfileTemplate;
