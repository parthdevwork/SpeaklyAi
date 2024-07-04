import React, { useDebugValue, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../../assets/themeColor/colors';
import Header from '../../component/Header';
import User from '../../assets/svg/User.svg';
import EditSquare from '../../assets/svg/EditSquare.svg';
import CheckBox from '../../assets/svg/CheckBox.svg';
import BoxOutLine from '../../assets/svg/BoxOutLine.svg';
import FloatingInput from '../../component/FloatingInput';
import Button from '../../component/Button';
import ImageCropPicker from 'react-native-image-crop-picker';
import styles from './styles';
import SuccessModal from '../../component/SuccessModal';
import { supabase } from '../../../supabase/supabase';
import axios from 'axios';
import Config from '../../Config';

const CompleteProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [fullName, setFullName] = useState('');
  const [isGenderList, setIsGenderList] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [imageData, setImageData] = useState('');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const { emailReg, passwordReg } = route.params;
  const { userInfo } = route.params;



  const _openGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then(image => {
      setImageData(image);
    });
  };
  console.log(imageData?.mime, fullName, selectedGender, passwordReg, emailReg, value, "asbdh")
  const handleSelectGender = gender => {
    setSelectedGender(gender);
  };

  const signUp = async () => {
    if (fullName && formattedValue) {
      const email = emailReg ? emailReg : userInfo?.email;
      const password = passwordReg ? passwordReg : '12345678';
      const mobile_number = value;
      const gender = selectedGender;
      const image_url = imageData ? imageData.path : null;
      const full_name = fullName;

      try {
        let data = new FormData();
        if (imageData) {
          data.append('file', {
            uri: Platform.OS === "android" ? imageData.path : imageData.path.replace("file://", ""),
            type: imageData.mime,
            name: imageData.path.split("/").pop()
          });
        }
        data.append('email_id', email);
        data.append('password', password);
        data.append('full_name', full_name);
        data.append('phone_number', mobile_number);
        data.append('gender', gender);

        let config = {
          method: 'post',
          url: `${Config.Base_URl}/api/user/sign-up`,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: data
        };

        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            navigation.navigate("onBoarding")
          })
          .catch((error) => {
            console.log(error.massage, 'asbhasa');
          });

      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Please fill all fields');
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ marginHorizontal: scale(15), marginTop: verticalScale(50) }}>
        <Header
          onBack={() => navigation.goBack()}
          title={'Complete your profile 📋'}
          description={
            'Please enter your profile. Don`t worry, only you can see your personal data. No one else will be able to see it. Or you can skip it for now.'
          }
        />
        <ScrollView
          style={{ marginBottom: verticalScale(100) }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.imgContainer}>
            {imageData ? (
              <Image
                source={{ uri: imageData?.path }}
                height={verticalScale(75)}
                width={verticalScale(75)}
                style={{ borderRadius: 100 }}
              />
            ) : (
              <User height={verticalScale(75)} width={verticalScale(75)} />
            )}
            <TouchableOpacity
              onPress={() => {
                _openGallery();
              }}
              style={{ marginStart: scale(-20), justifyContent: 'flex-end' }}>
              <EditSquare
                height={verticalScale(18)}
                width={verticalScale(18)}
              />
            </TouchableOpacity>
          </View>
          <FloatingInput
            title="Full Name"
            placeholder="Full Name"
            value={fullName}
            onChangeText={password => {
              setFullName(password);
            }}
            style={{ marginTop: verticalScale(18) }}
          />

          <FloatingInput
            title="Phone Number"
            style={{ marginTop: verticalScale(18) }}
            defaultValue={value}
            onChangeText={text => {
              setValue(text);
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
            onChangeCountry={txt => setCountryCode(txt)}
          />

          <FloatingInput
            title="Gender"
            placeholder="Gender"
            style={{ marginTop: verticalScale(18) }}
            onGender={() => setIsGenderList(!isGenderList)}
            value={selectedGender}
            isGenderList={isGenderList}
          />
          {isGenderList && (
            <View style={styles.radioContainer}>
              <TouchableOpacity
                onPress={() => handleSelectGender('Female')}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                {selectedGender === 'Female' ? <CheckBox /> : <BoxOutLine />}
                <Text style={styles.genderTxt}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelectGender('Male')}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                {selectedGender === 'Male' ? <CheckBox /> : <BoxOutLine />}
                <Text style={styles.genderTxt}>Male</Text>
              </TouchableOpacity>
            </View>
          )}

          <Button
            btnStyle={{
              backgroundColor: colors.darkPrimary,
              marginVertical: verticalScale(30),
              marginBottom: verticalScale(100),
            }}
            txtColor={colors.white}
            title={'Continue'}
            onPress={signUp}
          />
        </ScrollView>
      </View>
      <SuccessModal
        visible={isSuccess}
        title={'Sign up Successful!'}
        description={'Please wait... \nYou will be directed to the \nhomepage.'}
      />
    </View>
  );
};

export default CompleteProfile;
