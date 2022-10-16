import {Dimensions, PixelRatio} from 'react-native';
import {designWidth, designHeight} from '../constants';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const widthPercentageToDP = widthPercent => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export const responsiveWidth = size => {
  return widthPercentageToDP((size / designWidth) * 100);
};

export const responsiveHeight = size => {
  return heightPercentageToDP((size / designHeight) * 100);
};
