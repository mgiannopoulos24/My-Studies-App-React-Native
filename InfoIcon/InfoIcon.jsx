import React, { useState } from 'react';
import {View,Text, StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import { Dialog, Portal, PaperProvider, IconButton} from 'react-native-paper';
import { ScrollView } from 'react-native-web';



const InfoIcon = () => {
  const [visible, setVisible] = useState(false);
 
  const showDialog = () => {
    setVisible(true);
  };


  const closeDialog = () => {
    setVisible(false);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TouchableOpacity onPress={showDialog} style={styles.button}>
          <Icon name="question-circle-o" size={30} color="white" />
        </TouchableOpacity>
        <Portal>
          <Dialog visible={visible} style={styles.dialog}>
            <View style={styles.titleContainer}>
              <Text style={styles.dialogTitleLeft}>Καλωσήρθατε</Text>
              <IconButton icon="close" mode="text" onPress={closeDialog} style={styles.closeButton} />
            </View>
            <Dialog.Content  style={styles.dialogContent}>
            <ScrollView style={styles.scrollContainer}>
              <Text style={styles.dialogText}>Η είσοδος στις υπηρεσίες Ηλεκτρονικής Γραμματείας γίνεται με χρήση του <Text style={styles.bold}>ιδρυματικού λογαριασμού </Text>σας. {"\n"}</Text>
              <Text style={styles.dialogText}>{"\n"}Οι δυνατότητες που προσφέρονται σε <Text style={styles.bold}>φοιτητές/τριες</Text> είναι: {"\n"}{"\n"}</Text>
              <FlatList
              data={[
                {key:"να δουν ή/και να εκτυπώσουν τη βαθμολογία τους"},
                {key:"να δηλώσουν τα μαθήματα που ενδιαφέρονται"},
                {key:"να δουν το ιστορικό των δηλώσεων τους"},
                {key:"να διεκπεραιώνουν ηλεκτρονικά αιτήσεις για έκδοση  πιστοποιητικών/περάτωση σπουδών/συμμετοχή σε ορκωμοσία"},
                ]}
                renderItem={({ item }) => {
                  return (
                    <ScrollView style={{ marginBottom: 10 }}>
                      <Text style={{ fontSize: 14 }}>{`\u2022 ${item.key}`}</Text>
                    </ScrollView>
                  );
                }}
              />
              <Text style={styles.dialogText}>{"\n"}Οι δυνατότητες που προσφέρονται σε <Text style={styles.bold}>διδάσκοντες/ουσες</Text> είναι: {"\n"}{"\n"}</Text>
              <FlatList
              data={[
                {key:"προβολή των μαθημάτων στα οποία μπορεί να υποβάλει βαθμολογίες"},
                {key:"δημιουργία νέου βαθμολογίου"},
                {key:"παρακολούθηση βαθμολογίου"},
                ]}
                renderItem={({ item }) => {
                  return (
                    <ScrollView style={{ marginBottom: 10 }}>
                      <Text style={{ fontSize: 14 }}>{`\u2022 ${item.key}`}</Text>
                    </ScrollView>
                  );
                }}
              />
              <Text style={styles.dialogText}>{"\n"}Οι δυνατότητες που προσφέρονται σε <Text style={styles.bold}>μέλη της Γραμματείας</Text> είναι: {"\n"}{"\n"}</Text>
              <FlatList
              data={[
                {key:"Περιοχή για μηνύματα/ειδοποιήσεις/υπενθυμίσεις, εισερχόμενες αιτήσεις"},
                {key:"Ορισμός προθεσμιών για δηλώσεις μαθημάτων"},
                {key:"Προβολή φοιτητών/τριών"},
                {key:"Συμπλήρωση εντύπων που αιτούνται οι φοιτητές/τριες"},
                ]}
                renderItem={({ item }) => {
                  return (
                    <ScrollView style={{ marginBottom: 10 }}>
                      <Text style={{ fontSize: 14 }}>{`\u2022 ${item.key}`}</Text>
                    </ScrollView>
                  );
                }}
              />
            </ScrollView>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1, 
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
    transform: [{ translateY: '-70%' }],
  },
  dialogContent: {
    height: 300,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dialogTitleLeft: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft:'7%'
  },
  bold: {
    fontWeight: 'bold',
  },
  dialogText: {
    color: 'black',
  },
  scrollContainer: {
    flexGrow: 1, 
  },
});

export default InfoIcon;
