import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import colors from '../../assets/themeColor/colors';

const styles = StyleSheet.create({
  checkContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(20),
    alignItems: 'center',
  },
  agreeTxt: {
    fontSize: verticalScale(12),
    fontWeight: '500',
  },
  anAcContainer: {
    paddingVertical: verticalScale(25),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imgContainer: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: verticalScale(10),
  },
  genderTxt: {
    fontSize: verticalScale(14),
    fontWeight: '700',
    color: colors.txtBlack,
    marginStart: verticalScale(8),
  },
  btn: {
    backgroundColor: colors.darkPrimary,
    marginTop: verticalScale(550),
    position: 'absolute',
  },
  CodeContainer: {
    width: '78%',
    alignSelf: 'center',
    marginTop: verticalScale(30),
  },
  otpContainer: {
    width: scale(55),
    height: verticalScale(42),
    lineHeight: 38,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpCode: {
    fontSize: verticalScale(14),
    fontWeight: '700',
    color: colors.txtBlack,
  },
  notReceive: {
    fontSize: verticalScale(11),
    fontWeight: '500',
    color: colors.txtBlack,
    alignSelf: 'center',
    marginTop: verticalScale(25),
  },
  resedCode: {
    fontSize: verticalScale(11),
    fontWeight: '500',
    color: colors.txtBlack,
    alignSelf: 'center',
    marginTop: verticalScale(10),
  },
  codeBtn: {
    backgroundColor: colors.primary,
    marginTop: verticalScale(540),
    position: 'absolute',
    height:verticalScale(48),
    justifyContent: 'center', 
    alignItems: 'center',
  },
  validError: {
    fontSize: verticalScale(12),
    color: 'red',
    marginTop: verticalScale(5),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(3.53, 6.27, 11.37, 0.6)',
  },
  modalTxt: {
    fontSize: verticalScale(25),
    color: 'red',
    fontWeight: '700',
  },
  modaldescription: {
    fontSize: verticalScale(16),
    color: 'red',
    fontWeight: '700',
    width: '80%',
    textAlign: 'center',
    marginTop: verticalScale(15),
  },
  modalView: {
    width: '90%',
    paddingVertical: verticalScale(20),
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalBtn:{
    backgroundColor: colors.primary,
    marginTop: verticalScale(35),
    marginBottom: verticalScale(15),
    width: '75%',
  }
});
export default styles;
