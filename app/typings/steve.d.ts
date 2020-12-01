declare type Journey = {
  __id: string;
  title: string;
  artist: string;
  organizer: User;
  lastUpdated: Date;
  image: {
    url: string;
  };
  banner: {
    url: string;
  };
  metadata: {
    genre: string;
    bpm: number | number[];
    closure: string;
    duration: number;
  };
  description: string;
  status: 'open' | 'clossed' | 'suspended';
  maps: DifficultyMap[];
};

declare type DifficultyMap = {
  __id: string;
  index: number;
  name: string;
  mode: 'std' | 'taiko' | 'ctb';
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
