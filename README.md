# RNN2CodePush
A tutorial for setup [react-native-navigation](https://github.com/wix/react-native-navigation) include  Microsoft App Center [CodePush](https://github.com/Microsoft/react-native-code-push).

## Installation
### react-native-navigation
```
$ yarn add react-native-navigation
```

### Microsoft App Center CodePush
Register a Microsoft App Center account and create both android an ios app. You can get the development key.
1. Install react-native-code-push
```
$ yarn add react-native-code-push
```
2. Update CocoaPods spec information for iOS project
```
$ pod repo update
```
3. Add app center’s the SDK to the project
```
$ yarn add appcenter appcenter-analytics appcenter-crashes --exact

$ react-native link
```

## Getting Started
### iOS
The default integration of the Microsoft App Center SDK uses CocoaPods for iOS. If you use the solution, you need to open `RNN2CodePush.xcworkspace` for start project.

**AppDelegate.m**
```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNative register];

#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [CodePush bundleURL];
#endif

  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  return YES;
}
```

### Android

Open Android Studio and open `RNN2CodePush/android/`. Make sure your Android Studio installation is updated.

**MainApplication.java**

```java
public class MainApplication extends NavigationApplication {
    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @javax.annotation.Nullable
            @Override
            protected String getJSBundleFile() {
                return CodePush.getJSBundleFile();
            }

            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
                new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
                new AppCenterReactNativePackage(MainApplication.this),
                new CodePush(BuildConfig.CODE_PUSH_KEY, getApplicationContext(), BuildConfig.DEBUG)
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
```

**MainActivity.java**

```java
public class MainActivity extends NavigationActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}
```
