/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, {Component} from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import CodePush, {DownloadProgress} from "react-native-code-push";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android: "Double tap R on your keyboard to reload,\n" + "Shake or press menu button for dev menu",
});

interface Props {}

export default class App extends Component<Props> {
  public componentDidMount() {
    CodePush.sync(
      {},
      (syncStatus) => this.codePushStatusDidChange(syncStatus),
      (progress) => this.codePushDownloadDidProgress(progress),
    ).then();
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.tsx</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }

  private codePushStatusDidChange(syncStatus: CodePush.SyncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for update.");
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Downloading package.");
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        console.log("Awaiting user action.");
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update.");
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log("App up to date.");
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        console.log("Update cancelled by user.");
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed and will be applied on restart.");
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }

  private codePushDownloadDidProgress(progress: DownloadProgress) {
    console.log("progress: ", progress.receivedBytes / progress.totalBytes);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
