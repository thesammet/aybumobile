import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgHeartFill = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.95 2.498a6 6 0 0 0-4.244 1.759L12 4.963l-.706-.707a6.001 6.001 0 0 0-8.488 8.487l8.84 8.84a.5.5 0 0 0 .708 0l8.84-8.84a6 6 0 0 0-1.947-9.788 6 6 0 0 0-2.297-.457Z"
      fill="#124BDC"
    />
  </Svg>
);
export default SvgHeartFill;
