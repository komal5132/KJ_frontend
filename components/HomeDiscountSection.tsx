import React, { useState } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

interface DiscountItem {
  id: number;
  disText: string;
  disDesc: string;
  disImage: any;
}

const discountData = [
  {
    id: 1,
    disText: `Get ₹500 off on your first gold purchase!`,
    disDesc: 'Make your first purchase memorable with an instant ₹500 discount on gold items.',
    disImage: require('../assets/images/disImage2.jpg'),
  },
  {
    id: 2,
    disText: 'Refer a friend & get ₹300 in your gold wallet!',
    disDesc: 'Invite your friends to join and earn ₹300 for every successful referral.',
    disImage: require('../assets/images/disImage3.jpg'),
  },
  {
    id: 3,
    disText: 'Extra 1% off every Saturday & Sunday!',
    disDesc: 'Enjoy an exclusive weekend discount of 1% on all gold purchases.',
    disImage: require('../assets/images/disimage4.png'),
  },
];

const { width, height } = Dimensions.get('window');

const HomeDiscountSection = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountItem | null>(null);

  const openModal = (item:any) => {
    setSelectedDiscount(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDiscount(null);
  };

  const handleRender = ({ item }:{item:DiscountItem}) => (
    <View style={styles.card}>
      <Image source={item.disImage} style={styles.backgroundImg} />
      <View style={styles.overlay}>
        <Text style={styles.disText}>{item.disText}</Text>
        <TouchableOpacity style={styles.disBtn} onPress={() => openModal(item)}>
          <Text style={styles.btnText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={discountData}
        renderItem={handleRender}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/* Focused Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <ImageBackground
            source={selectedDiscount?.disImage}
            style={styles.modalCardBackground}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.glassCard}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🎁 Special Offer</Text>
              </View>
              <Text style={styles.modalDesc}>{selectedDiscount?.disDesc}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
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
    gap: 10,
  },
  disText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  disBtn: {
    backgroundColor: '#007E33',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCardBackground: {
     width: '90%', // previously '80%'
  borderRadius: 20,
  overflow: 'hidden',
  },
  glassCard: {
     backgroundColor: 'rgba(0,0,0,0.6)', // slightly darker for better contrast
  padding: 30, // increased padding
  borderRadius: 20,
  alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  modalDesc: {
     fontSize: 18, // previously 16
  color: 'white',
  textAlign: 'center',
  marginBottom: 20,
  fontWeight: 'bold', // added
  },
  closeText: {
    color: '#ccc',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default HomeDiscountSection;
