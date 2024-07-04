import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

const Button = ({...props}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, {...props.btnStyle}]}>
      <Text style={[styles.txt, {color: props.txtColor}]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: verticalScale(10),
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  txt: {
    fontSize: verticalScale(13),
    fontWeight: '500',
    alignSelf: 'center',
  },
});

export default Button;
