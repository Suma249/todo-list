import React from 'react'

export default function SortBy({ sortBy, setSortBy }) {
    return (
        <div>
            <p>
                <label>Sort By:</label>
                <select name="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="createdDate">Date Created</option>
                    <option value="atoz">A - Z</option>
                    <option value="ztoa">Z - A</option>
                </select>
            </p>
        </div>
    )
}
