import React, {useState} from 'react';
import {View, SafeAreaView, Text, Image, StyleSheet, useWindowDimensions, Animated } from 'react-native';
import Svg, {G, Path, Circle, Polygon} from 'react-native-svg';

import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/Logo.png';
import Volume from '../../../assets/images/Volume.png';

const InControlScreen = ({ navigation }) => {
  const [value, setValue] = useState(0);

  const window = useWindowDimensions();
  const size = window.width-40;

  const AnimatedG = Animated.createAnimatedComponent(G);
  const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
  const [color, setColor] = useState(new Animated.Value(3));
  const [angle, setAngle] = useState(new Animated.Value(3));

  const backgroundStyle = {
    backgroundColor: color.interpolate({
      inputRange: [1,2,3,4,5],
      outputRange: ['#FFD7D7','#FFEBD7','#FFFFE0','#EBFFD7','#D7FFD7']
    }),
  };

  const rotationStyle = {
    transform: [
      {translateX: 50},
      {translateY: 30},
      {rotate: angle.interpolate({
        inputRange: [1,2,3,4,5],
        outputRange: ['-72deg','-36deg','0deg','36deg','72deg']
      })},
      {translateX: -50},
      {translateY: -30},
    ],
  };

  const textStyle = {
    color: color.interpolate({
      inputRange: [1,2,3,4,5],
      outputRange: ['#F07575','#F0B275','#F0F060','#B2F075','#75F075']
    }),
    opacity: 1,
  };

  const handle = (number) => {
    Animated.parallel([
      Animated.timing(angle,{
        toValue: number,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(color,{
        toValue: number,
        duration: 600,
        useNativeDriver: false,
      })
    ]).start(); 
    setValue(number);
  };

  return (
    <AnimatedSafeAreaView style={[styles.root, value? backgroundStyle: {backgroundColor:"#EDE9E9"}]}>
      <View style={styles.header}>
        <View style={{width: 100}}><CustomButton text= "<" onPress={() => navigation.navigate('Emotion')} type="blackBackButton"/></View>
        <Image source={Logo} style={styles.logo} resizeMode="cover" />
        <View style={{width: 100}}><Image source={Volume} style={styles.volume} resizeMode="cover" /></View>
      </View>

      <Text style = {styles.title}>
        How in control
        {"\n"}
        are you?
      </Text>

      <Svg height={size/2+size/20} width={size} style={styles.slider}>
        <G scale={size/100} y="20" origin="0, -20">
          <G onPress={() => handle(1)} rotation="0" origin="50, 30">
            <Path fill="#F07575" d="m25,30h-25c0,-11,3.5,-21.2,9.5,-29.4l20.3,14.7c-3,4.1,-4.8,9.2,-4.8,14.7z"/>
          </G>
          <G onPress={() => handle(2)} rotation="36" origin="50, 30">
            <Path fill="#F0B275" d="m25,30h-25c0,-11,3.5,-21.2,9.5,-29.4l20.3,14.7c-3,4.1,-4.8,9.2,-4.8,14.7z"/>
          </G>
          <G onPress={() => handle(3)} rotation="72" origin="50, 30">
            <Path fill="#F0F060" d="m25,30h-25c0,-11,3.5,-21.2,9.5,-29.4l20.3,14.7c-3,4.1,-4.8,9.2,-4.8,14.7z"/>
          </G>
          <G onPress={() => handle(4)} rotation="108" origin="50, 30">
            <Path fill="#B2F075" d="m25,30h-25c0,-11,3.5,-21.2,9.5,-29.4l20.3,14.7c-3,4.1,-4.8,9.2,-4.8,14.7z"/>
          </G>
          <G onPress={() => handle(5)} rotation="144" origin="50, 30">
            <Path fill="#75F075" d="m25,30h-25c0,-11,3.5,-21.2,9.5,-29.4l20.3,14.7c-3,4.1,-4.8,9.2,-4.8,14.7z"/>
          </G>
          <AnimatedG style={rotationStyle}>
            <Polygon fill="#6D828F" points="50,35 50,25 20,30" rotation="90" origin="50, 30"/>
            <Circle fill="#6D828F" cx="50" cy="30" r="5"/>
          </AnimatedG>
        </G>
      </Svg>

      <Animated.Text style={[styles.text, value? textStyle: {opacity: 0}]}>{value}</Animated.Text>

      <View style={styles.button}>
        <CustomButton text= "Continue" onPress={() => navigation.navigate('Dashboard')} type="SECONDARY"/>
      </View>
    </AnimatedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  header:{
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    maxWidth: 75,
    maxHeight: 75,
    marginVertical: 10,
  },
  volume:{
    width: 30,
    height: 30,
    margin: 20,
    alignSelf: 'flex-end',
  },
  title : {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 5,
    textAlign: 'center',
  },
  slider: {
    marginTop: 40,
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    margin: 20,
  },
  button:{
    flex: 1,
    flexDirection: "column-reverse",
    paddingBottom: 10,
  },
});

export default InControlScreen;