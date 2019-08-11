import React, { useState } from "react";


const Filter = ({filter}) => {
    const [ newInput, setNewInput ] = useState('')
    const handleInputChange = (event) => {
        setNewInput(event.target.value)
        filter(event.target.value)
      }
    return ( <div >
        filter shown with
        <input placeholder="Search" value={newInput}
        onChange={handleInputChange}/>
    </div> );
}
 
export default Filter;