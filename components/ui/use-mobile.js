import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const { width } = Dimensions.get('window');
      setIsMobile(width < 768);
    };

    checkMobile();

    const subscription = Dimensions.addEventListener('change', checkMobile);

    return () => {
      subscription?.remove();
    };
  }, []);

  return isMobile;
}
