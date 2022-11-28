import React, {useState, useEffect, useCallback} from 'react';
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
import BasicHeader from '../components/BasicHeader';
import Comment from '../components/Comment';
import {Send} from '../components/icons';

const Comments = ({route, navigation}) => {
  const {item} = route.params;

  const [comments, setComments] = useState([]);
  const [comment, onChangeComment] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // get comments with id
    setComments([
      {
        id: '636281211fd7abf23bafbb2a',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nisl. Donec auctor, nunc eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nisl.',
        date: '31.10.2022',
        user: {
          name: 'Mertcan',
          surname: 'Kose',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
      },
      {
        id: '636281211fd7abf23bafbb2b',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nisl. Donec auctor, nunc eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nisl.',
        date: '31.10.2022',
        user: {
          name: 'Abdu Samed',
          surname: 'Akgul',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
      },
      {
        id: '636281211fd7abf23bafbb2c',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nisl. Donec auctor, nunc eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nisl.',
        date: '31.10.2022',
        user: {
          name: 'Ahmet',
          surname: 'Yılmaz',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
      },
      {
        id: '636281211fd7abf23bafbb2d',
        comment:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nisl. Donec auctor, nunc eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nisl.',
        date: '31.10.2022',
        user: {
          name: 'Mehmet',
          surname: 'Güven',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
      },
    ]);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // get api call
    //setRefreshing(false);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const sendComment = async () => {
    // send comment
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{paddingBottom: 80, flex: 1, position: 'relative'}}>
      <BasicHeader
        text={item?.meal?.date}
        navigation={navigation}
        type="isThree"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <FlatList
            data={comments}
            keyExtractor={item => item.id}
            key={item => item.id}
            renderItem={({item}) => <Comment comment={item} />}
            contentContainerStyle={{paddingHorizontal: 35, paddingVertical: 24}}
            ItemSeparatorComponent={() => <View style={{height: 34}} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              onChangeText={onChangeComment}
              value={comment}
              placeholder="Yorum Yaz"
              keyboardType="default"
            />
            <TouchableOpacity onPress={() => sendComment()} activeOpacity={0.8}>
              <Send width="24" height="24" color="#001A43" />
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
    color: '#001A43',
  },
});

export default Comments;
