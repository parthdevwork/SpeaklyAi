import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../../assets/themeColor/colors';

const FeedBackCard = ({...props}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
    props.onPress(props.item);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={props?.key}
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor:
            props?.selectedFeedback.id !== props?.item.id
              ? colors.darkPrimary
              : colors.primary,
        },
      ]}>
      <View style={styles.arrowContainer}>
        <AntDesign name={isSelected ? 'down' : 'right'} color={colors.white} />
        <Text style={styles.title}>{props?.item?.title}</Text>
        <Text style={styles.band}>{props?.item?.band}</Text>
      </View>
      <View style={{marginHorizontal: scale(20)}}>
        <View style={styles.progress}>
          <View style={styles.fillProgress} />
        </View>
        {isSelected && (
          <>
            {props?.selectedFeedback?.points?.map(item => {
              return (
                <View style={styles.feedbackContainer} key={item.id}>
                  <Text style={styles.descripition}>. </Text>
                  <Text style={styles.descripition}>{item?.descripition}</Text>
                </View>
              );
            })}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: colors.white,
    borderRadius: 12,
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(4),
    borderWidth: 0.5,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: verticalScale(12),
    fontWeight: '700',
    color: colors.white,
    marginStart: scale(10),
    width: '75%',
  },
  band: {
    fontSize: verticalScale(12),
    fontWeight: '700',
    color: colors.white,
  },
  progress: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 6,
    marginVertical: verticalScale(10),
  },
  fillProgress: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 6,
  },
  feedbackContainer: {
    flexDirection: 'row',
    marginVertical: verticalScale(5),
  },
  descripition: {
    color: colors.white,
    fontSize: verticalScale(12),
  },
});

export default FeedBackCard;
