import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Image,
  Animated,
  ProgressView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import colors from '../../../assets/themeColor/colors';
import ExamHeader from '../bg/ExamHeader';
import Microphone from '../../../assets/svg/Microphone.svg';
import Footer from '../bg/Footer';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import {supabase} from '../../../../supabase/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSpeakingVideo} from '../../../apis/SpeackingApi';
import Video from 'react-native-video';
import Config from '../../../Config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionThunk } from '../../../redux/fullExam/examSlice';

const windowHeight = Dimensions.get('window').height;
const audioRecorderPlayer = new AudioRecorderPlayer();
const data = [
  {
    id: 0,
    uri: 'https://cdn.pipio.ai/gn/d63e/0dab/d066/ff72/6c22d848f24f5f0bc6696a507e038f729031915a2ac08214.webm',
  },
  {
    id: 1,
    uri: 'https://cdn.pipio.ai/gn/af50/dd92/9923/0d8b/910e3c628532561eadc4a146fb7cb56165e2bdbcd75a69ed.webm',
  },
  {
    id: 2,
    uri: 'https://cdn.pipio.ai/gn/6af2/91ca/89a5/6583/664192c8dc1a5768cecd652780ee4bdef31ce304eb93b100.mp4',
  },
  {
    id: 3,
    uri: 'https://cdn.pipio.ai/gn/fcfc/a1b2/7106/e3de/110be4d45418ff690cdbb094045db4e8e6a0cbd565f9b89a.mp4',
  },
  {
    id: 4,
    uri: 'https://cdn.pipio.ai/gn/fd60/5cff/f740/5c4a/5e046e2897aa053f080ecd936fc44413d2f23b33a656151f.mp4',
  },
];

const StartRecording = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {part} = route.params;
  const [getQuestion, setGetQuestion] = useState('');
  const [count, setCount] = useState(0);
  const [dataLenght, setDataLenght] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  // const [questions, setQuestions] = useState([]);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentQue, setCurrentQue] = useState('');
  const [singleVideo, setSingleVideo] = useState('');
  const [token, setToken] = useState('');
  const questions = useSelector(state=>state.exam.questions);
  const dispatch = useDispatch();
