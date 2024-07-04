/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {GoogleSignin} from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId:
    '811480325974-c655q1j0fsilal3vemip5jqh01hql8n7.apps.googleusercontent.com',
  iosClientId:
    '811480325974-sd6en6jd83vkj38alqihj0050k823f6t.apps.googleusercontent.com',

  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

AppRegistry.registerComponent(appName, () => App);
