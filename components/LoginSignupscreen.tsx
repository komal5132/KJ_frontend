import { Picker } from '@react-native-picker/picker';
import React, {useState} from 'react';
import {Alert, Image} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';

const {height} = Dimensions.get('window');

type user = {
  id: number;
  name: string;
  gender: string;
  mobile: string;
};

const LoginSignupscreen = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [userData, setUserData] = useState<user[]>([]);


  const handleContinue = () => {

    const router = useRouter()

    if (!name.trim() || !gender.trim() || mobile.trim().length !== 10) {
    Alert.alert('Please fill in all fields correctly before continuing.');
    return;
  }

    // Create a new user object with a unique id
    const newUser: user = {
      id: Date.now(), // Unique id using timestamp
      name: name.trim().toUpperCase(),
      gender: gender.trim().toUpperCase(),
      mobile: mobile.trim(),
    };

    // Add the new user to the existing list
    setUserData(prevData => [...prevData, newUser]);

    console.log('new user', newUser);
    // Optionally log the full list
    console.log('Updated User List:', [...userData, newUser]);

    // Reset form fields
    setName('');
    setGender('');
    setMobile('');

    router.push({
      pathname:"/(Tab)",
      params:{username:newUser.name}
    })
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Section with Background Image */}
      <ImageBackground
        source={require('../assets/images/loginBG.png')}
        style={styles.topSection}
        resizeMode="cover">
        <Image
          style={{width: 60, height: 60, top: -135, right: 150}}
          source={require('../assets/images/kartikjlogo.png')}
        />
        <Text style={styles.welcomeText}>Welcome to your jewellery world</Text>
      </ImageBackground>

      {/* Form Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.formTitle}> Let's Get to Know You</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerWrapper}>
            <Picker 
            selectedValue={gender}
            onValueChange={(itemValue)=>setGender(itemValue)}
            style={styles.picker}
            dropdownIconColor='#4b2e2e'
            >
              <Picker.Item label='Select Gender' value="" enabled={false}/>
              <Picker.Item label='Male' value="Male"/>
              <Picker.Item label='Female' value="Female"/>
              <Picker.Item label='Other' value="Other"/>
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your number"
            placeholderTextColor="#ccc"
            keyboardType="number-pad" // Better than 'phone-pad' for strict digits
            value={mobile}
            onChangeText={(text: string) => {
              // Remove everything except digits
              const onlyNums = text.replace(/[^0-9]/g, '');

              // Limit to 10 digits max
              if (onlyNums.length <= 10) {
                setMobile(onlyNums);
              }
            }}
            maxLength={10} // Also prevents extra input
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>✨ Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginSignupscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3d4b6',
  },
  topSection: {
    height: height * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginTop: 0,
    textAlign: 'center',
    paddingHorizontal: 30,
    top: -50,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#fff8f2',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    paddingHorizontal: 30,
    paddingVertical: 40,
    marginTop: -60,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: -5},
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4b2e2e',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4b2e2e',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f1eb',
    paddingHorizontal: 15,
    color: '#4b2e2e',
    fontSize: 15,
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4b2e2e',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff8f2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerWrapper: {
  height: 48,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#ddd',
  backgroundColor: '#f9f1eb',
  justifyContent: 'center',
  marginBottom: 15,
  paddingHorizontal: 10,
},

picker: {
  color: '#4b2e2e',
  fontSize: 15,
},

});
