import React, { Component } from 'react';

//This is a controlled component because it receives all the data via props. It doesn't have its own state
//So we can use a stateless functional component

const Like = (props) => {
    let classes = 'fa fa-heart';
    if (!props.liked) classes += '-o';
    return (
      <i
        onClick={props.onClick}
        style={{ cursor: 'pointer' }}
        className={classes}
        aria-hidden='true'
      ></i>
    )
}

export default Like;
