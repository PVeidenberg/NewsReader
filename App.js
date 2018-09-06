import React, { Component } from "react";
import { StyleSheet, View, FlatList, Platform, Text } from "react-native";
import { Header, Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import FCM from "react-native-fcm";
import DeviceInfo from "react-native-device-info";

import { getNews } from "./src/components/News/News";
import Item from "./src/components/Item/Item";

const styles = StyleSheet.create({
  containerAndroid: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "flex-start"
  },
  containerIos: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 22
  },
  newsContainer: {
    backgroundColor: "#eee",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  listContainer: {
    width: "100%",
    marginBottom: 5
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 30
  }
});

export default class App extends Component {
  async componentDidMount() {
    const uniqueId = DeviceInfo.getUniqueID();
    await FCM.getFCMToken()
      .then(token => {
        this.addTokenHandler(token, uniqueId);
      })
      .catch();
    await this.fetchNews();

    console.log("Seadme id: " + uniqueId);
    console.log(this.state.token);
  }

  state = {
    data: [],
    selectedNews: null,
    refreshing: true,
    token: ""
  };

  render() {
    return (
      <View
        style={
          Platform.OS === "android"
            ? styles.containerAndroid
            : styles.containerIos
        }
      >
        <Header
          leftComponent={
            <Icon
              onPress={this.handleRefresh}
              name="refresh"
              type="FontAwesome"
              color="#bdf9dc"
            />
          }
          centerComponent={{
            text: "NEWS READER",
            style: { color: "#bdf9dc", fontWeight: "bold" }
          }}
          outerContainerStyles={{ height: "10%" }}
        />

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={item => item.title}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
  fetchNews = () => {
    getNews()
      .then(data => this.setState({ data, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  };

  sendToken = () => {
    let token = {};
    token = this.state.token;
    let url = "http://10.220.20.27:3000/posting";

    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(token), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => console.log("Success:", response));
  };
  handleRefresh = async () => {
    await this.sendToken();
    this.setState(
      {
        refreshing: true
      },
      this.fetchNews()
    );
  };

  onItemSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedNews: prevState.data.find(nw => {
          return nw.title === key;
        })
      };
    });
  };

  modalClosedHandler = () => {
    this.setState({
      selectedNews: null
    });
  };
  addTokenHandler = (tok, uniqueId) => {
    let obj = { token: tok, id: uniqueId };
    this.setState({
      token: obj
    });
  };
}
