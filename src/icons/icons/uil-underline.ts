import React from 'react';


const UilUnderline = (props:any) => {
  const { color = "currentColor", size = "24", ...otherProps } = props;
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M12,15.5a5,5,0,0,0,5-5v-5a1,1,0,0,0-2,0v5a3,3,0,0,1-6,0v-5a1,1,0,0,0-2,0v5A5,5,0,0,0,12,15.5Zm5,2H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Z'
  }));
};





export default UilUnderline;