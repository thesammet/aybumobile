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
      d="M15.354 5.646a.5.5 0 0 1 0 .708L9.707 12l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0Z"
      fill="#124BDC"
    />
  </Svg>
);
export default SvgChevronLeft;
