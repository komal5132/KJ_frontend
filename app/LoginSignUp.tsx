import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';
import LoginSignupscreen from '@/components/LoginSignupscreen';

const LoginSignUp = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20} // Adjust if header exists
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LoginSignupscreen />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginSignUp;
