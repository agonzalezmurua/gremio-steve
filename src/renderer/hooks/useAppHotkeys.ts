import keyboardjs from 'keyboardjs';
import { useHistory } from 'react-router-dom';
import { useEffectOnce } from 'react-use';
import * as H from 'history';
import Links from '_/services/links';
import {
  defineMessage,
  IntlShape,
  MessageDescriptor,
  useIntl,
} from 'react-intl';

type HotkeyContext = {
  history: H.History<unknown>;
  intl: IntlShape;
};

export default function useAppHotkeys() {
  const intl = useIntl();
  const history = useHistory();
  const combos = ContextualizeCombos({ history, intl });

  useEffectOnce(() => {
    for (const hotkey of Object.values(combos)) {
      keyboardjs.bind(hotkey.combo, hotkey.pressed, hotkey.released);
    }
    return () => {
      for (const hotkey of Object.values(combos)) {
        keyboardjs.unbind(hotkey.combo, hotkey.pressed, hotkey.released);
      }
    };
  });

  return combos;
}

type Combos = {
  [name: string]: {
    /** Key combo that is required to trigger */
    combo: string | string[];
    description: MessageDescriptor;
    pressed: (event?: Event) => void;
    released?: (event?: Event) => void;
  };
};

const ContextualizeCombos = (context: HotkeyContext): Combos => ({
  'history.goBack': {
    combo: ['ctrl + left', 'command + left'],
    pressed: (event) => {
      event?.preventDefault();
      context.history.goBack();
    },
    description: defineMessage({
      id: 'hotkeys.app.history_goBack',
      defaultMessage: 'Go Back to previous page',
      description:
        'Global hotkey that goes to the previous page (if available)',
    }),
  },
  'history.goForward': {
    combo: ['ctrl + right', 'command + right'],
    pressed: (event) => {
      event?.preventDefault();
      context.history.goForward();
    },
    description: defineMessage({
      id: 'hotkeys.app.history_goForward',
      defaultMessage: 'Go Forward to next page',
      description: 'Global hotkey that navigates to next page (if available)',
    }),
  },
  'journey.new': {
    combo: ['ctrl + shift + n', 'command + shift + n'],
    pressed: (event) => {
      event?.preventDefault();
      context.history.push(Links.journeys.new());
    },
    description: defineMessage({
      id: 'hotkeys.app.journey_new',
      defaultMessage: 'Create new Journey',
      description: 'Global hotkey that navigates to new journey page',
    }),
  },
});
