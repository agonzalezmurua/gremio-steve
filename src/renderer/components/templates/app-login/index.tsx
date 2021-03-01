import 'twin.macro';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '_/components/atoms/button';
import { useToggle } from 'react-use';
import Anchor from '_/components/atoms/anchor';

type Props = {
  onLogin: () => void;
  loginLink: string;
};

const AppLoginTemplate: React.FC<Props> = (props) => {
  const [didClick, toggle] = useToggle(false);

  const handleLogin = useCallback((event) => {
    event.preventDefault();
    props.onLogin();
    toggle(true);
  }, []);

  return (
    <main tw="h-full p-8 flex flex-col justify-center items-center space-y-4">
      {didClick === false ? (
        <>
          <h1>
            <FormattedMessage
              id="pages.login.title"
              defaultMessage="Welcome to Stev"
              description="Header with salutations"
            />
          </h1>

          <Anchor>
            <Button color="blue" onClick={handleLogin}>
              <FormattedMessage
                id="pages.login.continueWithBrowserButton"
                defaultMessage="Log in with osu!"
                description="Button that tells the user to log in with their osu's game account"
              />
            </Button>
          </Anchor>
        </>
      ) : (
        <>
          <h1>
            <FormattedMessage
              id="pages.login.afterClickHeader"
              defaultMessage="Go to your browser to complete your log in"
              description="Header that instructs user to go to their browser to complete the process"
            />
          </h1>
          <span>
            <FormattedMessage
              id="pages.login.helpNotSeeingTab"
              defaultMessage="Not seeing the browser tab?"
              description="Helper text that ask if the user is not able to see / find the intended login tab"
            />{' '}
            <Anchor href={props.loginLink} onClick={handleLogin}>
              <FormattedMessage
                id="pages.login.tryAgain"
                defaultMessage="Try again"
                description="Link that opens the link again"
              />
            </Anchor>
          </span>
        </>
      )}
    </main>
  );
};

export default AppLoginTemplate;
