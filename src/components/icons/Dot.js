import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
const SvgDot = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-more-horizontal"
    accessibilityRole="image"
    {...props}>
    <Circle cx={12} cy={12} r={1} />
    <Circle cx={19} cy={12} r={1} />
    <Circle cx={5} cy={12} r={1} />
  </Svg>
);
export default SvgDot;
