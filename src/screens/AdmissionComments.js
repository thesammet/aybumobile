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
import { deletePostAdmin, getAllPosts, postSend } from '../api/aybu-social/post';
import { getAllCommentsByPost, postCommentSend } from '../api/aybu-social/post_comment';


const AdmissionComments = ({ route, navigation,deleteUserAdmissionComment }) => {
  const { colors } = useTheme();

  const { token } = useContext(AuthContext);
  const {admission} = route.params;

  const [admissionComments, setAdmissionComments] = useState([]);
  const [admissionComment, onChangeAdmissionComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    initAdmissions();
  }, []);

  // useEffect(() => {
  //   // filter admissionComment by id
  //   const filteredAdmissionComment = admissionComments.filter((admissionComment) => admissionComment._id === admissionComment._id);
  //   if (filteredAdmissionComment.length === 0) {
  //     setAdmissionComments([...admissionComments, admissionComment]);
  //   } else {
  //     const index = admissionComments.findIndex((admissionComment) => admissionComment._id === admissionComment._id);
  //     admissionComments[index] = admissionComment;
  //     setAdmissionComments([...admissionComments]);
  //   }
  // }, [admissionComments])
  

  const initAdmissions = () => {
    setLoading(true);
    getAdmissionComments(0);
  }

  const onRefresh = () => {
    setRefreshing(true);
    Keyboard.dismiss();
    onChangeAdmissionComment('');
    getAdmissionComments(0);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  const getAdmissionComments = async (givenPage) => {
    try {
      let response = await getAllCommentsByPost(token, admission?.post?._id ,givenPage, 6);
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        console.log("rr: ", response?.data)
        setAdmissionComments([...admissionComments, ...response?.data]); // push state
        setPage(page + 1);
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const getAdmissionCommentsAfter = async (givenPage) => {
    try {
      let response = await getAllCommentsByPost(token, admission?.post?._id ,givenPage, 6);
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        console.log("rr: ", response?.data)
        setAdmissionComments([...response?.data, ...admissionComments]); // push state
        setPage(page + 1);
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const getMoreAdmissionComments = async () => {
    setLoading(true);
    try {
      let response = await getAllCommentsByPost(token,admission?.post?._id, page, 6);
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        setAdmissionComments([...admissionComments, ...response?.data]); // push state
        setPage(page + 1); // increase page
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  }

  const sendAdmissionComment = async () => {
    setLoading(true);
    try {
      let response = await postCommentSend(token, admissionComment, admission?.post?._id);
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        successMessage(strings.admissionSent);
        onChangeAdmissionComment('');
        getAdmissionCommentsAfter(0);
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAdmission = async (id) => {
    try {
      let response = await deletePostAdmin(token, id);
      console.log("delete response: ", response);
      successMessage('İtiraf silindi.');
      getAdmissionComments(0);
    } catch (error) {
      console.log("Delete Admission Error: ", error);
      errorMessage('İtiraf silinemedi.');
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
        text="İtiraf Yorumu"
        navigation={navigation}
        type="isThree"
      />
      {loading && <Loading />}
      {!loading && admissionComments?.length == 0 ? (
        <Text style={[styles.noComment, { color: colors.noCommentText }]}>
          {strings.noAdmission1 + '\n' + strings.noAdmission2}
        </Text>
      ) : (
        <FlatList
          data={admissionComments}
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
          renderItem={({ item }) => <Admission type="inside" navigation={navigation} admission={item} deleteUserAdmissionComment={(id) => deleteUserAdmissionComment(id)} />}
          onEndReachedThreshold={0.2}
          onEndReached={getMoreAdmissionComments}
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
              onChangeText={onChangeAdmissionComment}
              value={admissionComment}
              multiline={true}
              numberOfLines={10}
              textAlignVertical="top"
              placeholder={strings.writeAdmissionComment}
              placeholderTextColor={colors.placeholderText}
              keyboardType="default"
            />
            <TouchableOpacity onPress={() => sendAdmissionComment()} activeOpacity={0.8}>
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
    textAlignVertical: 'top',
  },
  noComment: {
    textAlign: 'center',
    marginTop: 24,
  },
});

export default AdmissionComments;
