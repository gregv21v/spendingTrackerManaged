import React, { Component } from 'react';
import { Button, SafeAreaView,
  Image, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

class UploadTest extends Component {


  constructor(props) {
    super(props);
    this.state = {
      image: {}
    }

    this.pickImage = this.pickImage.bind(this)
  }



  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    // upload to server
    let uriParts = result.uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('image', {
      uri: result.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    console.log(JSON.stringify(formData));

    // Tests I've tried:
    /*
      1. remove the s from headers
      2. remove the headers all together, which gets rid of the boundry error
        but makes the file on the server side undefined.
      3. I removed the accept application/json line to no avail
      4. I have used the axios library instead of the fetch call.


    */


    let options = {
      method: 'POST',
      body: formData,
      header: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
    };

    if (!result.cancelled) {
      this.setState({
        image: result.uri
      });
    }

    fetch("http://localhost:8080/upload_receipt_img", options)
      .then(result => console.log(result))

  };

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Pick an image from camera roll" onPress={this.pickImage} />
          {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
  }
}

export default UploadTest
