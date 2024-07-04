import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../assets/themeColor/colors';

const styles = StyleSheet.create({
  logo: {
    height: verticalScale(175),
    width: scale(155),
    marginTop: verticalScale(70),
  },
  welcome: {
    fontSize: verticalScale(30),
    fontWeight: '700',
    color: colors.txtBlack,
   
  },
  speakly: {
    fontSize: verticalScale(28),
    fontWeight: '700',
    color: colors.primary,
    marginTop: verticalScale(8),
  },
});

export default styles;
