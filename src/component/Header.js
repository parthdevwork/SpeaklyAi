import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../assets/themeColor/colors';

const Header = ({...props}) => {
  return (
    <View style={{paddingVertical: verticalScale(10)}}>
      <TouchableOpacity onPress={props.onBack}>
        <AntDesign
          name="arrowleft"
          color={colors.txtBlack}
          size={verticalScale(20)}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: verticalScale(20),
    fontWeight: '700',
    color: colors.txtBlack,
    marginTop: verticalScale(25),
  },
  description: {
    fontSize: verticalScale(12),
    fontWeight: '400',
    color: colors.txtBlack,
    marginTop: verticalScale(15),
    letterSpacing: 0.5,
  },
});

export default Header;
