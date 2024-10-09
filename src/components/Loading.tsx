import React from 'react';
import ReactLoading from 'react-loading';

interface ExampleProps {
  type: 'blank' | 'balls' | 'bars' | 'bubbles' | 'cubes' | 'cylon' | 'spin' | 'spinningBubbles' | 'spokes'; 
  color: string;
}

const Loading: React.FC<ExampleProps> = ({ type = 'spin', color = '#000000' }) => (
  <ReactLoading type={type} color={color} height={60} width={60} />
);

export default Loading;
