import {useState, useEffect} from 'react';
import {DeviceLocationModule, Location} from 'device-location-package';

const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocation = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const loc = await DeviceLocationModule.requestDeviceLocation();
      setLocation(loc);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return {location, error, isLoading, fetchLocation};
};

export {useLocation};