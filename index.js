/**
 * @format
 */
import 'react-native-gesture-handler';

import { AppRegistry, YellowBox } from 'react-native';
import App from './App/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
YellowBox.ignoreWarnings(["Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`"]);
YellowBox.ignoreWarnings(["Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method."]);