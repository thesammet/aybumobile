import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgHeart = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.653 2.955a6 6 0 0 1 6.54 9.788l-8.84 8.84a.5.5 0 0 1-.707 0l-8.84-8.84a6.001 6.001 0 1 1 8.488-8.487l.706.707.706-.706a6 6 0 0 1 1.947-1.302Zm2.297.543a5 5 0 0 0-3.536 1.465l-1.06 1.06a.5.5 0 0 1-.708 0l-1.06-1.06a5.001 5.001 0 1 0-7.072 7.073L12 20.523l8.486-8.487a5 5 0 0 0-3.536-8.538Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgHeart;
