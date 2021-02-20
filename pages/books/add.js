import React from 'react'
import Layout from '../../components/layout'
import { getBooksByTerm, getBookByTerm } from '../../lib/books'

//Input Component
class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const enteredText = event.target.value;
    this.setState({
      userInput: enteredText
    }, this.props.changeHandler(this.props.id, enteredText));
  }

  render() {
    return (
      <input type="text"
        placeholder="input1 here..."
        value={this.state.userInput}
        onChange={this.handleChange} />
    )
  }
}

//登録したい本の情報を入力するフォーム
class FormBookInfo extends React.Component {
  constructor() {
    super();
    this.state = { bookName: null };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id, value) {
    this.setState({ [id]: value });
  }
  
  render() {
    return (
      <>
        <form>
          <label>
            本の名前:
          <Input id="bookName" type="text" changeHandler={this.handleChange} />
          </label>
        </form>
      ここに出るはず: {this.state.bookName}
      {console.log("bookInfo:"+getBookByTerm(this.state.bookName))}
      </>
    )
  }
}


export default function showListBooksByTerm({ books }) {

  return (
    <Layout>
      <FormBookInfo />
      <ul>
        {books.map(({ id, volumeInfo }) => (
          <li key={id}>
            <div>{volumeInfo.title} {volumeInfo.subtitle} / {volumeInfo.authors}</div>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const term = 'はてしない物語'
  const books = await getBooksByTerm(term)
  console.log(books)
  return {
    props: {
      books
    }
  }
}