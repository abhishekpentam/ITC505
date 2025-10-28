// script.js
// Bubble Sort demo with UI interaction

function bubbleSortWithSteps(arr) {
    const steps = [];
    const a = [...arr]; // copy so we don't mutate original in-place for display

    for (let i = 0; i < a.length - 1; i++) {
        let swapped = false;

        for (let j = 0; j < a.length - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                // swap
                const temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
                swapped = true;
            }
        }

        // capture the array after each outer loop
        steps.push(`Pass ${i + 1}: [ ${a.join(", ")} ]`);

        // optimization: if no swaps, array is already sorted
        if (!swapped) break;
    }

    return { sorted: a, steps };
}

function parseUserInput(str) {
    // split by comma, trim, convert to numbers
    // ignore NaN values
    return str
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => Number(s))
        .filter(n => !Number.isNaN(n));
}

// DOM references
const inputEl = document.getElementById("numbersInput");
const sortBtn = document.getElementById("sortBtn");
const randomBtn = document.getElementById("randomBtn");
const originalOutput = document.getElementById("originalOutput");
const sortedOutput = document.getElementById("sortedOutput");
const stepsLog = document.getElementById("stepsLog");

function renderSteps(stepsArray) {
    stepsLog.innerHTML = "";
    stepsArray.forEach(txt => {
        const div = document.createElement("div");
        div.className = "steps-log-line";
        div.textContent = txt;
        stepsLog.appendChild(div);
    });
}

// EVENT: Sort button
sortBtn.addEventListener("click", () => {
    const nums = parseUserInput(inputEl.value);

    if (nums.length === 0) {
        originalOutput.textContent = "[ ]";
        sortedOutput.textContent = "[ ]";
        stepsLog.innerHTML = "";
        alert("Please enter at least one valid number 🙂");
        return;
    }

    originalOutput.textContent = `[ ${nums.join(", ")} ]`;

    const result = bubbleSortWithSteps(nums);
    sortedOutput.textContent = `[ ${result.sorted.join(", ")} ]`;

    renderSteps(result.steps);
});

// EVENT: Random button (fills box with random numbers)
randomBtn.addEventListener("click", () => {
    const count = 6;
    const randArr = [];
    for (let i = 0; i < count; i++) {
        // 1 to 99
        randArr.push(Math.floor(Math.random() * 99) + 1);
    }
    inputEl.value = randArr.join(", ");
    originalOutput.textContent = "[ ]";
    sortedOutput.textContent = "[ ]";
    stepsLog.innerHTML = "";
});
