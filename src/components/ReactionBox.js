import React, {useRef, useState, useEffect, useContext} from 'react';
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
import {useTheme} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {rating} from '../api/rating';
import {AuthContext} from '../context/Auth';
import {errorMessage} from '../utils/showToast';

const ReactionBox = ({
  item,
  // toggleLikeMeal,
  // toggleDislikeMeal,
  type,
  navigation,
}) => {
  const {colors} = useTheme();
  const {token} = useContext(AuthContext);

  const [mealItem, setMealItem] = useState(item);

  useEffect(() => {
    console.log('ii: ', item);
  }, []);

  const goToComments = () => {
    navigation.navigate('Comments', {item: mealItem});
  };

  const toggleLikeMeal = async () => {
    console.log('mealitemSocialRating: ', mealItem.social.ratingStatus);
    let ratingStatus = null;
    // null check is not working
    if (mealItem?.social?.ratingStatus.toString().length == 4) {
      ratingStatus = 'like';
    }
    if (mealItem?.social?.ratingStatus == 'dislike') {
      ratingStatus = 'like';
    }

    console.log('ratingStatus: ', ratingStatus);
    if (ratingStatus == 'like') {
      mealItem.social.likes = mealItem.social.likes + 1;
      if (mealItem.social.ratingStatus == 'dislike') {
        mealItem.social.dislikes = mealItem.social.dislikes - 1;
      }
    } else {
      mealItem.social.likes = mealItem.social.likes - 1;
      if (mealItem.social.ratingStatus == 'dislike') {
        mealItem.social.dislikes = mealItem.social.dislikes + 1;
      }
    }

    let changeItem = {
      ...mealItem,
      social: {
        ...mealItem.social,
        ratingStatus: ratingStatus,
      },
    };
    setMealItem(changeItem);

    let response = await rating(token, ratingStatus, mealItem?.meal?._id);
    if (response.error) {
      // errorMessage('Bir hata oluştu');
    } else {
    }
  };

  const toggleDislikeMeal = async () => {
    let ratingStatus = null;

    // null check is not working
    if (mealItem?.social?.ratingStatus.toString().length == 4) {
      ratingStatus = 'dislike';
    }
    if (mealItem?.social?.ratingStatus == 'like') {
      ratingStatus = 'dislike';
    }

    if (ratingStatus == 'dislike') {
      mealItem.social.dislikes = mealItem.social.dislikes + 1;
      if (mealItem.social.ratingStatus == 'like') {
        mealItem.social.likes = mealItem.social.likes - 1;
      }
    } else {
      mealItem.social.dislikes = mealItem.social.dislikes - 1;
      if (mealItem.social.ratingStatus == 'like') {
        mealItem.social.likes = mealItem.social.likes + 1;
      }
    }

    let changeItem = {
      ...mealItem,
      social: {
        ...mealItem.social,
        ratingStatus: ratingStatus,
      },
    };
    setMealItem(changeItem);

    let response = await rating(token, ratingStatus, mealItem?.meal?._id);
    if (response.error) {
      // errorMessage('Bir hata oluştu');
    } else {
    }
  };

  return (
    <View
      style={[
        styles.reactionContainer,
        {backgroundColor: colors.reactionBg, width: rw(224), height: rh(56)},
      ]}>
      <TouchableOpacity
        style={[styles.reactionItem, {position: 'relative'}]}
        onPress={() => toggleLikeMeal(mealItem)}>
        {mealItem?.social?.ratingStatus === 'like' ? (
          <ThumbsUpFill width="24" height="24" color="#0AD4EE" />
        ) : (
          <ThumbsUpEmpty width="24" height="24" />
        )}
        <Text style={[styles.reactionText]}>
          {type === 'home' && mealItem?.social?.likes}
          {type === 'trends' && mealItem?.likes}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.reactionItem, {marginHorizontal: 32}]}
        onPress={() => toggleDislikeMeal(mealItem)}>
        {mealItem?.social?.ratingStatus === 'dislike' ? (
          <ThumbsDownFill width="24" height="24" color="#0AD4EE" />
        ) : (
          <ThumbsDownEmpty width="24" height="24" />
        )}
        <Text style={[styles.reactionText]}>
          {type === 'home' && mealItem?.social?.dislikes}
          {type === 'trends' && mealItem?.dislikes}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reactionItem}
        onPress={() => goToComments(mealItem)}>
        <MessageCircle width="24" height="24" color="white" />
        <Text style={styles.reactionText}>
          {type === 'home' && mealItem?.meal?.commentCount}
          {type === 'trends' && mealItem?.comments}
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
