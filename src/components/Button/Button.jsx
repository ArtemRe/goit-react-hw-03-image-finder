import { ButtonLoadMore } from './Button.module';

export default function Button({ onLoadMore }) {
  return (
    <ButtonLoadMore type="button" onClick={onLoadMore}>
      load more
    </ButtonLoadMore>
  );
}