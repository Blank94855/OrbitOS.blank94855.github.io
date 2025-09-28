const output = document.getElementById('output');    
const inputField = document.getElementById('input');    
const prompt = document.getElementById('prompt');
const terminalElement = document.querySelector('.terminal');

let isSystemBricked = false;    
let terminalVisible = true;    
let stoppedProcesses = [];    

const bootSequence = [    
    "Starting system...", "Loading kernel modules...", "Initializing cgroup subsystems...", "Mounting /system...", "Mounting /vendor...", "Mounting /data...", 
    "Setting permissions...", "Starting ueventd...", "Starting logd...", "Starting healthd...", "Starting surfaceflinger...", "Starting servicemanager...", 
    "Starting zygote...", "Boot completed."
];    

function simulateBootSequence() {    
    isSystemBricked = false; inputField.disabled = true; prompt.style.display = 'none'; output.innerHTML = '';    
    return new Promise((resolve) => {    
        bootSequence.forEach((message, index) => {    
            setTimeout(() => {    
                const p = document.createElement('p');
                p.innerHTML = `<span class="highlight">[${index + 1}/${bootSequence.length}]</span> ${message}`;    
                output.appendChild(p);
                scrollToBottom();
                if (index === bootSequence.length - 1) setTimeout(resolve, 500);    
            }, 200 * (index + 1));    
        });    
    });    
}    

function finalizeBootSequence() {    
    output.innerHTML = `    
        <p>Welcome to <span class="highlight">OrbitOS</span></p>    
        <p>Type 'help' for a list of commands</p>    
        <p class="highlight">Security patch: 1 September 2025</p>    
        <p class="highlight" style="color: var(--terminal-error); font-weight: bold;">
        ⚠️ WARNING: You are running a BETA version of OrbitOS! Features are incomplete and the system may BREAK unexpectedly.
        </p>`;    
    inputField.disabled = false; prompt.style.display = 'inline'; inputField.focus();    
    prompt.textContent = `${config.username}@${config.hostname}:~$ `;    
    terminalVisible = true; stoppedProcesses = [];    
}    

let commandHistory = []; let historyIndex = -1;    

const config = {    
    username: 'root', hostname: 'orbit', version: '3.5.4', lastBootTime: new Date().toLocaleString(),    
    systemInfo: { os: 'OrbitOS', version: '3.5.4 - beta', kernel: '5.4.2-1070-gki', architecture: 'x86_64' },    
    batteryInfo: { percentage: Math.floor(Math.random() * 100) + 1, charging: Math.random() > 0.5 },    
    weatherInfo: {    
        locations: [ { city: "Tokyo", country: "Japan" }, { city: "London", country: "UK" }, { city: "New York", country: "USA" }, { city: "Sydney", country: "Australia" }, { city: "Bucharest", country: "Romania" } ],    
        conditions: [ "Clear skies", "Partly cloudy", "Overcast", "Light rain", "Heavy rain", "Thunderstorm", "Foggy", "Snowing", "Sunny", "Windy" ],    
        precipitationTypes: [ "None", "Drizzle", "Rain", "Snow", "Sleet", "Hail" ]    
    },
    dynamicStorage: {}
};    

function generateBatteryTimeRemaining(percentage, isCharging) {    
    if (isCharging) {    
        const minutes = (100 - percentage) * 1.5;    
        if (percentage === 100) return "Fully charged";    
        return `${Math.floor(minutes / 60)}h ${Math.floor(minutes % 60)}m until full`;    
    } else {    
        const minutes = percentage * 8;    
        return `${Math.floor(minutes / 60)}h ${Math.floor(minutes % 60)}m remaining`;    
    }    
}    

let currentWeatherData = null;    
function generateRandomWeather() {    
    if (currentWeatherData) return currentWeatherData;    
    const location = config.weatherInfo.locations[Math.floor(Math.random() * config.weatherInfo.locations.length)];    
    const condition = config.weatherInfo.conditions[Math.floor(Math.random() * config.weatherInfo.conditions.length)];    
    const precipitation = config.weatherInfo.precipitationTypes[Math.floor(Math.random() * config.weatherInfo.precipitationTypes.length)];    
    currentWeatherData = { 
        location, condition, precipitation,
        temperature: Math.floor(Math.random() * 51) - 10,    
        humidity: Math.floor(Math.random() * 76) + 20,    
        windSpeed: Math.floor(Math.random() * 51),    
        precipChance: Math.floor(Math.random() * 101)    
    };    
    return currentWeatherData;    
}    

function toggleTerminal(visible) { terminalElement.style.display = visible ? 'block' : 'none'; terminalVisible = visible; if(visible) inputField.focus(); }    

