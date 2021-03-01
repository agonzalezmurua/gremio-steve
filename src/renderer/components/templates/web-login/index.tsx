import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '_/components/atoms/button';

type Props = {
  onLogin: () => void;
  isUserLoggedIn: boolean;
  referer?: string;
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
              defaultMessage="Log in with osu!"
              description="Button that indicates tells the user to log in using osu"
            />
          </Button>
        ) : null}

        {props.isUserLoggedIn && props.referer === 'app' ? (
          <Button color="blue" onClick={props.onLogin}>
            <FormattedMessage
              id="pages.login.openApp"
              defaultMessage="Open the app"
              description="Button that indicates that user is already logged in web, prompting them to open the app"
            />
          </Button>
        ) : null}
      </section>
    </main>
  );
};

export default WebLoginTemplate;
