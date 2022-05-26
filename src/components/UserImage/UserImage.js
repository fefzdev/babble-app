import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

export default function UserImage({ style, image, imageStyle, size = 48 }) {
  const defaultImage = require('@/assets/images/profile-placeholder.png');

  const defaultStyles = StyleSheet.create({
    image: {
      width: size,
      height: size,
    },
    imageStyle: {
      borderRadius: size / 2,
    },
  });

  const parsedImage = () => {
    if (typeof image === 'string') return { uri: image };
    return image;
  };

  return (
    <ImageBackground
      style={{ ...defaultStyles.image, ...style }}
      imageStyle={{ ...defaultStyles.imageStyle, ...imageStyle }}
      source={image ? parsedImage() : defaultImage}
    />
  );
}
