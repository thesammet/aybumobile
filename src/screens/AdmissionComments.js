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
import {useKeyboard} from '@react-native-community/hooks';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {admissionCommentAndroid, admissionCommentIos} from '../../secret';

const AdmissionComments = ({route, navigation}) => {
  const {colors} = useTheme();
  const keyboard = useKeyboard();

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
  const [adLoaded, setAdLoaded] = useState(false);

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
        //errorMessage(strings.admissionCouldntSend);
      } else {
        setAdmissionComments([...response?.data]); // push state
        setPage(page + 1);
      }
    } catch (error) {
      //errorMessage(strings.admissionCouldntSend);
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
        //errorMessage(strings.admissionCouldntSend);
      } else {
        setAdmissionComments([...response?.data]); // push state
        setPage(page + 1);
      }
    } catch (error) {
      //errorMessage(strings.admissionCouldntSend);
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
        //errorMessage(strings.admissionCouldntSend);
      } else {
        setAdmissionComments([...admissionComments, ...response?.data]); // push state
        setPage(page + 1); // increase page
      }
    } catch (error) {
      //errorMessage(strings.admissionCouldntSend);
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
        //errorMessage(strings.admissionCouldntSend);
      } else {
        // successMessage(strings.admissionSent);
        onChangeAdmissionComment('');
        getAdmissionCommentsAfter(0);
        bottomSheetModalRef2.current?.close();
      }
    } catch (error) {
      //errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAdmissionComment = async (postId, commentId) => {
    try {
      let response = await deleteSocialPostCommentAdmin(
        token,
        postId,
        commentId,
      );
      successMessage(strings.postDeleted);
      getAdmissionComments(0);
    } catch (error) {
      console.log('Delete Admission Error: ', error);
      errorMessage(strings.postNotDeleted);
    }
  };

  const getBannerUnitId = () => {
    return __DEV__
      ? TestIds.BANNER
      : Platform.OS === 'ios'
      ? admissionCommentIos
      : admissionCommentAndroid;
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' && 'height'}
      //behavior={Platform.OS == 'ios' ? 'padding' : null}
      {...(Platform.OS === 'ios' && {behavior: 'padding'})}
      style={{
        flex: 1,
        position: 'relative',
      }}
      keyboardVerticalOffset={20}>
      <BasicHeader
        text={strings.postComments}
        navigation={navigation}
        type="postComments"
      />
      <BannerAd
        unitId={getBannerUnitId()}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          setAdLoaded(true);
        }}
      />
      {loading && <Loading size="small" />}
      {!loading && admissionComments?.length == 0 ? (
        <Text style={[styles.noComment, {color: colors.noCommentText}]}>
          {strings.noAdmission1 + '\n' + strings.noAdmission2}
        </Text>
      ) : (
        <FlatList
          data={admissionComments}
          keyExtractor={item => item?.post?._id}
          key={item => item?.post?._id}
          contentContainerStyle={{
            paddingHorizontal: 35,
            paddingTop: 24,
            paddingBottom: 72,
            marginTop: adLoaded ? 16 : 0,
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
              onChangeText={onChangeAdmissionComment}
              value={admissionComment}
              multiline={true}
              autoFocus={false}
              numberOfLines={4}
              textAlignVertical="center"
              verticalAlign="center"
              placeholder={strings.writeAdmissionComment}
              placeholderTextColor={colors.placeholderText}
              keyboardType="default"
            />
            <TouchableOpacity
              onPress={() => sendAdmissionComment()}
              activeOpacity={0.8}>
              <Send width="24" height="24" color="#000" />
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

export default AdmissionComments;
