import React from 'react'
import { Image } from 'react-native'
import { View } from 'react-native'

const Hallmarkcomponent= () => {
  return (
    <View style={{marginTop:10,marginLeft:10,marginRight:10}}>
        <Image style={{width:339,height:200}} source={require('../assets/images/hallmark_image.png')}/>
    </View>
  )
}

export default Hallmarkcomponent