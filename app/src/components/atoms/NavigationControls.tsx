import React, { useCallback, useEffect, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';

import ArrowLeft from '@assets/icons/outline/arrow-left.svg';
import Home from '@assets/icons/outline/home.svg';
import { Link, useHistory } from 'react-router-dom';

const NavigationControls = (props) => {
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
    <section className={props.className} tw="flex space-x-2 justify-between">
      <button
        aria-label="Go back to previous page"
        disabled={length === 1}
        onClick={history.goBack}
      >
        <ArrowLeft />
      </button>
      <Link to="/">
        <Home />
        <span className="sr-only">Go to home page</span>
      </Link>
    </section>
  );
};

export default styled(NavigationControls)`
  button,
  a {
    ${tw`p-1 hover:text-gray-700 disabled:text-gray-500 active:bg-gray-300 rounded transition-colors duration-200 ease-in-out`}
    > svg {
      ${tw`h-5 w-5`}
    }
  }
`;
