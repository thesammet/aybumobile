import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import {useContext, useState, useEffect, useRef} from 'react';
import {errorMessage} from '../utils/showToast';
import {AuthContext} from '../context/Auth';
import DateBox from '@/components/DateBox';
import Header from '@/components/Header';
import MealBox from '@/components/MealBox';
import {useTheme} from '@react-navigation/native';
import {getMonthlyFood} from '../api/food';
import Loading from '../components/Loading';
import {strings} from '../constants/localization';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import AppText from '../components/AppText';

const {width} = Dimensions.get('screen');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.74 : width * 0.76;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Home = ({navigation}) => {
  const {token} = useContext(AuthContext);
  const {colors} = useTheme();
  const scrollx = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);

  /* native ad start */

  const nativeAdViewRef = useRef();

  useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  /* native ad end */

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFoodList();
    });
    return unsubscribe;
  }, [navigation]);

  const getFoodList = async () => {
    setLoading(true);
    try {
      let response = await getMonthlyFood(token);
      if (response.error) {
        errorMessage(strings.anErrorOccured);
      } else {
        let dataArr = response?.data;
        dataArr.unshift({meal: {_id: '231243'}, key: 'left-spacer'});
        dataArr.push({meal: {_id: '231423'}, key: 'right-spacer'});

        console.log(dataArr);
        setMeals(dataArr);
      }
    } catch (error) {
      errorMessage(strings.anErrorOccured);
    } finally {
      setLoading(false);
    }
  };

  const getBannerUnitId = () => {
    return __DEV__
      ? TestIds.BANNER
      : Platform.OS === 'ios'
      ? 'ca-app-pub-6556478222911747/3994339534'
      : 'ca-app-pub-6556478222911747/6655629067';
  };

  return (
    <View style={styles.homeContainer}>
      <Header type="inside" />
      <DateBox
        mealLastIndex={meals?.length}
        firstDate={meals[1]?.meal?.date}
        lastDate={meals[meals?.length - 2]?.meal?.date}
      />

      {loading ? (
        <View style={{flex: 1}}>
          <Loading size="small" />
        </View>
      ) : (
        <>
          <View style={styles.homeInsideContainer}>
            <Text style={[styles.mealListText, {color: colors.text}]}>
              {strings.mealList}
            </Text>

            {meals.length == 2 && (
              <AppText
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  fontSize: 18,
                }}>
                {strings.updateweekday}
              </AppText>
            )}

            <Animated.FlatList
              data={meals}
              keyExtractor={item => item?.meal?._id}
              horizontal
              snapToInterval={ITEM_SIZE}
              decelerationRate={0}
              bounces={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollx}}}],
                {useNativeDriver: false},
              )}
              scrollEventThrottle={16}
              contentContainerStyle={styles.flatListContainer}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                if (!item.meal || !item.ratingStatus) {
                  return (
                    <View key={item?.key} style={{width: EMPTY_ITEM_SIZE}} />
                  );
                }

                const inputRange = [
                  (index - 2) * ITEM_SIZE,
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                ];

                const translateY = scrollx.interpolate({
                  inputRange,
                  outputRange: [0, -16, 0],
                });

                return (
                  <View
                    style={[styles.mealOutsideContainer, {width: ITEM_SIZE}]}
                    key={item.meal._id}>
                    <Animated.View
                      style={{
                        transform: [{translateY}],
                        marginHorizontal: SPACING,
                        padding: SPACING * 2,
                        borderRadius: 34,
                        width: '100%',
                      }}>
                      <MealBox
                        key={item?.meal?._id}
                        item={item}
                        index={index}
                        style={styles.mealBox}
                        navigation={navigation}
                        type="home"
                      />
                    </Animated.View>
                  </View>
                );
              }}
            />
          </View>
        </>
      )}
      <BannerAd
        unitId={getBannerUnitId()}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  homeInsideContainer: {
    marginTop: 36,
    flex: 1,
  },
  mealListText: {
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '600',
  },
  flatListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealOutsideContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealBox: {
    marginLeft: 6,
    marginRight: 6,
    marginTop: 32,
    marginBottom: 16,
  },
});

export default Home;
