import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../../assets/themeColor/colors';
import Footer from '../bg/Footer';
import Coolresult from '../../../assets/svg/Coolresult.svg';
import Navbarlogo from '../../../assets/svg/Navbarlogo.svg';
import Button from '../../../component/Button';

const windowHeight = Dimensions.get('window').height;
const Congratulations = () => {
  const navigation = useNavigation();
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
        style={{flex: 1, alignItems: 'center', marginHorizontal: scale(15)}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: verticalScale(40),
            width: '100%',
          }}>
          <TouchableOpacity
            style={{width: '35%'}}
            onPress={() => navigation.navigate('home')}>
            <AntDesign
              size={verticalScale(16)}
              color={colors.white}
              name="arrowleft"
            />
          </TouchableOpacity>
          <Navbarlogo />
        </View>
        <Coolresult
          height={verticalScale(110)}
          width={verticalScale(110)}
          style={{marginTop: verticalScale(80)}}
        />
        <Text
          style={{
            fontSize: verticalScale(14),
            fontWeight: '700',
            color: colors.white,
            marginTop: verticalScale(35),
          }}>
          Congratulations!
        </Text>
        <Text
          style={{
            color: colors.white,
            marginTop: verticalScale(15),
            textAlign: 'center',
          }}>
          You have finished your exam AI Generating {'\n'}your Result and
          Feedback?
        </Text>
        <Button
          onPress={() => navigation.navigate('Progress')}
          btnStyle={{
            top: windowHeight - 250,
            position: 'absolute',
            backgroundColor: colors.primary,
            width: '60%',
          }}
          title={'Get me there'}
          txtColor={colors.white}
        />
      </View>
      <Footer />
    </LinearGradient>
  );
};

export default Congratulations;