function systemHalt() {    
    isSystemBricked = true; inputField.disabled = true; prompt.style.display = 'none';    
    const p = document.createElement('p');
    p.classList.add('error-message');
    p.innerHTML = `<span class="highlight">[SYSTEM HALTED]</span><br>System has been manually halted.<br>Critical process stopped.<br>System unable to continue operation.<br>Please reboot to restore functionality.`;    
    output.appendChild(p);
    scrollToBottom();    
}    

function getUptime() {    
    const diff = new Date() - new Date(config.lastBootTime);    
    let minutes = Math.floor(diff / 60000); let hours = Math.floor(minutes / 60); let days = Math.floor(hours / 24);
    let uptimeString = '';    
    if (days > 0) uptimeString += `${days}d `;
    if (hours > 0) uptimeString += `${hours % 24}h `;
    uptimeString += `${minutes % 60}m`;
    return uptimeString;    
}    

function generateDynamicStorage() {
    config.dynamicStorage = {
        totalDisk: Math.floor(Math.random() * 401) + 100, 
        freeDisk: Math.floor(Math.random() * 201) + 50,
        totalRAM: [8, 12, 16, 32][Math.floor(Math.random() * 4)], 
        freeRAM: Math.floor(Math.random() * 4) + 1
    };
}

function applyFont(fontNumber) {
    const fontMap = {
        1: "'JetBrains Mono', monospace",
        2: "'Fira Code', monospace",
        3: "'Source Code Pro', monospace",
        4: "'IBM Plex Mono', monospace",
        5: "'Anonymous Pro', monospace"
    };
    const fontFamily = fontMap[fontNumber];
    if (fontFamily) {
        terminalElement.style.fontFamily = fontFamily;
        return true;
    }
    return false;
}

function executeCommand(input) {
    if (isSystemBricked) return '<p class="error-message">System halted. Please reboot.</p>';
    const trimmedInput = input.trim();  
    if (!trimmedInput) return '';  

    const [command, ...args] = trimmedInput.split(' ');  
    const lowerCaseCommand = command.toLowerCase();  
    const commandFunction = commands[lowerCaseCommand];  
    let outputResult;  
    if (typeof commandFunction === 'function') {  
        outputResult = commandFunction(args.join(' '));  
    } else {  
        outputResult = `<p class="error-message">Command not found: ${command}. Type 'help' for available commands.</p>`;  
    }  
    if (trimmedInput && commandHistory[commandHistory.length - 1] !== trimmedInput) {  
        commandHistory.push(trimmedInput);  
    }  
    historyIndex = commandHistory.length;  
    return outputResult;
}

function displayResponse(input) {
    const commandPara = document.createElement('p');
    commandPara.innerHTML = `<span class="highlight">${prompt.textContent}</span>${input}`;
    output.appendChild(commandPara);
    const response = executeCommand(input);
    if (response) {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = response;
        output.appendChild(responseDiv);
    }
    scrollToBottom();
    inputField.value = '';
}

function scrollToBottom() { setTimeout(() => { output.scrollTop = output.scrollHeight; }, 0); }

window.addEventListener('DOMContentLoaded', async () => {    
    generateDynamicStorage();
    await simulateBootSequence();    
    finalizeBootSequence();    
});    

inputField.addEventListener('keydown', (e) => {    
    if (isSystemBricked) { e.preventDefault(); return; }    
    if (e.key === 'Enter') {    
        e.preventDefault();    
        const input = inputField.value.trim();    
        if (input) { displayResponse(input); } 
        else { 
            const p = document.createElement('p');
            p.innerHTML = `<span class="highlight">${prompt.textContent}</span>`;
            output.appendChild(p);
            scrollToBottom(); 
        }
        inputField.value = ''; historyIndex = commandHistory.length;    
    } else if (e.key === 'ArrowUp') {    
        e.preventDefault();    
        if (historyIndex > 0) { 
            historyIndex--; 
            inputField.value = commandHistory[historyIndex]; 
            inputField.setSelectionRange(inputField.value.length, inputField.value.length);
        }    
    } else if (e.key === 'ArrowDown') {    
        e.preventDefault();    
        if (historyIndex < commandHistory.length - 1) { 
            historyIndex++; 
            inputField.value = commandHistory[historyIndex]; 
            inputField.setSelectionRange(inputField.value.length, inputField.value.length);
        } else { 
            historyIndex = commandHistory.length; 
            inputField.value = ''; 
        }    
    }    
});    

document.querySelector('.terminal').addEventListener('click', () => { if (!isSystemBricked) inputField.focus(); });

