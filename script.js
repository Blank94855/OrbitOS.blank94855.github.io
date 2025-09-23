const output = document.getElementById('output');    
const inputField = document.getElementById('input');    
const prompt = document.getElementById('prompt');    

let isSystemBricked = false;    
let terminalVisible = true;    
let stoppedProcesses = [];    

const bootSequence = [    
    "Starting system...",  
    "Loading kernel modules...",  
    "Initializing cgroup subsystems...",  
    "Mounting /system...",  
    "Mounting /vendor...",  
    "Mounting /data...",  
    "Setting permissions...",  
    "Starting ueventd...",  
    "Starting logd...",  
    "Starting healthd...",  
    "Starting surfaceflinger...",  
    "Starting servicemanager...",  
    "Starting zygote...",  
    "Boot completed."
];    

function simulateBootSequence() {    
    isSystemBricked = false;    
    inputField.disabled = true;    
    prompt.style.display = 'none';    
    output.innerHTML = '';    
    return new Promise((resolve) => {    
        bootSequence.forEach((message, index) => {    
            setTimeout(() => {    
                const progressElement = document.createElement('p');    
                progressElement.innerHTML = `<span class="highlight">[${index + 1}/${bootSequence.length}]</span> ${message}`;    
                output.appendChild(progressElement);    
                output.scrollTop = output.scrollHeight;    
                if (index === bootSequence.length - 1) {    
                    setTimeout(resolve, 500);    
                }    
            }, 300 * (index + 1));    
        });    
    });    
}    

function finalizeBootSequence() {    
    output.innerHTML = '';    
    output.innerHTML = `    
        <p>Welcome to <span class="highlight">OrbitOS</span></p>    
        <p>Type 'help' for a list of commands</p>    
        <p class="highlight">Security patch: 1 September 2025</p>    
        <p class="highlight" style="color: var(--terminal-error); font-weight: bold;">
⚠️ WARNING: You are running a BETA version of OrbitOS! Features are incomplete and the system may BREAK unexpectedly.
</p>
    `;    
    inputField.disabled = false;    
    prompt.style.display = 'inline';    
    inputField.focus();    
    prompt.textContent = `${config.username}@${config.hostname}:~$ `;    
    terminalVisible = true;    
    stoppedProcesses = [];    
}    

let commandHistory = [];    
let historyIndex = -1;    

const config = {    
    username: 'root',    
    hostname: 'orbit',    
    version: '3.4.3',    
    lastBootTime: new Date().toLocaleString(),    
    systemInfo: {    
        os: 'OrbitOS',    
        version: '3.4.3 - beta',    
        kernel: '5.4.2-1070-gki',    
        architecture: 'x86_64',    
    },    
    batteryInfo: {    
        percentage: Math.floor(Math.random() * 100) + 1, 
        charging: Math.random() > 0.5     
    },    
    weatherInfo: {    
        locations: [    
            { city: "Tokyo", country: "Japan" },    
            { city: "London", country: "UK" },    
            { city: "New York", country: "USA" },    
            { city: "Sydney", country: "Australia" },
            { city: "Bucharest", country: "Romania" },
        ],    
        conditions: [ "Clear skies", "Partly cloudy", "Overcast", "Light rain", "Heavy rain", "Thunderstorm", "Foggy", "Snowing", "Sunny", "Windy" ],    
        precipitationTypes: [ "None", "Drizzle", "Rain", "Snow", "Sleet", "Hail" ]    
    },
    dynamicStorage: {}
};    


function generateBatteryTimeRemaining(percentage, isCharging) {    
    if (isCharging) {    
        const remainingPercentage = 100 - percentage;    
        const minutesPerPercent = Math.floor(Math.random() * 2) + 1; 
        const totalMinutes = remainingPercentage * minutesPerPercent;    
        const hours = Math.floor(totalMinutes / 60);    
        const minutes = totalMinutes % 60;    
        if (percentage === 100) return "Fully charged";    
        return `${hours}h ${minutes}m until full`;    
    } else {    
        const minutesPerPercent = Math.floor(Math.random() * 10) + 5;  
        const totalMinutes = percentage * minutesPerPercent;    
        const days = Math.floor(totalMinutes / (60 * 24));    
        const hours = Math.floor((totalMinutes % (60 * 24)) / 60);    
        const minutes = totalMinutes % 60;    
        if (days > 0) return `${days}d ${hours}h remaining`;    
        return `${hours}h ${minutes}m remaining`;    
    }    
}    

