import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>死ぬまでに読みたい千冊 books/index</title>
            </Head>
            <h1 className="title">
                <Link href="books/book">
                    <a>Link test</a>
                </Link>
            </h1>
        </Layout>
    )
}