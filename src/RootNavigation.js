import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './signUp/SplashScreen';
import OnBoarding from './signUp/onBoarding/OnBoarding';
import Welcome from './signUp/welcome/Welcome';
import Registration from './signUp/registration/Registration';
import CompleteProfile from './signUp/registration/CompleteProfile';
import LogIn from './signUp/login/LogIn';
import ResetPass from './signUp/ResetPass';
import Verification from './signUp/Verification';
import CreatePass from './signUp/CreatePass';
import BottomTab from './BottomTab';
import RecordMain from './bottomtabscreens/exam/RecordMain';
import ExamDescripition1 from './bottomtabscreens/exam/ExamDescripition1';
import ExamDescripition2 from './bottomtabscreens/exam/fullExam/ExamDescripition2';
import MiniExam from './bottomtabscreens/exam/miniExam/MiniExam';
import Part1 from './bottomtabscreens/exam/fullExam/Part1';
import StartRecording from './bottomtabscreens/exam/fullExam/StartRecording';
import Result from './bottomtabscreens/exam/fullExam/Result';
import Part2 from './bottomtabscreens/exam/fullExam/Part2';
import Part3 from './bottomtabscreens/exam/fullExam/Part3';
import Congratulations from './bottomtabscreens/exam/fullExam/Congratulations';
import ResultDescription from './bottomtabscreens/exam/result/ResultDescription';
import EditProfile from './bottomtabscreens/profile/EditProfile';
import Home from './bottomtabscreens/home/Home';



LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const [isLoginData, setIsLoginData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoginString = await AsyncStorage.getItem('user');
        if (isLoginString) {
          const isLogin = JSON.parse(isLoginString);
          setIsLoginData(isLogin?.token);
        } else {
          console.log('No user data found Root*******');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    
    <NavigationContainer>
      {!isLoginData ? (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="splashScr">
          <Stack.Screen name="splashScr" component={SplashScreen} />
          <Stack.Screen name="onBoarding" component={OnBoarding} />
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="registartion" component={Registration} />
          <Stack.Screen name="completeProfile" component={CompleteProfile} />
          <Stack.Screen name="login" component={LogIn} />
          <Stack.Screen name="resetPassword" component={ResetPass} />
          <Stack.Screen name="verification" component={Verification} />
          <Stack.Screen name="createPassword" component={CreatePass} />
          <Stack.Screen name="bottomTab" component={BottomTab} />
          <Stack.Screen name="recordMain" component={RecordMain} />
          <Stack.Screen name="examdesc1" component={ExamDescripition1} />
          <Stack.Screen name="examdesc2" component={ExamDescripition2} />
          <Stack.Screen name="miniExam" component={MiniExam} />
          <Stack.Screen name="part1" component={Part1} />
          <Stack.Screen name="startRecording" component={StartRecording} />
          <Stack.Screen name="result" component={Result} />
          <Stack.Screen name="part2" component={Part2} />
          <Stack.Screen name="part3" component={Part3} />
          <Stack.Screen name="congratulations" component={Congratulations} />
          <Stack.Screen
            name="resultDescription"
            component={ResultDescription}
          />
          <Stack.Screen name="editProfile" component={EditProfile} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="bottomTab">
          <Stack.Screen name="bottomTab" component={BottomTab} />
          <Stack.Screen name="onBoarding" component={OnBoarding} />
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="registartion" component={Registration} />
          <Stack.Screen name="completeProfile" component={CompleteProfile} />
          <Stack.Screen name="login" component={LogIn} />
          <Stack.Screen name="resetPassword" component={ResetPass} />
          <Stack.Screen name="verification" component={Verification} />
          <Stack.Screen name="createPassword" component={CreatePass} />
          <Stack.Screen name="recordMain" component={RecordMain} />
          <Stack.Screen name="examdesc1" component={ExamDescripition1} />
          <Stack.Screen name="examdesc2" component={ExamDescripition2} />
          <Stack.Screen name="miniExam" component={MiniExam} />
          <Stack.Screen name="part1" component={Part1} />
          <Stack.Screen name="startRecording" component={StartRecording} />
          <Stack.Screen name="result" component={Result} />
          <Stack.Screen name="part2" component={Part2} />
          <Stack.Screen name="part3" component={Part3} />
          <Stack.Screen name="congratulations" component={Congratulations} />
          <Stack.Screen
            name="resultDescription"
            component={ResultDescription}
          />
          <Stack.Screen name="editProfile" component={EditProfile} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    
  );
};

export default RootNavigation;
