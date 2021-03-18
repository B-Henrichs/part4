import React from 'react'
const Search = (props) => { 
    return(
        <div>
            <h3>Search</h3>
        search:<input value={props.newSearch} onChange={props.handleSearchChange} />
        </div>
            )
        }
export default Search