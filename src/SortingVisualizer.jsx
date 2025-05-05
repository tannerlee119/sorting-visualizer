import React from 'react'
import { useState } from 'react';
import Bars from './Bars';
import Settings from './Settings';


// import sorting algorithms




function SortingVisualizer() {


    const [sortArray, setSortArray] = useState([1,2,3,4,5]);
    const [highlightBar, setHighlightBar] = useState([-1,-1]);



  return (

    <div>
        <Settings
          highlightBar={highlightBar}
          setHighlightBar={setHighlightBar}
          sortArray={sortArray}
          setSortArray={setSortArray}></Settings>
        <Bars highlightBar={highlightBar} sortArray={sortArray}></Bars>
        {/* <label>{sortArray}</label> */}
    </div>
  )
}

export default SortingVisualizer