import React, { useState } from 'react'

export default function SearchBar({ SearchText }) {
    const [text, setText] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault();
        SearchText(text);
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <span >
                    <input type="text" value={text} onChange={(event) => { setText(event.target.value); SearchText(event.target.value) }} placeholder='search text' />
                    <input type='submit' value='search' />
                </span>
            </form>
        </div>
    )
}
