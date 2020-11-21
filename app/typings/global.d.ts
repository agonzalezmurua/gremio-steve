declare type Journey = {
  __id: string;
  title: string;
  artist: string;
  owner: {
    __id: string,
    name: string,
  };
  lastUpdated: Date;
  image: {
    url: string;
  };
};

declare type User = {

}