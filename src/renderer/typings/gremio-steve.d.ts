import { Definitions } from '@/services/api';

export type StoredOauthState = {
  [identifier: string]: OauthState | undefined;
};

export type OauthState = {
  came_from: 'browser' | 'app';
  original_url?: string;
};

export type LoggedUser = Pick<
  Definitions['User'],
  'id' | 'osu_id' | 'name' | 'avatar_url'
>;
