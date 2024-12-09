// Coordinate Type
export type Coordinates = {
  lon: number;
  lat: number;
};

// System Information Type
export type SysInfo = {
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
};

// Weather Condition Type
export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

// Main Weather Data Type
export type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
};

// Wind Information Type
export type WindInfo = {
  speed: number;
  deg: number;
  gust?: number;
};

// Cloud Information Type
export type CloudsInfo = {
  all: number;
};

// City Weather Type (Combining All the Above Types)
export type CityWeather = {
  coord: Coordinates;
  sys: SysInfo;
  weather: WeatherCondition[];
  main: MainWeatherData;
  visibility: number;
  wind: WindInfo;
  clouds: CloudsInfo;
  dt: number;
  id: number;
  name: string;
};

// Group Weather Response Type
export type GroupWeatherResponse = {
  cnt: number;
  list: CityWeather[];
};
