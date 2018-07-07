import React from 'react';

function Square(props) {
  return (
      <button className="square" onClick={props.onClick}
              style={props.click ? styles.bold : styles.not_bold}>
        {props.value}
      </button>
  );
}

const styles = {
  bold: {
    border: 'solid',
  },
  not_bold: {
    border: '',
  }
};

export default Square;