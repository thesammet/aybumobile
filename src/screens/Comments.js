import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { commentRating, getSingleFoodComment, postComment } from '../api/comment';
import BasicHeader from '../components/BasicHeader';
import Comment from '../components/Comment';
import { Send } from '../components/icons';
import Loading from '../components/Loading';
import { AuthContext } from '../context/Auth';
import { errorMessage } from '../utils/showToast';
import { strings } from '../constants/localization';

const Comments = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { item } = route.params;

  const { token } = useContext(AuthContext);

  const [comments, setComments] = useState([]);
  const [comment, onChangeComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    getFoodComments();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Keyboard.dismiss();
    onChangeComment('');
    getFoodComments();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getFoodComments = async () => {
    setLoading(true);
    try {
      let response = await getSingleFoodComment(token, item?.meal?._id);
      if (response.error) {
        errorMessage('Yorumlar getirilemedi');
      } else {
        setComments(response?.data);
      }
    } catch (error) {
      errorMessage('Yorumlar getirilemedi');
    } finally {
      setLoading(false);
    }
  };

  const sendComment = async () => {
    setLoading(true);
    try {
      let response = await postComment(token, comment, item?.meal?._id);
      if (response.error) {
        errorMessage('Yorum iletilemedi.');
      } else {
        onRefresh();
      }
    } catch (error) {
      errorMessage('Yorum iletilemedi.');
    } finally {
      setLoading(false);
    }
  };

  const likeComment = async (_id, likeStatus) => {
    let response = await commentRating(token, _id, likeStatus);

    if (response.error) {
      errorMessage('Something went wrong');
    } else {
      setComments(() => {
        return comments.map(commentItem => {
          if (commentItem.comment._id === _id) {
            return {
              comment: {
                ...commentItem.comment,
                likeCount:
                  commentItem.isLike == 'false'
                    ? commentItem.comment.likeCount + 1
                    : commentItem.comment.likeCount - 1,
              },
              isLike: !commentItem.isLike,
            };
          }
          return commentItem;
        });
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' && 'height'}
      style={{
        paddingBottom: (isKeyboardVisible && Platform.OS) === 'ios' ? 30 : 0,
        flex: 1,
        position: 'relative',
      }}
      keyboardVerticalOffset={20}>
      <BasicHeader
        text={item?.meal?.date}
        navigation={navigation}
        type="isThree"
      />
      {loading && <Loading />}
      {!loading && comments?.length == 0 ?
        <Text style={[styles.noComment, { color: colors.noCommentText }]}>{strings.noComment1 + "\n" + strings.noComment2}</Text> :
        <FlatList
          data={comments}
          keyExtractor={item => item.comment._id}
          key={item => item.comment._id}
          contentContainerStyle={{
            paddingHorizontal: 35,
            paddingTop: 24,
            paddingBottom: 72,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Comment
              comment={item}
              onLikeComment={(_id, likeStatus) => likeComment(_id, likeStatus)}
            />
          )}
        />}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.commentInputContainer,
              { backgroundColor: colors.commentInputBg },
            ]}>
            <TextInput
              style={[styles.commentInput, { color: colors.commentInputText }]}
              onChangeText={onChangeComment}
              value={comment}
              placeholder="Yorum yaz..."
              placeholderTextColor={colors.placeholderText}
              keyboardType="default"
            />
            <TouchableOpacity onPress={() => sendComment()} activeOpacity={0.8}>
              <Send width="24" height="24" color={colors.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  commentInputContainer: {
    height: 48,
    borderRadius: 24,
    paddingRight: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.65,
    elevation: 999,
    zIndex: 999,
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  commentInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  noComment: {
    textAlign: 'center',
    marginTop: 24
  }
});

export default Comments;
