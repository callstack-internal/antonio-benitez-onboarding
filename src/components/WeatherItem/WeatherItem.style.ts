import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    flex: 1,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  cityContainer: {
    flex: 1,
  },
  cityTitle: {
    fontSize: 20,
    fontWeight: '400',
  },
  cityWeather: {
    fontWeight: '600',
    color: '#505050',
  },
  icon: {
    width: 45,
    height: 45,
    marginHorizontal: 15,
  },
  temperatureContainer: {
    alignSelf: 'center',
    backgroundColor: '#75c5cd',
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 15,
  },
  temperatureText: {
    fontWeight: 'normal',
    color: 'white',
    fontSize: 19,
  },
});
