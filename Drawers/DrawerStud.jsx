import React, { useRef } from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';
import { DrawerLayoutAndroid } from 'react-native';

const DrawerStud = () => {
    const drawer = useRef(null);

    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
            <Text style={styles.paragraph}>I'm in the Drawer!</Text>
            <Button
                title="Close drawer"
                onPress={() => drawer.current.closeDrawer()}
            />
        </View>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition="left" // Specify the drawer position directly
            renderNavigationView={navigationView}>
            {/* Main content */}
            <View style={styles.container}>
                <Text>Main content</Text>
                <Button
                    title="Open drawer"
                    onPress={() => drawer.current.openDrawer()}
                />
            </View>
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DrawerStud;
