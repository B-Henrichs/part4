import React from 'react'
const Search = (props) => { 
    return(
        <div>
        search:<input value={props.newSearch} onChange={props.handleSearchChange} />
        </div>
            )
        }
export default Search