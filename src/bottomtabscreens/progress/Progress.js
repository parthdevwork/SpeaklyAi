import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../assets/themeColor/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import ExamHeader from '../exam/bg/ExamHeader';
import Footer from '../exam/bg/Footer';

const Progress = () => {
  return (
    <LinearGradient
      colors={[colors.primary, colors.darkPrimary]}
      style={{
        flex: 1,
      }}
      locations={[0.08, 0.3]}
      start={{x: 0, y: 0.1}}
      end={{x: 0.1, y: 2}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginHorizontal: scale(15),
        }}>
        <ExamHeader />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent:'center'
          }}>
          <Text
            style={{
              fontSize: verticalScale(16),
              color: colors.white,
              fontWeight: '700',
            }}>
            Coming soon.......
          </Text>
        </View>
      </View>
      <Footer />
    </LinearGradient>
  );
};

export default Progress;
