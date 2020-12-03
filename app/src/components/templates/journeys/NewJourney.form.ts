import { DIFFICULTIES, MODES } from '@globals/constants/GameMap';
import { object, string, array, number, boolean } from 'yup';

export type JourneyForm = Pick<
  Journey,
  'title' | 'artist' | 'description' | 'metadata' | 'private'
> & {
  banner: string;
  thumbnail: string;
  maps: Array<GameMapForm>;
};

export type GameMapForm = Pick<GameMap, 'difficulty' | 'mode' | 'name'>;

export const initialValues: JourneyForm = {
  title: '',
  artist: '',
  maps: [],
  banner: '',
  description: '',
  thumbnail: '',
  metadata: { bpm: 90, duration: 30, genre: '' },
  private: true,
};

export const validationSchema = object().shape<JourneyForm>({
  title: string().required(),
  artist: string().required(),
  banner: string().required(),
  description: string().min(1).max(500).default(''),
  thumbnail: string().required(),
  maps: array(
    object()
      .shape<GameMapForm>({
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
      bpm: number().min(1).max(500).required(),
      duration: number().min(1).max(9999000).required(),
      genre: string().required(),
    })
    .required(),
  private: boolean(),
});
