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
  ThumbsUpFill,
  ThumbsUpEmpty,
  ThumbsDownEmpty,
  ThumbsDownFill,
} from './icons';
import {useTheme} from '@react-navigation/native';
import Lottie from 'lottie-react-native';

const ReactionBox = ({
  item,
  toggleLikeMeal,
  toggleDislikeMeal,
  type,
  navigation,
}) => {
  const {colors} = useTheme();
  const [like, setLike] = useState(false);
  const [disslike, setDisslike] = useState(false);

  useEffect(() => {
    console.log('item: ', item);
  }, [item]);

  const goToComments = () => {
    navigation.navigate('Comments', {item: item});
  };

  return (
    <View
      style={[
        styles.reactionContainer,
        {backgroundColor: colors.reactionBg, width: rw(224), height: rh(56)},
      ]}>
      <TouchableOpacity
        style={[styles.reactionItem, {position: 'relative'}]}
        onPress={() => toggleLikeMeal(item)}>
        {item?.social?.ratingStatus === 'like' ? (
          <ThumbsUpFill width="28" height="28" color="#0AD4EE" />
        ) : (
          <ThumbsUpEmpty width="28" height="28" />
        )}
        <Text
          style={[
            styles.reactionText,
            like && {position: 'absolute', left: 60, top: 32},
          ]}>
          {type === 'home' && item?.social?.likes}
          {type === 'trends' && item?.likes}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.reactionItem, {marginHorizontal: 32}]}
        onPress={() => toggleDislikeMeal(item)}>
        {item?.social?.ratingStatus === 'dislike' ? (
          <ThumbsDownFill width="28" height="28" color="#0AD4EE" />
        ) : (
          <ThumbsDownEmpty width="28" height="28" />
        )}
        <Text
          style={[
            styles.reactionText,
            like && {position: 'absolute', left: 60, top: 32},
          ]}>
          {type === 'home' && item?.social?.dislikes}
          {type === 'trends' && item?.dislikes}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reactionItem}
        onPress={() => goToComments(item)}>
        <MessageCircle width="28" height="28" color="white" />
        <Text style={styles.reactionText}>
          {type === 'home' && item?.meal?.commentCount}
          {type === 'trends' && item?.comments}
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
    fontSize: 16,
    marginLeft: 6,
  },
});

export default ReactionBox;
