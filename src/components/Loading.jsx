import React from 'react';
import { Spin } from 'antd';

const Loading = () => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}
  >
    <Spin />
  </div>
);

export default Loading;
