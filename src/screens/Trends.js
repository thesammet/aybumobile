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
        errorMessage(string.trendLoadError);
      } else {
        setTrendsData(response?.data);
      }
    } catch (error) {
      errorMessage(string.trendLoadError);
    } finally {
      setLoading(false);
    }
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
