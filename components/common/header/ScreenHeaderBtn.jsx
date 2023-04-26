import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
// TouchableOpacity is a button

import styles from './screenheader.style'

// the button will receive the following props: the handlePress functionality, and the url and dimensions for the button icon 
const ScreenHeaderBtn = ({iconUrl, dimension, handlePress}) => {
  return (
    <TouchableOpacity 
      style={styles.btnContainer} 
      onPress={handlePress}>

      <Image
          source={iconUrl}
          resizeMode='cover'
          style={ styles.btnImg(dimension) }
       />

    </TouchableOpacity> 
  )
}

export default ScreenHeaderBtn