import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgChevronLeft = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.707 18.707a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.414L9.414 12l5.293 5.293a1 1 0 0 1 0 1.414Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgChevronLeft;
