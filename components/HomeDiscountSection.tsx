import React from 'react';
import {FlatList} from 'react-native';
import {Image, TouchableOpacity} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';

const discountData = [
  {
    id: 1,
    disText: `Get ₹500 off on your first gold purchase!`,
    disImage: require('../assets/images/disImage2.jpg'),
  },
  {
    id: 2,
    disText: 'Refer a friend & get ₹300 in your gold wallet!',
    disImage: require('../assets/images/disImage3.jpg'),
  },
  {
    id: 3,
    disText: 'Extra 1% off every Saturday & Sunday!',
    disImage: require('../assets/images/disimage4.png'),
  },
];

const HomeDiscountSection = () => {
  const handleRender = ({item}: {item: (typeof discountData)[0]}) => {
    return (
      <View style={styles.card}>
        <Image source={item.disImage} style={styles.backgroundImg} />
        <View style={styles.overlay}>
          <Text style={styles.disText}>{item.disText}</Text>
          <TouchableOpacity style={styles.disBtn}>
            <Text style={styles.btnText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={discountData}
        renderItem={handleRender}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom:10
  },
  card: {
    width: 270,
    height: 170,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.3)',
    gap:10
  },
  disText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },  
  disBtn: {
    backgroundColor: '#007E33', //#d17f3f
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeDiscountSection;
