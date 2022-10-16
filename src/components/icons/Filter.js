import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgFilter = props => (
  <Svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.062 3.72a.667.667 0 0 1 .605-.387h26.666a.667.667 0 0 1 .51 1.097l-10.51 12.427V28a.667.667 0 0 1-.964.596l-5.334-2.666a.666.666 0 0 1-.368-.597v-8.476L2.157 4.43a.667.667 0 0 1-.095-.71Zm2.042.947 9.738 11.516c.102.12.158.273.158.43v8.308l4 2V16.613c0-.157.056-.31.158-.43l9.738-11.516H4.104Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgFilter;
