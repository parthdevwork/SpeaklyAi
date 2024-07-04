import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../assets/themeColor/colors';
import Header from '../component/Header';
import {useNavigation} from '@react-navigation/native';
import Button from '../component/Button';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './registration/styles';
import axios from 'axios';
import Config from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Verification = () => {
  const CELL_COUNT = 4;
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const[resentOtp,setResentOpt]=useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [resendCountdown, setResendCountdown] = useState(55);

  const decrementCountdown = () => {
    setResendCountdown(prevCountdown => {
      if (prevCountdown === 0) {
        return 55;
      } else {
        return prevCountdown - 1;
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      decrementCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
   
  const checkOTP = async () => {
    try {
      const cellCount = await AsyncStorage.getItem("user");
      const responseObject = JSON.parse(cellCount);
      const userId = responseObject?.user?.id;
      const token = responseObject?.token;
      console.log(cellCount,"swdbg")
      console.log((token));
      let data = JSON.stringify({
        "otp": value
      });
      if (value && value.length > 0) {
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${Config.Base_URl}/api/user/verifyotp/${userId}`,
          headers: { 
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer  ${token}`
          },
          data
        };
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          navigation.navigate("createPassword");
        })
        .catch((error) => {
          console.log(error, "abhjs");
        });
        
      } else {
        setResentOpt("OTP is not correct")
      }
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginHorizontal: scale(15), marginTop: verticalScale(50)}}>
        <Header
          onBack={() => navigation.goBack()}
          title={'OTP code verification 🔐'}
          description={
            'We have sent an OTP code to your email and********ley@yourdomain.com. Enter the OTP code below to verify.'
          }
        />
        <View style={styles.CodeContainer}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete={Platform.select({
              android: 'sms-otp',
              default: 'one-time-code',
            })}
            testID="my-code-input"
            renderCell={({index, symbol, isFocused}) => (
              <View
                key={index}
                style={[
                  styles.otpContainer,
                  {
                    backgroundColor: isFocused
                      ? 'rgba(61.57, 50.59, 100, 0.1)'
                      : colors.border,
                    borderColor: isFocused ? colors.primary : colors.border,
                  },
                ]}>
                <Text
                  style={styles.otpCode}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          {resentOtp && 
          <Text style={{marginTop:5, color:"red"}}>{resentOtp}</Text>
          }
        </View>
        <Text style={styles.notReceive}>Didn't receive email?</Text>
        <Text style={styles.resedCode}>
          You can resend code in{' '}
          <Text style={{color: colors.primary}}>{resendCountdown} s</Text>
        </Text>
        <Button
          btnStyle={styles.codeBtn}
          txtColor={colors.white}
          title={'Continue'}
          onPress={checkOTP}
        />
      </View>
    </View>
  );
};

export default Verification;
