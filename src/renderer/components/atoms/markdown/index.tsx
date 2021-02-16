import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import Styles from './styles';

const Markdown: React.FC = ({ children, ...props }) => (
  <Styles.Container {...props}>
    <ReactMarkdown plugins={[gfm]}>{String(children)}</ReactMarkdown>
  </Styles.Container>
);

export default Markdown;
