import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../../assets/themeColor/colors';

const InstructionBox2 = ({...props}) => {
  return (
    <View style={styles.box}>
      <View style={{marginHorizontal: scale(20)}}>
        <Text style={styles.boxTitle}>{props.title}</Text>
        <View style={{marginTop: props?.title && verticalScale(10)}}>
          {props.title == 'Part 2' && (
            <>
              <Text
                style={{
                  color: colors.white,
                  fontSize: verticalScale(13.5),
                }}>
                {props.question}
              </Text>
              <Text
                style={{
                  color: colors.white,
                  fontSize: verticalScale(13.5),
                  marginTop: verticalScale(15),
                }}>
                You should address:
              </Text>
            </>
          )}

          {props?.data?.map(item => {
            return (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  marginTop: props.title !== 'Part 2' && verticalScale(12),
                }}>
                {props.title !== 'Part 2' ? (
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: verticalScale(13.5),
                    }}>
                    {item.id}.{' '}
                  </Text>
                ) : (
                  <View
                    style={{marginHorizontal: scale(15), flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: verticalScale(13.5),
                      }}>
                      .
                    </Text>
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: verticalScale(13.5),
                        marginStart: scale(15),
                      }}>
                      {item.question}
                    </Text>
                  </View>
                )}
                <Text
                  style={{
                    color: colors.white,
                    fontSize: verticalScale(13.5),
                  }}>
                  {item.title}
                </Text>
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
    paddingVertical: verticalScale(20),
    width: '100%',
    backgroundColor: colors.primary,
    borderWidth: 0.2,
    borderColor: colors.white,
    borderRadius: 5.17,
    marginTop: verticalScale(70),
  },
  boxTitle: {
    fontSize: verticalScale(20),
    fontWeight: '700',
    color: colors.white,
  },
});

export default InstructionBox2;
