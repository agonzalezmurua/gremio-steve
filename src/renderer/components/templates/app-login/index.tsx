import 'twin.macro';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@/components/atoms/button';

type Props = {
  onLogin: () => void;
};

const AppLoginTemplate: React.FC<Props> = (props) => {
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

        <Button color="blue" onClick={props.onLogin}>
          <FormattedMessage
            id="pages.login.openBrowser"
            defaultMessage="Log in with browser"
            description="Button that indicated that user must open the browser in order to log in"
          />
        </Button>
      </section>
    </main>
  );
};

export default AppLoginTemplate;
