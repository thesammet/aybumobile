import {
  useBottomSheetSpringConfigs,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import {Easing} from 'react-native-reanimated';

export const designWidth = 375;
export const designHeight = 812;

export const tabHeight = 70;
export const tabIconSize = 28;

export const aybuUrl =
  'https://aybu.edu.tr/sks/tr/sayfa/6265/Ayl%C4%B1k-Yemek-Men%C3%BCs%C3%BC';

export const animationConfigsSpring = useBottomSheetSpringConfigs({
  damping: 100,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
});

export const animationConfigsTime = useBottomSheetTimingConfigs({
  duration: 250,
  easing: Easing.exp,
});
