import React from 'react';

const Total = ({osat}) => {
    let total = osat.reduce((cal, osa) => cal + osa.tehtavia, 0)
    return(
        <p>Yhteensä {total} tehtävää</p>
    )
}

export default Total;