let currentWeatherData = null;    

function generateRandomWeather() {    
    if (currentWeatherData) return currentWeatherData;    
    const locationIndex = Math.floor(Math.random() * config.weatherInfo.locations.length);    
    const location = config.weatherInfo.locations[locationIndex];    
    const temperature = Math.floor(Math.random() * 51) - 10;    
    const conditionIndex = Math.floor(Math.random() * config.weatherInfo.conditions.length);    
    const condition = config.weatherInfo.conditions[conditionIndex];    
    const humidity = Math.floor(Math.random() * 76) + 20;    
    const windSpeed = Math.floor(Math.random() * 51);    
    const precipIndex = Math.floor(Math.random() * config.weatherInfo.precipitationTypes.length);    
    const precipitation = config.weatherInfo.precipitationTypes[precipIndex];    
    const precipChance = Math.floor(Math.random() * 101);    

    currentWeatherData = { location, temperature, condition, humidity, windSpeed, precipitation, precipChance };    
    return currentWeatherData;    
}    

const terminalSites = {    
    'notavirus.zip': `    
        <p class="highlight">--- notavirus.zip ---</p>    
        <p>Contents seem... suspicious. Handle with care.</p>    
        <p>  - totally_safe.exe</p>    
        <p>  - free_money.txt</p>    
        <p>  - instructions.rtf</p>    
        <p class="highlight">Use 'run [filename]' to execute.</p>    
    `,    
    'news.orb': `    
        <p><span class="highlight">OrbitOS News Feed</span></p>    
        <p>-------------------</p>    
        <p>- OrbitOS version 3.4 is here.</p>    
        <p>- OrbitOS 3.4 brings custom os!!!!!.</p>    
        `,    
    'about.os': `    
        <p><span class="highlight">About OrbitOS</span></p>    
        <p>Version: ${config.systemInfo.version}</p>    
        <p>Kernel: ${config.systemInfo.kernel}</p>    
        <p>A lightweight, terminal-focused operating system simulation.</p>    
    `    
};    

const maliciousFiles = ['totally_safe.exe', 'free_money.txt', 'instructions.rtf'];    

function generateChaoticOutput() {    
    let text = '';    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';    
    for (let i = 0; i < 50; i++) {    
        for (let j = 0; j < 80; j++) {    
            text += chars.charAt(Math.floor(Math.random() * chars.length));    
        }    
        text += '\n';    
    }    
    return `<pre class="error-message">${text}</pre>`;    
}    

function triggerSystemBrick() {    
    isSystemBricked = true;    
    inputField.disabled = true;    
    prompt.style.display = 'none';    
    const brickMessage = document.createElement('p');    
    brickMessage.innerHTML = `<span class="highlight error-message">[!!! KERNEL PANIC !!!]</span><br>E: Unable to mount /system (Invalid argument). E: failed to mount /data (No such file or directory).<br>E: unable to mount /cache (I/O error)<br>E: failed to mount /vendor (Invalid argument)<br>E: init: terminating service. Please reboot the system.`;    
    brickMessage.classList.add('error-message');
    output.appendChild(brickMessage);    
    scrollToBottom();    
}    

function toggleTerminal(visible) {    
    const terminal = document.querySelector('.terminal');    
    if (terminal) {    
        terminal.style.display = visible ? 'block' : 'none';
        terminalVisible = visible;
        if(visible) inputField.focus();
    }    
}    

function systemHalt() {    
    isSystemBricked = true;    
    inputField.disabled = true;    
    prompt.style.display = 'none';    
    const haltMessage = document.createElement('p');    
    haltMessage.innerHTML = `<span class="highlight error-message">[SYSTEM HALTED]</span><br>System has been manually halted.<br>Critical process stopped.<br>System unable to continue operation.<br>Please reboot to restore functionality.`;    
    haltMessage.classList.add('error-message');    
    output.appendChild(haltMessage);    
    scrollToBottom();    
}    

