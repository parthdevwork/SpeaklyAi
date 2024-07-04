import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import colors from '../assets/themeColor/colors';
import Header from '../component/Header';
import FloatingInput from '../component/FloatingInput';
import Button from '../component/Button';
import styles from './registration/styles';
import SuccessModal from '../component/SuccessModal';
import axios from 'axios';
import Config from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePass = () => {
  const navigation = useNavigation();
  const [isReset, setIsReset] = useState(false);
  const[newpassword,setNewpassword] = useState("");
  const[confirmpassword,setConfirmpassword] = useState("");
  const [showError, setShowError] = useState(false);
  // const checkpass = async() => {
  //   if (password && password.trim().length > 0) {
  //     if (password.length < 8) {
  //       console.log('Password must be at least 8 characters');
  //     } else {
  //       if (newpassword ===  confirmpassword) {
  //         let data = JSON.stringify({
  //           "password": newpassword
  //         });
          
  //         let config = {
  //           method: 'post',
  //           maxBodyLength: Infinity,
  //           url: 'https://f3c9-49-36-82-177.ngrok-free.app/api/user/password/6be5338f-14c4-4728-9d67-903f1e7455d8',
  //           headers: { 
  //             'Content-Type': 'application/json'
  //           },
  //           data : data
  //         };
          
  //         axios.request(config)
  //         .then((response) => {
  //           // console.log(JSON.stringify(response.data));
  //           navigation.navigate('bottomTab');
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
         
  //       } else {
  //         console.log('Password does not match');
  //       }
  //     }
  //   } else {
  //     console.log('Please enter a valid password');
  //   }
  // }


  const checkpass = async () => {
    if (!newpassword || newpassword.trim().length === 0) {
      console.log('Please enter a valid password');
      return;
    }
  
    if (newpassword.length < 8) {
      console.log('Password must be at least 8 characters');
      return;
    }
  
    if (newpassword !== confirmpassword) {
      // console.log('Password does not match');
      return setShowError("Password does not match");
    }
  
    try {
      const data = JSON.stringify({
        password: newpassword,
      });
      const cellCount = await AsyncStorage.getItem("user");
      const responseObject = JSON.parse(cellCount);
      const userId = responseObject?.user?.id;
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Config.Base_URl}/api/user/password/${userId}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
  
      const response = await axios.request(config);
      console.log(response.data);
      navigation.navigate('login');
      setShowError("");
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginHorizontal: scale(15), marginTop: verticalScale(50)}}>
        <Header
          onBack={() => navigation.navigate("resetPassword")}
          title={'Create New Password 🔒'}
          description={
            'Create your new password. If you forget it, then you have to do forgot password.'
          }
        />
        <FloatingInput

          title="New Password"
          placeholder="New Password"
          style={{marginTop: verticalScale(18)}}
          onChangeText={(text)=>setNewpassword(text)}
        />
        <FloatingInput
          title="Confirm New Password"
          placeholder="Confirm New Password"
          style={{marginTop: verticalScale(18)}}
          onChangeText={(text)=>setConfirmpassword(text)}
        />
        {showError && 
        
        <Text style={styless.validError}>{showError}</Text>}
        <Button
          btnStyle={styles.codeBtn}
          txtColor={colors.white}
          title={'Continue'}
          // onPress={() => setIsReset(true)}
          onPress={checkpass}
        />
        <SuccessModal
          visible={isReset}
          title={'Reset Password \nSuccessful!'}
          description={
            'Please wait...\nYou will be directed to the \nhomepage.'
          }
          type={'reset'}
        />
      </View>
    </View>
  );
};
const styless = StyleSheet.create({
  validError: {
    fontSize: verticalScale(12),
    color: 'red',
    marginTop: verticalScale(5),
  },

})
export default CreatePass;
