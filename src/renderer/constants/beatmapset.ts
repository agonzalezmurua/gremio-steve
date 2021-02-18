/**
 * This file exposes instanced arrays of values that appear on the types exposed by the API
 */

import { Definitions } from '@/services/api';

export const MODES: Array<Definitions['Journey.Beatmap']['mode']> = [
  'ctb',
  'mania',
  'std',
  'taiko',
];
export const STATUS: Array<Definitions['Journey.Beatmap']['status']> = [
  'alert',
  'pending',
  'problem',
  'ready',
];
export const DIFFICULTIES: Array<
  Definitions['Journey.Beatmap']['difficulty']
> = ['easy', 'normal', 'hard', 'insane', 'expert', 'expert+'];

Object.freeze(DIFFICULTIES);
Object.freeze(MODES);
Object.freeze(STATUS);
