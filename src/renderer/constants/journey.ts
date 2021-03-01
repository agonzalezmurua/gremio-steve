import { Definitions } from '_/services/api';

export const STATUS: {
  [key in Uppercase<Definitions['Journey']['status']>]: Lowercase<key>;
} = {
  ALERT: 'alert',
  CLOSED: 'closed',
  OPEN: 'open',
  PENDING: 'pending',
  PROBLEM: 'problem',
  READY: 'ready',
};

Object.freeze(STATUS);
