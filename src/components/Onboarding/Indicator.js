import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AppText from '../AppText';

const {width, height} = Dimensions.get('screen');

const Indicator = ({data, scrollx}) => {
  return (
    <View style={styles.indicatorContainer}>
      {/* <TouchableOpacity style={[styles.button, styles.skipButton]}>
        <AppText style={[styles.buttonText, styles.skipButtonText]}>
          Geç
        </AppText>
      </TouchableOpacity> */}
      <View style={styles.dotContainer}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width]; // previous, current, next
          const scale = scrollx.interpolate({
            inputRange: inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });
          const dotWidth = scrollx.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          const opacity = scrollx.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`indicator-${i}`}
              style={[
                styles.dot,
                {width: dotWidth, opacity, transform: [{scale}]},
              ]}
            />
          );
        })}
      </View>

      {/* <TouchableOpacity style={[styles.button, styles.nextButton]}>
        <AppText style={[styles.buttonText, styles.nextButtonText]}>
          İleri
        </AppText>
      </TouchableOpacity> */}
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 8,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  skipButtonText: {},
  nextButton: {},
  nextButtonText: {
    color: '#000',
  },
});
