import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Switch , Dimensions, TouchableOpacity } from 'react-native';
import { useDrawer } from './DrawerContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DrawerStud = () => {
  const { isDrawerOpen, toggleDrawer } = useDrawer();
  const screenWidth = Dimensions.get('window').width;
  const drawerWidth = screenWidth * 0.7; 

  const translateX = useRef(new Animated.Value(-drawerWidth)).current;
  const navigation = useNavigation();

  const { profile } = useAuthContext();

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

  useEffect(() => {
    if (isDrawerOpen) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [isDrawerOpen]);

  const handleNavigationToMainStud = () => {
    navigation.navigate('MainStud'); // Navigate to MainStud screen
    toggleDrawer(); // Close the drawer
  };

  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [showDropdown4, setShowDropdown4] = useState(false);
  
  const [isEnabled, setIsEnabled] = useState(false); // State for dark theme switch

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX }],
          width: drawerWidth,
        },
      ]}
    >
      <View style={styles.drawer}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleDrawer}>
          <Icon name="close" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerButton} onPress={handleNavigationToMainStud}>
          <View style={styles.buttonContainer}>
            <Icon name="home" size={20} color="#333" />
            <Text style={{fontSize:16, marginLeft: 10, fontWeight:"bold"}}>Αρχική Σελίδα</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerButton} onPress={() => setShowDropdown1(!showDropdown1)}>
          <View style={styles.buttonContainer}>
            <Text style={{fontSize:16, fontWeight:"bold"}}>Δηλώσεις</Text>
            <Icon name={showDropdown1 ? "caret-up" : "caret-down"} size={20} color="#333" />
          </View>
        </TouchableOpacity>
        {showDropdown1 && (
          <>
            <TouchableOpacity style={styles.dropdownOption} onPress={() => handleNavigation('Option1')}>
              <Text style={styles.optionText}>Δήλωση Μαθημάτων</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownOption} onPress={() => handleNavigation('Option2')}>
              <Text style={styles.optionText}>Προηγούμενες Δηλώσεις</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownOption} onPress={() => handleNavigation('Option3')}>
              <Text style={styles.optionText}>Συγγράματα</Text>
            </TouchableOpacity>
            <br></br>
          </>
        )}
        <TouchableOpacity style={styles.drawerButton} onPress={() => setShowDropdown2(!showDropdown2)}>
          <View style={styles.buttonContainer}>
            <Text style={{fontSize:16, fontWeight:"bold"}}>Βαθμολογία</Text>
            <Icon name={showDropdown2 ? "caret-up" : "caret-down"} size={20} color="#333" />
          </View>
        </TouchableOpacity>
        {showDropdown2 && (
          <>
            <TouchableOpacity style={styles.dropdownOption} onPress={() => handleNavigation('Option1')}>
              <Text style={styles.optionText}>Πρόσφατη Βαθμολογία</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownOption} onPress={() => handleNavigation('Option2')}>
              <Text style={styles.optionText}>Αναλυτική Βαθμολογία</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.drawerButton} onPress={() => setShowDropdown3(!showDropdown3)}>
          <View style={styles.buttonContainer}>
            <Text style={{fontSize:16, fontWeight:"bold"}}>Εξυπηρέτηση</Text>
            <Icon name={showDropdown1 ? "caret-up" : "caret-down"} size={20} color="#333" />
          </View>
        </TouchableOpacity>
        {showDropdown3 && (
          <>
            <TouchableOpacity style={styles.dropdownOption} onPress={() => handleNavigation('Option1')}>
              <Text style={styles.optionText}>Αιτήσεις</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.drawerButton} onPress={() => setShowDropdown4(!showDropdown4)}>
          <View style={styles.buttonContainer}>
            <Text style={{fontSize:16, fontWeight:"bold"}}>{profile?.displayName}</Text>
            <Icon name={showDropdown1 ? "caret-up" : "caret-down"} size={20} color="#333" />
          </View>
        </TouchableOpacity>
        {showDropdown4 && (
          <>
            <TouchableOpacity style={styles.dropdownOption} onPress={() => handleNavigation('Option1')}>
              <Text style={styles.optionText}>Το προφίλ μου</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownOption} onPress={() => handleNavigation('Option2')}>
              <Text style={styles.optionText}>Αποσύνδεση</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Horizontal Rule */}
        <View style={styles.hr} />

        {/* Dark Theme */}
        <View style={styles.darkThemeContainer}>
          <Icon name="eye" size={20} color="#333" style={styles.iconEye} />
          <Text style={styles.darkThemeText}>Σκούρο Θέμα</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
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
    backgroundColor: 'transparent',
    zIndex: 1, 
    borderWidth: 1,
    borderColor: '#ccc', 
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
    zIndex: 2, 
  },
  drawerButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  hr: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  darkThemeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-evenly"
  },
  iconEye: {
    marginRight: 10,
  },
  darkThemeText: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default DrawerStud;
