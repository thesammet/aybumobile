import React, {useEffect, useRef, useState, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {Narnia, Kratos, Editor, SteinsGate} from '../components/icons';
import moment from 'moment/min/moment-with-locales';
import {strings} from '../constants/localization';
import {errorMessage, successMessage} from '../utils/showToast';
import {commentRating, deleteComment} from '../api/comment';
import {AuthContext} from '../context/Auth';
import AppText from '../components/AppText';
import {ProfileContext} from '../context/Profile';
import AyButton from './AyButton';

const Admission = ({admission, deleteUserAdmission}) => {
  const {colors} = useTheme();
  const {token} = useContext(AuthContext);
  const {username, role} = useContext(ProfileContext);
  const animation = useRef(null);
  const isFirstRun = useRef(true);
  const [likeStatus, setLikeStatus] = useState(admission?.isLike);
  const [likeCount, setLikeCount] = useState(admission?.likeCount);
  const [modalVisible, setModalVisible] = useState(false);

  const [specials, setSpecials] = useState(['developer-admin', 'admin']);

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

  const commentRatingMethod = async () => {
    likeStatus ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
    setLikeStatus(!likeStatus);
    try {
      let response = await commentRating(
        token,
        admission?.id,
        likeStatus,
      );
      if (response.error) {
        errorMessage('Reaksiyon iletilemedi.');
      } else {
      }
    } catch (error) {
      errorMessage('Reaksiyon iletilemedi.');
      console.log(error);
    }
  };

  const pressDeleteComment = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
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
              onPress={() => deleteUserAdmission(admission.id)}>
              <Text style={{color: colors.text}}>DELETE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.commentHead}>
        <View style={styles.sampleRow}>
          {admission?.username == 'Schaleef' ? (
            <Kratos width={24} height={24} style={styles.svgView} />
          ) : admission?.username == 'Sapphique' ? (
            <SteinsGate width={24} height={24} style={styles.svgView} />
          ) : admission?.userRole == 'developer-admin' ? (
            <Narnia width={28} height={28} style={styles.svgDevAdminView} />
          ) : (
            admission?.userRole == 'admin' && (
              <Editor width={24} height={24} style={styles.svgView} />
            )
          )}
          <Text style={[styles.commentNameText, {color: colors.usernameText}]}>
            {admission?.username}
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

        <Text style={[styles.commentDateText, {color: colors.dateText}]}>
          {moment(admission?.createdAt)
            .locale(strings.lang == 'en' ? 'en' : 'tr')
            .fromNow()}
        </Text>
      </View>
      <View style={styles.commentBody}>
        <Text style={[styles.commentText, {color: colors.commentText}]}>
          {admission?.admission}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => commentRatingMethod()}
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
      </View>
    </View>
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
  commentLikeCount: {
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
});

export default Admission;
