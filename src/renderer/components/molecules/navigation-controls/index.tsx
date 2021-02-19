import tw, { styled } from 'twin.macro';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import ArrowLeft from '@/assets/icons/outline/arrow-left.svg';
import Home from '@/assets/icons/outline/home.svg';

import { FocusRingFlatStyle } from '@/globals/styles/focus';
import Button from '@/components/atoms/button';

const NavigationControls: React.FC = (props) => {
  const history = useHistory();
  const [length, setLength] = useState(history.length);
  const pathname = useRef(history.location.pathname);

  useEffect(() => {
    history.listen((location, action) => {
      if ((pathname.current !== location.pathname) === false) {
        return;
      }
      pathname.current = location.pathname;
      switch (action) {
        case 'PUSH':
          setLength((v) => v + 1);
          break;
        case 'POP':
          setLength((v) => v - 1);
          break;
        case 'REPLACE':
        default:
          break;
      }
    });
  }, []);

  return (
    <section {...props} tw="flex space-x-2 justify-between">
      <Button
        variant="icon"
        aria-label="Go back to previous page"
        disabled={length === 1}
        onClick={history.goBack}
      >
        <ArrowLeft />
      </Button>
      <Button variant="icon">
        <Link to="/">
          <Home />
          <span className="visually-hidden">
            <FormattedMessage
              id="components.atoms.navigationControls.goBackHome"
              defaultMessage="Go to home page"
              description="Accesible text that describes what the home button action"
            />
          </span>
        </Link>
      </Button>
    </section>
  );
};

export default NavigationControls;
