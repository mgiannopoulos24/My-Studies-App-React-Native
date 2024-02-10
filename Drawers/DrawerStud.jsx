import React, { useState } from 'react';
import { Button, Text, StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import Drawer from 'react-native-drawer';

const DrawerStud = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = () => {
        setIsOpen(true);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    return (
        <Drawer
            open={isOpen}
            onClose={closeDrawer}
            side="left"
            tapToClose={true}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            type='overlay'
            content={
                <View style={styles.drawer}>
                    <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
                        <Text style={styles.buttonText}>Close Drawer</Text>
                    </TouchableOpacity>
                    <Text>This is the Drawer content</Text>
                </View>
            }
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={openDrawer} style={styles.openButton}>
                    <Text style={styles.buttonText}>Open Drawer</Text>
                </TouchableOpacity>
            </View>
        </Drawer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    openButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    drawer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    closeButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
});

export default DrawerStud;
