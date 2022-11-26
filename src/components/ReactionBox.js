import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
  ThumbsUpFill,
  ThumbsUpEmpty,
  ThumbsDownEmpty,
} from './icons';
import {useTheme} from '@react-navigation/native';
import Lottie from 'lottie-react-native';

const ReactionBox = ({item, likeMeal, disslikeMeal, goToComments}) => {
  const {colors} = useTheme();
  const [like, setLike] = useState(false);
  const [disslike, setDisslike] = useState(false);

  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    console.log('itemmm: ', item);
  }, []);

  const makeLikeAnimation = () => {
    setLike(!like);
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    // end animation
    setTimeout(() => {
      animationProgress.current.setValue(0);
    }, 1500);
  };

  const makeDisslikeAnimation = () => {
    setDisslike(!disslike);
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    // end animation
    setTimeout(() => {
      animationProgress.current.setValue(0);
    }, 1500);
  };

  return (
    <View
      style={[
        styles.reactionContainer,
        {backgroundColor: colors.reactionBg, width: rw(224), height: rh(56)},
      ]}>
      <TouchableOpacity
        style={[styles.reactionItem, {position: 'relative'}]}
        onPress={() => {
          makeLikeAnimation();
          likeMeal(item);
        }}>
        {!like ? (
          <ThumbsUpEmpty width="28" height="28" />
        ) : (
          <View
            style={{
              width: 80,
              height: 80,
              borderWidth: 1,
            }}>
            <Lottie
              source={require('@/assets/sources/like.json')}
              progress={animationProgress.current}
            />
          </View>
        )}

        <Text
          style={[
            styles.reactionText,
            like && {position: 'absolute', left: 60, top: 32},
          ]}>
          {item?.social?.likes}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.reactionItem, {marginHorizontal: 32}]}
        onPress={() => {
          makeDisslikeAnimation();
          disslikeMeal(item);
        }}>
        {!disslike ? (
          <ThumbsDownEmpty width="28" height="28" />
        ) : (
          <View
            style={{
              width: 80,
              height: 80,
              borderWidth: 1,
            }}>
            <Lottie
              source={require('@/assets/sources/like.json')}
              progress={animationProgress.current}
            />
          </View>
        )}

        <Text
          style={[
            styles.reactionText,
            like && {position: 'absolute', left: 60, top: 32},
          ]}>
          {item?.social?.likes}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reactionItem}
        onPress={() => goToComments(item)}>
        <MessageCircle width="28" height="28" color="white" />
        <Text style={styles.reactionText}>{item?.meal?.commentCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  reactionItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 6,
  },
});

export default ReactionBox;
