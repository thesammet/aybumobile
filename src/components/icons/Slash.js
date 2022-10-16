import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
const SvgSlash = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-slash"
    accessibilityRole="image"
    {...props}>
    <Circle cx={12} cy={12} r={10} />
    <Path d="m4.93 4.93 14.14 14.14" />
  </Svg>
);
export default SvgSlash;
