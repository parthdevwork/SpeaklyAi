import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Google from '../assets/svg/Google.svg';
import Apple from '../assets/svg/Apple.svg';
import FaceBook from '../assets/svg/FaceBook.svg';
import colors from '../assets/themeColor/colors';

const ScocialView = ({...props}) => {
  return (
    <>
      <View style={[styles.borderContainer, {...props.style}]}>
        <View style={styles.border} />
        <Text style={styles.continueTxt}>or continue with</Text>
        <View style={styles.border} />
      </View>

      <View style={[styles.btnContainer, {...props.btnViewStyle}]}>
        <TouchableOpacity style={styles.btn} onPress={props.onGooglePress}>
          <Google />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Apple />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={props.onFaceBookPress}>
          <FaceBook />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '25%',
  },
  continueTxt: {
    marginHorizontal: scale(10),
    fontSize: verticalScale(15),
    color: colors.txtGray,
    fontWeight: '500',
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  btn: {
    paddingVertical: verticalScale(10),
    width: '30%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.border,
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
});

export default ScocialView;
