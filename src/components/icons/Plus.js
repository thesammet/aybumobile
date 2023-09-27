import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgPlus = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-plus"
    accessibilityRole="image"
    {...props}>
    <Path d="M12 5v14M5 12h14" />
  </Svg>
);
export default SvgPlus;
