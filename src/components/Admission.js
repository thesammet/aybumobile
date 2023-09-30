import React, {useEffect, useRef, useState, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {
  Narnia,
  Kratos,
  Editor,
  SteinsGate,
  MessageCircleNew,
  Dot,
} from '../components/icons';
import moment from 'moment/min/moment-with-locales';
import {strings} from '../constants/localization';
import {errorMessage, successMessage} from '../utils/showToast';
import {AuthContext} from '../context/Auth';
import AppText from '../components/AppText';
import {ProfileContext} from '../context/Profile';
import {ratePost} from '../api/aybu-social/post';
import {
  getAllCommentsByPost,
  ratePostComment,
} from '../api/aybu-social/post_comment';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ComplaintModal from './ComplaintModal';
import {createComplaint} from '../api/user';

const Admission = ({
  type = '',
  navigation,
  admission,
  deleteUserAdmission,
  refreshData = () => {},
}) => {
  const {colors} = useTheme();

  const {token} = useContext(AuthContext);
  const {username, role} = useContext(ProfileContext);

  const animation = useRef(null);
  const isFirstRun = useRef(true);

  const [likeStatus, setLikeStatus] = useState(admission?.ratingStatus);
  const [likeCount, setLikeCount] = useState(admission?.post?.likeCount);
  const [commentCount, setCommentCount] = useState(
    admission?.post?.commentCount,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [complaintModalVisible, setComplaintModalVisible] = useState(false);
  const [specials, setSpecials] = useState(['developer-admin', 'admin']);

  const [postComments, setPostComments] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getAdmissionComments();
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      if (likeStatus) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (likeStatus) {
      animation.current.play(19, 50);
    } else {
      animation.current.play(0, 19);
    }
  }, [likeStatus]);

  const getAdmissionComments = async () => {
    try {
      let response = await getAllCommentsByPost(
        token,
        admission?.post?._id,
        page,
        4,
      );
      if (response.error) {
        console.log('getAdmissionComment error: ', response);
      } else {
        setPostComments([...postComments, ...response?.data]);
      }
    } catch (error) {
      console.log('error: ', error);
    } finally {
    }
  };

  // const getMoreAdmissionComments = async () => {
  //   try {
  //     let response = await getAllCommentsByPost(
  //       token,
  //       admission?.post?._id,
  //       page,
  //       4,
  //     );
  //     if (response.error) {
  //     } else {
  //       setPostComments([...postComments, ...response?.data]);
  //     }
  //   } catch (error) {
  //     console.log('error: ', error);
  //   } finally {
  //   }
  // };

  const admissionRatingMethod = async () => {
    likeStatus ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
    setLikeStatus(!likeStatus);
    try {
      if (type === 'inside') {
        let response = await ratePostComment(
          token,
          admission?.post.post,
          admission?.post?._id,
        );
        if (response.error) {
          //errorMessage('Reaksiyon iletilemedi.');
        } else {
          //console.log("ratePostCommentinside: ", response);
        }
      } else {
        let response = await ratePost(token, admission?.post?._id);
        if (response.error) {
          //errorMessage('Reaksiyon iletilemedi.');
        } else {
        }
      }
    } catch (error) {
      //errorMessage('Reaksiyon iletilemedi.');
      console.log(error);
    }
  };

  const pressDeleteComment = () => {
    setModalVisible(true);
  };

  const pressedAdmissionComment = () => {
    navigation.navigate('AdmissionComments', {admission: admission});
  };

  const deleteAdmission = () => {
    if (type === 'inside') {
      deleteUserAdmission(admission?.post.post, admission?.post?._id);
    } else {
      deleteUserAdmission(admission?.post?._id);
    }
    setModalVisible(false);
  };

  const postComplaint = async (title = '', description = '') => {
    console.log('token: ', token);
    console.log('ownerId: ', admission.post.owner._id);
    console.log('title: ', title);
    console.log('description: ', description);
    console.log('postId: ', admission.post._id);

    let response = await createComplaint(
      token,
      admission.post.owner._id,
      title,
      description,
      admission.post._id,
    );

    console.log('response: ', response);
    if (response.error) {
      errorMessage(strings.notSendedComplaint);
    } else {
      successMessage(strings.sendedComplaint);
      refreshData();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        pressedAdmissionComment();
      }}
      activeOpacity={0.8}>
      <ComplaintModal
        complaintModalVisible={complaintModalVisible}
        setComplaintModalVisible={setComplaintModalVisible}
        buttonBg={colors.trendHeader}
        postComplaint={(title, description) => {
          postComplaint(title, description);
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredModalView}>
          <View style={[styles.modalView]}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={{color: colors.text}}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 16,
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
              }}
              onPress={() => {
                deleteAdmission();
              }}>
              <Text style={{color: colors.text}}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.commentHead}>
        <View style={styles.sampleRow}>
          {admission?.post?.owner?.username == 'Schaleef' ? (
            <Kratos width={24} height={24} style={styles.svgView} />
          ) : admission?.post?.owner?.username == 'Sapphique' ? (
            <SteinsGate width={24} height={24} style={styles.svgView} />
          ) : admission?.post?.owner?.role == 'developer-admin' ? (
            <Narnia width={28} height={28} style={styles.svgDevAdminView} />
          ) : (
            admission?.post?.owner?.role == 'admin' && (
              <Editor width={24} height={24} style={styles.svgView} />
            )
          )}
          <Text style={[styles.commentNameText, {color: colors.usernameText}]}>
            {admission?.post?.owner?.username}
          </Text>

          {specials.includes(role) && (
            <TouchableOpacity
              style={{
                marginLeft: 6,
                borderWidth: 1,
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 6,
              }}
              onPress={() => pressDeleteComment()}>
              <AppText>Delete</AppText>
            </TouchableOpacity>
          )}
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Text
            style={[
              styles.commentDateText,
              {color: colors.dateText, marginRight: 8},
            ]}>
            {moment(admission?.post?.createdAt)
              .locale(strings.lang == 'en' ? 'en' : 'tr')
              .fromNow()}
          </Text>
          <Menu>
            <MenuTrigger>
              <Dot width="24" height="24" color={colors.tabBarTextActive} />
            </MenuTrigger>

            <MenuOptions
              customStyles={{
                optionsContainer: styles.menuOptionsContainer,
              }}>
              <MenuOption
                onSelect={() => {
                  postComplaint();
                }}
                customStyles={{
                  optionWrapper: [
                    styles.menuOptionWrapper,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: '#f3f4f6',
                    },
                  ],
                }}>
                <Text>{strings.dontWantSee}</Text>
              </MenuOption>

              <MenuOption
                onSelect={() => {
                  setComplaintModalVisible(true);
                }}
                customStyles={{
                  optionWrapper: [
                    styles.menuOptionWrapper,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: '#f3f4f6',
                    },
                  ],
                }}>
                <Text>{strings.makeComplaint}</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>

      <View style={styles.commentBody}>
        <Text style={[styles.commentText, {color: colors.commentText}]}>
          {admission?.post?.content}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => admissionRatingMethod()}
          activeOpacity={0.8}
          style={styles.commentLikeButton}>
          <Lottie
            ref={animation}
            style={styles.heartLottie}
            source={require('@/assets/sources/heart.json')}
            autoPlay={false}
            loop={false}
          />
          <Text
            style={[styles.commentLikeCount, {color: colors.dateBoxElement}]}>
            {likeCount}
          </Text>
        </TouchableOpacity>

        {type !== 'inside' && (
          <TouchableOpacity
            onPress={() => pressedAdmissionComment()}
            activeOpacity={0.8}
            style={styles.showCommentButton}>
            <MessageCircleNew width="22" height="22" color="#ccc" />
            <Text
              style={[
                styles.commentCommentCount,
                {color: colors.dateBoxElement},
              ]}>
              {commentCount}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  commentHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentNameText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
  commentText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
  commentDateText: {
    fontSize: 14,
    lineHeight: 16,
  },
  commentBody: {
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  commentLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
    marginLeft: -14,
  },
  commentLikeCount: {
    marginLeft: 4,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
  },
  heartLottie: {
    width: 50,
    height: 50,
  },
  showCommentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
    marginLeft: 16,
  },
  commentLikeCount: {
    fontSize: 16,
    fontWeight: '400',
  },
  commentCommentCount: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '400',
  },
  sampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleParent: {
    borderRadius: 24 / 2,
  },
  svgView: {
    borderRadius: 24 / 2,
    overflow: 'hidden',
    marginRight: 8,
  },
  svgDevAdminView: {
    borderRadius: 28 / 2,
    overflow: 'hidden',
    marginRight: 8,
  },
  //

  //modal
  centeredModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
    position: 'relative',
  },
  modalCloseContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 15,
    right: 14,
  },
  modalHead: {
    justifyContent: 'center',
    marginTop: 24,
  },
  modalHeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f20000',
  },
  modalBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  modalBottomText: {
    marginTop: 12,
    lineHeight: 20,
    color: '#171717',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },

  //

  menuOptionsContainer: {
    // marginTop: Platform.OS === 'ios' ? 30 : 30,
    // marginLeft: Dimensions.get('window').width / 3,
    marginRight: 0,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    zIndex: 2,
  },
  menuOptionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

export default Admission;
