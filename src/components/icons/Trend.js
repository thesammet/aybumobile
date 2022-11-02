import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgTrend = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      d="M4 14C4 8.8 9.333 3.5 12 2c0 0-.72 5.78 1.5 8 2.22 2.22 1.5-5.5 3.5-3s3 5 3 7c0 5-4 7-8 7s-8-2-8-7Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgTrend;
