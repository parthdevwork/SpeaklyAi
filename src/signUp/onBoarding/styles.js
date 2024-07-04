import {Platform, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../assets/themeColor/colors';

const styles = StyleSheet.create({
  dot: {
    width: verticalScale(8),
    height: verticalScale(8),
    backgroundColor: colors.dotGray,
    marginHorizontal: scale(3),
    borderRadius: 10,
  },
  activeDot: {
    width: scale(30),
    height: verticalScale(8),
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginHorizontal: scale(3),
  },
  shadowWhite: {
    height: verticalScale(100),
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginTop: verticalScale(-170),
  },
  whiteView: {
    height: verticalScale(100),
    width: '100%',
    backgroundColor: colors.white,
    marginTop: verticalScale(-30),
  },
  title: {
    fontSize: verticalScale(18),
    color: colors.txtBlack,
    fontWeight: '700',
    marginTop: verticalScale(30),
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  description: {
    fontSize: verticalScale(12),
    color: colors.txtBlack,
    marginTop: verticalScale(-10),
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Platform.OS === 'android' ? '10%' : '20%',
    width: '85%',
    alignItems: 'center',
  },
  btn: {
    height: verticalScale(40),
    width: '48%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontSize: verticalScale(13),
    fontWeight: '700',
  },
});
export default styles;
