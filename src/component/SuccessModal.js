import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import SuccessUser from '../assets/svg/SuccessUser.svg';
import Lock from '../assets/svg/Lock.svg';
import Loader from '../assets/svg/Loader.svg';
import SuccessLogin from '../assets/svg/SuccessLogin.svg';
import colors from '../assets/themeColor/colors';

const SuccessModal = ({...props}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          {props.title === 'Sign up Successful!' && (
            <SuccessUser
              height={verticalScale(100)}
              width={verticalScale(100)}
            />
          )}
          {props.type === 'reset' && (
            <Lock height={verticalScale(110)} width={verticalScale(110)} />
          )}
          {props.type === 'Log in Successful!' && (
            <SuccessLogin
              height={verticalScale(110)}
              width={verticalScale(110)}
            />
          )}
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.description}>{props.description}</Text>
          <Loader height={verticalScale(30)} width={verticalScale(30)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(3.53, 6.27, 11.37, 0.6)',
  },
  modalContainer: {
    paddingVertical: verticalScale(15),
    backgroundColor: colors.white,
    width: '75%',
    borderRadius: 40,
    alignItems: 'center',
    paddingBottom: verticalScale(30),
  },
  title: {
    fontSize: verticalScale(16),
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    paddingVertical: verticalScale(20),
  },
  description: {
    fontSize: verticalScale(11),
    fontWeight: '400',
    color: colors.txtBlack,
    textAlign: 'center',
    letterSpacing: 1,
    paddingBottom: verticalScale(20),
  },
});

export default SuccessModal;
