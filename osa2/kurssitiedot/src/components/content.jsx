import React from 'react';
import Part from './part'

const Content = ({osat}) => {
    return (
        <div>
            {osat.map(sisalto => (
                <Part kurssi={sisalto} key={sisalto.id}/>
            ))}
        </div>
    )
}
 
export default Content;