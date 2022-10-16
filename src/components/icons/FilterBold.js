import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgFilterBold = props => (
  <Svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.457 3.439c.219-.471.69-.772 1.21-.772h26.666a1.333 1.333 0 0 1 1.018 2.194L20 17.101v10.9a1.333 1.333 0 0 1-1.93 1.192l-5.333-2.667A1.333 1.333 0 0 1 12 25.333v-8.231L1.649 4.86a1.333 1.333 0 0 1-.192-1.422ZM5.54 5.333l8.811 10.42c.204.24.316.545.316.86v7.896l2.666 1.334v-9.23c0-.315.112-.62.316-.86l8.81-10.42H5.54Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgFilterBold;
