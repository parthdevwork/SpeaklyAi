import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '../../assets/svg/CheckBox.svg';
import BoxOutLine from '../../assets/svg/BoxOutLine';
import colors from '../../assets/themeColor/colors';
import Header from '../../component/Header';
import FloatingInput from '../../component/FloatingInput';
import ScocialView from '../../component/ScocialView';
import Button from '../../component/Button';
import styles from './styles';
import {supabase} from '../../../supabase/supabase';

const Registration = () => {
  const navigation = useNavigation();
  const [isCheck, setIsCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerData, setRegisterData] = useState([]);
  const [isError, setIsError] = useState(false);

  const fetchQuestionsAndAnswers = async () => {
    const {data, error} = await supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching questions and answers:', error.message);
    } else {
      setRegisterData(data);
    }
  };
  useEffect(() => {
    fetchQuestionsAndAnswers();
  }, []);

  const [emailValidError, setEmailValidError] = useState('');
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

  const checkData = () => {
    if (emailValidError === 'Done' && passwordValidError === 'Done') {
      if (registerData !== '' && registerData.length > 0) {
        const matchingData = registerData.filter(item => item.email === email);
        if (matchingData.length > 0) {
          setIsError(true);
        } else {
          navigation.navigate('completeProfile', {
            emailReg: email,
            passwordReg: password,
          });
        }
      } else {
        navigation.navigate('completeProfile', {
          emailReg: email,
          passwordReg: password,
        });
      }
    } else {
      Alert.alert('Please enter valid email and password');
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginHorizontal: scale(15), marginTop: verticalScale(50)}}>
        <Header
          onBack={() => navigation.navigate('welcome')}
          title={'Hello there 👋'}
          description={
            'Please enter your email & password to create an account.'
          }
        />

        <FloatingInput
          title="Email"
          placeholder="Email"
          value={email}
          onChangeText={email => {
            setEmail(email);
            handleValidEmail(email);
          }}
          style={{marginTop: verticalScale(20)}}
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
          <View style={{marginStart: scale(8), width: '95%'}}>
            <Text style={[styles.agreeTxt, {color: colors.txtBlack}]}>
              I agree to Speakly{' '}
              <Text style={[styles.agreeTxt, {color: colors.primary}]}>
                Public Agreement, Terms, & Privacy Policy.
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{borderBottomColor: colors.border, borderBottomWidth: 1}}
        />
        <View style={styles.anAcContainer}>
          <Text style={[styles.agreeTxt, {color: colors.txtBlack}]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={[styles.agreeTxt, {color: colors.primary}]}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>

        <ScocialView btnViewStyle={{marginTop: verticalScale(20)}} />
        <Button
          btnStyle={{
            backgroundColor: colors.darkPrimary,
            marginTop: verticalScale(35),
            marginBottom: verticalScale(15),
          }}
          txtColor={colors.white}
          title={'Continue'}
          onPress={checkData}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={isError}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTxt}>Error</Text>
            <Text style={styles.modaldescription}>
              Please enter other email becuase this one is already exist...
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

export default Registration;
