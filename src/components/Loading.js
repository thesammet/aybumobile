import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Loading = ({size = 'large'}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.loading}>
      <ActivityIndicator size={size} color={colors.tabBarTextActive} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
    opacity: 0.2,
    zIndex: 999,
    elevation: 999,
  },
});

export default Loading;
