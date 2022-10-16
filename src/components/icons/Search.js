import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgSearch = props => (
  <Svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.667 14.667c0-5.523 4.477-10 10-10 5.522 0 10 4.477 10 10a9.967 9.967 0 0 1-2.84 6.98.672.672 0 0 0-.18.18 9.968 9.968 0 0 1-6.98 2.84c-5.523 0-10-4.478-10-10Zm17.528 8.471A11.29 11.29 0 0 1 14.667 26c-6.26 0-11.334-5.074-11.334-11.333 0-6.26 5.074-11.334 11.334-11.334C20.926 3.333 26 8.407 26 14.667a11.29 11.29 0 0 1-2.862 7.528l5.333 5.333a.667.667 0 1 1-.942.943l-5.334-5.333Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgSearch;
