import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Platform} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../assets/themeColor/colors';
import EditSquare from '../../assets/svg/EditSquare.svg';
import FloatingInput from '../../component/FloatingInput';
import styles from '../../signUp/registration/styles';
import {supabase} from '../../../supabase/supabase';
import User from '../../assets/svg/User.svg';
import Config from '../../Config';
import axios from 'axios';

const EditProfile = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const {profileData} = route.params;
  const [fullName, setFullName] = useState(profileData?.user?.full_name);
  const [email, setEmail] = useState(profileData?.user?.email_id);
  const [imageData, setImageData] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [value, setValue] = useState(profileData?.user?.phone_number);
  const [registerData, setRegisterData] = useState([]);
  const [flag, setFlag] = useState(false);
  const country = countryCode ? countryCode.cca2 : profileData.country;

  const _openGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then(image => {
      setImageData(image);
    });
  };



  const newData = async () => {
    try {
      let data = new FormData(); 
  
      if (imageData) {
        data.append('file', {
          uri: Platform.OS === "android" ? imageData.path : imageData.path.replace("file://", ""),
          type: imageData.mime, 
          name: imageData.path.split("/").pop() 
        });
      }
      data.append('phone_number', value);
      data.append('full_name', fullName);
      data.append('email_id', email);
      const storedToken = await AsyncStorage.getItem('token');
      const cellCount = await AsyncStorage.getItem("user");
      const responseObject = JSON.parse(cellCount);
      const userId = responseObject?.user?.id;
      
      let config = {
        method: 'post',
        url: `${Config.Base_URl}/api/user/profie/${userId}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${JSON.parse(storedToken)}`
        },
        data: data
      };
  
      axios.request(config)
        .then((response) => {
          
          if (response.data && response.data.message === 'user details updated successfully') {
            
            const updatedUserData = {
              ...responseObject.user,
              full_name: fullName,
              email_id: email,
              phone_number: value,
              profile_url: imageData?.path 
            };
            AsyncStorage.setItem('user', JSON.stringify({ ...responseObject, user: updatedUserData }));
            navigation.navigate("Profile", { data1: response.data });
          } else {
            console.error("Error updating user data:", response.data.message);
          }
          
        })
        .catch((error) => {
          console.error("Error:", error); 
          navigation.navigate("login");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  // const newData = async () => {
  //   console.log("first");
  //   try {
  //     let data = new FormData(); 

  //     if (imageData) {
  //       data.append('file', {
  //         uri: Platform.OS === "android" ? imageData.path : imageData.path.replace("file://", ""),
  //         type: imageData.mime, 
  //         name: imageData.path.split("/").pop() 
  //       });
  //     }
  //     data.append('phone_number', value);
  //     data.append('full_name', fullName);
  //     data.append('email_id', email);
  //     const storedToken = await AsyncStorage.getItem('token');
  //     const cellCount = await AsyncStorage.getItem("user");
  //     const responseObject = JSON.parse(cellCount);
  //     const userId = responseObject?.user?.id;
      
  //     let config = {
  //       method: 'post',
  //       url: `${Config.Base_URl}/api/user/profie/${userId}`,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         'Authorization': `Bearer ${JSON.parse(storedToken)}`
  //       },
  //       data: data
  //     };
    
  //     axios.request(config)
  //       .then((response) => {
          
  //         navigation.navigate("Profile", { data1: response.data }); 
  //       })
  //       .catch((error) => {
  //         console.error("Erro:", error); 
  //       });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  

  

  // useEffect(() => {
  //   if (data) {
  //     AsyncStorage.setItem('user', JSON.stringify(data))
  //       .then(() => console.log('Data stored successfully'))
  //       .catch(error => console.error('Error storing data:', error));
  //   }
  // }, [data]);
 
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginHorizontal: scale(15), marginTop: verticalScale(50)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              color={colors.txtBlack}
              size={verticalScale(20)}
            />
          </TouchableOpacity>
          <Text style={editStyle.headerTitle}>Personal Info</Text>
          <TouchableOpacity onPress={newData}>
            <Feather
              name="edit-3"
              color={colors.txtBlack}
              size={verticalScale(20)}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.imgContainer, {marginTop: verticalScale(30)}]}>
          {profileData?.user?.profile_url != null ? (
            <>
              {imageData?.path ? (
                <Image
                  source={{ uri:imageData?.path}}
                  height={verticalScale(75)}
                  width={verticalScale(75)}
                  style={{borderRadius: 100}}
                />
              ) : (
                <Image
                  source={{uri: `${Config.Base_URl}/${profileData?.user?.profile_url}` }}
                  height={verticalScale(75)}
                  width={verticalScale(75)}
                  style={{borderRadius: 100}}
                />
              )}
            </>
          ) : (
            <User height={verticalScale(75)} width={verticalScale(75)} />
          )}

          <TouchableOpacity
            onPress={() => {
              _openGallery();
            }}
            style={{marginStart: scale(-20), justifyContent: 'flex-end'}}>
            <EditSquare height={verticalScale(18)} width={verticalScale(18)} />
          </TouchableOpacity>
        </View>
        <FloatingInput
          title="Full Name"
          placeholder="Full Name"
          value={fullName}
          onChangeText={txt => {
            setFullName(txt);
          }}
          style={{marginTop: verticalScale(18)}}
        />
        <FloatingInput
          title="Email"
          placeholder="Email"
          value={email}
          onChangeText={txt => {
            setEmail(txt);
          }}
          style={{marginTop: verticalScale(18)}}
        />

        <FloatingInput
          defaultValue={value}
          title="Phone Number"
          style={{marginTop: verticalScale(18)}}
          onChangeText={text => {
            setValue(text);
          }}
          defaultCode={country}
          onChangeCountry={txt => setCountryCode(txt)}
        />
      </View>
    </View>
  );
};

const editStyle = StyleSheet.create({
  headerTitle: {
    fontSize: verticalScale(16),
    fontWeight: '700',
    color: colors.txtBlack,
  },
});

export default EditProfile;
