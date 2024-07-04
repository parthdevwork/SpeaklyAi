import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Footer from './bg/Footer';
import colors from '../../assets/themeColor/colors';
import ExamHeader from './bg/ExamHeader';
import Button from '../../component/Button';
import InstructionBox from './bg/InstructionBox';

const ExamDescripition1 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {type} = route.params;
  let demo = 10;
  const Data = [
    {
      id: 1,
      title: type === 'full' ? '10-12 minutes long' : '2 minutes long',
    },
    {
      id: 2,
      title: 'Instant result',
    },
    {
      id: 3,
      title: '7 Plus Sample Result',
    },
    {
      id: 4,
      title: 'Comprehensive feedback',
    },
    {
      id: 5,
      title: 'Contains all the IELTS speaking parts',
    },
    {
      id: 6,
      title: 'Good for complete practice before the exam',
    },
    {
      id: 7,
      title: 'The Latest speaking topics and questions',
    },
    {
      id: 8,
      title:
        'Graded on all four IELTS parameters: Grammar, Lexical Resources, Pronunciation and Fluency',
    },
  ];

  const check_type = () => {
    if (type === 'full') {
      navigation.navigate('examdesc2');
    } else {
      navigation.navigate('miniExam');
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
        <InstructionBox
          title={type === 'full' ? 'Full Speaking Test' : 'Mini Speaking Test'}
          data={Data}
        />
        <Button
          onPress={check_type}
          btnStyle={{
            width: '60%',
            backgroundColor: colors.primary,
            marginTop: verticalScale(100),
          }}
          txtColor={colors.white}
          title="Next"
        />
      </View>
      <Footer />
    </LinearGradient>
  );
};

export default ExamDescripition1;
