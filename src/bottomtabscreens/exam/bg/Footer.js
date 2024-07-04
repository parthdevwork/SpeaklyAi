import React from 'react';
import {View, Image, StyleSheet, Dimensions, Platform} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Image
        source={require('../../../assets/svg/wave.png')}
        style={styles.waveImg}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: verticalScale(100),
    width: '100%',
    justifyContent: 'flex-end',
    // zIndex: Platform.OS === 'ios' ? 0 : 1,
  },
  waveImg: {
    height: '100%',
    resizeMode: 'stretch',
    width: windowWidth,
  },
});
export default Footer;
