import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';
import LogoSmall from '../../assets/svg/LogoSmall.svg';
import LogoTxt from '../../assets/svg/LogoTxt.svg';
import HomeCard from '../../assets/svg/HomeCard.svg';
import FullExamCard from '../../assets/svg/FullExamCard.svg';
import MiniExamCard from '../../assets/svg/MiniExamCard.svg';
import colors from '../../assets/themeColor/colors';
import RoundCard from './RoundCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([
    { id: 0, title: 'News', selected: false },
    { id: 1, title: 'Challenge', selected: false },
    { id: 2, title: 'News', selected: false },
    { id: 3, title: 'Change', selected: false },
  ]);

  const handleItemPress = index => {
    setData(prevData => {
      const newData = [...prevData];
      const selectedItem = newData[index];
      newData.splice(index, 1);
      selectedItem.selected = true;

      if (selectedItem.selected) {
        newData.push(selectedItem);
      } else {
        newData.unshift(selectedItem);
      }

      return newData;
    });
  };
  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  const addBackButtonListener = () => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  };

  const removeBackButtonListener = () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  };

  addBackButtonListener();


  useEffect(() => {
    return () => {
      removeBackButtonListener();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: scale(15) }}>
        <View style={styles.container}>
          <LogoSmall />
          <LogoTxt style={{ marginStart: scale(10) }} />
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => (
            <RoundCard item={item} onPress={() => handleItemPress(index)} />
          )}
          keyExtractor={item => item.id.toString()}
        />
        <Text style={styles.title}>Good Morning! Alex 👋</Text>
        <Text style={styles.suggetionTitle}>
          Let’s see what can I do for you?
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ alignItems: 'center', marginTop: verticalScale(12) }}>
          <HomeCard width="96%" />
        </TouchableOpacity>
        {/* <Text style={styles.examTitle}>Select an exam</Text> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('recordMain', { type: 'full' })}
          activeOpacity={0.8}
          style={{ alignItems: 'center', marginTop: verticalScale(12) }}>
          <FullExamCard />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('recordMain', { type: 'mini' })}
          activeOpacity={0.8}
          style={{ alignItems: 'center', marginTop: verticalScale(12) }}>
          <MiniExamCard />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: verticalScale(50),
    alignItems: 'center',
  },
  title: {
    fontSize: verticalScale(12.5),
    color: colors.txtLightGray,
    fontWeight: '400',
  },
  suggetionTitle: {
    fontSize: verticalScale(15),
    color: colors.txtBlack,
    fontWeight: '700',
    marginTop: verticalScale(4),
  },
  examTitle: {
    fontSize: verticalScale(12.5),
    color: colors.txtBlack,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: verticalScale(25),
  },
});

export default Home;
