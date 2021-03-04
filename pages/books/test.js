import Head from 'next/head'
import Books from '../../components/books';

export default function BooksStoreTest() {
    return (
        <div>
            <Head>
                <title>Books Store Test</title>
            </Head>
            <Books />
        </div>
    )
}