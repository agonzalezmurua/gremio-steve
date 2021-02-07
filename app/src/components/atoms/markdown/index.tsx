import ArticleStyle from '_globals/styles/article';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import tw, { styled } from 'twin.macro';

type Props = {
  value: string;
} & React.HTMLProps<HTMLDivElement>;

const Container = styled.section`
  ${tw`light:text-black dark:text-gray-300`}
  ul {
    li {
      list-style-type: disc;
      list-style-position: outside;
      ${tw`ml-12`}
    }
  }
`;

const Markdown: React.FC<Props> = ({ value, ...props }) => (
  <Container {...props} css={[ArticleStyle]}>
    <ReactMarkdown plugins={[gfm]} children={value} />
  </Container>
);

export default Markdown;
