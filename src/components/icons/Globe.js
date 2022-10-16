import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgGlobe = props => (
  <Svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.487 3.423C8.42 4.145 3.67 9.153 3.35 15.333h6.673a21.067 21.067 0 0 1 4.463-11.91Zm3.026 0a21.067 21.067 0 0 1 4.463 11.91h6.673c-.32-6.18-5.07-11.188-11.136-11.91Zm3.128 11.91A19.734 19.734 0 0 0 16 3.676a19.734 19.734 0 0 0-4.64 11.657h9.28Zm-9.282 1.334h9.282A19.733 19.733 0 0 1 16 28.324a19.733 19.733 0 0 1-4.64-11.657Zm-1.335 0H3.35c.32 6.18 5.07 11.188 11.136 11.91a21.066 21.066 0 0 1-4.463-11.91Zm7.49 11.91a21.066 21.066 0 0 0 4.462-11.91h6.673c-.32 6.18-5.07 11.188-11.136 11.91ZM16.01 30C23.737 29.995 30 23.729 30 16c0-7.732-6.268-14-14-14S2 8.268 2 16c0 7.729 6.263 13.995 13.99 14h.02Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgGlobe;
