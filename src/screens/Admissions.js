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
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import BasicHeader from '../components/BasicHeader';
import {Send, Plus} from '../components/icons';
// import Loading from '../components/Loading';
import {AuthContext} from '../context/Auth';
import {errorMessage, successMessage} from '../utils/showToast';
import {strings} from '../constants/localization';
import Admission from '../components/Admission';
import {deletePostAdmin, getAllPosts, postSend} from '../api/aybu-social/post';
import LoadingMore from '../components/LoadingMore';
import {
  BottomSheetTextInput,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {KeyboardAvoidingView} from 'react-native';
import ComplaintModal from '../components/ComplaintModal';
import {storage} from '../config/storage';

const Admissions = ({navigation}) => {
  const {colors} = useTheme();
  const {token} = useContext(AuthContext);

  const [admissions, setAdmissions] = useState([]);
  const [admission, onChangeAdmission] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  /* start bottom sheet */
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['24%', '30%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    // console.log('handleSheetChanges', index); // 1, -1
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
        bottomSheetModalRef.current?.close();
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
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     initAdmissions();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const initAdmissions = () => {
    setLoading(true);
    getAdmissions(0);
  };

  const onRefresh = () => {
    setRefreshing(true);
    Keyboard.dismiss();
    onChangeAdmission('');
    setPage(0);
    getAdmissions(0);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getAdmissions = async givenPage => {
    try {
      let response = await getAllPosts(token, givenPage, 6);
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        setAdmissions(null);
        setAdmissions([...response?.data]); // push state
        // push first
        //setPage(page + 1);
        setPage(1);
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  // const getAdmissionsAfter = async givenPage => {
  //   try {
  //     setPage(0);
  //     let response = await getAllPosts(token, givenPage, 6);
  //     if (response.error) {
  //       errorMessage(strings.admissionCouldntSend);
  //     } else {
  //       setAdmissions(null);
  //       setAdmissions([...response?.data]); // push state
  //       // push first
  //       setPage(0);
  //     }
  //   } catch (error) {
  //     errorMessage(strings.admissionCouldntSend);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getMoreAdmissions = async () => {
    setLoadingMore(true);
    try {
      let response = await getAllPosts(token, page, 6);
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        setAdmissions([...admissions, ...response?.data]); // push state
        setPage(page + 1); // increase page
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoadingMore(false);
    }
  };

  const sendAdmission = async () => {
    setLoading(true);
    try {
      let firToken = storage.getString('fcmToken');
      let response = await postSend(token, admission, firToken);
      onChangeAdmission('');
      if (response.error) {
        errorMessage(strings.admissionCouldntSend);
      } else {
        Keyboard.dismiss();
        //successMessage(strings.admissionSent);
        setPage(0);
        getAdmissions(0);
        bottomSheetModalRef.current?.close();
      }
    } catch (error) {
      errorMessage(strings.admissionCouldntSend);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAdmission = async id => {
    try {
      let response = await deletePostAdmin(token, id);
      if (response.error) {
        errorMessage(strings.anErrorOccured);
      } else {
        successMessage(strings.postDeleted);
        getAdmissions(0);
      }
    } catch (error) {
      errorMessage(strings.postNotDeleted);
    }
  };

  const getBannerUnitId = () => {
    return __DEV__
      ? TestIds.BANNER
      : Platform.OS === 'ios'
      ? 'ca-app-pub-6305131424598853/1541206638'
      : 'ca-app-pub-6305131424598853/9577848449';
  };

  return (
    <View
      // behavior={Platform.OS === 'ios' && 'height'}
      // behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        position: 'relative',
      }}
      // keyboardVerticalOffset={40}
    >
      <BasicHeader
        style={{backgroundColor: colors.trendHeader}}
        navigation={navigation}
        text={strings.admission}
        textStyle={{fontWeight: 'bold', fontSize: 18}}
        isBack={false}
      />
      {/* {loading && <Loading />} */}
      {loading && <LoadingMore />}

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

      {!loading && admissions?.length == 0 ? (
        <Text style={[styles.noComment, {color: colors.noCommentText}]}>
          {strings.noAdmission1 + '\n' + strings.noAdmission2}
        </Text>
      ) : (
        <FlatList
          data={admissions}
          keyExtractor={item => item?.post?._id}
          key={item => item?.post?._id}
          onScroll={() => {
            loadingMore && <LoadingMore />;
          }}
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
              navigation={navigation}
              admission={item}
              deleteUserAdmission={id => deleteUserAdmission(id)}
              refreshData={() => {
                onRefresh();
              }}
            />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={getMoreAdmissions}
        />
      )}
      {/* {loading && <Loading size="small" />} */}
      {loadingMore && <LoadingMore />}
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <View
            style={[
              styles.commentInputContainer,
              {backgroundColor: colors.commentInputBg},
            ]}>
            <TextInput
              style={[styles.commentInput, {color: colors.commentInputText}]}
              onChangeText={onChangeAdmission}
              defaultValue={admission}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              // verticalAlign="center"
              placeholder={strings.writeAdmission}
              placeholderTextColor={colors.placeholderText}
              keyboardType="default"
            />
            <TouchableOpacity
              onPress={() => sendAdmission()}
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
            }}
            activeOpacity={0.8}>
            <Plus width="28" height="28" color="#fff" />
          </TouchableOpacity>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
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
                paddingBottom: Platform.OS === 'ios' ? 64 : 8,
                paddingHorizontal: 8,
                backgroundColor: colors.mealBackground,
                marginTop: Platform.OS === 'ios' ? 0 : -24,
              }}>
              <BottomSheetTextInput
                id="admission"
                defaultValue={admission}
                onChangeText={onChangeAdmission}
                placeholder={strings.writeSomething}
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
                  padding: 3,
                  marginRight: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => sendAdmission()}
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

export default Admissions;
