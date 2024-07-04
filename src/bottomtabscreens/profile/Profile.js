import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../assets/themeColor/colors';
import Upgrade from '../../assets/svg/Upgrade.svg';
import Editbtn from '../../assets/svg/Editbtn.svg';
import SettingCard from './SettingCard';
import User from '../../assets/svg/User.svg';
import Button from '../../component/Button';
import Config from '../../Config';

const Profile = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isLoginData, setIsLoginData] = useState('');
  const [isLogOut, setIsLogOut] = useState(false);

  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const isLoginString = await AsyncStorage.getItem('user');
  //       if (isLoginString) {
  //         const isLogin = JSON.parse(isLoginString);
  //         setIsLoginData(isLogin);
         
  //       } else {
  //         console.log('No user data found Profile*******');
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [route.params]);

  useEffect(() => {}, [isLoginData]);
  const fetchUserData = async () => {
    try {
      const isLoginString = await AsyncStorage.getItem('user');
      if (isLoginString) {
        const isLogin = JSON.parse(isLoginString);
        setIsLoginData(isLogin);
      } else {
        console.log('No user data found Profile*******');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused , route.params]);


  console.log(isLoginData,"asjhb")
  const onLogOut = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        userData.token = null;
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      }
      navigation.reset({
        index: 0,
        routes: [{name: 'welcome'}],
      });
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.bg}}>
      <Text style={styles.headerTitle}>Settings</Text>
      <ScrollView
        style={{marginHorizontal: scale(15)}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.detailContainer}>
          <View style={{height: verticalScale(70), width: verticalScale(70)}}>
            {isLoginData?.user?.profile_url ? (
              <Image
                source={{uri:`${Config.Base_URl}/${isLoginData?.user?.profile_url}`}}
                style={{height: '100%', width: '100%', borderRadius: 10}}
              />
            ) : (
              <User height={verticalScale(75)} width={verticalScale(75)} />
            )}
          </View>
          <View style={{marginStart: scale(20)}}>
            <Text style={styles.name}>Hello, {isLoginData?.user?.full_name}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('editProfile', {profileData: isLoginData})
              }>
              <Editbtn />
            </TouchableOpacity>
          </View>
        </View>
        <Upgrade
          style={{
            alignSelf: 'center',
            marginTop: verticalScale(40),
            marginBottom: verticalScale(15),
          }}
          width={'100%'}
        />
        <SettingCard title={'Notification'} />
        <SettingCard title={'Languages'} laguage={'English (US)'} />
        <SettingCard title={'Security Settings'} />

        <View style={{marginTop: verticalScale(30)}}>
          <SettingCard title={'Support'} />
          <SettingCard title={'Privacy Policy'} />
          <SettingCard title={'Invite a friend'} />
        </View>
        <View style={{marginVertical: verticalScale(30)}}>
          <SettingCard
            title={'Log out'}
            onPress={() => setIsLogOut(!isLogOut)}
          />
        </View>
      </ScrollView>
      {isLogOut && (
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.line} />
            <View style={styles.logOutContainer}>
              <Text style={styles.logOutTxt}>Logout</Text>
            </View>
            <Text style={styles.logOutDescription}>
              Are you sure you want to log out?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: verticalScale(30),
              }}>
              <Button
                onPress={() => setIsLogOut(false)}
                btnStyle={{
                  backgroundColor: colors.btnBg,
                  width: '40%',
                  marginHorizontal: scale(5),
                }}
                title="Cancel"
                txtColor={colors.primary}
              />
              <Button
                onPress={onLogOut}
                btnStyle={{
                  backgroundColor: colors.primary,
                  width: '40%',
                  marginHorizontal: scale(5),
                }}
                title="Yes, Logout"
                txtColor={colors.white}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: verticalScale(15),
    fontWeight: '700',
    color: colors.txtBlack,
    alignSelf: 'center',
    marginTop: verticalScale(50),
  },
  detailContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(50),
    alignItems: 'center',
  },
  name: {
    fontSize: verticalScale(17),
    fontWeight: '700',
    color: colors.txtBlack,
    marginBottom: verticalScale(10),
  },
  bottomSheet: {
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(100,100,100,0.5)',
    position: 'absolute',
  },
  bottomSheetContainer: {
    bottom: 0,
    top: '65%',
    right: 0,
    left: 0,
    backgroundColor: colors.white,
    position: 'absolute',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center',
  },
  line: {
    paddingVertical: verticalScale(2),
    width: '15%',
    backgroundColor: colors.placeholder,
    borderRadius: 10,
    marginTop: verticalScale(10),
  },
  logOutContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    width: '95%',
    alignItems: 'center',
  },
  logOutTxt: {
    fontSize: verticalScale(16),
    fontWeight: '700',
    color: '#F75555',
    marginVertical: verticalScale(20),
  },
  logOutDescription: {
    fontSize: verticalScale(14),
    fontWeight: '700',
    color: colors.txtBlack,
    marginTop: verticalScale(15),
  },
});

export default Profile;
