import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgThumbsUpEmpty = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      d="M6 11v11H4.33A2.31 2.31 0 0 1 2 20v-7a2.31 2.31 0 0 1 2.33-2H6ZM8 11l4-9a3 3 0 0 1 3 3v4h5.66a2 2 0 0 1 2 2.3l-1.38 9a2 2 0 0 1-2 1.7H8V11Z"
      fill="#fff"
    />
  </Svg>
);
export default SvgThumbsUpEmpty;
