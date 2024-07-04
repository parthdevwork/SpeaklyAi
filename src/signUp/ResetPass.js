import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import colors from '../assets/themeColor/colors';
import Header from '../component/Header';
import FloatingInput from '../component/FloatingInput';
import Button from '../component/Button';
import axios from 'axios';
import Config from '../Config';

const ResetPass = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); 
  const [showError, setShowError] = useState(false);
  const [emailValidError, setEmailValidError] = useState('');

  const handleContinue = () => {
  
    if (email && email.trim().length > 0) {
      const checkemail = async()=>{
        let data = JSON.stringify({
          "email_id":email
        });
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${Config.Base_URl}/api/user/reset`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          navigation.navigate('verification');
          console.log(JSON.stringify(response.data));
          setShowError(false);
        })
        .catch((error) => {
          
          console.log(error,'++++');
        });
      }
      checkemail()
    
    } else {
      setShowError(true);
      console.log('Please enter a valid email address');
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



  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginHorizontal: scale(15), marginTop: verticalScale(50)}}>
        <Header
          onBack={() => navigation.goBack()}
          title={'Reset your password 🔑'}
          description={
            'Please enter your email and we will send an OTP code in the next step to reset your password.'
          }
        />
        <FloatingInput
          title="Email"
          placeholder="Email"
          value={email}
          style={{marginTop: verticalScale(20)}}
          onChangeText={ (txt)=>{setEmail(txt)
            handleValidEmail(email)}
          }
        />
        {emailValidError !== 'Done' && emailValidError !== '' ? (
          <Text style={styles.validError}>{emailValidError}</Text>
        ) : null}
        <Button
          btnStyle={{
            backgroundColor: colors.primary,
            marginTop: verticalScale(540),
            position: 'absolute',
            height:verticalScale(48),
            justifyContent: 'center', 
            alignItems: 'center',
          }}
          txtColor={colors.white}
          title={'Continue'}
          onPress={handleContinue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  validError: {
    fontSize: verticalScale(12),
    color: 'red',
    marginTop: verticalScale(5),
  },

})
export default ResetPass;
