import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgArrowLeft = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.293 19.707a1 1 0 0 0 1.414-1.414L6.414 13H20a1 1 0 1 0 0-2H6.414l5.293-5.293a1 1 0 0 0-1.414-1.414l-7 7-.015.015a.997.997 0 0 0 .016 1.4l6.999 7Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgArrowLeft;
