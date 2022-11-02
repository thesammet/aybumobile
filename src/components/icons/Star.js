import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgStar = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.205 2.383c.733-1.49 2.857-1.49 3.59 0L16.065 7l5.083.745c1.637.24 2.29 2.252 1.107 3.41l-3.681 3.598.868 5.08c.28 1.635-1.438 2.88-2.905 2.105L12 19.542l-4.537 2.395c-1.467.774-3.184-.47-2.905-2.105l.868-5.08-3.681-3.599C.56 9.996 1.215 7.985 2.852 7.744L7.936 7l2.27-4.616ZM12 3.266 9.498 8.353a1 1 0 0 1-.752.548l-5.603.822 4.056 3.966a1 1 0 0 1 .287.883l-.957 5.597 5.004-2.642a1 1 0 0 1 .934 0l5.004 2.642-.957-5.597a1 1 0 0 1 .287-.883l4.056-3.966-5.603-.822a1 1 0 0 1-.752-.548L12 3.266Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgStar;
