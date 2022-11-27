import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import {Heart} from './icons';
import {useTheme} from '@react-navigation/native';
// import Lottie from 'lottie-react-native';

const Comment = ({comment}) => {
  const {colors} = useTheme();
  // const animationProgress = useRef(new Animated.Value(0));
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    // setIsLike
  }, []);

  const toggleComment = () => {
    //makeLikeAnimation();
    setIsLike(!isLike);
    console.log('like comment: ', comment);
  };

  useEffect(() => {
    console.log('comment: ', comment);
  }, []);

  /*
  const makeLikeAnimation = () => {
    // setLike(!like);
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
  */

  return (
    <View style={styles.container}>
      <View style={styles.commentHead}>
        <Text style={[styles.commentNameText, {color: colors.usernameText}]}>
          {comment?.user?.name}
        </Text>
        <Text style={[styles.commentDateText, {color: colors.dateText}]}>
          {comment?.date}
        </Text>
      </View>
      <View style={styles.commentBody}>
        <Text>{comment?.comment}</Text>
      </View>
      <View style={styles.commentFooter}>
        <TouchableOpacity
          onPress={() => toggleComment()}
          activeOpacity={0.8}
          style={styles.commentLikeButton}>
          <Heart
            width="24"
            height="24"
            color={isLike ? '#F62053' : '#EBEBEB'}
          />
          {/* <Lottie
            source={require('@/assets/sources/heart.json')}
            progress={animationProgress.current}
            style={{width: 48, height: 48, borderWidth: 1}}
          /> */}
          <Text
            style={[styles.commentLikeCount, {color: colors.dateBoxElement}]}>
            2
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  commentHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentNameText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
  commentDateText: {
    fontSize: 14,
    lineHeight: 16,
  },
  commentBody: {
    flex: 1,
    marginTop: 8,
    marginBottom: 18,
  },
  commentFooter: {
    // borderWidth: 1,
  },
  commentLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikeCount: {
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
});

export default Comment;
