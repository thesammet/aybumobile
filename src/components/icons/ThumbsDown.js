import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgThumbsDown = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.564 3.316A1.31 1.31 0 0 0 19.688 3H18v9h1.688A1.31 1.31 0 0 0 21 10.923V4.077a1.31 1.31 0 0 0-.436-.761ZM16 12.788l-3.608 8.117A2 2 0 0 1 11 19v-4a1 1 0 0 0-1-1H4.329a1.001 1.001 0 0 1-1-1.15l1.38-9a1 1 0 0 1 1-.85H16v9.788ZM19.662 1a3.31 3.31 0 0 1 3.329 2.866c.006.044.009.09.009.134v7c0 .045-.003.09-.009.134A3.31 3.31 0 0 1 19.662 14H17.65l-3.736 8.406A1 1 0 0 1 13 23a4 4 0 0 1-4-4v-3H4.345a3 3 0 0 1-2.994-3.45l1.38-9A3.002 3.002 0 0 1 5.725 1h13.937Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgThumbsDown;
