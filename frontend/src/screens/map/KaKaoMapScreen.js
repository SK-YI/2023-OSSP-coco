import { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
// 카카오맵 expo에서 사용하기 어려움! 구글로 가자!
export default class App extends Component {
  render() {
    const run = `
      document.body.style.backgroundColor = 'blue';
      true;
    `;

    setTimeout(() => {
      this.webref.injectJavaScript(run);
    }, 3000);

    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={(r) => (this.webref = r)}
          source={{
            uri: 'https://github.com/react-native-webview/react-native-webview',
          }}
        />
      </View>
    );
  }
}
