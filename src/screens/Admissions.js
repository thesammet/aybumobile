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
import { deleteComment, getSingleFoodComment, postComment } from '../api/comment';
import BasicHeader from '../components/BasicHeader';
import Comment from '../components/Comment';
import { Send } from '../components/icons';
import Loading from '../components/Loading';
import { AuthContext } from '../context/Auth';
import { errorMessage, successMessage } from '../utils/showToast';
import { strings } from '../constants/localization';
import Admission from '../components/Admission';

const Admissions = ({ route, navigation }) => {
  const { colors } = useTheme();
 
  const { token } = useContext(AuthContext);

  const [admissions, setAdmissions] = useState([
    {
      id:1,
      username: 'Admission 1',
      userRole:"User",
      createdAt: '01.01.2021',
      admission:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.",
      isLike: false,
      likeCount: 0,
    },
    {
      id:2,
      username: 'Admission 2',
      userRole:"User",
      createdAt: '01.01.2021',
      admission:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.",
      isLike: true,
      likeCount: 1,
    },
    {
      id:3,
      username: 'Admission 3',
      userRole:"User",
      createdAt: '01.01.2021',
      admission:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.",
      isLike: true,
      likeCount: 1,
    },
    {
      id:4,
      username: 'Admission 4',
      userRole:"User",
      createdAt: '01.01.2021',
      admission:"lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia.",
      isLike: false,
      likeCount: 1,
    },
  ]);
  const [comment, onChangeComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAdmissions();
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

  const getAdmissions = async () => {
    try {
      /*
      let response = await getSingleFoodComment(token, item?.meal?._id);
      if (response.error) {
        errorMessage(strings.commentCouldntSend);
      } else {
        setComments(response?.data);
      }
      */
    } catch (error) {
      errorMessage(strings.commentCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const getMoreAdmission = async () => {
    setLoading(true);
    try {
      /*
      let response = await getSingleFoodComment(token, item?.meal?._id);
      if (response.error) {
        errorMessage(strings.commentCouldntSend);
      } else {
        setComments(response?.data);
      }
      */
    } catch (error) {
      errorMessage(strings.commentCouldntSend);
    } finally {
      setLoading(false);
    }
  }

  const sendAdmission = async () => {
    setLoading(true);
    try {
      /*
      let response = await postComment(token, comment, item?.meal?._id);
      if (response.error) {
        errorMessage(strings.commentCouldntSend);
      } else {
        onRefresh();
      }
      */
    } catch (error) {
      errorMessage(strings.commentCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAdmission = async (id) => {
    try {
      // let response = await deleteComment(token, id, item?.meal?._id);
      // console.log("delete response: ", response);
      // successMessage('Yorum silindi.');
      // getFoodComments();
    } catch (error) {
      console.log("Delete Comment Error: ", error);
      errorMessage('Yorum silinemedi.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' && 'height'}
      style={{
        flex: 1,
        position: 'relative',
      }}
      keyboardVerticalOffset={20}>
      <BasicHeader
        text="İtiraf"
        navigation={navigation}
        type="isThree"
      />
      {loading && <Loading />}
      {!loading && admissions?.length == 0 ? (
        <Text style={[styles.noComment, { color: colors.noCommentText }]}>
          {strings.noComment1 + '\n' + strings.noComment2}
        </Text>
      ) : (
        <FlatList
          data={admissions}
          keyExtractor={item => item.id}
          key={item => item.id}
          contentContainerStyle={{
            paddingHorizontal: 35,
            paddingTop: 24,
            paddingBottom: 72,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => <Admission admission={item} deleteUserAdmission={(id) => deleteUserAdmission(id)} />}
          onEndReachedThreshold={0.2}
          onEndReached={getMoreAdmission}
        />
      )}
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
    marginTop: 24,
  },
});

export default Admissions;
