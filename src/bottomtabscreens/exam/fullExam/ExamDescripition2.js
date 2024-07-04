import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import ExamHeader from '../bg/ExamHeader';
import InstructionBox from '../bg/InstructionBox';
import Button from '../../../component/Button';
import colors from '../../../assets/themeColor/colors';
import Footer from '../bg/Footer';
import InstructionBox2 from '../bg/InstructionBox2';

const Data = [
  {
    id: 1,
    title: 'Please sit a  quite place and take the test',
  },
  {
    id: 2,
    title: 'There are 3 parts of the test',
  },
  {
    id: 3,
    title: 'You will here the reviewer asking the questions once only',
  },
  {
    id: 4,
    title: 'Each question is followed by your answer',
  },
  {
    id: 5,
    title:
      'When you see a wave start speaking your answer & if completed earlier click next',
  },
  {
    id: 6,
    title:
      'You can review your answers and see your score breakdown for each section at the end of the test',
  },
];

const Data2 = [
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

const ExamDescripition2 = () => {
  const navigation = useNavigation();
  const [flag, setFlag] = useState(0);
  const change_instruction = () => {
    setFlag(prev => prev + 1);
    if (flag === 0) {
      navigation.navigate('part1');
      setFlag(0);
    }
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

        {flag === 1 ? (
          <InstructionBox2 data={Data2} />
        ) : (
          <InstructionBox title={'Instructions'} data={Data} />
        )}
        <Button
          onPress={change_instruction}
          btnStyle={{
            width: '60%',
            backgroundColor: colors.primary,
            marginTop: verticalScale(100),
          }}
          txtColor={colors.white}
          title="Start"
        />
      </View>
      <Footer />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  box: {
    paddingVertical: verticalScale(15),
    width: '100%',
    backgroundColor: colors.primary,
    borderWidth: 0.2,
    borderColor: colors.white,
    borderRadius: 5.17,
    marginTop: verticalScale(70),
  },
  boxTitle: {
    fontSize: verticalScale(15),
    fontWeight: '700',
    color: colors.white,
  },
});

export default ExamDescripition2;
