import React from 'react';
import './Settings.css';
import { useEffect } from 'react';

function Settings({ sortArray, setSortArray, highlightBar, setHighlightBar}) {

    let sleepTime = 20;

    useEffect(() => {
        generateNewArray(25);
    },[]);



    const generateNewArray = (size) => {
        const newArray = Array(size).fill(0).map((x, index) => {
            return index+2;
        });
        setSortArray(shuffle(newArray));
    }

    const handleSliderChange = () => {
        const slider = document.getElementById("myRange");
        generateNewArray(Number(slider.value));
        
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }







    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function makeSettingsUnuseable() {
        // grabs the elements
        const slider = document.getElementById("myRange");
        const shuffleBtn = document.getElementById('shuffle-btn');
        const visualizeBtn = document.getElementById('visualize-btn');

        //disables the elements
        slider.disabled = true;
        shuffleBtn.disabled = true;
        visualizeBtn.disabled = true;

        // show the user that the buttons can't be clicked
        shuffleBtn.setAttribute('opacity','0');
    }

    function makeSettingsUsable() {
        //grabs the elements
        const slider = document.getElementById("myRange");
        const shuffleBtn = document.getElementById('shuffle-btn');
        const visualizeBtn = document.getElementById('visualize-btn');

        //disables the elements
        slider.disabled = false;
        shuffleBtn.disabled = false;
        visualizeBtn.disabled = false;

        // return to normal
    }

    async function handleSortSelection() {
        const yourSelect = document.getElementById('select-dropdown');
        const sortSelection = yourSelect.options[yourSelect.selectedIndex].value;

        const slider = document.getElementById("myRange");
        let sleepTime;

        makeSettingsUnuseable();

        switch (sortSelection) {
            case 'bubbleSort':
                sleepTime = 10/Math.pow(Number(slider.value),2);
                await bubbleSort(sortArray,sleepTime);
                break;
            case 'insertionSort':
                sleepTime = 100/Math.pow(Number(slider.value),4);
                await insertionSort(sortArray,sleepTime);
                break;
            case 'selectionSort':
                sleepTime = 1000/Math.pow(Number(slider.value),1);
                await selectionSort(sortArray,sleepTime);
                break;
            case 'quickSort':
                sleepTime = 1/Math.pow(Number(slider.value),2);
                await quickSort(sortArray, 0, sortArray.length - 1,sleepTime);
                break;
            case 'mergeSort':
                sleepTime = 400/Math.pow(Number(slider.value),1);
                await mergeSort(sortArray,sortArray,0,sortArray.length-1,sleepTime);
                break;
            case 'heapSort':
                sleepTime = 5000/Math.pow(Number(slider.value),2);
                await heapSort(sortArray,sleepTime);
                break;
            case 'countingSort':
                sleepTime = 1000/Math.pow(Number(slider.value),1);
                await countingSort(sortArray,sleepTime);
                break;
            case 'radixSort':
                sleepTime = 500/Math.pow(Number(slider.value),1);
                await radixSort(sortArray,sleepTime);
                break;
            case 'bucketSort':
                sleepTime = 10000/Math.pow(Number(slider.value),2);
                await bucketSort(sortArray,sleepTime);
                break;
            case 'shellSort':
                sleepTime = 1000/Math.pow(Number(slider.value),1);
                await shellSort(sortArray,sleepTime);
                break;
            case 'cocktailSort':
                sleepTime = 50000/Math.pow(Number(slider.value),3);
                await cocktailSort(sortArray,sleepTime);
                break;
            case 'combSort':
                sleepTime = 2000/Math.pow(Number(slider.value),1);
                await combSort(sortArray,sleepTime);
                break;
            case 'gnomeSort':
                sleepTime = 5000/Math.pow(Number(slider.value),2);
                await gnomeSort(sortArray,sleepTime);
                break;
            case 'cycleSort':
                sleepTime = 1000/Math.pow(Number(slider.value),1);
                await cycleSort(sortArray,sleepTime);
                break;
            case 'pancakeSort':
                sleepTime = 5000000/Math.pow(Number(slider.value),5);
                await pancakeSort(sortArray,sleepTime);
                break;
            default:
                break;
        }
        setHighlightBar([-1,-1]);
        makeSettingsUsable();
    }



    // quicksort
    async function quickSort(array, start, end, sleepTime) {
        if (start >= end) {
            return;
        }
        let index = await partition(array, start, end,sleepTime);
        await quickSort(array, start, index - 1,sleepTime);
        await quickSort(array, index + 1, end,sleepTime);
    }
    // partition function
    async function partition(array, start, end,sleepTime) {
        let pivotIndex = start;
        let pivotValue = array[end];

        for (let i = start; i < end; i++) {
            if (array[i] < pivotValue) {
                await sleep(20000*sleepTime);
                [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
                setHighlightBar([i,pivotIndex]);
                setSortArray([...array]);
                pivotIndex++;
            }
        }
        await sleep(sleepTime);
        [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
        setSortArray([...array]);
        return pivotIndex;
    }

    // mergesort
    async function mergeSort(array,currArray,start, end,sleepTime) {
        if (currArray.length <= 1) {
            return currArray;
        }
        const middle = Math.floor(currArray.length / 2);
        const left = currArray.slice(0, middle);
        const right = currArray.slice(middle);
        await sleep(sleepTime);
        return await merge(
            array,
            start,
            await mergeSort(array,left, start, middle-1,sleepTime),
            await mergeSort(array,right,middle,end,sleepTime),
            sleepTime
        );
    }
    async function merge(array, start, arr1, arr2,sleepTime) {
        let p1 = 0;
        let p2 = 0;
        let curr = start;

        while (p1 < arr1.length && p2 < arr2.length) {
            // merges
            if (arr1[p1] < arr2[p2]) {
                array[curr] = arr1[p1];
                curr++;
                p1++;
            } else if (arr2[p2] < arr1[p1]) {
                array[curr] = arr2[p2];
                curr++;
                p2++;
            }
            setHighlightBar([curr,curr])
            setSortArray([...array]);
            await sleep(sleepTime);
        }

        // updates any leftover values
        while (p1<arr1.length) {
            array[curr] = arr1[p1];
            curr++;
            p1++;
            setHighlightBar([curr,curr])
        }
        while (p2<arr2.length) {
            array[curr] = arr2[p2];
            curr++;
            p2++;
            setHighlightBar([curr,curr])
        }
        await sleep(sleepTime);
        setSortArray([...array]);
        // update state
        
        // return slice
        return array.slice(start,start+arr1.length+arr2.length);
    }
    
    // heap sort function
    async function heapSort(array,sleepTime) {
        let n = array.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            setHighlightBar([i,i]);
            await heapify(array, n, i,sleepTime);
        }
        for (let i = n - 1; i > 0; i--) {
            await sleep(sleepTime);
            [array[0], array[i]] = [array[i], array[0]];
            setHighlightBar([i,i]);
            setSortArray([...array]);
            await heapify(array, i, 0,sleepTime);
        }
    }

    async function heapify(array, n, i,sleepTime) {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        if (l < n && array[l] > array[largest]) {
            largest = l;
        }
        if (r < n && array[r] > array[largest]) {
            largest = r;
        }
        if (largest != i) {
            await sleep(sleepTime);
            [array[i], array[largest]] = [array[largest], array[i]];
            setSortArray([...array]);
            await heapify(array, n, largest,sleepTime);
        }
    }

    // bubble sort function
    async function bubbleSort(array,sleepTime) {
        let n = array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    await sleep(sleepTime);
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    setHighlightBar([i,j]);
                    setSortArray([...array]);
                }
            }
        }
    }

    // selection sort
    async function selectionSort(array,sleepTime) {
        let n = array.length;
        for (let i = 0; i < n; i++) {
            let min = i;
            for (let j = i + 1; j < n; j++) {
                if (array[j] < array[min]) {
                    min = j;
                    setHighlightBar([i,j]);
                }
            }
            await sleep(sleepTime);
            [array[i], array[min]] = [array[min], array[i]];
            setHighlightBar([i,min]);
            setSortArray([...array]);
        }
    }
    
    // insertion sort
    async function insertionSort(array,sleepTime) {
        let n = array.length;
        for (let i = 1; i < n; i++) {
            let key = array[i];
            let j = i - 1;
            while (j >= 0 && array[j] > key) {
                await sleep(sleepTime);
                array[j + 1] = array[j];
                setHighlightBar([i,j]);
                setSortArray([...array]);
                j = j - 1;
            }
            array[j + 1] = key;
            setSortArray([...array]);
        }
    }

    // counting sort
    async function countingSort(array,sleepTime) {
        let n = array.length;
        let output = new Array(n);
        let count = new Array(200).fill(0);
        for (let i = 0; i < n; i++) {
            count[array[i]]++;
        }
        for (let i = 1; i < 200; i++) {
            count[i] += count[i - 1];
        }
        for (let i = n - 1; i >= 0; i--) {
            output[count[array[i]] - 1] = array[i];
            count[array[i]]--;
        }
        for (let i = 0; i < n; i++) {
            await sleep(sleepTime);
            array[i] = output[i];
            setHighlightBar([i,i]);
            setSortArray([...array]);
        }
    }

    // radix sort
    async function radixSort(array,sleepTime) {
        let n = array.length;
        let max = Math.max(...array);
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            await countSort(array, n, exp,sleepTime);
        }
    }
    async function countSort(array, n, exp,sleepTime) {
        let output = new Array(n);
        let count = new Array(10).fill(0);
        for (let i = 0; i < n; i++) {
            count[Math.floor(array[i] / exp) % 10]++;
        }
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        for (let i = n - 1; i >= 0; i--) {
            output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
            count[Math.floor(array[i] / exp) % 10]--;
        }
        for (let i = 0; i < n; i++) {
            await sleep(sleepTime);
            array[i] = output[i];
            setHighlightBar([i,i]);
            setSortArray([...array]);
        }
    }


    // bucket sort
    async function bucketSort(array,sleepTime) {
        let n = array.length;
        let buckets = new Array(10);
        for (let i = 0; i < buckets.length; i++) {
            buckets[i] = [];
        }
        for (let i = 0; i < n; i++) {
            setHighlightBar([i,i]);
            let bucketIndex = Math.floor(array[i] / 10);
            buckets[bucketIndex].push(array[i]);
        }
        for (let i = 0; i < buckets.length; i++) {
            setHighlightBar([i,i]);
            await insertionSortForBucketSort(buckets[i],sleepTime);
        }
        let index = 0;
        for (let i = 0; i < buckets.length; i++) {
            for (let j = 0; j < buckets[i].length; j++) {
                await sleep(sleepTime);
                array[index++] = buckets[i][j];
                setHighlightBar([i,j]);
                setSortArray([...array]);
            }
        }
    }

    // insertion sort for bucket sort
    async function insertionSortForBucketSort(array,sleepTime) {
        let n = array.length;
        for (let i = 1; i < n; i++) {
            let key = array[i];
            let j = i - 1;
            while (j >= 0 && array[j] > key) {
                await sleep(sleepTime);
                setHighlightBar([i,j]);
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = key;
        }
    }

    // shell sort
    async function shellSort(array,sleepTime) {
        let n = array.length;
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = array[i];
                let j;
                for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                    await sleep(sleepTime);
                    array[j] = array[j - gap];
                    setHighlightBar([i,j]);
                    setSortArray([...array]);
                }
                array[j] = temp;
                setHighlightBar([i,j]);
                setSortArray([...array]);
            }
        }
    }

    // cocktail sort
    async function cocktailSort(array,sleepTime) {
        let n = array.length;
        let swapped = true;
        let start = 0;
        let end = n - 1;
        while (swapped) {
            swapped = false;
            for (let i = start; i < end; i++) {
                if (array[i] > array[i + 1]) {
                    await sleep(sleepTime);
                    let temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    setHighlightBar([start,end,i]);
                    setSortArray([...array]);
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
            swapped = false;
            end--;

            for (let i = end - 1; i >= start; i--) {
                if (array[i] > array[i + 1]) {
                    await sleep(sleepTime);
                    let temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    setHighlightBar([start,end,i]);
                    setSortArray([...array]);
                    swapped = true;
                }
            }
            start++;
        }
    }

    // comb sort
    async function combSort(array,sleepTime) {
        let n = array.length;
        let gap = n;
        let shrink = 1.3;
        let swapped = true;
        while (gap > 1 || swapped) {
            gap = Math.floor(gap / shrink);
            if (gap < 1) {
                gap = 1;
            }
            swapped = false;
            for (let i = 0; i + gap < n; i++) {
                if (array[i] > array[i + gap]) {
                    await sleep(sleepTime);
                    let temp = array[i];
                    array[i] = array[i + gap];
                    array[i + gap] = temp;
                    setHighlightBar([i,i+gap]);
                    setSortArray([...array]);
                    swapped = true;
                }
            }
        }
    }

    // gnome sort
    async function gnomeSort(array,sleepTime) {
        let n = array.length;
        let index = 0;
        while (index < n) {
            if (index === 0) {
                index++;
            }
            if (array[index] >= array[index - 1]) {
                index++;
            } else {
                await sleep(sleepTime);
                let temp = array[index];
                array[index] = array[index - 1];
                array[index - 1] = temp;
                setHighlightBar([index,index]);
                setSortArray([...array]);
                index--;
            }
        }
    }

    // cycle sort
    async function cycleSort(array,sleepTime) {
        let n = array.length;
        for (let cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
            let item = array[cycleStart];
            let pos = cycleStart;
            for (let i = cycleStart + 1; i < n; i++) {
                if (array[i] < item) {
                    pos++;
                }
            }
            if (pos === cycleStart) {
                continue;
            }
            while (item === array[pos]) {
                pos++;
            }
            if (pos !== cycleStart) {
                await sleep(sleepTime);
                let temp = item;
                item = array[pos];
                array[pos] = temp;
                setSortArray([...array]);
            }
            while (pos !== cycleStart) {
                pos = cycleStart;
                for (let i = cycleStart + 1; i < n; i++) {
                    if (array[i] < item) {
                        pos++;
                    }
                }
                while (item === array[pos]) {
                    pos++;
                }
                if (item !== array[pos]) {
                    await sleep(sleepTime);
                    let temp = item;
                    item = array[pos];
                    array[pos] = temp;
                    setHighlightBar([pos]);
                    setSortArray([...array]);
                }
            }
        }
    }

    // pancake sort
    async function pancakeSort(array,sleepTime) {
        let n = array.length;
        for (let i = n; i > 1; i--) {
            let max = 0;

            for (let j = 0; j < i; j++) {
                if (array[j] > array[max]) {
                    max = j;
                }
                setHighlightBar([i,j]);
            }
            if (max !== i - 1) {
                await flip(array, max,sleepTime);
                await flip(array, i - 1,sleepTime);
            }
        }
    }
    async function flip(array, i,sleepTime) {
        let start = 0;
        while (start < i) {
            await sleep(sleepTime);
            let temp = array[start];

            array[start] = array[i];
            array[i] = temp;
            setHighlightBar([i]);
            setSortArray([...array]);
            start++;
            i--;
        }
    } 

  return (
    <div className='navBar'>
        
        <button id='shuffle-btn' onClick={() => generateNewArray(sortArray.length)}>Shuffle</button>
        
        <input
            type='range'
            min='10'
            max='60'
            step='2'
            defaultValue='35'
            className='slider'
            onInput={() => handleSliderChange()}
            id='myRange'></input>

        <button id='visualize-btn' onClick={() => handleSortSelection()}>Visualize!</button>

        <div className='custom-select'>
        <select className='select' id='select-dropdown'>
            <option value='quickSort'>QuickSort</option>
            <option value='mergeSort'>MergeSort</option>
            <option value='bubbleSort'>BubbleSort</option>
            <option value='heapSort'>HeapSort</option>
            <option value='insertionSort'>InsertionSort</option>
            <option value='selectionSort'>SelectionSort</option>
            <option value='countingSort'>CountingSort</option>
            <option value='radixSort'>RadixSort</option>
            <option value='bucketSort'>BucketSort</option>
            <option value='shellSort'>ShellSort</option>
            <option value='cocktailSort'>CocktailSort</option>
            <option value='combSort'>CombSort</option>
            <option value='gnomeSort'>GnomeSort</option>
            <option value='cycleSort'>CycleSort</option>
            <option value='pancakeSort'>PancakeSort</option>
        </select>
        </div>


    </div>
  )
}

export default Settings