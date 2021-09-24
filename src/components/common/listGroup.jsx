import React from 'react';

//The textProperty and valueProperty allows us to use ListGroup with any kind of list
const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onitemSelect } = props;
  return (
    <ul className='list-group'>
      {items.map((item) => (
        <li key={item[valueProperty]} className='list-group-item'>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
