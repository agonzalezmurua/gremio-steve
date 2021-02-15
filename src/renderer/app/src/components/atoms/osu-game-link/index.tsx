import React from 'react';

type OsuGameLinkProps = {
  timestamp: string;
};

const OsuGameLink: React.FC<OsuGameLinkProps> = ({ timestamp }) => {
  return <a href={`osu://edit/${timestamp}`}>{timestamp}</a>;
};

export default React.memo<OsuGameLinkProps>(OsuGameLink);
