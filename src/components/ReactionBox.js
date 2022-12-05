import React, { useRef, useState, useEffect, useContext } from 'react';
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
  ThumbsUpFill,
  ThumbsUpEmpty,
  ThumbsDownEmpty,
  ThumbsDownFill,
} from './icons';
import { useTheme } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import { rating } from '../api/rating';
import { AuthContext } from '../context/Auth';
import { errorMessage } from '../utils/showToast';

const ReactionBox = ({
  item,
  type,
  navigation,
}) => {
  const { colors } = useTheme();
  const { token } = useContext(AuthContext);
  const [mealItem, setMealItem] = useState(item);

  let [likeCount, setLikeCount] = useState(mealItem.social.likes)
  let [dislikeCount, setDislikeCount] = useState(mealItem.social.dislikes)
  let [likeActive, setLikeActive] = useState(mealItem.social.ratingStatus
    == "like"
    ? true
    : false)
  let [dislikeActive, setDislikeActive] = useState(mealItem.social.ratingStatus
    == "dislike"
    ? true
    : false)

  let setDislike = () => {
    setDislikeActive(!dislikeActive)
    setDislikeCount(dislikeActive
      ? dislikeCount - 1
      : dislikeCount + 1)
  }
  let setLike = () => {
    setLikeActive(!likeActive)
    setLikeCount(likeActive
      ? likeCount - 1
      : likeCount + 1)
  }

  let handleLike = () => {
    if (dislikeActive) {
      setLike()
      setDislike()
    }
    setLike()
  }

  let handleDislike = () => {
    if (likeActive) {
      setDislike()
      setLike()
    }
    setDislike()
  }

  const ratingMethod = async (ratingType) => {
    ratingType == 'like' ? handleLike() : handleDislike()
    try {
      let response = await rating(token, ratingType, mealItem?.meal?._id);
      if (response.error) {
        errorMessage('Reaksiyon iletilemedi.');
      }
    } catch (error) {
      errorMessage('Reaksiyon iletilemedi.');
    }
  };

  const goToComments = () => {
    navigation.navigate('Comments', { item: mealItem });
  };

  return (
    <View
      style={[
        styles.reactionContainer,
        { backgroundColor: colors.reactionBg, width: rw(224), height: rh(56) },
      ]}>
      <TouchableOpacity
        style={[styles.reactionItem, { position: 'relative' }]}
        onPress={() => {
          ratingMethod('like')
        }}>
        {likeActive ? (
          <ThumbsUpFill width="24" height="24" color="#0AD4EE" />
        ) : (
          <ThumbsUpEmpty width="24" height="24" />
        )}
        <Text style={[styles.reactionText]}>
          {likeCount}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.reactionItem, { marginHorizontal: 32 }]}
        onPress={() => {
          ratingMethod('dislike')
        }}>
        {dislikeActive ? (
          <ThumbsDownFill width="24" height="24" color="#0AD4EE" />
        ) : (
          <ThumbsDownEmpty width="24" height="24" />
        )}
        <Text style={[styles.reactionText]}>
          {dislikeCount}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reactionItem}
        onPress={() => goToComments(mealItem)}>
        <MessageCircle width="24" height="24" color="white" />
        <Text style={styles.reactionText}>
          {type === 'home' && mealItem?.meal?.commentCount}
          {type === 'trends' && mealItem?.social.comments}
        </Text>
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
    fontSize: 14,
    marginLeft: 6,
  },
});

export default ReactionBox;
/* const reactionChecker = (ratingType) => {

    if (ratingType == "like") {
      if (status == "like") {
        setStatus('inactive')
        setLikeCount(likeCount - 1)
      } else if (status == "dislike") {
        setStatus('like')
        setDislikeCount(dislikeCount - 1)
        setLikeCount(likeCount + 1)
      } else {
        setStatus('like')
        setLikeCount(likeCount + 1)
      }
    } else {
      if (status == "like") {
        setStatus('dislike')
        setDislikeCount(dislikeCount + 1)
        setLikeCount(likeCount - 1)
      } else if (status == "dislike") {
        setStatus('inactive')
        setLikeCount(dislikeCount - 1)
      } else {
        setStatus('dislike')
        setDislikeCount(dislikeCount + 1)
      }
    }
  } */