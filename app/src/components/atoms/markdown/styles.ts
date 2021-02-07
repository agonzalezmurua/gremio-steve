import tw, { styled } from 'twin.macro';
import ArticleStyle from '_globals/styles/article';

export default {
  Container: styled.section`
    ${ArticleStyle}
    ${tw`light:text-black dark:text-gray-300`}
    ul {
      li {
        list-style-type: disc;
        list-style-position: outside;
        ${tw`ml-12`}
      }
    }
  `,
};
