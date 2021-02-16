import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@/components/atoms/button';

type Props = {
  onLogin: () => void;
  onOpenApp: () => void;
  isUserLoggedIn: boolean;
  cameFrom?: string;
};

const WebLoginTemplate: React.FC<Props> = (props) => {
  return (
    <main tw="h-full">
      <section tw="p-8 flex flex-col justify-center items-center space-y-4">
        <section>
          <h1>
            <FormattedMessage
              id="pages.login.title"
              defaultMessage="Welcome to Stev"
              description="Header with salutations"
            />
          </h1>
        </section>
        {props.isUserLoggedIn === false ? (
          <Button color="blue" onClick={props.onLogin}>
            <FormattedMessage
              id="pages.login.authWithOsu"
              defaultMessage="Log in with in!"
              description="Button that indicated that a log in with osu! game option"
            />
          </Button>
        ) : (
          <Button color="blue" onClick={props.onOpenApp}>
            <FormattedMessage
              id="pages.login.openApp"
              defaultMessage="Open the app"
              description="Button that indicated that user is already logged in web, prompting them to open the app"
            />
          </Button>
        )}
      </section>
    </main>
  );
};

export default WebLoginTemplate;
