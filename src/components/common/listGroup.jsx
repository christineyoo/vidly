import React from 'react';

//The textProperty and valueProperty allows us to use ListGroup with any kind of list
const ListGroup = (props) => {
  const { items, textProperty, valueProperty, onitemSelect, selectedItem } =
    props;
  return (
    <ul className='list-group'>
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? 'list-group-item active'
              : 'list-group-item'
          }
          onClick={() => onitemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

//defaultProps no longer requires passing in these props
//If in the future we're working with an object that doesn't have these properties, then we can override the default values
ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;
