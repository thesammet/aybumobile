import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgSwap = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      clipRule="evenodd"
      d="M16.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L20.293 5l-3.647-3.646a.5.5 0 0 1 0-.708Z"
    />
    <Path
      clipRule="evenodd"
      d="M7 5.5A3.5 3.5 0 0 0 3.5 9v2a.5.5 0 0 1-1 0V9A4.5 4.5 0 0 1 7 4.5h14a.5.5 0 0 1 0 1H7ZM7.354 14.646a.5.5 0 0 1 0 .708L3.707 19l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0Z"
    />
    <Path
      clipRule="evenodd"
      d="M21 12.5a.5.5 0 0 1 .5.5v2a4.5 4.5 0 0 1-4.5 4.5H3a.5.5 0 0 1 0-1h14a3.5 3.5 0 0 0 3.5-3.5v-2a.5.5 0 0 1 .5-.5Z"
    />
  </Svg>
);
export default SvgSwap;
