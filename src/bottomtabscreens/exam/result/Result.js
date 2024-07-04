import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import RNSpeedometer from 'react-native-speedometer';
import FeedBackCard from './component/FeedBackCard';
import colors from '../../../assets/themeColor/colors';

const FeedBackData = [
  {
    id: 0,
    title: 'Pronunciation',
    band: '6.0',
    points: [
      {
        id: 0,
        descripition:
          'Uses few acceptable phonological features (possibly because sample is insufficient)',
      },
      {
        id: 1,
        descripition:
          'Overall problems with delivery impair attempts at connected speech',
      },
      {
        id: 2,
        descripition:
          'Individual words and phonemes are mainly mispronounced and little meaning is conveyed.',
      },
    ],
  },
  {
    id: 1,
    title: 'Grammar',
    band: '7.5',
    points: [
      {
        id: 0,
        descripition:
          'Uses few acceptable phonological features (possibly because sample is insufficient)',
      },
      {
        id: 1,
        descripition:
          'Overall problems with delivery impair attempts at connected speech',
      },
      {
        id: 2,
        descripition:
          'Individual words and phonemes are mainly mispronounced and little meaning is conveyed.',
      },
    ],
  },
  {
    id: 2,
    title: 'Fluency',
    band: '5.5',
    points: [
      {
        id: 0,
        descripition:
          'Uses few acceptable phonological features (possibly because sample is insufficient)',
      },
      {
        id: 1,
        descripition:
          'Overall problems with delivery impair attempts at connected speech',
      },
      {
        id: 2,
        descripition:
          'Individual words and phonemes are mainly mispronounced and little meaning is conveyed.',
      },
    ],
  },
  {
    id: 3,
    title: 'Vocabulary',
    band: '7.0',
    points: [
      {
        id: 0,
        descripition:
          'Uses few acceptable phonological features (possibly because sample is insufficient)',
      },
      {
        id: 1,
        descripition:
          'Overall problems with delivery impair attempts at connected speech',
      },
      {
        id: 2,
        descripition:
          'Individual words and phonemes are mainly mispronounced and little meaning is conveyed.',
      },
    ],
  },
];

const labels = [
  {
    name: 'Very bad',
    labelColor: colors.white,
    activeBarColor: '#F96258',
  },
  {
    name: 'Bad',
    labelColor: colors.white,
    activeBarColor: '#F96258',
  },
  {
    name: 'Need more',
    labelColor: colors.white,
    activeBarColor: '#F96258',
  },
  {
    name: 'Good',
    labelColor: colors.white,
    activeBarColor: '#F96258',
  },
  {
    name: 'Slow',
    labelColor: colors.white,
    activeBarColor: '#FF8537',
  },
  {
    name: 'Perfect',
    labelColor: colors.white,
    activeBarColor: '#FFD522',
  },
  {
    name: 'Prefect',
    labelColor: colors.white,
    activeBarColor: '#FFD522',
  },
  {
    name: 'Fast',
    labelColor: colors.white,
    activeBarColor: '#3EDD93',
  },
  {
    name: 'Unbelievably Fast',
    labelColor: colors.white,
    activeBarColor: '#07EE2C',
  },
];

const Result = ({...props}) => {
  const generateRandomBand = () => {
    return (Math.random() * (9 - 5.5) + 5.5).toFixed(1);
  };

  const [selectedFeedback, setSelectedFeedback] = useState('');

  const feedbackDataWithRandomBands = FeedBackData.map(item => {
    return {
      ...item,
      band: generateRandomBand(),
    };
  });

  return (
    <View style={styles.container}>
      {props?.QueAnsData && props?.QueAnsData?.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.meterContainer}>
            <RNSpeedometer
              value={6.5}
              size={200}
              minValue={0}
              maxValue={9}
              needleImage={''}
              labels={labels}
              innerCircleStyle={{backgroundColor: colors.primary}}
              labelStyle={{marginTop: verticalScale(-25), color: colors.white}}
            />
          </View>
          <View style={{marginTop: verticalScale(20)}}>
            <Text style={styles.title}>Detailed Report</Text>
            {feedbackDataWithRandomBands?.map(item => {
              return (
                <FeedBackCard
                  key={item.id}
                  onPress={() => setSelectedFeedback(item)}
                  item={item}
                  selectedFeedback={selectedFeedback}
                />
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View>
          <Text
            style={{
              color: colors.white,
              fontSize: verticalScale(14),
              fontWeight: '500',
            }}>
            For showing result, so first you need to complete 3 parts of IELTS
            speaking
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '73%',
    width: '100%',
    marginTop: verticalScale(20),
    zIndex: 1,
  },
  meterContainer: {
    borderWidth: 0.5,
    borderColor: colors.white,
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: verticalScale(20),
    borderRadius: 9,
    paddingBottom: verticalScale(30),
  },
  title: {
    alignSelf: 'center',
    fontSize: verticalScale(14),
    color: colors.white,
    fontWeight: '500',
    marginBottom: verticalScale(10),
  },
});
export default Result;
