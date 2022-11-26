import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Heart} from './icons';

const Comment = ({comment}) => {
  const likeComment = () => {
    console.log('like comment: ', comment);
  };

  return (
    <View style={styles.container}>
      <View style={styles.commentHead}>
        <Text>{comment?.user?.name}</Text>
        <Text>{comment?.date}</Text>
      </View>
      <View style={styles.commentBody}>
        <Text>{comment?.comment}</Text>
      </View>
      <View style={styles.commentFooter}>
        <TouchableOpacity onPress={() => likeComment()} activeOpacity={0.8}>
          <Heart width="24" height="24" color="#EBEBEB" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {},
  commentHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentBody: {
    flex: 1,
    marginTop: 8,
    marginBottom: 18,
  },
  commentFooter: {},
});
