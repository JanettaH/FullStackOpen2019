import React from 'react';
import Header from './header';
import Content from './content';
import Total from './total';

const Course = ({kurssi}) => {
    return (<div>
        <Header nimi={kurssi.nimi}/>
        <Content osat={kurssi.osat}/>
        <Total osat={kurssi.osat} />
    </div>  );
}
 
export default Course;