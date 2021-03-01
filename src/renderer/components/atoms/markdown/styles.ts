import tw, { styled } from 'twin.macro';
import ArticleStyle from '_/globals/styles/article';

export default {
  Container: styled.div`
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
