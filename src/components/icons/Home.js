import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgHome = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      d="M3 8.65 12 2l9 6.65V19.1c0 .504-.21.987-.586 1.343A2.055 2.055 0 0 1 19 21H5c-.53 0-1.04-.2-1.414-.556A1.853 1.853 0 0 1 3 19.1V8.65Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 21v-8h6v8"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgHome;
