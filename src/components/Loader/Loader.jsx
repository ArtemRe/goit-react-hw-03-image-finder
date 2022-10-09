import { Comment } from 'react-loader-spinner';
import { LoaderWrapp } from './Loader.module';

export default function Loader() {
  return (
    <LoaderWrapp>
      <Comment
  visible={true}
  height="80"
  width="80"
  ariaLabel="comment-loading"
  wrapperStyle={{}}
  wrapperClass="comment-wrapper"
  color="#fff"
  backgroundColor="#black"
/>
    </LoaderWrapp>
  );
}