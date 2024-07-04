import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../assets/themeColor/colors';
import Business from '../../assets/svg/Business.svg';
import Metting from '../../assets/svg/Metting.svg';
import Interview from '../../assets/svg/Interview.svg';
import Practice from '../../assets/svg/Practice.svg';

const Cards = ({...props}) => {
  return (
    <View style={{width: '48%', marginTop: verticalScale(20)}}>
      <View style={styles.container}>
        {props.item.txt === 'show' && (
          <Image
            source={require('../../assets/svg/ResourceNative.png')}
            style={{marginStart: scale(12), marginTop: verticalScale(10)}}
          />
        )}
        {props.item.txt === 'business' && <Business />}
        {props.item.txt === 'meeting' && <Metting />}
        {props.item.txt === 'interview' && <Interview />}
        {props.item.txt === 'practice' && <Practice />}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.item.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(120),
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titleContainer: {
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(8),
  },
  title: {
    fontSize: verticalScale(10),
    color: colors.txtBlack,
    fontWeight: '700',
  },
});

export default Cards;
