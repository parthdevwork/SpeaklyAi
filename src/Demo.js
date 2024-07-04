// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Video  from 'react-native-video'
// import VideoPlayer from "react-native-video-player"
// const Demo = () => {
//   return (
//     <View style={{flex:1}}>
//       {/* <Video source={{uri:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}}
//       style={{height:"50%", width:"100%", }}

//       /> */}
//       <VideoPlayer
//     video={{ uri: "https://cdn.pipio.ai/gn/0228/65ba/4f7e/1f7c/7ea1ce9e9d8e942179e2aef2b7a11a7b72de20662e4740bf.webm" }}
//     videoWidth={1600}
//     videoHeight={900}

// />
// <Text style={{fontSize:25, marginTop:0}}>1</Text>
//     </View>
//   )
// }

// export default Demo

// const styles = StyleSheet.create({})

import React, {useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Button} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import Video from 'react-native-video';
import Microphone from './assets/svg/Microphone.svg';
import colors from './assets/themeColor/colors';

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

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [video, setVideo] = useState(0);

  const videoplay = () => {
    if (video === data.length - 1) {
      setVideo(0);
    } else {
      setVideo(video + 1);
    }
  };
 

  return (
    <View style={styles.container}>
      <View
        style={{
          height: verticalScale(230),
          alignItems: 'center',
          marginTop: verticalScale(150),
        }}>
        <Video
          ref={videoRef}
          source={{
            uri: data[video].uri,
          }}
          style={styles.video}
          controls={false}
          onError={error => console.log('Error:', error)}
          onPause={() => videoRef.current.play()}
          resizeMode={'cover'}
        />
      </View>

      <TouchableOpacity
        onPress={videoplay}
        style={{alignItems: 'center', marginTop: 50}}>
        <Microphone height={verticalScale(90)} width={verticalScale(90)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  playPauseButton: {
    // Style your play/pause button
  },
  video: {
    height: verticalScale(230),
    width: '80%',
  },
});

export default VideoPlayer;
