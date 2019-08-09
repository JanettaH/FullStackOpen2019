import React from 'react';


const Part = ({kurssi}) => {
    return (
        <p>{kurssi.nimi} {kurssi.tehtavia}</p>
    )
}
 
export default Part;