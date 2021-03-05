import { DIFFICULTIES, MODES, STATUS } from '_/constants/beatmapset';
import { object, string, array, number, boolean } from 'yup';
import { Definitions } from '_/services/api';

export type JourneyFormObject = Definitions['Journey'];

export type BeatmapFormObject = Definitions['Journey.Beatmap'];

export const initialValues: JourneyFormObject = {
  title: '',
  artist: '',
  beatmaps: [],
  banner_url: '',
  description: '',
  thumbnail_url: '',
  metadata: { bpm: [], duration: 30, genre: '', closure: null },
};

export const validationSchema = object().shape<JourneyFormObject>({
  title: string().required(),
  artist: string().required(),
  banner_url: string().required(),
  thumbnail_url: string().required(),
  beatmaps: array(
    object()
      .shape<BeatmapFormObject>({
        difficulty: string().oneOf(Object.values(DIFFICULTIES)).required(),
        mode: string().oneOf(Object.values(MODES)).required(),
        name: string().required(),
        assignee: object<Definitions['User']>().optional(),
        status: string().oneOf(Object.values(STATUS)).optional(),
        id: string().optional(),
      })
      .required()
  ),
  metadata: object()
    .shape({
      bpm: array(number().min(1).max(500).required()).required(),
      duration: number().min(1).max(9999000).required(),
      genre: string().required(),
    })
    .required(),
});
