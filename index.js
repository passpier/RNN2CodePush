import {Navigation} from "react-native-navigation";
import CodePush from "react-native-code-push";
import App from "./App";

const codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_START};
Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => CodePush(codePushOptions)(App));

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "navigation.playground.WelcomeScreen",
              options: {
                topBar: {
                  title: {
                    text: "Welcome",
                  },
                },
              },
            },
          },
        ],
      },
    },
  }).then();
});
