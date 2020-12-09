import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import tw, { styled } from 'twin.macro';

type Props = {
  value: string;
} & React.HTMLProps<HTMLDivElement>;

const Container = styled.section`
  ul {
    li {
      list-style-type: disc;
      list-style-position: outside;
      ${tw`ml-12`}
    }
  }
`;

const Markdown: React.FC<Props> = ({ value, ...props }) => (
  <Container {...props}>
    <ReactMarkdown plugins={[gfm]} children={value} />
  </Container>
);

export default Markdown;
