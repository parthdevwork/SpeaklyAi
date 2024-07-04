import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../../../assets/themeColor/colors';

const PartCard = ({...props}) => {
  return (
    <>
      {props?.selectedType ? (
        <TouchableOpacity
          onPress={props?.onPress}
          key={props?.key}
          style={[
            styles.container,
            {
              borderWidth: 0.5,
              backgroundColor: colors.primary,
            },
          ]}>
          <Image
            source={props?.selectedType?.img}
            style={{marginStart: scale(20)}}
          />
          <Text style={styles.txt}>{props?.selectedType?.band}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={props?.onPress}
          key={props?.key}
          style={[
            styles.container,
            {
              borderWidth: 0.5,
              backgroundColor:
                props?.selectedType.id !== props?.item.id
                  ? colors.darkPrimary
                  : colors.primary,
            },
          ]}>
          <Image source={props?.item?.img} style={{marginStart: scale(20)}} />
          <Text style={styles.txt}>{props?.item?.band}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderColor: colors.white,
    borderRadius: 12,
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  txt: {
    fontSize: verticalScale(16),
    fontWeight: '700',
    color: colors.white,
    marginEnd: scale(20),
  },
});

export default PartCard;
