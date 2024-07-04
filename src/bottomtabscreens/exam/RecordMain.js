import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../assets/themeColor/colors';
import WhiteLogo from '../../assets/svg/WhiteLogo.svg';
import Button from '../../component/Button';
import Footer from './bg/Footer';

const RecordMain = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {type} = route.params;



  
  return (
    <LinearGradient
      colors={[colors.primary, colors.darkPrimary]}
      style={{
        flex: 1,
      }}
      locations={[0.08, 0.3]}
      start={{x: 0, y: 0.1}}
      end={{x: 0.1, y: 2}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Skip</Text>
          <AntDesign
            size={verticalScale(16)}
            color={colors.white}
            name="arrowright"
            style={{marginEnd: scale(15)}}
          />
        </TouchableOpacity>
        <WhiteLogo
          style={{marginTop: verticalScale(50)}}
          height={verticalScale(120)}
          width={verticalScale(120)}
        />
        <Text style={styles.title}>Good Morning! Alex 👋</Text>
        <Text style={styles.description}>
          Come take your {'\n'}first free exam {'\n'}with us!
        </Text>
        <Button
          btnStyle={{
            width: '60%',
            backgroundColor: colors.primary,
            marginTop: verticalScale(100),
          }}
          txtColor={colors.white}
          title="Start Exam"
          onPress={() => navigation.navigate('examdesc1', {type: type})}
        />

        <Footer />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: verticalScale(50),
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: verticalScale(12),
    fontWeight: '700',
    color: colors.white,
    marginEnd: scale(10),
  },
  title: {
    fontSize: verticalScale(12.5),
    color: colors.white,
    fontWeight: '400',
    marginTop: verticalScale(25),
  },
  description: {
    fontSize: verticalScale(20),
    color: colors.white,
    fontWeight: '700',
    marginTop: verticalScale(10),
    textAlign: 'center',
    letterSpacing: 1,
  },
});

export default RecordMain;
