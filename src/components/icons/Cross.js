import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgCross = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.354 5.646a.5.5 0 0 1 0 .708l-12 12a.5.5 0 0 1-.708-.708l12-12a.5.5 0 0 1 .708 0Z"
      fill="currentColor"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.646 5.646a.5.5 0 0 1 .708 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgCross;
