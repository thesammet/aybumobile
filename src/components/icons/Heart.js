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
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.501 5.501 0 0 0 0-7.78Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgHeart;
