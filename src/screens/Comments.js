import {useState, useEffect, useContext} from 'react';
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
import {useTheme} from '@react-navigation/native';
import {deleteComment, getSingleFoodComment, postComment} from '../api/comment';
import BasicHeader from '../components/BasicHeader';
import Comment from '../components/Comment';
import {Send} from '../components/icons';
import Loading from '../components/Loading';
import {AuthContext} from '../context/Auth';
import {errorMessage, successMessage} from '../utils/showToast';
import {strings} from '../constants/localization';
import {useKeyboard} from '@react-native-community/hooks';

const Comments = ({route, navigation}) => {
  const {colors} = useTheme();
  const {item} = route.params;

  const {token} = useContext(AuthContext);

  const [comments, setComments] = useState([]);
  const [comment, onChangeComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  const keyboard = useKeyboard();

  useEffect(() => {
    initComments();
  }, []);

  const initComments = () => {
    setLoading(true);
    getCommentsAfter(0);
  };

  const onRefresh = () => {
    setRefreshing(true);
    Keyboard.dismiss();
    onChangeComment('');
    getCommentsAfter(0);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // const getFoodComments = async () => {
  //   try {
  //     let response = await getSingleFoodComment(token, item?.meal?._id, page, 6);
  //     if (response.error) {
  //       errorMessage(strings.commentCouldntSend);
  //     } else {
  //       setComments([...response?.data]); // push state
  //       setPage(page + 1);
  //     }
  //   } catch (error) {
  //     errorMessage(strings.commentCouldntSend);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getCommentsAfter = async givenPage => {
    try {
      let response = await getSingleFoodComment(
        token,
        item?.meal?._id,
        givenPage,
        6,
      );
      if (response.error) {
        errorMessage(strings.commentCouldntSend);
      } else {
        setComments([...response?.data]); // push state
        setPage(page + 1);
      }
    } catch (error) {
      // errorMessage(strings.commentCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const getMoreFoodComments = async () => {
    setLoading(true);
    try {
      let response = await getSingleFoodComment(
        token,
        item?.meal?._id,
        page,
        6,
      );
      if (response.error) {
        errorMessage(strings.commentCouldntSend);
      } else {
        setComments([...comments, ...response?.data]); // push state
        setPage(page + 1); // increase page
        // setComments(response?.data);
      }
    } catch (error) {
      // errorMessage(strings.commentCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const sendComment = async () => {
    setLoading(true);
    try {
      let response = await postComment(token, comment, item?.meal?._id);
      if (response.error) {
        //errorMessage(strings.commentCouldntSend);
      } else {
        //successMessage(strings.commentsent);
        onChangeComment('');
        getCommentsAfter(0);
      }
    } catch (error) {
      errorMessage(strings.commentCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserComment = async id => {
    try {
      let response = await deleteComment(token, id, item?.meal?._id);
      successMessage(strings.postDeleted);
      getCommentsAfter(0);
    } catch (error) {
      errorMessage(strings.postNotDeleted);
    }
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' && 'height'}
      {...(Platform.OS === 'ios' && {behavior: 'padding'})}
      style={{
        flex: 1,
        position: 'relative',
      }}
      keyboardVerticalOffset={20}>
      <BasicHeader
        text={item?.meal?.date}
        navigation={navigation}
        type="isThree"
      />
      {loading && <Loading size="small" />}
      {!loading && comments?.length == 0 ? (
        <Text style={[styles.noComment, {color: colors.noCommentText}]}>
          {strings.noComment1 + '\n' + strings.noComment2}
        </Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={item => item.comment._id}
          key={item => item.comment._id}
          contentContainerStyle={{
            paddingHorizontal: 35,
            paddingTop: 24,
            paddingBottom: 72,
          }}
          ItemSeparatorComponent={() => <View style={{height: 24}} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => (
            <Comment
              comment={item}
              deleteUserComment={id => deleteUserComment(id)}
              refreshData={() => {
                onRefresh();
              }}
            />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={getMoreFoodComments}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(true);
          }}
        />
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <View
            style={[
              styles.commentInputContainer,
              {
                backgroundColor: colors.commentInputBg,
                bottom: keyboard.keyboardShown
                  ? Platform.OS === 'ios'
                    ? 48
                    : 32
                  : 10,
              },
            ]}>
            <TextInput
              style={[styles.commentInput, {color: colors.commentInputText}]}
              onChangeText={onChangeComment}
              value={comment}
              placeholder={strings.writeComment}
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
    paddingTop: Platform.OS === 'ios' ? 4 : 0,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.65,
    elevation: 3,
    zIndex: 3,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderRadius: 12,
    height: Platform.OS === 'ios' ? 48 : 'auto',
  },
  noComment: {
    textAlign: 'center',
    marginTop: 24,
  },
});

export default Comments;
