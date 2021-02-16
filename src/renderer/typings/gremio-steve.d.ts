import { Definitions } from '@/services/api';

export type OauthState = {
  identifier: string;
  came_from: 'browser' | 'app';
  original_url?: string;
};

export type LoggedUser = Pick<
  Definitions['User'],
  'id' | 'osu_id' | 'name' | 'avatar_url'
>;
