import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../../assets/themeColor/colors';
import ExamHeader from '../bg/ExamHeader';
import Footer from '../bg/Footer';
import Coolresult from '../../../assets/svg/Coolresult.svg';
import Button from '../../../component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {supabase} from '../../../../supabase/supabase';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const Result = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {part} = route.params;

  const [isLoginData, setIsLoginData] = useState('');
  const [filterQueAns, setFilterQueAns] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoginString = await AsyncStorage.getItem('isLogin');
        if (isLoginString) {
          const isLogin = JSON.parse(isLoginString);
          setIsLoginData(isLogin);
        } else {
          console.log('No user data found Root*******');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchData();
  }, []);

  // const fetchQuestionsAndAnswers = async () => {
  //   const {data, error} = await supabase
  //     .from('que_ans')
  //     .select('*')
  //     .eq('part', 1)
  //     .eq('email', isLoginData.email);
  //   if (error) {
  //     console.error('Error fetching questions and answers:', error.message);
  //   } else {
  //     setFilterQueAns(data);
  //   }
  // };

  // useEffect(() => {
  //   fetchQuestionsAndAnswers();
  // }, [isLoginData]);

  const check_part = () => {
    if (part === 1) {
      navigation.navigate('part2');
    } else if (part === 2) {
      navigation.navigate('part3');
    }
  };
  let queData = JSON.stringify(JSON.stringify(filterQueAns));

  // useEffect(() => {
  //   if (queData) {
  //     let data = JSON.stringify({
  //       model: 'gpt-3.5-turbo-1106',
  //       messages: [
  //         {
  //           role: 'user',
  //           content: `based on given questions and answers i want to IELTS score using Pronunciation , Grammar , Fluency , Vocabulary also  IELTS give scroe like 5,5.5,6,6.5,7,7.5,8,8.5 and 9 and these result prepare from these given questions and answers ${queData} give me score with suggestion separated by :

  //           score should be fix and for each data
  //           dont give extra information
  //           it should be same every time and score is calculate by u and calulate all answer  give final answer
  //           dont give que and answer
  //           Pronunciation: suggestion with score
  //           Grammar: suggestion with score
  //           Fluency: suggestion with score
  //           Vocabulary: suggestion with score
  //           Overall score: score`,
  //         },
  //       ],
  //       stream: true,
  //       max_tokens: 596,
  //     });

  //     let config = {
  //       method: 'post',
  //       maxBodyLength: Infinity,
  //       url: 'https://api.openai.com/v1/chat/completions',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization:
  //           'Bearer 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',
  //       },
  //       data: data,

  //     };

  //     axios
  //       .request(config)
  //       .then(response => {
  //         console.log('*****response******', response.data);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

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
        <Coolresult
          height={verticalScale(110)}
          width={verticalScale(110)}
          style={{marginTop: verticalScale(80)}}
        />
        <Text
          style={{
            fontSize: verticalScale(14),
            fontWeight: '700',
            color: colors.white,
            marginTop: verticalScale(35),
          }}>
          Cool!
        </Text>
        <Text
          style={{
            color: colors.white,
            marginTop: verticalScale(15),
            textAlign: 'center',
          }}>
          Congratulations. Are you ready to move on to {'\n'}the Next part?
        </Text>
        <Button
          onPress={check_part}
          btnStyle={{
            top: windowHeight - 250,
            position: 'absolute',
            backgroundColor: colors.primary,
            width: '60%',
          }}
          title={'Ready'}
          txtColor={colors.white}
        />
      </View>
      <Footer />
    </LinearGradient>
  );
};

export default Result;
