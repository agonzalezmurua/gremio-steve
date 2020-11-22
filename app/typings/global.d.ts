declare type Journey = {
  __id: string;
  title: string;
  artist: string;
  organizer: User;
  lastUpdated: Date;
  image: {
    url: string;
  };
  metadata: {
    genre: string;
    bpm: number;
    closure?: Date;
    duration: number;
  };
  asginees: User[];
  open: number;
};

declare type User = {
  __id: string;
  name: string;
};
