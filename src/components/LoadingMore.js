import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

const LoadingMore = () => {
  const {colors} = useTheme();

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="small" color={colors.tabBarTextActive} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: '#F5FCFF88',
    opacity: 0.4,
    zIndex: 999,
    elevation: 999,
  },
});

export default LoadingMore;
