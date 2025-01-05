import React, { useState } from 'react';

function WithSort(WrappedComponent) {
    return function EnhancedComponent({ data, sortKey, sortOptions, ...props }) {
        const [sortBy, setSortBy] = useState("");

        const sortedData = [...data].sort((a, b) => {
            if (sortBy === "atoz") {
                return a[sortKey].localeCompare(b[sortKey]);
            } else if (sortBy === "ztoa") {
                return b[sortKey].localeCompare(a[sortKey]);
            } else if (sortBy === "createdDate") {
                return new Date(a.dateAdded) - new Date(b.dateAdded);
            }
            return 0; // Default: no sorting
        });

        return (
            <>
                <div>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <WrappedComponent data={sortedData} {...props} />
            </>
        );
    };
}

export default WithSort;
