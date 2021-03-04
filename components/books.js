import { useSelect } from '@wordpress/data';
import { useState } from 'react';

function Books() {

    const term = useState(null);

    const books = useSelect((select) => {
        const { getBooks } = select('my-store/books');
        return getBooks(term) || [];
    }, [term]);

    return (
        <>
            <ul>
                {books.map(({ id, volumeInfo }) => (
                    <li key={id}>
                        <div>{volumeInfo.title} {volumeInfo.subtitle} / {volumeInfo.authors}</div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Books;