import {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import BasicHeader from '../components/BasicHeader';
import {useTheme} from '@react-navigation/native';
import TrendsBox from '../components/TrendsBox';
import {getTrends} from '../api/food';
import {AuthContext} from '../context/Auth';
import Loading from '../components/Loading';
import {errorMessage} from '../utils/showToast';
import {strings} from '../constants/localization';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import AppText from '../components/AppText';
import * as Animatable from 'react-native-animatable';
import {trendsAndroid, trendsIos} from '../../secret';

const Trends = ({navigation}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const [trendsData, setTrendsData] = useState({});

  const {token} = useContext(AuthContext);

  useEffect(() => {
    getTrendsData();
  }, []);

  const getTrendsData = async () => {
    setLoading(true);
    try {
      const response = await getTrends(token);
      if (response.error) {
        errorMessage(strings.trendLoadError);
      } else {
        setTrendsData(response?.data);
      }
    } catch (error) {
      errorMessage(strings.trendLoadError);
    } finally {
      setLoading(false);
    }
  };

  const getBannerUnitId = () => {
    return __DEV__
      ? TestIds.BANNER
      : Platform.OS === 'ios'
      ? trendsIos
      : trendsAndroid;
  };

  return (
    <View style={{flex: 1}}>
      <BasicHeader
        style={{backgroundColor: '#0AD4EE'}}
        navigation={navigation}
        text={strings.trends}
        textStyle={{fontWeight: 'bold', fontSize: 18}}
        isBack={false}
      />
      <BannerAd
        unitId={getBannerUnitId()}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      {trendsData?.likeTrend?.length == 0 && (
        <Animatable.Text
          animation="slideInLeft"
          duration={1000}
          style={{fontSize: 20, textAlign: 'center', color: 'blue'}}>
          {strings.updateweekday}
        </Animatable.Text>
      )}

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={styles.trendsBoxContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 20}}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getTrendsData}
              colors={[colors.lightBlue]}
            />
          }>
          <TrendsBox
            title={strings.mostFavoriteDays}
            data={trendsData?.likeTrend}
            navigation={navigation}
          />
          <TrendsBox
            title={strings.mostUnfavoriteDays}
            data={trendsData?.dislikeTrend}
            navigation={navigation}
            style={{marginVertical: 40}}
          />
          <TrendsBox
            title={strings.mostCommentDays}
            data={trendsData?.commentTrend}
            navigation={navigation}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Trends;

const styles = StyleSheet.create({
  trendsBoxContainer: {
    flex: 1,
  },
});
