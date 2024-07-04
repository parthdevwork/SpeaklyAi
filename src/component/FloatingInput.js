import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Email from '../assets/svg/Email.svg';
import colors from '../assets/themeColor/colors';
import PhoneInput from 'react-native-phone-number-input';

const FloatingInput = ({...props}) => {
  const [showPassword, setShowPassword] = useState(false);
  const phoneInput = useRef();
  return (
    <View style={{...props.style}}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.container}>
        {props.title === 'Phone Number' && (
          <PhoneInput
            ref={phoneInput}
            defaultValue={props.defaultValue}
            defaultCode={props.defaultCode ? props.defaultCode : 'US'}
            layout="first"
            onChangeText={props.onChangeText}
            onChangeFormattedText={props.onChangeFormattedText}
            codeTextStyle={{color: colors.txtBlack}}
            textInputStyle={{color: colors.txtBlack}}
            textContainerStyle={{backgroundColor: colors.white}}
            containerStyle={{backgroundColor: colors.white}}
            autoFocus
            onChangeCountry={props.onChangeCountry}
          />
        )}
        {props.title === 'Gender' ? (
          <Text
            style={[
              styles.txtGender,
              {color: props.value ? colors.txtBlack : colors.placeholder},
            ]}>
            {props.value ? props.value : 'Gender'}
          </Text>
        ) : (
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={colors.placeholder}
            style={styles.input}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={
              (props.title === 'Password' ||
                props.title === 'New Password' ||
                props.title === 'Confirm New Password') &&
              !showPassword
            }
          />
        )}
        {props.title === 'Email' && <Email />}
        {(props.title === 'Password' ||
          props.title === 'New Password' ||
          props.title === 'Confirm New Password') && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.6}>
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={verticalScale(23)}
              color={!showPassword ? colors.primary : colors.placeholder}
            />
          </TouchableOpacity>
        )}
        {props.title === 'Gender' && (
          <TouchableOpacity onPress={props.onGender} activeOpacity={0.6}>
            <AntDesign
              name={props.isGenderList ? 'up' : 'down'}
              size={verticalScale(17)}
              color={colors.placeholder}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    marginTop: verticalScale(12),
  },
  title: {
    fontSize: verticalScale(12),
    fontWeight: '700',
    color: colors.txtBlack,
  },
  txtGender: {
    fontSize: verticalScale(14),
    fontWeight: '700',
    marginBottom: verticalScale(8),
  },
  input: {
    fontSize: verticalScale(14),
    fontWeight: '700',
    color: colors.txtBlack,
    marginBottom: verticalScale(8),
    width: '90%',
  },
});

export default FloatingInput;
