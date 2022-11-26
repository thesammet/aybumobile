import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgMoon = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.081 2.509a1 1 0 0 1-.067 1.085 6 6 0 0 0 8.392 8.392 1 1 0 0 1 1.59.896A10 10 0 1 1 11.118 2.004a1 1 0 0 1 .963.505Zm-2.765 1.93a8 8 0 1 0 10.245 10.245A7.999 7.999 0 0 1 9.316 4.439Z"
      fill="#000"
    />
  </Svg>
);
export default SvgMoon;
