import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgCheck = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.567 3.318a1.35 1.35 0 0 1 .129 1.844L9.821 19.547a1.23 1.23 0 0 1-.9.452 1.221 1.221 0 0 1-.93-.382l-5.625-5.885a1.35 1.35 0 0 1 0-1.849c.488-.51 1.28-.51 1.768 0l4.674 4.89 10.996-13.32a1.212 1.212 0 0 1 1.763-.135Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgCheck;
