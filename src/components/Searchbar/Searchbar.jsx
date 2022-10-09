import { Component } from 'react';
import {
  Header,
  Form,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.module';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  handelSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    const { query } = this.state;
    const { handelSubmit, handleChange } = this;

    return (
      <Header>
        <Form onSubmit={handelSubmit}>
          <SearchFormButton type="submit">
            <span>Search</span>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </Form>
      </Header>
    );
  }
}