import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import axios from 'axios';
import colors from '../../../assets/themeColor/colors';
import ExamHeader from '../bg/ExamHeader';
import Footer from '../bg/Footer';
import AIfedback from './AIfedback';
import Result from './Result';
import {supabase} from '../../../../supabase/supabase';

const type = [
  {
    id: 1,
    title: 'Result',
  },
  {
    id: 2,
    title: 'AI fedback',
  },
];

const windowsHight = Dimensions.get('window').height;

const ResultDescription = () => {
  const [selectedType, setSelectedType] = useState(1);
  const [filterQueAns, setFilterQueAns] = useState('');

  // const fetchQuestionsAndAnswers = async () => {
  //   const {data, error} = await supabase
  //     .from('que_ans')
  //     .select('*')
  //     .eq('part', 3);
  //   if (error) {
  //     console.error('Error fetching questions and answers:', error.message);
  //   } else {
  //     setFilterQueAns(data);
  //   }
  // };

  // useEffect(() => {
  //   fetchQuestionsAndAnswers();
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
      <Footer />
      <View
        style={{flex: 1, alignItems: 'center', marginHorizontal: scale(15)}}>
        <ExamHeader />
        <View style={{height: windowsHight / 10.5}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: verticalScale(30),
            }}>
            {type?.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedType(item.id)}
                  key={item.id}
                  style={{
                    paddingHorizontal: scale(25),
                    paddingVertical: verticalScale(7),
                    borderWidth: selectedType !== item.id ? 0 : 0.5,
                    borderColor: colors.white,
                    marginHorizontal: scale(15),
                    borderRadius: 6,
                    backgroundColor:
                      selectedType !== item.id
                        ? colors.darkPrimary
                        : colors.primary,
                  }}>
                  <Text
                    style={{
                      fontSize: verticalScale(13),
                      fontWeight: '700',
                      color:
                        selectedType !== item.id
                          ? colors.placeholder
                          : colors.white,
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {selectedType === 1 && <Result QueAnsData={filterQueAns} />}
        {selectedType === 2 && <AIfedback QueAnsData={filterQueAns} />}
      </View>
    </LinearGradient>
  );
};

export default ResultDescription;
