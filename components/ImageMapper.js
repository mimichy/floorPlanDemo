import React, {useState} from 'react';
import {ImageBackground, View, Pressable, Image, Text} from 'react-native';

const ImageMapper = ({
  imgSource,
  imgMap,
  imgHeight,
  imgWidth,
  containerStyle,
}) => {
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  return (
    <View style={[{flex: 1}, containerStyle]}>
      <ImageBackground
        resizeMode="contain"
        style={{
          height: imgHeight,
          width: imgWidth,
          display: 'flex',
        }}
        source={imgSource}>
        {imgMap.map((item, index) => (
          <Pressable
            onLongPress={() => {
              setIsShowTooltip(true);
            }}
            onPressOut={() => {
              setIsShowTooltip(false);
            }}>
            {isShowTooltip && (
              <View
                style={{
                  position: 'absolute',
                  top: item.y1 - 30,
                  left: item.x1,
                  backgroundColor: '#FFFFFF',
                  padding: 3,
                  borderWidth: 1,
                  borderRadius: 3,
                }}>
                <Text>{item.label}</Text>
              </View>
            )}
            <Image
              style={{
                position: 'absolute',
                top: item.y1,
                left: item.x1,
                height: 22,
                width: 22,
              }}
              source={item.icon}></Image>
          </Pressable>
        ))}
      </ImageBackground>
    </View>
  );
};

ImageMapper.defaultProps = {
  multiselect: false,
};

export default ImageMapper;
