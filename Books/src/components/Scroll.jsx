import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';

const Scroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);

 
  const handleScroll = throttle(() => {
  
    const scrollY = window.scrollY; 
    if (scrollY > 100) {
      setIsScrolled(true); 
    } else {
      setIsScrolled(false); 
    }
  }, 200); 


  useEffect(() => {
    
    window.addEventListener('scroll', handleScroll);

    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <h1>Scroll Detection with Throttling</h1>
      <p>{isScrolled ? 'You have scrolled down!' : 'Scroll more to trigger event.'}</p>
      <div style={{ height: '1500px' }}>
       
        <p>Scroll the page down!</p>
      </div>
    </div>
  );
};

export default Scroll;
