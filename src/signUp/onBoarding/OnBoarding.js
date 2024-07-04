import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/themeColor/colors';
import OnBoarding1 from '../../assets/svg/OnBoarding1.svg';
import OnBoarding2 from '../../assets/svg/OnBoarding2.svg';
import OnBoarding3 from '../../assets/svg/OnBoarding3.svg';
import Swiper from 'react-native-swiper';
import styles from './styles';

const OnBoarding = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const swiperRef = useRef(null);

  const handleNext = ({skip = 1}) => {
    if (page === 2 || page === 3) {
      navigation.navigate('welcome');
    } else {
      swiperRef.current?.scrollBy(skip);
    }
  };

  return (
    <View
      style={{flex: 1, backgroundColor: colors.white, alignItems: 'center'}}>
      <Swiper
        ref={swiperRef}
        key={`swiper-${page}`}
        style={{
          // height: '70%',
          marginTop: verticalScale(50),
        }}
        loop={false}
        autoplay={false}
        horizontal={true}
        showsButtons={false}
        showsPagination={true}
        autoplayTimeout={5}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        paginationStyle={{alignSelf: 'center'}}
        removeClippedSubviews={false}
        index={page}
        onIndexChanged={index => setPage(index)}>
        <View
          key="0"
          style={{alignItems: 'center', backgroundColor: colors.white}}>
          <OnBoarding2 />
          <View style={[styles.shadowWhite]} />
          <View style={[styles.whiteView]}>
            <Text style={styles.title}>
              The best AI Examine {'\n'}app in this century
            </Text>
          </View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor...
          </Text>
        </View>
        <View key="1" style={{alignItems: 'center'}}>
          <OnBoarding1 />
          <View style={styles.shadowWhite} />
          <View style={styles.whiteView}>
            <Text style={styles.title}>
              Various AI Assistants to {'\n'}help you more
            </Text>
          </View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor...
          </Text>
        </View>
        <View key="2" style={{alignItems: 'center'}}>
          <OnBoarding3 />
          <View style={styles.shadowWhite} />
          <View style={styles.whiteView}>
            <Text style={styles.title}>
              Try premium for your {'\n'}unlimited usage
            </Text>
          </View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor...
          </Text>
        </View>
      </Swiper>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: colors.btnBg}]}
          onPress={() => {
            setPage(3);
            handleNext({skip: 3});
          }}>
          <Text style={[styles.btnTxt, {color: colors.primary}]}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.btn, {backgroundColor: colors.primary}]}>
          <Text style={[styles.btnTxt, {color: colors.white}]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding;
