import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = {
    books: [],
}

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'APPEND_BOOKS':
            return {
                ...state,
                books: action.books.reduce((books, newBook) => {
                    if (books.some(({ url }) => url === newBook.uri)) {
                        return books;
                    }
                    return [...books, newBook]
                }, state.books),
            };
        default:
            return state;
    }
}

const actions = {

    appendBooks(books) {
        return {
            type: 'APPEND_BOOKS',
            books,
        };
    },

    * fetchBooks(term) {

        if (!term) {
            return;
        }
        const encodedTerm = encodeURI(term);
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=search+${encodedTerm}`;

        const books = yield {
            type: 'FETCH',
            request: {
                url: apiUrl,
                options: {
                    method: 'GET',
                }
            }
        };

        console.log(books);

        return actions.appendBooks( books?.events );
    },
};

const resolvers = {
    * getBooks( term ) {
        yield actions.fetchBooks( term );
    }
};

registerStore( 'my-store/books', {
    reducer,
    actions,
    //selectors,
    controls: {
        async FETCH( {request} ) {
            const response = await fetch( request.url, request.options );
            const data = response.json();
            return data;
        },
    },
    resolvers,
});