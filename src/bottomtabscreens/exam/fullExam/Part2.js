import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../../assets/themeColor/colors';
import ExamHeader from '../bg/ExamHeader';
import Microphone from '../../../assets/svg/Microphone.svg';
import Footer from '../bg/Footer';
import InstructionBox2 from '../bg/InstructionBox2';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

const Question = [
  {
    id: 1,
    question: 'Where is the place located',
  },
  {
    id: 2,
    question: 'When did you visit the place',
  },
  {
    id: 3,
    question: 'What did you do there',
  },
  {
    id: 4,
    question: 'And explain why this place has a special meaning',
  },
];

const Part2 = () => {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerStarted, seconds]);

  const startTimer = () => {
    if (seconds === 0) {
      navigation.navigate('startRecording',{part:2});
    }
    setTimerStarted(true);
  };

  const calculateWidth = () => {
    const maxWidth = 100;
    const remainingWidth = (seconds / 60) * maxWidth;
    return `${remainingWidth}%`;
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.darkPrimary]}
      style={{
        flex: 1,
      }}
      locations={[0.08, 0.3]}
      start={{x: 0, y: 0.1}}
      end={{x: 0.1, y: 2}}>
      <View
        style={{flex: 1, alignItems: 'center', marginHorizontal: scale(15)}}>
        <ExamHeader />
        <InstructionBox2
          data={Question}
          title={'Part 2'}
          question={
            'Candidate Task card Describe a place you have visited that has a special meaning to you.'
          }
        />
        <Text style={{color: colors.white, marginVertical: verticalScale(15)}}>
          Take this 1 minute to prepare
        </Text>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: 6,
          }}>
          <View
            style={{
              width: calculateWidth(),
              height: '100%',
              backgroundColor: colors.white,
              borderRadius: 6,
            }}
          />
        </View>
        <View
          style={{
            height: verticalScale(20),
            width: scale(40),
            borderRadius: 6,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: verticalScale(10),
          }}>
          {seconds === 60 ? (
            <Text style={{color: colors.white}}>1:00</Text>
          ) : (
            <Text style={{color: colors.white}}>0:{seconds}</Text>
          )}
        </View>

        <TouchableOpacity
          style={{top: windowHeight - 180, position: 'absolute'}}
          onPress={startTimer}>
          <Microphone height={90} width={90} />
        </TouchableOpacity>
      </View>
      <Footer />
    </LinearGradient>
  );
};

export default Part2;
