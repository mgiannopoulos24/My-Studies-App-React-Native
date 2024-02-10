import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, TouchableOpacity } from 'react-native';
import { useDrawer } from './DrawerContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DrawerStud = () => {
  const { isDrawerOpen, toggleDrawer } = useDrawer();
  const screenWidth = Dimensions.get('window').width;
  const drawerWidth = screenWidth * 0.5; // Half of the screen width

  const translateX = useRef(new Animated.Value(-drawerWidth)).current;
  const navigation = useNavigation();

  const openDrawer = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(translateX, {
      toValue: -drawerWidth,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Open or close drawer based on isDrawerOpen state
  useEffect(() => {
    if (isDrawerOpen) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [isDrawerOpen]);

  const toggleDrawerOnOverlayPress = () => {
    if (isDrawerOpen) {
      toggleDrawer(); // Toggle drawer state
      closeDrawer(); // Close the drawer
    }
  };

  const handleNavigationToMainStud = () => {
    navigation.navigate('MainStud'); // Navigate to MainStud screen
    toggleDrawer(); // Close the drawer
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dx } = gestureState;
        translateX.setValue(dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        if (dx < -drawerWidth / 2) {
          toggleDrawer();
        } else {
          openDrawer();
        }
      },
    })
  ).current;

  // Close drawer when navigating away from MainStud
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (isDrawerOpen) {
        toggleDrawer();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX }],
          width: drawerWidth,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity style={styles.overlay} onPress={toggleDrawerOnOverlayPress} />
      <View style={styles.drawer}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleDrawer}>
          <Icon name="close" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerButton} onPress={handleNavigationToMainStud}>
          <Text>Screen 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerButton} onPress={() => handleNavigation('Screen2')}>
          <Text>Screen 2</Text>
        </TouchableOpacity>
        {/* Add more buttons for other screens */}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent', // Remove gray area
    zIndex: 1, 
    borderWidth: 1, // Add border
    borderColor: '#ccc', // Border color
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2, // Ensure the close button stays above other content
  },
  drawerButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});

export default DrawerStud;