const [isLoginData, setIsLoginData] = useState('');
  const videoRef = useRef(null);
  const [questionanswer , setQuestionanswer] = useState("")
  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'hello.m4a',
    android: `${dirs.DocumentDir}/hello.mp3`,
  });




  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoginString = await AsyncStorage.getItem('isLogin');
        if (isLoginString) {
          const isLogin = JSON.parse(isLoginString);
          setIsLoginData(isLogin);
        } else {
          console.log('No user data found Root*******');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchData();
  }, [part]);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  const handleVideoLoadStart = () => {
    setLoading(true);
  };

  const handleVideoLoad = () => {
    setLoading(false);
  };

  const videoplay = () => {
    if (videoIndex === data.length - 1) {
      setVideoIndex(0);
    } else {
      setVideoIndex(prevIndex => prevIndex + 1);
    }
  };


 

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
          
          setToken((storedToken));
         
          dispatch(fetchQuestionThunk(part, JSON.parse(storedToken)));
        } else {
          navigation.navigate('welcome')

        }
      } catch (error) {
        navigation.navigate('welcome')

      }
    };
    getToken();
  }, [dispatch, part]);
  

  useEffect(() => {
    setGetQuestion(questions)
  }, [questions]);

 


  useEffect(() => {
    getSingleVideo();
  }, [currentQue]);

  const getSingleVideo = () => {

    setLoader(true)
    let data = JSON.stringify({
      data: {
        question: currentQue,
      },
    });
    
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Config.Base_URl}/api/get-single-video`,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${JSON.parse(token)}`
        },
        data: data,
      };
      axios
        .request(config)
        .then(response => {
          setSingleVideo(response.data);
          setLoader(false)
        })
        .catch(error => {
         console.log("first")
          setLoader(false)
          navigation.navigate("welcome")
        });
    } catch (err) {
      console.error('Error:', err.message);
      setLoader(false)
    }
  };




  useEffect(() => {
    if (getQuestion.length) {
      if (count === 0) {
        setCurrentQue(getQuestion[0]);
        setCount(1);
      } else if (count <= getQuestion.length) {
        setCurrentQue(getQuestion[count - 1]);
      }
    } else {
      setCurrentQue('');
      setCount(0);
    }
  }, [count, getQuestion.length]);

  const startListing = async () => {
    setIsRecording(true);
    try {
      const uri = await audioRecorderPlayer.startRecorder(path);
      setRecordedAudio(uri);
      console.log(uri, '8989*898989');
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };


  const check_part = () => {
    if (part !== 3) {
      if (count === 10) {
        navigation.navigate('result', { part: part });
        setCount(0);
        setGetQuestion([]); 
        setQuestionanswer(questionAnswers)
      }
    } 
     else {
      navigation.navigate('congratulations');
    }
  };
   
  // console.log(questionAnswers,"questionAnswers")
  const stopListing = async () => {
    setCount(prev => prev + 1);
    try {
      setCurrentQue(getQuestion[count]);
      if (recordedAudio !== '' ) {
        setQuestionAnswers(prevState => [
          ...prevState,
          {
            question: getQuestion[count-1],
            answer: recordedAudio,
          },
        ]);
        await audioRecorderPlayer.stopRecorder();
        setIsRecording(true);
        setRecordedAudio('')
       

      }
      if (recordedAudio !== '') {
        await audioRecorderPlayer.stopRecorder();
        setIsRecording(false);
        setRecordedAudio('');
     
      }
     
    if (count === 10) {

      setGetQuestion((prevQuestions) => prevQuestions.filter((_, index) => index !== count - 1));
      check_part();
    } else {
      setCurrentQue(getQuestion[count]);
    }
   
    } catch (error) {
      console.log('***Stop Recording***', error);
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));

  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 4000,
      useNativeDriver: false,
    }).start();
    progress.addListener(({ value }) => {
      setProgressValue(value);
    });
    return () => {
      progress.removeAllListeners();
    };
  }, []);


  // useEffect(() => {
  //   const fetchVideo = async () => {
  //     try {
  //       const response = await getSpeakingVideo();
  //       console.log("***** getSpeakingVideo *****", response.data);
  //     } catch (error) {
  //       console.error("Error fetching video:", error);
  //     }
  //   };

  //   fetchVideo();
  // }, []);

  const [totalSize, setTotalSize] = useState(0);
  const [downloadedSize, setDownloadedSize] = useState(0);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);

  useEffect(() => {
    const url = "/api/get-single-video"
    console.log("singleVideo",singleVideo);
    var oReq = new XMLHttpRequest();

    oReq.addEventListener("progress", progress);
    oReq.open('GET', url);
    oReq.send();
    if (oReq.readyState == XMLHttpRequest.DONE) {
      let data = JSON.parse(oReq.responseText);
      console.log("url",data)
      resolve({temp: data.main.temp, weather: json.weather[0].main});
  }
  }, []);

  if (isDownloadComplete) {
    return null; // Remove the progress bar from the screen
  }

  const progress1 = totalSize > 0 ? (downloadedSize / totalSize) * 100 : 0;

  
  return (
    <>
   <LinearGradient
        colors={[colors.primary, colors.darkPrimary]}
        style={{
          flex: 1,
        }}
        locations={[0.08, 0.3]}
        start={{x: 0, y: 0.1}}
        end={{x: 0.1, y: 2}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginHorizontal: scale(15),
          }}>
          <ExamHeader />
          <View
            style={{
              height: verticalScale(290),
              alignItems: 'center',
              marginTop: verticalScale(100),
            }}>
            {currentQue && singleVideo ? (
             <>
              <Video
                ref={videoRef}
                source={{
                  uri: singleVideo,
                }}
                style={styles.video}
                controls={false}
                onError={error => console.log('Error:', error)}
                onLoadStart={handleVideoLoadStart}
                onLoad={handleVideoLoad}
                resizeMode={'cover'}
                
              />
              <View>
             <TouchableOpacity
            onLongPress={() => {
              startListing();
            }}
            onPressOut={() => {
              stopListing();
            }}
            style={{alignItems: 'center', marginTop: 285}}>
            <Microphone height={verticalScale(90)} width={verticalScale(90)} />
          </TouchableOpacity>
          </View>
              </>
            ) : (
            
              <View style={styles.container}>
              <Text style={styles.text}>Generating AI Question</Text>
              <Text style={styles.progressText}>{progressValue.toFixed(0)}%</Text>
              <View style={styles.progressBar}>
            
              <Animated.View
          style={[
            styles.innerProgressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
          </Animated.View>
              </View>
            </View>
            )}

{/* <ProgressView progress={progress / 100} style={styles.progressBar} /> */}
          </View>
        </View>
        <Footer />
      </LinearGradient>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.modalContainer}>
        <View style={styles.container}>
              <Text style={styles.text}>Generating AI Question</Text>
              {/* <Text style={styles.progressText}>{progressValue.toFixed(0)}%</Text>
              <View style={styles.progressBar}>
            
              <Animated.View
          style={[
            styles.innerProgressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
            
         </Animated.View>
              </View>  */}
            </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(3.53, 6.27, 11.37, 0.6)',
  },
  modalTxt: {
    fontSize: verticalScale(16),
    color: colors.white,
    fontWeight: '700',
  },
  video: {
    height: verticalScale(230),
    width: '95%',
    position: 'absolute',
    borderRadius: 15,
  },
  container: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 32,
    backgroundColor: '#ddd',
    borderRadius: 15,
    overflow: 'hidden',
    width:200
  },
  innerProgressBar: {
    height: '100%',
    backgroundColor: 'purple',
    alignItems:"center"
  }, 
   progressText: {
    color: 'white',
    fontWeight: 'bold',
 
    position:"absolute",
top:"62%",
left:"37%",
  zIndex:1,
  },
  

});

export default StartRecording;
