import React from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import ExamHeader from '../bg/ExamHeader';
import InstructionBox2 from '../bg/InstructionBox2';
import colors from '../../../assets/themeColor/colors';
import Footer from '../bg/Footer';
import Microphone from '../../../assets/svg/Microphone.svg';

const Data = [
  {
    id: 1,
    title:
      'In this part, examiner will ask you general questions on familiar topics, e.g. home, family, work, studies & interests',
  },
  {
    id: 2,
    title: 'This section should help you relax and talk naturally',
  },
];
const windowHeight = Dimensions.get('window').height;

const Part3 = () => {
  const navigation = useNavigation();
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
        <InstructionBox2 title={'Part 3'} data={Data} />
        <TouchableOpacity
          style={{top: windowHeight - 250, position: 'absolute'}}
          onPress={() => navigation.navigate('startRecording',{part:3})}>
          <Microphone height={verticalScale(90)} width={verticalScale(90)} />
        </TouchableOpacity>
      </View>
      <Footer />
    </LinearGradient>
  );
};

export default Part3;
