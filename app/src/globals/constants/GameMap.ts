export const MODES: Array<GameMap['mode']> = ['ctb', 'mania', 'std', 'taiko'];
export const STATUS: Array<GameMap['status']> = [
  'alert',
  'pending',
  'problem',
  'ready',
];
export const DIFFICULTIES: Array<GameMap['difficulty']> = [
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
