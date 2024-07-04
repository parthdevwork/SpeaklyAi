import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Header from '../../component/Header';
import CheckBox from '../../assets/svg/CheckBox.svg';
import BoxOutLine from '../../assets/svg/BoxOutLine.svg';
import FloatingInput from '../../component/FloatingInput';
import ScocialView from '../../component/ScocialView';
import Button from '../../component/Button';
import colors from '../../assets/themeColor/colors';
import styles from '../registration/styles';
import {supabase} from '../../../supabase/supabase';
import SuccessModal from '../../component/SuccessModal';
import axios from 'axios';
import Config from '../../Config';

const LogIn = () => {
  const navigation = useNavigation();
  const [isCheck, setIsCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const [registerData, setRegisterData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonColor, setIsButtonColor] = useState(false);

  

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      console.log('***userInfo***', userInfo.user);
      if (userInfo) {
        if (registerData !== '' && registerData.length > 0) {
          const user = registerData.find(
            item => item.email === userInfo.user.email,
          );
          if (user) {
            console.log("first")
            await AsyncStorage.setItem('isLogin', JSON.stringify(user));
            navigation.reset({
              index: 0,
              routes: [
                {name: 'bottomTab', params: {email: userInfo.user.email}},
              ],
            });
          } else {
            console.log('*****ELSE*****');
            navigation.navigate('completeProfile', {userInfo: userInfo.user});
          }
        }
      }
      const idToken = userInfo.idToken;
      if (idToken) {
        const {data, error} = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: idToken,
        });
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        // console.log('Some other error happened', error);
      }
    }
  };

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (val.length === 0) {
      setEmailValidError('** Please enter Email');
    } else if (reg.test(val) === false) {
      setEmailValidError('** Please enter your valid email addres');
    } else if (reg.test(val) === true) {
      setEmailValidError('Done');
    }
  };

  const [passwordValidError, setPasswordValidError] = useState('');
  const handleValidPassword = val => {
    if (val.length === 0) {
      setPasswordValidError('** Please enter Password');
    } else if (val.length < 8) {
      setPasswordValidError('** Please enter atleast 8 character');
    } else {
      setPasswordValidError('Done');
    }
  };

const login = async () => {
  try {
    if (emailValidError === 'Done' && passwordValidError === 'Done') {
      
        let data = JSON.stringify({
          "email_id":email,
          "password": password
        });
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${Config.Base_URl}/api/user/sign-in`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          const token = JSON.stringify(response?.data?.token)
                    const user = JSON.stringify(response?.data)
                    console.log(user)
                    AsyncStorage.setItem("user", user)
                     AsyncStorage.setItem("token", token)
                     navigation.navigate("bottomTab")
        })
        .catch((error) => {
          console.log(error);
        });
   
    }
  } catch (error) {
    console.log(error, "out error");
  }
}


  
  useEffect(() => {
    
    if (emailValidError === 'Done' && passwordValidError === 'Done') {
      setIsButtonColor(true);
    } else {
      setIsButtonColor(false); 
    }
  }, [emailValidError, passwordValidError]);
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginHorizontal: scale(15), marginTop: verticalScale(20)}}>
        <Header
          onBack={() => navigation.navigate('welcome')}
          title={'Welcome back 👋'}
          description={'Please enter your email & password to log in.'}
        />

        <FloatingInput
          title="Email"
          placeholder="Email"
          style={{marginTop: verticalScale(20)}}
          value={email}
          onChangeText={email => {
            setEmail(email);
            handleValidEmail(email);
          }}
        />
        {emailValidError !== 'Done' && emailValidError !== '' ? (
          <Text style={styles.validError}>{emailValidError}</Text>
        ) : null}
        <FloatingInput
          title="Password"
          placeholder="Password"
          value={password}
          onChangeText={password => {
            setPassword(password);
            handleValidPassword(password);
          }}
          style={{marginTop: verticalScale(18)}}
        />
        {passwordValidError !== 'Done' && passwordValidError !== '' ? (
          <Text style={styles.validError}>{passwordValidError}</Text>
        ) : null}
        <View style={styles.checkContainer}>
          <TouchableOpacity onPress={() => setIsCheck(!isCheck)}>
            {isCheck ? <CheckBox /> : <BoxOutLine />}
          </TouchableOpacity>
          <View style={{marginStart: scale(8)}}>
            <Text style={[styles.agreeTxt, {color: colors.txtBlack}]}>
              Remember me
            </Text>
          </View>
        </View>

        <View
          style={{borderBottomColor: colors.border, borderBottomWidth: 1}}
        />
        <TouchableOpacity
          style={{paddingVertical: verticalScale(20)}}
          onPress={() => navigation.navigate('resetPassword')}>
          <Text
            style={[
              styles.agreeTxt,
              {color: colors.primary, alignSelf: 'center'},
            ]}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={[styles.anAcContainer, {marginTop: verticalScale(-20)}]}>
          <Text style={[styles.agreeTxt, {color: colors.txtBlack}]}>
            Don’t have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('registartion')}>
            <Text style={[styles.agreeTxt, {color: colors.primary}]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <ScocialView
          btnViewStyle={{marginTop: verticalScale(20)}}
          onGooglePress={signIn}
          // onFaceBookPress={signInWithFacebook}
        />
        <Button
          btnStyle={{
            backgroundColor: isButtonColor ? "#9D81FF": colors.darkPrimary,
            marginVertical: verticalScale(30),
            height:verticalScale(48),
            justifyContent: 'center', 
            alignItems: 'center',
          }}
          txtColor={colors.white}
          title={'Log in'}
          onPress={login}
        />
      </View>
      <SuccessModal
        visible={isSuccess}
        type={'Log in Successful!'}
        title={'Log in Successful!'}
        description={'Please wait...\nYou will be directed to the homepage.'}
      />
      <Modal animationType="slide" transparent={true} visible={isError}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTxt}>Error</Text>
            <Text style={styles.modaldescription}>
              This email and passowrd not exist please signup ...
            </Text>
            <Button
              btnStyle={styles.modalBtn}
              txtColor={colors.white}
              title={'Continue'}
              onPress={() => {
                setIsError(false);
                setEmail('');
                setPassword('');
              }}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default LogIn;

