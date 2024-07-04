import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../assets/themeColor/colors';

const SettingCard = ({...props}) => {
  let titleColor = colors.txtBlack;

  if (props.title === 'Invite a friend') {
    titleColor = '#2A60F9';
  } else if (props.title === 'Log out') {
    titleColor = '#BE1229';
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      activeOpacity={0.8}>
      <Text style={[styles.title, {color: titleColor}]}>{props.title}</Text>

      {props.laguage ? (
        <View style={styles.laguageView}>
          <Text style={styles.laguageTxt}>{props.laguage}</Text>
        </View>
      ) : (
        <View style={{width: '40%'}} />
      )}
      <TouchableOpacity style={styles.icon} onPress={props.onPress}>
        <AntDesign
          name="right"
          color={colors.txtBlack}
          size={verticalScale(12)}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: verticalScale(10),
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 6,
    paddingHorizontal: scale(10),
    marginTop: verticalScale(7),
  },
  title: {
    fontSize: verticalScale(13),
    fontWeight: '500',
    width: '55%',
  },
  icon: {
    width: '5%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  laguageView: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  laguageTxt: {
    fontSize: verticalScale(12),
    fontWeight: '400',
    color: colors.txtBlack,
    marginEnd: scale(10),
  },
});

export default SettingCard;
