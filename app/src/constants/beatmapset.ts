export const MODES: Array<Beatmap['mode']> = ['ctb', 'mania', 'std', 'taiko'];
export const STATUS: Array<Beatmap['status']> = [
  'alert',
  'pending',
  'problem',
  'ready',
];
export const DIFFICULTIES: Array<Beatmap['difficulty']> = [
  'easy',
  'normal',
  'hard',
  'insane',
  'expert',
  'expert+',
];

Object.freeze(DIFFICULTIES);
Object.freeze(MODES);
Object.freeze(STATUS);
