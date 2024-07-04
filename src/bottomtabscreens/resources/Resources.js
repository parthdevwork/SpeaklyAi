import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../assets/themeColor/colors';
import Cards from './Cards';

const data = [
  {
    id: 0,
    title: 'Speaking like a native with American TV shows',
    txt: 'show',
  },
  {
    id: 1,
    title: 'Business English',
    txt: 'business',
  },
  {
    id: 2,
    title: 'Meetings',
    txt: 'meeting',
  },
  {
    id: 3,
    title: 'Interview wite famous people',
    txt: 'interview',
  },
  {
    id: 4,
    title: 'English for immigration: Dialogues and practice',
    txt: 'practice',
  },
  {
    id: 5,
    title: 'Business English',
    txt: 'business',
  },
];

const Resources = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.bg}}>
      <View style={{marginHorizontal: scale(15), marginTop: verticalScale(50)}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: verticalScale(14),
            color: colors.txtBlack,
            fontWeight: '700',
          }}>
          Study Resources
        </Text>
        <View style={{marginBottom: verticalScale(50)}}>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item, index}) => <Cards item={item} />}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={{justifyContent: 'space-between'}}
          />
        </View>
      </View>
    </View>
  );
};

export default Resources;
