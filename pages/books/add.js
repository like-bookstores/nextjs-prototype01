import Layout from '../../components/layout'
import { getBooksByTerm } from '../../lib/books'


export default function showListBooksByTerm({ books }) {
    return (
        <Layout>
            <ul>
            {books.map(({id, volumeInfo}) => (
              <li key={id}>
                {volumeInfo.title}
              </li>
            ))}
          </ul>
        </Layout>
    )
}

export async function getStaticProps() {
    const term = 'はてしない'
    const books = await getBooksByTerm(term)
    console.log(books)
    return {
        props: {
            books
        }
    }
}