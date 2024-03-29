import {Component} from 'react';
import {StyleProp, ViewStyle, TouchableHighlight} from 'react-native';

type MyTouchableProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export class MyTouchable extends Component<MyTouchableProps> {
  render() {
    const {children, onPress, style} = this.props;
    return (
      <TouchableHighlight
        underlayColor="rgba(200,200,200,0.3)"
        onPress={onPress}
        style={{
          borderRadius: 10,
        }}>
        {children}
      </TouchableHighlight>
    );
  }
}
