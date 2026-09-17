const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const processButton = document.getElementById('processButton') as HTMLButtonElement;
const resultArea = document.getElementById('resultArea') as HTMLTextAreaElement;
const lengthInfo = document.getElementById('lengthInfo') as HTMLSpanElement;
const worker = new Worker('./solverWorker.js');

worker.addEventListener('message', (event: MessageEvent<string>) => {
    resultArea.value = event.data;
    lengthInfo.textContent = event.data.length.toString();
    processButton.disabled = false;
    processButton.textContent = 'Find biggest sequence';
});

processButton.addEventListener('click', async () => {
    const file = fileInput.files?.[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }

    const text = await file.text();
    processButton.disabled = true;
    processButton.textContent = 'Finding sequence...';
    worker.postMessage(text);
});