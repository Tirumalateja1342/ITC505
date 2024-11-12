// script.js
document.addEventListener("DOMContentLoaded", function() {
    const sortButton = document.getElementById("sortButton");
    const numberInput = document.getElementById("numberInput");
    const outputSection = document.getElementById("output");

    sortButton.addEventListener("click", function() {
        // Get the input value (numbers separated by commas)
        const inputValue = numberInput.value.trim();

        // Convert input into an array of numbers
        let numbers = inputValue.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));

        if (numbers.length === 0) {
            alert("Please enter valid numbers!");
            return;
        }

        // Clear previous output
        outputSection.innerHTML = '';

        // Create boxes for the initial numbers
        createBoxes(numbers);

        // Perform the bubble sort and show the process
        bubbleSort(numbers);
    });

    // Bubble Sort function
    function bubbleSort(arr) {
        let len = arr.length;
        let steps = [];  // To store the intermediate steps

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                // Compare the elements, highlight them as 'comparing'
                steps.push({ action: 'comparing', indices: [j, j + 1], arrayState: [...arr] });

                if (arr[j] > arr[j + 1]) {
                    // Swap elements, highlight them as 'swapping'
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    steps.push({ action: 'swapping', indices: [j, j + 1], arrayState: [...arr] });
                }

                // After comparison and swap, add the current array state
                steps.push({ action: 'neutral', indices: [j, j + 1], arrayState: [...arr] });
            }
        }

        // After sorting, show the final result
        setTimeout(() => {
            displaySortedArray(arr);
        }, 1000);  // Delay for 1 second before displaying the sorted array

        // Show the sorting steps one by one, but only one time for each swap
        showSteps(steps);
    }

    // Function to create boxes for the initial numbers
    function createBoxes(arr) {
        arr.forEach(num => {
            const box = document.createElement('div');
            box.className = 'output-box';
            box.textContent = num;
            outputSection.appendChild(box);
        });
    }

    // Function to update the output boxes with the current state of the array
    function updateBoxes(arr, step) {
        const boxes = document.querySelectorAll('.output-box');
        arr.forEach((num, index) => {
            // Reset all boxes to neutral color
            boxes[index].classList.add('highlight-neutral');
        });

        step.indices.forEach(index => {
            if (step.action === 'comparing') {
                boxes[index].classList.add('highlight-comparing');
            } else if (step.action === 'swapping') {
                boxes[index].classList.add('highlight-swapped');
            } else if (step.action === 'neutral') {
                boxes[index].classList.add('highlight-neutral');
            }
        });

        // After a swap, update the boxes with the current state of the array
        setTimeout(() => {
            arr.forEach((num, index) => {
                boxes[index].textContent = num;
            });
        }, 100);
    }

    // Function to show the sorting steps
    function showSteps(steps) {
        let stepIndex = 0;

        const interval = setInterval(() => {
            if (stepIndex < steps.length) {
                updateBoxes(steps[stepIndex].arrayState, steps[stepIndex]);
                stepIndex++;
            } else {
                clearInterval(interval); // Stop after all steps are shown
            }
        }, 500); // Update the boxes every 500ms (half a second)
    }

    // Function to display the sorted array
    function displaySortedArray(arr) {
        outputSection.innerHTML = ''; // Clear output

        // Create final sorted boxes
        arr.forEach(num => {
            const box = document.createElement('div');
            box.className = 'output-box highlight-sorted';
            box.textContent = num;
            outputSection.appendChild(box);
        });
    }
});
