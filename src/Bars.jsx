import React from 'react';
import './Bars.css';
import {useState, useEffect, useRef} from 'react';



function Bars({ sortArray, highlightBar }) {
  
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [innerBars, setInnerBars] = useState('');

    const elementRef = useRef(null);
  
    useEffect(() => {
      setWidth(elementRef.current.clientWidth);
      setHeight(elementRef.current.clientHeight);
    }, []); 

    const createBars = () => {
        const barsContainer = document.getElementById('bars-container');
        const numBars = Math.max(...sortArray);
        const largestVal = numBars-1;
        
        // adds all bars to the inside based on their heights
        const bars = sortArray.map((number, idx) => {
          
          const actualHeight = Math.round(height*number/numBars);

          // check if this bar should be highlighted
          if (highlightBar.indexOf(idx) !== -1) {
            return <li className='arrayBar highlighted' key={idx} style={{height: actualHeight+'px'}}></li>;  
          }

          return <li className='arrayBar' key={idx} style={{height: actualHeight+'px'}}></li>;
          
          
          // barsContainer.innerHTML += newDiv;
          // const newDiv = (
          //   <div className='arrayBar' id={idx}></div>
          // );
          // newDiv.style.width = smallBarWidth;
          // newDiv.style.height = Math.round(height*number/largestVal) + 'px';
          // setInnerBars(prev => prev+newDiv);
          // console.log(newDiv.style.height);
        });
        return bars;
        
    }

  return (
    <ul id='bars-container' ref={elementRef}>
        {
          createBars()
        }
    </ul>
  )
}

export default Bars