import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import PartCard from './component/PartCard';
import FeedBackCard from './component/FeedBackCard';
import colors from '../../../assets/themeColor/colors';

const Data = [
  {
    id: 1,
    img: require('../../../assets/svg/part1.png'),
    band: '6.0',
  },
  {
    id: 2,
    img: require('../../../assets/svg/part2.png'),
    band: '5.5',
  },
  {
    id: 3,
    img: require('../../../assets/svg/part3.png'),
    band: '7.5',
  },
];

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

const AIfedback = ({...props}) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState('');
  return (
    <View style={styles.container}>
      {props?.QueAnsData && props?.QueAnsData?.length > 0 ? (
        <View style={{height: '100%'}}>
          {selectedType ? (
            <ScrollView
              style={{
                height: '72%',
                marginBottom: verticalScale(130),
              }}
              showsVerticalScrollIndicator={false}>
              <PartCard key={selectedType.band} selectedType={selectedType} />
              {FeedBackData?.map(item => {
                return (
                  <FeedBackCard
                    key={item.id}
                    onPress={() => setSelectedFeedback(item)}
                    item={item}
                    selectedFeedback={selectedFeedback}
                  />
                );
              })}
            </ScrollView>
          ) : (
            <View style={{marginTop: verticalScale(90)}}>
              {Data?.map(item => {
                return (
                  <PartCard
                    key={item.id}
                    onPress={() => setSelectedType(item)}
                    item={item}
                    selectedType={selectedType}
                  />
                );
              })}
            </View>
          )}
        </View>
      ) : (
        <View style={{marginTop: verticalScale(20)}}>
          <Text
            style={{
              color: colors.white,
              fontSize: verticalScale(14),
              fontWeight: '500',
            }}>
            For showing feedback, so first you need to complete 3 parts of IELTS
            speaking
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // marginHorizontal: scale(15),
    zIndex: 1,
  },
});

export default AIfedback;
