/**
 * Returns the URL of a weather icon from OpenWeatherMap.
 *
 * @param {string} iconName - The icon name (e.g., "10d", "04n").
 * @returns {string} The URL to the icon image.
 *
 * @example
 * const iconUri = weatherIconUriGet("10d");
 * // "https://openweathermap.org/img/w/10d.png"
 */
export const weatherIconUriGet = (iconName: string) =>
  `https://openweathermap.org/img/w/${iconName}.png`;
