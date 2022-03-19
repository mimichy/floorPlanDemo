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
import Download from './Download';

const App = () => {
  //State for the selected area
  const [selectedAreaId, setSelectedAreaId] = useState([]);
  const imgWidth = Dimensions.get('window').width - 20;
  const imgHeight = Dimensions.get('window').height;

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 10}}>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          marginTop: 40,
        }}>
        {/* Image Mapper Example in React Native */}
      </Text>
      <ScrollView
        maximumZoomScale={5}
        scrollEnabled={true}
        minimumZoomScale={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Download />
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
          containerStyle={{position: 'relative'}}
          selectedAreaId={selectedAreaId}
        />
      </ScrollView>
    </View>
  );
};

export default App;

// Maps to Create Clickable Areas
const RECTANGLE_MAP = [
  {
    id: '0',
    x1: 80,
    y1: 500,
    icon: require('./assets/fan.png'),
    label: 'EAF-CP-B2-02',
  },
];
