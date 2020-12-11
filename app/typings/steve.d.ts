declare type Gamemodes = 'std' | 'taiko' | 'ctb' | 'mania';

declare type Journey = {
  __id: string;
  title: string;
  artist: string;
  organizer: User;
  lastUpdated: Date;
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
  description?: string;
  status: 'open' | 'clossed' | 'suspended';
  private: boolean;
  maps: GameMap[];
  osuLink: string;
};

declare type GameMap = {
  __id: string;
  name: string;
  mode: Gamemodes;
  difficulty: 'easy' | 'normal' | 'hard' | 'insane' | 'expert' | 'expert+';
  status: 'ready' | 'pending' | 'alert' | 'problem';
  assignee?: User;
};

declare type User = {
  __id: string;
  name: string;
  avatar: {
    url: string;
  };
  banner: {
    url: string;
  };
  availability: {
    mods: boolean;
    guest_diffs: boolean;
    playtesting: boolean;
  };
  communityRole: string;
  preferences: Gamemodes[];
  status: string;
  description: string;
  queue: Journey[];
};

declare type CommentNode = {
  __id: string;
  journey: Pick<Journey, '__id'>;
};

declare type UserActivity = {
  __id: string;
  /** ISO-DATE */
  when: string;
  who: Pick<User, '__id' | 'name'>;
  what: 'mention' | 'comment' | 'add' | 'remove' | 'edit' | 'create';
  to: 'journey' | 'user' | 'comment';
  user?: Pick<User, '__id' | 'name'>;
  journey?: Pick<Journey, '__id' | 'title'>;
  comment?: CommentNode;
  content?: string;
};
