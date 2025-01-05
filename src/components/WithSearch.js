import React, { useState } from 'react';

function WithSearch(WrappedComponent) {
    return function EnhancedComponent({ data, searchKey, ...props }) {
        const [searchText, setSearchText] = useState("");

        const filteredData = data.filter((item) =>
            item[searchKey].toLowerCase().includes(searchText.toLowerCase())
        );

        return (
            <>
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <WrappedComponent data={filteredData} {...props} />
            </>
        );
    };
}

export default WithSearch;
