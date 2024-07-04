import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../assets/themeColor/colors';
import Change from '../../assets/svg/Change.svg';

const RoundCard = ({...props}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View
        style={[
          styles.borderVeiw1,
          {borderColor: props.item.selected ? colors.placeholder : colors.primary},
        ]}>
        <View style={styles.borderVeiw2}>
          {props?.item?.title === 'News' ? (
            <Image
              source={require('../../assets/svg/News.png')}
              style={styles.img}
            />
          ) : (
            <Change height={verticalScale(35)} width={verticalScale(35)} />
          )}
        </View>
      </View>
      <Text style={styles.title}>{props?.item?.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: verticalScale(55),
    marginHorizontal: scale(10),
    marginVertical: verticalScale(20),
  },
  selectedBorder: {
    borderColor: 'gray',
  },
  borderVeiw1: {
    borderRadius: 100,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(55),
    width: '100%',
  },
  borderVeiw2: {
    height: verticalScale(42),
    width: verticalScale(42),
    borderRadius: 100,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: verticalScale(11),
    fontWeight: '400',
    color: colors.txtBlack,
    alignSelf: 'center',
    marginTop: verticalScale(5),
  },
  img: {
    height: verticalScale(55),
    width: verticalScale(55),
    marginTop: verticalScale(5),
    marginStart: scale(5),
  },
});

export default RoundCard;
