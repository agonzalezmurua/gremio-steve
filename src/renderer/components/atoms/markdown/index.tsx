import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import Styles from './styles';

type Props = {
  text: string;
} & React.HTMLProps<HTMLDivElement>;

const Markdown: React.FC<Props> = ({ text, ...props }) => (
  <Styles.Container {...props}>
    <ReactMarkdown plugins={[gfm]} children={text} />
  </Styles.Container>
);

export default Markdown;
