import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgBakery = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-grid"
    accessibilityRole="image"
    {...props}>
    <Path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
  </Svg>
);
export default SvgBakery;
