declare type Mode = 'std' | 'taiko' | 'ctb' | 'mania';

declare type Journey = {
  _id: string;
  title: string;
  artist: string;
  organizer: User;
  updated_at: Date;
  thumbnail: {
    url: string;
  };
  banner: {
    url: string;
  };
  metadata: {
    genre: string;
    bpm: number[];
    closure?: string;
    duration: number;
  };
  modes: Mode[];
  description?: string;
  status: 'pending' | 'open' | 'ready' | 'alert' | 'problem' | 'closed';
  private: boolean;
  beatmaps: Beatmap[];
  osu_link: ?string;
};

declare type Beatmap = {
  _id: string;
  name: string;
  mode: Mode;
  difficulty: 'easy' | 'normal' | 'hard' | 'insane' | 'expert' | 'expert+';
  status: 'ready' | 'pending' | 'alert' | 'problem';
  assignee?: User;
};

declare type User = {
  _id: string;
  osu_id: string;
  name: string;
  active: boolean;
  avatar_url: string;
  banner_url: string;
  availability: {
    mods: boolean;
    guest_diffs: boolean;
    playtesting: boolean;
  };
  journeys: Journey[];
  community_role: string;
  preferences: Mode[];
  status: string;
  description: string;
  queue: Journey[];
};

declare type CommentNode = {
  _id: string;
  journey: Pick<Journey, '_id'>;
};

declare type UserActivity = {
  _id: string;
  /** ISO-DATE */
  when: string;
  who: Pick<User, '_id' | 'name'>;
  what: 'mention' | 'comment' | 'add' | 'remove' | 'edit' | 'create';
  to: 'journey' | 'user' | 'comment';
  user?: Pick<User, '_id' | 'name'>;
  journey?: Pick<Journey, '_id' | 'title'>;
  comment?: CommentNode;
  content?: string;
};
