import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  backgroundStyleLight: {
    backgroundColor: Colors.lighter,
  },
  backgroundStyleDark: {
    backgroundColor: Colors.darker,
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  noDataText: {textAlign: 'center'},
});
