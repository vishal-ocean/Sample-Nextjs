import React from 'react';


const UilYen = (props:any) => {
  const { color = "currentColor", size = "24", ...otherProps } = props;
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M18.55,2.17a1,1,0,0,0-1.38.28L12,10.2,6.83,2.45a1,1,0,0,0-1.66,1.1l5,7.45H7a1,1,0,0,0,0,2h4v2H7a1,1,0,0,0,0,2h4v4a1,1,0,0,0,2,0V17h4a1,1,0,0,0,0-2H13V13h4a1,1,0,0,0,0-2H13.87l5-7.45A1,1,0,0,0,18.55,2.17Z'
  }));
};





export default UilYen;