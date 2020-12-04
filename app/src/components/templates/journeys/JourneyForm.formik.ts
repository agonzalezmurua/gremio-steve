import { DIFFICULTIES, MODES } from '@globals/constants/GameMap';
import { object, string, array, number, boolean } from 'yup';

export type JourneyFormObject = Pick<
  Journey,
  'title' | 'artist' | 'description' | 'metadata' | 'private'
> & {
  banner: string;
  thumbnail: string;
  maps: Array<GameMapFormObject>;
};

export type GameMapFormObject = Pick<GameMap, 'difficulty' | 'mode' | 'name'>;

export const initialValues: JourneyFormObject = {
  title: '',
  artist: '',
  maps: [],
  banner: '',
  description: '',
  thumbnail: '',
  metadata: { bpm: [], duration: 30, genre: '' },
  private: true,
};

export const validationSchema = object().shape<JourneyFormObject>({
  title: string().required(),
  artist: string().required(),
  banner: string().required(),
  description: string().min(1).max(500).default(''),
  thumbnail: string().required(),
  maps: array(
    object()
      .shape<GameMapFormObject>({
        difficulty: string().oneOf(DIFFICULTIES).required(),
        mode: string().oneOf(MODES).required(),
        name: string().required(),
      })
      .required()
  )
    .min(1)
    .required(),
  metadata: object()
    .shape({
      bpm: array(number().min(1).max(500).required()).required(),
      duration: number().min(1).max(9999000).required(),
      genre: string().required(),
    })
    .required(),
  private: boolean(),
});
