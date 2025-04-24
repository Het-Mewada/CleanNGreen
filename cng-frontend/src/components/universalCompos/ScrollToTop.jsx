// components/universalCompos/ScrollToTop.js
import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';


const ScrollToTop = () => {
    const location = useLocation();

    useLayoutEffect(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
    }, [location.pathname]);
  
  return null;
};

export default ScrollToTop;