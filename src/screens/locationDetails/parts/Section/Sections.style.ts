import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    flex: 1,
  },
  content: {
    fontSize: 18,
    fontWeight: '400',
    alignSelf: 'center',
    color: 'rgba(151,151,151,0.76)',
  },
});
