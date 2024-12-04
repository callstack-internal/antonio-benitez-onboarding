import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 4,
  },
  cityTitle: {
    fontSize: 20,
    fontWeight: '400',
  },
  cityWeather: {
    fontWeight: '600',
    color: '#505050',
  },
  icon: {width: 45, height: 45, marginHorizontal: 15},
  temperatureContainer: {
    backgroundColor: '#75c5cd',
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  temperatureText: {
    fontWeight: 'normal',
    color: 'white',
    fontSize: 19,
  },
  arrow: {
    flex: 1,
    fontSize: 24,
  },
});
