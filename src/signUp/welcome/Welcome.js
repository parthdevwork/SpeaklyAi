import React from 'react';
import {View, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import Logo2 from '../../assets/svg/Logo2.svg';
import colors from '../../assets/themeColor/colors';
import Button from '../../component/Button';
import ScocialView from '../../component/ScocialView';
import styles from './styles';
import NewLogo from '../../assets/svg/NewLogo.svg'
const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginHorizontal: scale(15), alignItems: 'center'}}>
        <NewLogo style={styles.logo} />
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.speakly}>Speakly 👋</Text>

        <Button
          btnStyle={{
            backgroundColor: colors.primary,
            marginTop: verticalScale(60),
            height:50,
            justifyContent: 'center', 
            alignItems: 'center',
          }}
          
          txtColor={colors.white}
          title={'Log in'}
          onPress={() => navigation.navigate('login')}
          
        />
      

        <Button
          btnStyle={{
            backgroundColor: colors.btnBg,
            marginTop: verticalScale(20),
            height:50,
            justifyContent: 'center', 
            alignItems: 'center',
          }}
          txtColor={colors.primary}
          title={' Sign up'}
          onPress={() => navigation.navigate('registartion')}
        />

        <ScocialView
          style={{marginTop: verticalScale(70)}}
          btnViewStyle={{marginTop: verticalScale(20)}}
        />
      </View>
    </View>
  );
};

export default Welcome;
