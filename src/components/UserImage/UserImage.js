import { ImageBackground } from 'react-native';

function UserImage({ style, imageStyle, image }) {
  const defaultImage = require('@/assets/images/profile-placeholder.png');

  return (
    <ImageBackground
      style={style}
      imageStyle={imageStyle}
      source={image ? image : defaultImage}
    />
  );
}

export default UserImage;