import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import BasicHeader from '../components/BasicHeader';
import Comment from '../components/Comment';

const Comments = ({route, navigation}) => {
  const {item} = route.params;

  const [comments, setComments] = useState([]);
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

  return (
    <View>
      <BasicHeader info={item} navigation={navigation} />
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
    </View>
  );
};

export default Comments;
