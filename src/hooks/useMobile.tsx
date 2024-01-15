import { useState, useEffect } from "react";

interface MobileHookResult {
  isMobile: boolean;
}

const MOBILE_WIDTH_THRESHOLD = 600;

const useMobile = (): MobileHookResult => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setIsMobile(currentWidth <= MOBILE_WIDTH_THRESHOLD);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

    handleResize();
  }, []);

  return { isMobile };
};

export default useMobile;
