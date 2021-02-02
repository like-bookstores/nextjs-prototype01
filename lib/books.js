// Google Book APIからtermで検索した本の一覧を取得する
export async function getBooksByTerm(term) {
    const encodedTerm = encodeURI(term)// termをエスケープ
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=search+${encodedTerm}`
    const res = await fetch(apiUrl)
    const books = await res.json()

    return (
        books.items
    )
}

