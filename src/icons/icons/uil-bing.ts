import React from 'react';


const UilBing = (props:any) => {
  const { color = "currentColor", size = "24", ...otherProps } = props;
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M10.1,8.6l1.7,4.3l2.8,1.3L9,17.5V3.4L5,2v17.8L9,22l10-5.8v-4.5L10.1,8.6z'
  }));
};





export default UilBing;