import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgUser = props => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.654 16.424C4.692 15.502 6.077 15 7.5 15h9c1.423 0 2.808.502 3.846 1.424C21.388 17.35 22 18.634 22 20v2a1 1 0 1 1-2 0v-2c0-.755-.336-1.507-.982-2.081-.65-.578-1.554-.919-2.518-.919h-9c-.964 0-1.868.341-2.518.919C4.336 18.493 4 19.245 4 20v2a1 1 0 1 1-2 0v-2c0-1.367.612-2.65 1.654-3.576ZM12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgUser;
