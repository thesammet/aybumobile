import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgSend = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.207 2.793a1 1 0 0 1 0 1.414l-9.5 9.5a1 1 0 0 1-1.414-1.414l9.5-9.5a1 1 0 0 1 1.414 0Z"
      fill="currentColor"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.71 1.742c1.581-.553 3.101.967 2.548 2.549l-5.48 15.659c-.6 1.71-2.98 1.806-3.716.151l-2.82-6.343-6.343-2.82c-1.655-.735-1.558-3.117.151-3.715l15.66-5.48Zm.66 1.888L4.711 9.11l6.695 2.976a1 1 0 0 1 .508.508l2.975 6.695L20.37 3.63Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgSend;
