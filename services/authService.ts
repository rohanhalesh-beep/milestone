import {
  GoogleSignin,
  isErrorWithCode,
  isNoSavedCredentialFoundResponse,
  isSuccessResponse,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: "720811528112-v8nafo4ccbb8psgc9hdlj44ej1pdkfqu.apps.googleusercontent.com",
  offlineAccess: true,
  scopes: ['profile', 'email'],
});

export const checkCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await GoogleSignin.signInSilently();
    if (isNoSavedCredentialFoundResponse(response)) {
      console.log('No saved credentials found');
      return null;
    } else if (isSuccessResponse(response)) {
      console.log('Current user:', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    console.log('Silent sign in failed:', error);
    return null;
  }
};

export const signIn = async (): Promise<{ success: boolean; user: User | null; message?: string }> => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    
    if (isSuccessResponse(response)) {
      console.log('User signed in successfully:', response.data);
      Alert.alert('Welcome!', 'You have signed in successfully!');
      return { success: true, user: response.data };
    } else {
      console.log('Sign in was cancelled by user');
      Alert.alert('Cancelled', 'Sign in was cancelled');
      return { success: false, user: null, message: 'Sign in was cancelled' };
    }
  } catch (error) {
    console.error('Sign in error:', error);
    
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          Alert.alert('Please Wait', 'Sign in operation already in progress');
          return { success: false, user: null, message: 'Sign in operation already in progress' };
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Alert.alert('Update Required', 'Google Play Services not available or outdated');
          return { success: false, user: null, message: 'Google Play Services not available or outdated' };
        default:
          Alert.alert('Sign In Failed', `${error.message}`);
          return { success: false, user: null, message: error.message };
      }
    } else {
      Alert.alert('Error', 'An unexpected error occurred during sign in');
      return { success: false, user: null, message: 'An unexpected error occurred' };
    }
  }
};

export const signOut = async (): Promise<boolean> => {
  try {
    await GoogleSignin.signOut();
    console.log('User signed out successfully');
    Alert.alert('Goodbye!', 'You have been signed out successfully');
    return true;
  } catch (error) {
    console.error('Sign out error:', error);
    Alert.alert('Error', 'Failed to sign out');
    return false;
  }
};

export const revokeAccess = async (): Promise<boolean> => {
  try {
    await GoogleSignin.revokeAccess();
    console.log('Access revoked successfully');
    Alert.alert('Access Revoked', 'Your account access has been revoked');
    return true;
  } catch (error) {
    console.error('Revoke access error:', error);
    Alert.alert('Error', 'Failed to revoke access');
    return false;
  }
};

export const showRevokeConfirmation = (onConfirm: () => void): void => {
  Alert.alert(
    'Revoke Access',
    'This will completely remove your account access. Are you sure?',
    [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Revoke', 
        style: 'destructive',
        onPress: onConfirm
      }
    ]
  );
};
