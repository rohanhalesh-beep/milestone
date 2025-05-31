import { User } from '@react-native-google-signin/google-signin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Animated, StatusBar, StyleSheet, View } from 'react-native';
import { SignInScreen, UserProfile } from '../components/auth';
import { RootStackParamList } from '../App';
import * as authService from '../services/authService';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    checkCurrentUser();
    
    // Animate entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const checkCurrentUser = async () => {
    const user = await authService.checkCurrentUser();
    if (user) {
      setUserInfo(user);
    }
  };

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      const result = await authService.signIn();
      if (result.success && result.user) {
        setUserInfo(result.user);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    const success = await authService.signOut();
    if (success) {
      setUserInfo(null);
    }
  };

  const handleRevokeAccess = () => {
    authService.showRevokeConfirmation(async () => {
      const success = await authService.revokeAccess();
      if (success) {
        setUserInfo(null);
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {!userInfo ? (
        <SignInScreen 
          onSignIn={handleSignIn} 
          isSigningIn={isSigningIn} 
          fadeAnim={fadeAnim} 
          slideAnim={slideAnim} 
        />
      ) : (
        <UserProfile 
          userInfo={userInfo} 
          onSignOut={handleSignOut} 
          onRevokeAccess={handleRevokeAccess} 
          fadeAnim={fadeAnim} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});