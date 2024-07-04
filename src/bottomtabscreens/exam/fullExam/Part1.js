// import React, { useEffect, useState, useRef } from 'react';
// import {Dimensions, StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {scale, verticalScale} from 'react-native-size-matters';
// import {useNavigation} from '@react-navigation/native';
// import ExamHeader from '../bg/ExamHeader';
// import InstructionBox2 from '../bg/InstructionBox2';
// import colors from '../../../assets/themeColor/colors';
// import Footer from '../bg/Footer';
// import Microphone from '../../../assets/svg/Microphone.svg';


// const Data = [
//   {
//     id: 1,
//     title:
//       'In this part, examiner will ask you general questions on familiar topics, e.g. home, family, work, studies & interests',
//   },
//   {
//     id: 2,
//     title: 'This section should help you relax and talk naturally',
//   },
// ];
// const windowHeight = Dimensions.get('window').height;

// const Part1 = () => {

//   const navigation = useNavigation();
//   const progress = useRef(new Animated.Value(0)).current;
//   const timer = useRef(new Animated.Value(15)).current;
//   useEffect(() => {
//     animateProgress();
//   }, []);

//   const animateProgress = () => {
//     Animated.timing(
//       progress,
//       {
//         toValue: 1, // Animate to full progress
//         duration: 15000, // 15 seconds
//         useNativeDriver: false, // Required for color interpolation
//       }
//     ).start();
//   };

//   // Interpolate color from green to red based on progress
//   const barColor = progress.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['rgba(255,165,0,0.7)', 'rgba(255,255,0,.8)'],
//   });
  

//   return (
//     <LinearGradient
//       colors={[colors.primary, colors.darkPrimary]}
//       style={{
//         flex: 1,
//       }}
//       locations={[0.08, 0.3]}
//       start={{x: 0, y: 0.1}}
//       end={{x: 0.1, y: 2}}>
//       <View
//         style={{flex: 1, alignItems: 'center', marginHorizontal: scale(15)}}>
//         <ExamHeader />
//     <View style={styles.container}>
//       <Animated.View
//         style={[styles.progressBar, { backgroundColor: barColor, width: progress.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0%', '100%'],
//         }) }]}
//       />
//     </View>
    
//         <InstructionBox2 title={'Part 1'} data={Data} />
//         <TouchableOpacity
//           style={{top: windowHeight - 250, position: 'absolute'}}
//           onPress={() => navigation.navigate('startRecording', {part: 1})}>
//           <Microphone height={verticalScale(90)} width={verticalScale(90)} />
//         </TouchableOpacity>
//       </View>
//       <Footer />
//     </LinearGradient>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: 18,
//     backgroundColor: '#ddd',
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginTop:60
//   },
//   progressBar: {
//     height: '100%',
//     borderRadius: 10,
//   },
// })
// export default Part1;


import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, Animated, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import ExamHeader from '../bg/ExamHeader';
import InstructionBox2 from '../bg/InstructionBox2';
import colors from '../../../assets/themeColor/colors';
import Footer from '../bg/Footer';
import Microphone from '../../../assets/svg/Microphone.svg';

const Data = [
  {
    id: 1,
    title: 'In this part, examiner will ask you general questions on familiar topics, e.g. home, family, work, studies & interests',
  },
  {
    id: 2,
    title: 'This section should help you relax and talk naturally',
  },
];

const windowHeight = Dimensions.get('window').height;

const Part1 = () => {
  const navigation = useNavigation();
  const progress = useRef(new Animated.Value(0)).current;
  const timer = useRef(new Animated.Value(15)).current;
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    animateProgress();
    startCountdown();
  }, []);
  useEffect(() => {
    if (countdown === 0) {
      navigation.navigate('startRecording', { part: 1 });
    }
  }, [countdown]);
  const animateProgress = () => {
    Animated.timing(
      progress,
      {
        toValue: 1, // Animate to full progress
        duration: 15000, // 15 seconds
        useNativeDriver: false, // Required for color interpolation
      }
    ).start();
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);
  };

  // Interpolate color from green to red based on progress
  const barColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,165,0,0.7)', 'rgba(255,255,0,.8)'],
  });

  return (
    <LinearGradient
      colors={[colors.primary, colors.darkPrimary]}
      style={{ flex: 1 }}
      locations={[0.08, 0.3]}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 2 }}>
      <View style={{ flex: 1, alignItems: 'center', marginHorizontal: scale(15) }}>
        <ExamHeader />
        <View style={styles.container}>
          <Animated.View
            style={[styles.progressBar, { backgroundColor: barColor, width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }) }]}
          />
        </View>
        <View style={{flexDirection:"row",gap:50, marginTop:20}}>
        <Text style={{ color: 'white', fontSize: 20,fontWeight:"bold" }}>Timer:{countdown} sec</Text>
        <Text style={{ color: 'white', fontSize: 20,fontWeight:"bold" }}>End:15 sec</Text>
          </View>
        <InstructionBox2 title={'Part 1'} data={Data} />
        <TouchableOpacity
          style={{ top: windowHeight - 250, position: 'absolute' }}
          onPress={() => navigation.navigate('startRecording', { part: 1 })}>
          <Microphone height={verticalScale(90)} width={verticalScale(90)} />
        </TouchableOpacity>
      </View>
      <Footer />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 18,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 60
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
});

export default Part1;
