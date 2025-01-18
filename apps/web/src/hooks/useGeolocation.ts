import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
    };

    const fail = (err: GeolocationPositionError) => {
      switch (err.code) {
        case 1:
          setError("Permission denied.");
          break;
        case 2:
          setError("Position unavailable.");
          break;
        case 3:
          setError("Timeout.");
          break;
        default:
          setError("An unknown error occurred.");
      }
    };

    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  return { location, error };
};
