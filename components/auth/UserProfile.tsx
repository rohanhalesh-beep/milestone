import { User } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InfoCard from './InfoCard';

interface UserProfileProps {
  userInfo: User;
  onSignOut: () => Promise<void>;
  onRevokeAccess: () => void;
  fadeAnim: Animated.Value;
}

const UserProfile = ({ userInfo, onSignOut, onRevokeAccess, fadeAnim }: UserProfileProps) => {
  return (
    <Animated.View style={[styles.profileContainer, { opacity: fadeAnim }]}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          {userInfo?.user?.photo ? (
            <Image 
              source={{ uri: userInfo.user.photo }} 
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {userInfo?.user?.name?.charAt(0) || 'U'}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {userInfo?.user?.name || 'User'}
          </Text>
          <Text style={styles.profileEmail}>
            {userInfo?.user?.email || 'No email'}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.detailsContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailsContent}
      >
        <Text style={styles.sectionTitle}>Account Details</Text>
        
        <InfoCard label="Full Name" value={userInfo?.user?.name || 'N/A'} />
        <InfoCard label="Email Address" value={userInfo?.user?.email || 'N/A'} />
        <InfoCard label="User ID" value={userInfo?.user?.id || 'N/A'} />
        <InfoCard label="Given Name" value={userInfo?.user?.givenName || 'N/A'} />
        <InfoCard label="Family Name" value={userInfo?.user?.familyName || 'N/A'} />
        
        {userInfo?.user?.photo && (
          <InfoCard label="Photo URL" value={userInfo.user.photo} />
        )}
        
        {userInfo?.idToken && (
          <InfoCard 
            label="ID Token" 
            value={`${userInfo.idToken.substring(0, 50)}...`} 
          />
        )}
        
        {userInfo?.serverAuthCode && (
          <InfoCard label="Server Auth Code" value={userInfo.serverAuthCode} />
        )}
      </ScrollView>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.signOutButton]} 
          onPress={onSignOut}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.revokeButton]} 
          onPress={onRevokeAccess}
        >
          <Text style={styles.buttonText}>Revoke Access</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#4285f4',
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  detailsContent: {
    paddingTop: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#4285f4',
  },
  revokeButton: {
    backgroundColor: '#ea4335',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserProfile;
