/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Text,
  Dimensions,
  View,
} from 'react-native';

// import ImageMapper from 'react-native-image-mapper';
import ImageMapper from './components/ImageMapper';
const getRandomColor = () => {
  //Function to return random color
  //To highlight the mapping area
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

const App = () => {
  //State for the selected area
  const [selectedAreaId, setSelectedAreaId] = useState([]);
  const imgWidth = Dimensions.get('window').width - 20;
  const imgHeight = Dimensions.get('window').height;
  const mapperAreaClickHandler = async (item, idx, event) => {
    const currentSelectedAreaId = selectedAreaId;
    if (Array.isArray(currentSelectedAreaId)) {
      const indexInState = currentSelectedAreaId.indexOf(item.id);
      if (indexInState !== -1) {
        console.log('Removing id', item.id);
        setSelectedAreaId([
          ...currentSelectedAreaId.slice(0, indexInState),
          ...currentSelectedAreaId.slice(indexInState + 1),
        ]);
      } else {
        alert(`Clicked Item Id: ${item.id}`);
        console.log('Setting Id', item.id);
        setSelectedAreaId([...currentSelectedAreaId, item.id]);
      }
    } else {
      if (item.id === currentSelectedAreaId) {
        setSelectedAreaId(null);
      } else {
        setSelectedAreaId(item.id);
      }
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 10}}>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          marginTop: 40,
        }}>
        Image Mapper Example in React Native
      </Text>
      {/* <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth="100%"
        imageHeight="100%"
        panToMove={true}> */}
      <ScrollView
        maximumZoomScale={5}
        scrollEnabled={true}
        minimumZoomScale={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <ImageMapper
          imgHeight={imgHeight}
          imgWidth={imgWidth}
          imgSource={{
            uri: 'https://www.researchgate.net/profile/Algirdas-Sokas-2/publication/289196695/figure/fig2/AS:453704492032003@1485182988918/Example-of-house-plan-drawing.png',
          }}
          imgMap={RECTANGLE_MAP}
          onPress={(item, idx, event) =>
            mapperAreaClickHandler(item, idx, event)
          }
          containerStyle={{top: 10}}
          selectedAreaId={selectedAreaId}
          multiselect
        />
      </ScrollView>
      {/* </ImageZoom> */}
    </View>
  );
};

export default App;

// Maps to Create Clickable Areas
const RECTANGLE_MAP = [
  {
    id: '0',
    name: 'Left Foot',
    shape: 'rectangle',
    x2: 110,
    y2: 540,
    x1: 80,
    y1: 500,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '1',
    name: 'Right Foot',
    shape: 'rectangle',
    x2: 155,
    y2: 540,
    x1: 125,
    y1: 500,
    prefill: getRandomColor(),
    fill: 'blue',
  },
  {
    id: '2',
    name: 'Left Knee',
    shape: 'rectangle',
    x2: 110,
    y2: 400,
    x1: 80,
    y1: 370,
    prefill: getRandomColor(),
    fill: 'blue',
  },
];
