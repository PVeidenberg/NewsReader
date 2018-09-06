import React from "react";
import {
  View,
  Linking,
  TouchableOpacity,
  Modal,
  Button,
  Platform
} from "react-native";
import { Text, Card, Divider } from "react-native-elements";
import moment from "moment";

export default class Item extends React.Component {
  state = {
    modalVisible: false
  };

  setModalVisible = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      url
    } = this.props.data;

    const { noteStyle, featuredTitleStyle } = styles;
    const time = moment(publishedAt || moment.now()).fromNow();
    const defImg =
      "https://png.pngtree.com/thumb_back/fh260/back_pic/03/62/30/9157aa94e693d90.jpg";

    return (
      <TouchableOpacity onPress={this.setModalVisible}>
        <Card
          featuredTitle={title}
          featuredTitleStyle={featuredTitleStyle}
          image={{ uri: urlToImage || defImg }}
        >
          <Divider style={styles.divSty} />
          <View style={styles.viewSty}>
            <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
            <Text style={noteStyle}>{time}</Text>
          </View>
        </Card>
        <Modal
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}
        >
          <View style={Platform.OS === "ios" ? styles.viewIos : null}>
            <Card
              featuredTitle={title}
              featuredTitleStyle={featuredTitleStyle}
              image={{ uri: urlToImage || defImg }}
            >
              <Text
                style={
                  Platform.OS === "android"
                    ? styles.textStyAndroid
                    : styles.textStyIos
                }
              >
                {description || "Read More.."}
              </Text>
              <Divider style={styles.divSty} />
              <View style={styles.viewSty}>
                <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
                <Text
                  style={{ color: "black" }}
                  onPress={() => Linking.openURL(url)}
                >
                  Read full Story
                </Text>
                <Text style={noteStyle}>{time}</Text>
              </View>
            </Card>
            <View style={styles.buttonVIw}>
              <Button
                style={
                  Platform.OS === "android"
                    ? styles.buttonStyAndroid
                    : styles.buttonStyIos
                }
                title="Back to NEWS"
                onPress={this.closeModal}
              />
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  }
}

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: "normal",
    color: "black",
    fontSize: 10
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    textShadowColor: "#00000f",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 3
  },
  divSty: {
    backgroundColor: "#eee"
  },
  viewSty: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textStyAndroid: {
    marginBottom: 10,
    color: "black"
  },
  textStyIos: {
    marginBottom: 10,
    color: "black"
  },
  buttonStyAndroid: {
    marginTop: 20,
    padding: 10,
    width: "50%"
  },
  buttonStyIos: {
    marginTop: 20,
    padding: 10,
    width: "50%"
  },

  buttonVIw: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40
  },
  viewIos: {
    marginTop: 22
  }
};
