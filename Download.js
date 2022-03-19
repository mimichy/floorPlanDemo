import React from 'react';

// Import React native Components
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';

const Download = () => {
  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFileOnSuccess();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFileOnSuccess();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  downloadFileOnSuccess = async () => {
    let dirs =
      Platform.OS == 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DCIMDir;
    console.log(dirs, 'document path');
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.

      fileCache: true,
      path: dirs + `/sample.csv`,
    })
      .fetch(
        'GET',
        // 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        'https://support.staffbase.com/hc/en-us/article_attachments/360009159392/access-code.csv',
        {
          //some headers ..
        },
      )
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(res.data);
          alert('Download Successfully');
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 25, textAlign: 'center'}}>
          React Native File Download Example
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={checkPermission}>
        <Text style={styles.text}>Download File</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Download;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: 'blue',
    margin: 10,
  },
});
