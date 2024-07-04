import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../../assets/themeColor/colors';
import Navbarlogo from '../../../assets/svg/Navbarlogo.svg';

const ExamHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: verticalScale(40),
        width: '100%',
      }}>
      <TouchableOpacity
        style={{width: '35%'}}
        onPress={() => navigation.goBack()}>
        <AntDesign
          size={verticalScale(16)}
          color={colors.white}
          name="arrowleft"
        />
      </TouchableOpacity>
      <Navbarlogo />
    </View>
  );
};

export default ExamHeader;
