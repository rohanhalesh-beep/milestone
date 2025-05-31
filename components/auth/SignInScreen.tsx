import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import { ActivityIndicator, Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface SignInScreenProps {
  onSignIn: () => Promise<void>;
  isSigningIn: boolean;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

const SignInScreen = ({ onSignIn, isSigningIn, fadeAnim, slideAnim }: SignInScreenProps) => {
  return (
    <Animated.View 
      style={[
        styles.signInContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>G</Text>
        </View>
      </View>
      
      <Text style={styles.welcomeTitle}>Welcome Back</Text>
      <Text style={styles.welcomeSubtitle}>
        Sign in with your Google account to continue
      </Text>
      
      <View style={styles.signInButtonContainer}>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={onSignIn}
          disabled={isSigningIn}
        />
        
        {isSigningIn && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#4285f4" />
            <Text style={styles.loadingText}>Signing you in...</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4285f4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  signInButtonContainer: {
    alignItems: 'center',
  },
  googleButton: {
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4285f4',
    fontWeight: '500',
  },
});

export default SignInScreen;
