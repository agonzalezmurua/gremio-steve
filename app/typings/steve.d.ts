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
    bpm: number | number[];
    closure?: string;
    duration: number;
  };
  description?: string;
  status: 'open' | 'clossed' | 'suspended';
  private: boolean;
  maps: GameMap[];
};

declare type GameMap = {
  __id: string;
  name: string;
  mode: 'std' | 'taiko' | 'ctb' | 'mania';
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
};