function getUptime() {    
    const diff = new Date() - new Date(config.lastBootTime);    
    if (isNaN(diff) || diff < 0) return 'Calculating...';    
    let seconds = Math.floor(diff / 1000);    
    let minutes = Math.floor(seconds / 60);    
    let hours = Math.floor(minutes / 60);    
    let days = Math.floor(hours / 24);    
    hours %= 24; minutes %= 60; seconds %= 60;    
    let uptimeString = '';    
    if (days > 0) uptimeString += `${days} day(s) `;    
    if (hours > 0) uptimeString += `${hours} hour(s) `;    
    if (minutes > 0) uptimeString += `${minutes} minute(s) `;    
    return uptimeString.trim() || 'Just now';    
}    

function generateDynamicStorage() {
    const totalDisk = Math.floor(Math.random() * 401) + 100;
    const freeDisk = Math.floor(Math.random() * (totalDisk * 0.6) + totalDisk * 0.2);
    const totalRAMOptions = [8, 12, 16, 32];
    const totalRAM = totalRAMOptions[Math.floor(Math.random() * totalRAMOptions.length)];
    const freeRAM = Math.max(1, Math.floor(Math.random() * (totalRAM - 2) + 1));
    config.dynamicStorage = { totalDisk, freeDisk, totalRAM, freeRAM };
}

function executeCommand(input) {
    if (isSystemBricked) {
        return '<p class="error-message">Failed to mount /system. No such file or directory.</p>';
    }
    const trimmedInput = input.trim();  
    if (!trimmedInput) return '';  

    if (customOsInstallationActive) {  
        const customOsResult = handleCustomOsInstallation(trimmedInput);  
        if (customOsResult !== null) return customOsResult;  
    }  

    const [command, ...args] = trimmedInput.split(' ');  
    const lowerCaseCommand = command.toLowerCase();  

    if (devCommands[trimmedInput.toLowerCase()]) {  
        return devCommands[trimmedInput.toLowerCase()]();  
    }  

    const commandFunction = commands[lowerCaseCommand];  
    let outputResult;  
    if (typeof commandFunction === 'function') {  
        outputResult = commandFunction(args.join(' '));  
    } else {  
        outputResult = `<p class="error-message">Command not found: ${command}. Type 'help' for available commands.</p>`;  
    }  

    if (trimmedInput) {  
        if (commandHistory[commandHistory.length - 1] !== trimmedInput) {  
            commandHistory.push(trimmedInput);  
        }  
        historyIndex = commandHistory.length;  
    }  
    return outputResult;
}

function displayResponse(input) {
    const commandDiv = document.createElement('div');
    commandDiv.innerHTML = `<p><span class="highlight">${prompt.textContent}</span>${input}</p>`;
    output.appendChild(commandDiv);

    const response = executeCommand(input);
    if (response) {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = response;
        output.appendChild(responseDiv);
    }
    scrollToBottom();
    inputField.value = '';
}

function scrollToBottom() {
    setTimeout(() => { output.scrollTop = output.scrollHeight; }, 0);
}

window.addEventListener('DOMContentLoaded', async () => {    
    config.batteryInfo.percentage = Math.floor(Math.random() * 100) + 1;    
    config.batteryInfo.charging = Math.random() > 0.5;    
    generateRandomWeather();    
    generateDynamicStorage();
    await simulateBootSequence();    
    finalizeBootSequence();    
});    

