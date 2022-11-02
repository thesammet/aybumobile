import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgMeal = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.755 2.03a1 1 0 0 1 1.125.495l4.41 8.176c1.078 1.999-.37 4.424-2.641 4.424H16V21a1 1 0 1 1-2 0V3a1 1 0 0 1 .755-.97ZM16 13.125h1.649a1 1 0 0 0 .88-1.475L16 6.96v6.165ZM4 2a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V3a1 1 0 1 1 2 0v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1Z"
      fill="currentColor"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 2a1 1 0 0 1 1 1v18a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgMeal;
