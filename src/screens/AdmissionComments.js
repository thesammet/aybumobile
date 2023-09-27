import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  useContext,
} from 'react';
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
import BasicHeader from '../components/BasicHeader';
import {Send, Plus} from '../components/icons';
import Loading from '../components/Loading';
import {AuthContext} from '../context/Auth';
import {errorMessage, successMessage} from '../utils/showToast';
import {strings} from '../constants/localization';
import Admission from '../components/Admission';
import {
  deleteSocialPostCommentAdmin,
  getAllCommentsByPost,
  postCommentSend,
} from '../api/aybu-social/post_comment';
import {
  BottomSheetTextInput,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const AdmissionComments = ({route, navigation}) => {
  const {colors} = useTheme();

  const {token} = useContext(AuthContext);
  const {admission} = route.params;

  const [admissionComments, setAdmissionComments] = useState([]);
  const [admissionComment, onChangeAdmissionComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  /* start bottom sheet */
  const bottomSheetModalRef2 = useRef(null);
  const snapPoints2 = useMemo(() => ['24%', '30%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index); // 1, -1
  }, []);

  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop opacity={0.1} {...props} />,
    [],
  );

  const openAdmissionSheet = () => {
    handlePresentModalPress();
  };

  /* end bottom sheet */

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {},
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        bottomSheetModalRef2.current?.close();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
  };

  const onRefresh = () => {
    setRefreshing(true);
    Keyboard.dismiss();
    onChangeAdmissionComment('');
    getAdmissionComments(0);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getAdmissionComments = async givenPage => {
    try {
      let response = await getAllCommentsByPost(
        token,
        admission?.post?._id,
        givenPage,
        6,
      );
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        console.log('rr: ', response?.data);
        setAdmissionComments([...response?.data]); // push state
        setPage(page + 1);
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const getAdmissionCommentsAfter = async givenPage => {
    try {
      let response = await getAllCommentsByPost(
        token,
        admission?.post?._id,
        givenPage,
        6,
      );
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        console.log('rr: ', response?.data);
        setAdmissionComments([...response?.data]); // push state
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
      let response = await getAllCommentsByPost(
        token,
        admission?.post?._id,
        page,
        6,
      );
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
  };

  const sendAdmissionComment = async () => {
    setLoading(true);
    try {
      let response = await postCommentSend(
        token,
        admissionComment,
        admission?.post?._id,
      );
      onChangeAdmissionComment('');
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        // successMessage(strings.admissionSent);
        onChangeAdmissionComment('');
        getAdmissionCommentsAfter(0);
        bottomSheetModalRef2.current?.close();
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAdmissionComment = async (postId, commentId) => {
    console.log('postId: ', postId);
    console.log('commentId: ', commentId);
    try {
      let response = await deleteSocialPostCommentAdmin(
        token,
        postId,
        commentId,
      );
      console.log('delete response: ', response);
      successMessage('Yorum silindi.');
      getAdmissionComments(0);
    } catch (error) {
      console.log('Delete Admission Error: ', error);
      errorMessage('Yorum silinemedi.');
    }
  };

  return (
    <View
      // behavior={Platform.OS === 'ios' && 'height'}
      style={{
        flex: 1,
        position: 'relative',
      }}
      // keyboardVerticalOffset={20}
    >
      <BasicHeader
        text={strings.postComments}
        navigation={navigation}
        type="postComments"
      />
      {loading && <Loading />}
      {!loading && admissionComments?.length == 0 ? (
        <Text style={[styles.noComment, {color: colors.noCommentText}]}>
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
          ItemSeparatorComponent={() => <View style={{height: 24}} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => (
            <Admission
              type="inside"
              navigation={navigation}
              admission={item}
              deleteUserAdmission={(postId, id) =>
                deleteUserAdmissionComment(postId, id)
              }
            />
          )}
          onEndReachedThreshold={0.001}
          onEndReached={() => {
            onEndReachedCalledDuringMomentum && getMoreAdmissionComments();
            setOnEndReachedCalledDuringMomentum(false);
          }}
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(true);
          }}
        />
      )}
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <View
            style={[
              styles.commentInputContainer,
              {backgroundColor: colors.commentInputBg},
            ]}>
            <TextInput
              style={[styles.commentInput, {color: colors.commentInputText}]}
              onChangeText={onChangeAdmissionComment}
              value={admissionComment}
              multiline={true}
              numberOfLines={10}
              textAlignVertical="top"
              placeholder={strings.writeAdmissionComment}
              placeholderTextColor={colors.placeholderText}
              keyboardType="default"
            />
            <TouchableOpacity
              onPress={() => sendAdmissionComment()}
              activeOpacity={0.8}>
              <Send width="24" height="24" color={colors.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback> */}

      <BottomSheetModalProvider>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              openAdmissionSheet();
            }}
            style={{
              position: 'absolute',
              bottom: 20,
              right: 24,
              borderWidth: 0,
              outline: 0,
              width: 56,
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 999,
              backgroundColor: colors.trendHeader,
            }}>
            <Plus width="28" height="28" color="#fff" />
          </TouchableOpacity>

          <BottomSheetModal
            ref={bottomSheetModalRef2}
            name="comment"
            index={1}
            snapPoints={snapPoints2}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            style={{
              borderWidth: 4,
              paddingBottom: 0,
              marginBottom: 0,
            }}
            handleIndicatorStyle={{
              backgroundColor: colors.tabBarTextActive,
            }}
            handleStyle={{
              backgroundColor: colors.mealBackground,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingBottom: Platform.OS === 'ios' ? 64 : 48,
                paddingHorizontal: 8,
                backgroundColor: colors.mealBackground,
                marginTop: Platform.OS === 'ios' ? 0 : -24,
                borderWidth: 2,
              }}>
              <BottomSheetTextInput
                id="admission2"
                defaultValue={admission}
                onChangeText={onChangeAdmissionComment}
                placeholder="Write Comment..."
                autoFocus={true}
                blurOnSubmit={true}
                numberOfLines={5}
                multiline
                scrollEnabled={false}
                selectionColor={colors.commentInputText}
                placeholderTextColor="#ccc"
                style={[styles.commentInput, {color: colors.commentInputText}]}
              />
              <TouchableOpacity
                style={{
                  marginLeft: 'auto',
                  padding: 4,
                  marginRight: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => sendAdmissionComment()}
                activeOpacity={0.8}>
                <Send width="28" height="28" color={colors.sendIcon} />
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
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
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    textAlignVertical: 'center',
    // borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 12,
    height: Platform.OS === 'ios' ? 70 : 'auto',
  },
  noComment: {
    textAlign: 'center',
    marginTop: 24,
  },
});

export default AdmissionComments;
