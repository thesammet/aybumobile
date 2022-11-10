import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from '@/utils/responsive';
import {MessageCircle, ThumbsDown, ThumbsUp} from './icons';
import {useTheme} from '@react-navigation/native';

const ReactionBox = ({item}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.reactionContainer,
        {backgroundColor: colors.reactionBg, width: rw(224), height: rh(56)},
      ]}>
      <View style={styles.reactionItem}>
        <ThumbsUp width="24" height="24" />
        <Text style={styles.reactionText}>{item?.social?.likes}</Text>
      </View>
      <View style={[styles.reactionItem, {marginHorizontal: 28}]}>
        <ThumbsDown width="24" height="24" color="white" />
        <Text style={styles.reactionText}>{item?.social?.dislikes}</Text>
      </View>
      <View style={styles.reactionItem}>
        <MessageCircle width="24" height="24" color="white" />
        <Text style={styles.reactionText}>{item?.meal?.commentCount}</Text>
      </View>
    </View>
  );
};

export default ReactionBox;

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
    marginLeft: 4,
  },
});
