import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import moment from 'moment';
const Comment = ({ comment, onLikeComment = () => { } }) => {
  const { colors } = useTheme();

  const animation = useRef(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      if (comment?.isLike) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (comment?.isLike) {
      animation.current.play(19, 50);
    } else {
      animation.current.play(0, 19);
    }
  }, [comment?.isLike]);

  const toggleLikeComment = async () => {
    let likeStatus = comment?.isLike ? false : true;
    onLikeComment(comment?.comment?._id, likeStatus);
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentHead}>
        <Text style={[styles.commentNameText, { color: colors.usernameText }]}>
          {comment?.username}
        </Text>
        <Text style={[styles.commentDateText, { color: colors.dateText }]}>
          {moment(comment?.comment?.date).fromNow()}
        </Text>
      </View>
      <View style={styles.commentBody}>
        <Text style={[styles.commentText, { color: colors.commentText }]}>{comment?.comment?.comment}</Text>
      </View>
      <View style={styles.commentFooter}>
        <TouchableOpacity
          onPress={() => toggleLikeComment()}
          activeOpacity={0.8}
          style={styles.commentLikeButton}>
          <Lottie
            ref={animation}
            style={styles.heartLottie}
            source={require('@/assets/sources/heart.json')}
            autoPlay={false}
            loop={false}
          />
          <Text
            style={[styles.commentLikeCount, { color: colors.dateBoxElement }]}>
            {comment?.comment?.likeCount}
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
    alignItems: 'center'
  },
  commentNameText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
  commentText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
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
    marginTop: -5,
    marginLeft: -14,
  },
  commentLikeCount: {
    marginLeft: 4,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
  heartLottie: {
    width: 50,
    height: 50,
  },
  commentLikeCount: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default Comment;
