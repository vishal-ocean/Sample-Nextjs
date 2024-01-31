import React from 'react';


const UilPhoneSlash = (props:any) => {
  const { color = "currentColor", size = "24", ...otherProps } = props;
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M4.91,13.1a1,1,0,0,0,.85.47A1,1,0,0,0,6.61,12,17,17,0,0,1,4.14,5.15a1,1,0,0,1,.24-.81A1,1,0,0,1,5.13,4h3a1,1,0,0,1,1,.8c0,.23.08.44.13.67l0,.13a10.33,10.33,0,0,0,.47,1.54L8.34,7.8a1,1,0,0,0-.52.57,1,1,0,0,0,0,.77c.1.21.2.42.32.64a1,1,0,0,0,1.37.37,1,1,0,0,0,.5-.94L10.58,9a2,2,0,0,0,1.05-2.48,9.3,9.3,0,0,1-.39-1.3l0-.1c0-.2-.08-.4-.11-.58A3,3,0,0,0,8.16,2h-3A3,3,0,0,0,2.88,3a3,3,0,0,0-.72,2.39A19.05,19.05,0,0,0,4.91,13.1Zm14.61-.21-.6-.11-.08,0a9.31,9.31,0,0,1-1.33-.39,2,2,0,0,0-2.47,1l-.21.46a12.39,12.39,0,0,1-1.92-1.37l8.8-8.79a1,1,0,1,0-1.42-1.42l-18,18a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4.59-4.6a19.09,19.09,0,0,0,10.29,4.73,2.69,2.69,0,0,0,.4,0,3,3,0,0,0,2-.75,3,3,0,0,0,1-2.25v-3A3,3,0,0,0,19.52,12.89Zm.48,6a1,1,0,0,1-.34.75,1,1,0,0,1-.81.24A17.07,17.07,0,0,1,9.71,15.7l1.77-1.77a14.69,14.69,0,0,0,3.38,2.21,1,1,0,0,0,.77,0,1,1,0,0,0,.57-.52l.62-1.41a12,12,0,0,0,1.6.47l.11,0,.69.13a1,1,0,0,1,.78,1Z'
  }));
};





export default UilPhoneSlash;