inputField.addEventListener('keydown', function (event) {    
    if (isSystemBricked) { event.preventDefault(); return; }    
    if (event.key === 'Enter') {    
        event.preventDefault();    
        const input = inputField.value.trim();    
        if (input) {    
            displayResponse(input);    
        } else {    
            const commandDiv = document.createElement('div');    
            commandDiv.innerHTML = `<p><span class="highlight">${prompt.textContent}</span></p>`;    
            output.appendChild(commandDiv);    
            scrollToBottom();    
        }    
        inputField.value = '';    
        historyIndex = commandHistory.length;    
    } else if (event.key === 'ArrowUp') {    
        event.preventDefault();    
        if (commandHistory.length > 0) {    
            if (historyIndex > 0) historyIndex--;    
            inputField.value = commandHistory[historyIndex];    
            inputField.setSelectionRange(inputField.value.length, inputField.value.length);    
        }    
    } else if (event.key === 'ArrowDown') {    
        event.preventDefault();    
        if (commandHistory.length > 0) {    
            if (historyIndex < commandHistory.length - 1) {    
                historyIndex++;    
                inputField.value = commandHistory[historyIndex];    
                inputField.setSelectionRange(inputField.value.length, inputField.value.length);    
            } else {    
                historyIndex = commandHistory.length;    
                inputField.value = '';    
            }    
        }    
    }    
});    

document.querySelector('.terminal').addEventListener('click', (e) => {    
    if (!isSystemBricked && e.target !== inputField) {    
      inputField.focus();    
    }    
});

let devToolsOpen = false;
let customOsInstallationActive = false;
let awaitingConfirmation = false;
let awaitingUrl = false;

function clearTerminalKeepIframe() {
    const iframes = Array.from(output.querySelectorAll('iframe'));
    const iframeContainers = iframes.map(iframe => iframe.closest('div')).filter(Boolean);
    output.innerHTML = '';
    iframeContainers.forEach(container => output.appendChild(container));
    scrollToBottom();
}

function handleCustomOsInstallation(input) {
    const lowerInput = input.toLowerCase().trim();
    if (awaitingConfirmation) {  
        if (lowerInput === 'yes') {  
            awaitingConfirmation = false;  
            awaitingUrl = true;  
            return `<p>Please enter the URL of the custom ROM to install.</p>`;  
        } else if (lowerInput === 'no') {  
            customOsInstallationActive = false;  
            awaitingConfirmation = false;  
            return '<p>Custom OS installation cancelled.</p>';  
        } else {  
            return '<p>Please type YES to continue or NO to cancel.</p>';  
        }  
    }  

    if (awaitingUrl) {  
        if (input.startsWith('http://') || input.startsWith('https://')) {  
            awaitingUrl = false;  
            customOsInstallationActive = false;  
            inputField.disabled = true;  
            prompt.style.display = 'none';  
            
            setTimeout(() => {  
                const steps = [  
                    '[BOOT] Preparing installation...', '[CHECK] ROM integrity check...', '[OK] Check passed.',
                    '[SAVE] Backing up system snapshot...', '[FLASH] Writing system partitions...', '[PROGRESS] ██████████ 45%',
                    '[PROGRESS] ███████████████ 72%', '[CONFIG] Applying default settings...', '[WARN] Some modules may not be stable.',
                    '[OK] Flashing complete.', '[WIPE] erasing system...', '[WIPE] erasing userdata...', '[INFO] Rebooting system...',
                ];  
                let i = 0;  
                const displayStep = () => {  
                    if (i < steps.length) {  
                        const p = document.createElement('p');  
                        p.innerHTML = steps[i];  
                        if (steps[i].includes('[WARN]')) p.style.color = 'orange';  
                        else if (steps[i].includes('[OK]')) p.style.color = 'var(--terminal-success)';  
                        output.appendChild(p);  
                        scrollToBottom();  
                        i++;  
                        setTimeout(displayStep, 800);  
                    } else {  
                        clearTerminalKeepIframe();
                        const iframeContainer = document.createElement('div');  
                        const iframe = document.createElement('iframe');  
                        iframe.src = input;  
                        iframe.style.cssText = 'width: 100%; height: 600px; border: 2px solid var(--terminal-success); margin: 10px 0;';  
                        iframe.sandbox = 'allow-scripts allow-same-origin';  
                        iframeContainer.innerHTML = '<p class="highlight">Booting up...</p>';  
                        iframeContainer.appendChild(iframe);
                        output.appendChild(iframeContainer);
                        scrollToBottom();  
                    }  
                };  
                displayStep();  
            }, 500);  

            return `<p>[IMAGE FLASH STARTED]: ${input}</p>`;  
        } else {  
            return '<p class="error-message">Invalid URL format. Please enter a valid URL.</p>';  
        }  
    }  
    return null;
}


