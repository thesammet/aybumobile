import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgChevronDown = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      clipRule="evenodd"
      d="M5.646 8.646a.5.5 0 0 1 .708 0L12 14.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708Z"
    />
  </Svg>
);
export default SvgChevronDown;
