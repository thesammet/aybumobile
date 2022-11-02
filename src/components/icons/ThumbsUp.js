import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgThumbsUp = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.086 1.594A1 1 0 0 1 11 1a4 4 0 0 1 4 4v3h4.655a3 3 0 0 1 2.994 3.45l-1.38 9A3.002 3.002 0 0 1 18.275 23H4a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3h2.35l3.736-8.406ZM8 11.212l3.608-8.117A2 2 0 0 1 13 5v4a1 1 0 0 0 1 1h5.671a1 1 0 0 1 1 1.15l-1.38 9a1 1 0 0 1-1 .85H8v-9.788ZM6 21v-9H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgThumbsUp;
