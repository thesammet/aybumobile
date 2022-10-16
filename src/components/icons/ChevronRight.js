import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgChevronRight = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.646 18.354a.5.5 0 0 1 0-.708L14.293 12 8.646 6.354a.5.5 0 1 1 .708-.708l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708 0Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgChevronRight;
