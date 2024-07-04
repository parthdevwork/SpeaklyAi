import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../../assets/themeColor/colors';

const InstructionBox = ({...props}) => {
  return (
    <View style={styles.box}>
      <View style={{marginHorizontal: scale(20)}}>
        <Text style={styles.boxTitle}>{props.title}</Text>
        <View style={{marginTop: verticalScale(10)}}>
          {props?.data?.map(item => {
            return (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  marginTop: verticalScale(5),
                }}>
                <Text style={{color: colors.white}}>{item.id}. </Text>
                <Text style={{color: colors.white}}>{item.title}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingVertical: verticalScale(15),
    width: '100%',
    backgroundColor: colors.primary,
    borderWidth: 0.2,
    borderColor: colors.white,
    borderRadius: 5.17,
    marginTop: verticalScale(70),
  },
  boxTitle: {
    fontSize: verticalScale(15),
    fontWeight: '700',
    color: colors.white,
  },
});

export default InstructionBox;
