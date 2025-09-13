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
        <p class="highlight" style="color: red; font-weight: bold;">
⚠️ WARNING: You are running a BETA version of OrbitOS! Features are incomplete and the system may BREAK unexpectedly.
</p>
    `;    
    inputField.disabled = false;    
    prompt.style.display = 'inline';    
    inputField.focus();    
    prompt.textContent = `${config.username}@${config.hostname}:~$`;    
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
        memory: '4.0GiB',    
        disk: '1.0GiB',    
        processes: 3,    
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
            { city: "Paris", country: "France" },    
            { city: "Cairo", country: "Egypt" },    
            { city: "Rio de Janeiro", country: "Brazil" },    
            { city: "Cape Town", country: "South Africa" },    
            { city: "Moscow", country: "Russia" },    
            { city: "Singapore", country: "Singapore" },    
            { city: "Dubai", country: "UAE" },    
            { city: "Berlin", country: "Germany" },    
            { city: "Toronto", country: "Canada" },    
            { city: "Mumbai", country: "India" },    
            { city: "Seoul", country: "South Korea" }    
        ],    
        conditions: [    
            "Clear skies",    
            "Partly cloudy",    
            "Overcast",    
            "Light rain",    
            "Heavy rain",    
            "Thunderstorm",    
            "Foggy",    
            "Snowing",    
            "Sunny",    
            "Windy"    
        ],    
        precipitationTypes: [    
            "None",    
            "Drizzle",    
            "Rain",    
            "Snow",    
            "Sleet",    
            "Hail"    
        ]    
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

        if (percentage === 100) {    
            return "Fully charged";    
        } else {    
            return `${hours}h ${minutes}m until full`;    
        }    
    } else {    
        const minutesPerPercent = Math.floor(Math.random() * 10) + 5;  
        const totalMinutes = percentage * minutesPerPercent;    

        const days = Math.floor(totalMinutes / (60 * 24));    
        const hours = Math.floor((totalMinutes % (60 * 24)) / 60);    
        const minutes = totalMinutes % 60;    

        if (days > 0) {    
            return `${days}d ${hours}h remaining`;    
        } else {    
            return `${hours}h ${minutes}m remaining`;    
        }    
    }    
}    


let currentWeatherData = null;    

function generateRandomWeather() {    
    if (currentWeatherData) {    
        return currentWeatherData;    
    }    
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

    currentWeatherData = {    
        location,    
        temperature,    
        condition,    
        humidity,    
        windSpeed,    
        precipitation,    
        precipChance    
    };    

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
        <p>Developed for fun and learning.</p>    
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
    return `<pre class="error">${text}</pre>`;    
}    

function triggerSystemBrick() {    
    isSystemBricked = true;    
    inputField.disabled = true;    
    prompt.style.display = 'none';    

    const brickMessage = document.createElement('p');    
    brickMessage.innerHTML = `<span class="highlight error">[!!! KERNEL PANIC !!!]</span><br>E: Unable to mount /system (Invalid argument). E: failed to mount /data (No such file or directory).<br>E: unable to mount /cache (I/O error)<br>E: failed to mount /vendor (Invalid argument)<br>E: init: terminating service. Please reboot the system.`;    
    brickMessage.style.color = '#ff6b6b';    
    brickMessage.style.fontWeight = 'bold';    
    output.appendChild(brickMessage);    
    scrollToBottom();    
}    

function toggleTerminal(visible) {    
    const terminal = document.querySelector('.terminal');    
    if (terminal) {    
        if (visible) {    
            terminal.style.display = 'block';    
            terminalVisible = true;    
            inputField.focus();    
        } else {    
            terminal.style.display = 'none';    
            terminalVisible = false;    
        }    
    }    
}    

function systemHalt() {    
    isSystemBricked = true;    
    inputField.disabled = true;    
    prompt.style.display = 'none';    

    const haltMessage = document.createElement('p');    
    haltMessage.innerHTML = `<span class="highlight error">[SYSTEM HALTED]</span><br>System has been manually halted.<br>Critical process stopped.<br>System unable to continue operation.<br>Please reboot to restore functionality.`;    
    haltMessage.style.color = '#ff6b6b';    
    haltMessage.style.fontWeight = 'bold';    
    output.appendChild(haltMessage);    
    scrollToBottom();    
}    

const commands = {    
    help: () => `    
        <p><span class="highlight">Available Commands:</span></p>    
        <p>help           - Shows this help message</p>    
        <p>clear          - Clears the terminal screen</p>    
        <p>echo [text]    - Prints the specified text</p>    
        <p>run [filename] - Executes a specified file (if runnable)</p>    
        <p>date           - Shows current date and time</p>    
        <p>neofetch       - Displays system information</p>    
        <p>whoami         - Shows current user</p>    
        <p>history        - Shows command history</p>    
        <p>battery        - Shows battery status</p>    
        <p>software       - Shows system changelog</p>    
        <p>weather        - Shows weather information</p>    
        <p>processes      - Lists running processes</p>    
        <p>calc [expr]    - Calculate mathematical expression</p>    
        <p>browser [site] - Access predefined terminal websites</p>    
        <p>stop [process] - Stop a process or component</p>    
        <p>fortune        - Get a random fortune message</p>    
        <p>cowsay [text]  - Display a cow saying your message</p>    
        <p>shutdown       - Shutsdown OrbitOS</p>    
        <p>reboot         - Reboots OrbitOS</p>    
        <p>dev            - access dev menu (custom os and etc)
    `,    

    clear: () => {    
        output.innerHTML = '';    
        return '';    
    },    

    echo: (args) => args ? `<p>${args}</p>` : '<p>Nothing to echo.</p>',    

    run: (args) => {    
        const filename = args.trim();    
        if (!filename) {    
            return '<p>Usage: run [filename]</p>';    
        }    
        if (maliciousFiles.includes(filename)) {    
            setTimeout(triggerSystemBrick, 1500);    
            return generateChaoticOutput() + `<p class="highlight">Executing ${filename}...</p>`;    
        } else {    
            return `<p>Error: File '${filename}' not found or cannot be executed.</p>`;    
        }    
    },    

    stop: (args) => {    
        const processName = args.trim().toLowerCase();    

        if (!processName) {    
            return '<p>Usage: stop [process]</p><p>Available processes: terminal, system, browser, process</p>';    
        }    

        if (processName === 'terminal') {    
            toggleTerminal(false);    
            return '<p class="highlight">Terminal interface stopped. Refresh page to restore.</p>';    
        }     
        else if (processName === 'system') {    
            setTimeout(systemHalt, 500);    
            return '<p class="highlight">WARNING: Critical system process stopping...</p>';    
        }    
        else if (processName === 'browser') {    
            if (stoppedProcesses.includes('browser')) {    
                return '<p class="error">Browser process already stopped.</p>';    
            }    
            stoppedProcesses.push('browser');    
            return '<p>Browser process stopped. "browser" command is now disabled.</p>';    
        }    
        else if (processName === 'process') {    
            const pid = Math.floor(Math.random() * 1000) + 1;    
            return `<p>Process with PID ${pid} stopped successfully.</p>`;    
        }    
        else {    
            return `<p class="error">Error: Process '${processName}' not found or cannot be stopped.</p>`;    
        }    
    },    

    date: () => `<p>${new Date().toLocaleString()}</p>`,    

    neofetch: () => {
        const { totalDisk, freeDisk, totalRAM, freeRAM } = config.dynamicStorage;
        return `
            <pre class="highlight">    
              /\\    
             /  \\    
            /    \\    
           /      \\    
          /   ◢◤   \\    
         /    ||    \\    
        /     ||     \\    
       /      ||      \\    
      /________________\\    
            </pre>    
            <p><span class="highlight">${config.systemInfo.os}</span>@${config.username}</p>    
            <p>-----------------</p>    
            <p>OS: ${config.systemInfo.os} ${config.systemInfo.version}</p>    
            <p>Kernel: ${config.systemInfo.kernel}</p>    
            <p>Architecture: ${config.systemInfo.architecture}</p>    
            <p>Total Disk: ${totalDisk.toFixed(2)} GB (${freeDisk.toFixed(2)} GB free)</p>
            <p>Total RAM: ${totalRAM.toFixed(2)} GB (${freeRAM.toFixed(2)} GB free)</p>
            <p>Uptime: ${getUptime()}</p>    
        `;
    },    

    whoami: () => `<p class="highlight">${config.username}@${config.hostname}</p>`,    

    history: () => commandHistory.map((cmd, i) => `<p>${i + 1}. ${cmd}</p>`).join('') || '<p>No command history yet.</p>',    

    battery: () => {    
        const percentage = config.batteryInfo.percentage;    
        const isCharging = config.batteryInfo.charging;    
        const timeRemaining = generateBatteryTimeRemaining(percentage, isCharging);    

        return `    
            <p>Battery Status:</p>    
            <p>Charge: ${percentage}%</p>    
            <p>Status: ${isCharging ? 'Charging' : 'Discharging'}</p>    
            <p>Time ${isCharging ? 'to full' : 'remaining'}: ${timeRemaining}</p>    
        `;    
    },    

    software: () => {
        const checkMessage = '<p style="color: #4ade80;">Checking for updates...</p>';

        setTimeout(() => {
            const updateMessage = document.createElement('div');
            updateMessage.innerHTML = `
                <p style="color: red;">No new updates found.</p>
                <p>Last successful update: September 13, 2025</p>
                <p>Version 3.4.3</p>
                <p>Changelog:</p>
                <ul>
                    <li>Removed files command (like ls, CD, cat) probably will come in future versions as I am remaking it</li>
                    <li>storage is now dynamic </li>
                    <li>Now, Orbit os is closed source. The GitHub repo has been set as private</li>


            </ul>
            `;
            output.appendChild(updateMessage);
            scrollToBottom();
        }, 1500);

        return checkMessage;
    },

    weather: () => {    
        const weather = generateRandomWeather();    
        const { location, temperature, condition, humidity, windSpeed, precipitation, precipChance } = weather;    

        return `    
            <p class="highlight">Current Weather:</p>    
            <p>Location: ${location.city}, ${location.country}</p>    
            <p>Temperature: ${temperature}°C</p>    
            <p>Condition: ${condition}</p>    
            <p>Humidity: ${humidity}%</p>    
            <p>Wind Speed: ${windSpeed} km/h</p>    
            <p>Precipitation: ${precipitation} (${precipChance}% chance)</p>    
        `;    
    },    

    processes: () => `    
        <p class="highlight">Running Processes:</p>    
        <p>1. system_core    (PID: 1)</p>    
        <p>2. terminal       (PID: 245)</p>    
        <p>3. user_session   (PID: 892)</p>    
        ${stoppedProcesses.length > 0 ? '<p class="highlight">Stopped Processes:</p>' +     
          stoppedProcesses.map(proc => `<p>- ${proc}</p>`).join('') : ''}    
    `,    

    shutdown: () => {    
        const response = '<p>Shutting down...</p>';    
        isSystemBricked = true;    
        inputField.disabled = true;    
        prompt.style.display = 'none';    
        setTimeout(() => {    
            document.body.innerHTML = '<p style="color: #ccc; font-family: monospace; text-align: center; margin-top: 50px;">System halted.</p>';    
        }, 1000);    
        return response;    
    },    

    reboot: async () => {    
        output.innerHTML = '<p>Rebooting system...</p>';    
        inputField.disabled = true;    
        prompt.style.display = 'none';    

        await new Promise(resolve => setTimeout(resolve, 1500));    
        await simulateBootSequence();    
        finalizeBootSequence();    
        return '';    
    },    

    calc: (args) => {    
        try {    
            if (!args) return "<p>Usage: calc [expression]</p>";    
            const safeArgs = args.replace(/[^-()\d/*+.]/g, '');    
            if (!safeArgs) return `<p>Error: Invalid characters in expression</p>`;    
            const result = new Function(`return ${safeArgs}`)();    
            return `<p>Result: ${result}</p>`;    
        } catch (error) {    
            console.error("Calc Error:", error);    
            return `<p>Error: Invalid expression or calculation failed</p>`;    
        }    
    },    

    browser: (args) => {    
        if (stoppedProcesses.includes('browser')) {    
            return '<p class="error">Browser process is stopped. Use "reboot" to restore functionality.</p>';    
        }    

        const siteName = args.trim();    
        if (!siteName) {    
             const availableSites = Object.keys(terminalSites).join(', ');    
            return `<p>Usage: browser [site_name]</p><p>Available sites: ${availableSites || 'None'}</p>`;    
        }    

        const siteContent = terminalSites[siteName];    

        if (siteContent) {    
            let browserOutput = `<p>Connecting to ${siteName}...</p>`;    
            browserOutput += `<p>Loading content...</p>`;    
            browserOutput += siteContent;    
            return browserOutput;    
        } else {    
            return `<p class="error">Error 404: Site '${siteName}' not found in terminal network.</p>`;    
        }    
    },

    fortune: () => {
        const fortunes = [
            "You will find a hidden treasure where you least expect it.",
            "A beautiful, smart, and loving person will be coming into your life.",
            "Your hard work is about to pay off. Remember, Rome wasn't built in a day.",
            "A dubious friend may be an enemy in camouflage.",
            "A faithful friend is a strong defense.",
            "A fresh start will put you on your way.",
            "A person of words and not deeds is like a garden full of weeds.",
            "All the effort you are making will ultimately pay off.",
            "An inch of time is an inch of gold.",
            "Any day above ground is a good day.",
            "Change is happening in your life, so go with the flow!",
            "Competence like yours is underrated.",
            "Curiosity kills boredom. Nothing kills curiosity.",
            "Dedicate yourself with a calm mind to the task at hand.",
            "Don't just spend time, invest it.",
            "Every wise man started out by asking many questions.",
            "Failure is the path of least persistence.",
            "Fear and desire – two sides of the same coin.",
            "Go take a rest; you deserve it.",
            "He who expects no gratitude shall never be disappointed.",
            "It is better to deal with problems before they arise.",
            "It's amazing how much good you can do if you don't care who gets the credit.",
            "Miles are covered one step at a time.",
            "The greatest risk is not taking one.",
            "The person who will not stand for something will fall for anything.",
            "There is no greater pleasure than seeing your loved ones prosper.",
            "You are far more influential than you think.",
            "Your ability to juggle many tasks will take you far.",
            "Your hard work will soon be rewarded."
        ];

        const randomIndex = Math.floor(Math.random() * fortunes.length);
        return `<p class="highlight">Fortune says:</p><p>${fortunes[randomIndex]}</p>`;
    },

    cowsay: (args) => {
        const message = args.trim() || "Moo!";

        const bubbleWidth = message.length + 2;
        const topLine = ` ${'_'.repeat(bubbleWidth)} `;
        const bottomLine = ` ${'-'.repeat(bubbleWidth)} `;
        const textLine = `< ${message} >`;

        const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
    `;

        return `<pre>${topLine}
${textLine}
${bottomLine}${cow}</pre>`;
    }    
};    

function getUptime() {    
    const now = new Date();    
    const boot = new Date(config.lastBootTime);    
    const diff = now - boot;    

    if (isNaN(diff) || diff < 0) {    
        return 'Calculating...';    
    }    

    let seconds = Math.floor(diff / 1000);    
    let minutes = Math.floor(seconds / 60);    
    let hours = Math.floor(minutes / 60);    
    let days = Math.floor(hours / 24);    

    hours %= 24;    
    minutes %= 60;    
    seconds %= 60;    

    let uptimeString = '';    
    if (days > 0) uptimeString += `${days} day(s) `;    
    if (hours > 0) uptimeString += `${hours} hour(s) `;    
    if (minutes > 0) uptimeString += `${minutes} minute(s) `;    

    return uptimeString.trim() || 'null';    
}    


function executeCommand(input) {    
     if (isSystemBricked) {    
        return '<p style="color: #ff6b6b;">E: Operation timed out</p>';    
    }    

    const trimmedInput = input.trim();    
    if (!trimmedInput) {    
        return '';    
    }    

    const [command, ...args] = trimmedInput.split(' ');    
    const lowerCaseCommand = command.toLowerCase();    
    const commandFunction = commands[lowerCaseCommand];    

     let outputResult;    
    if (typeof commandFunction === 'function') {    
        outputResult = commandFunction(args.join(' '));    
    } else {    
         outputResult = `<p>Command not found: ${command}. Type 'help' for available commands.</p>`;    
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
    const promptSpan = document.createElement('span');    
    promptSpan.className = 'highlight';    
    promptSpan.textContent = prompt.textContent;    
    const commandText = document.createTextNode(` ${input}`);    

    const commandPara = document.createElement('p');    
    commandPara.appendChild(promptSpan);    
    commandPara.appendChild(commandText);    
    commandDiv.appendChild(commandPara);    

    output.appendChild(commandDiv);    

    const response = executeCommand(input);    

    if (response) {    
        const responseDiv = document.createElement('div');    
        responseDiv.innerHTML = response;    

        if (response.includes('Error') || response.includes('not found') || response.includes('Kernel panic - not syncing') || response.includes('Corrupted block found on /data')) {    
           responseDiv.classList.add('error-message');    
        }    
        output.appendChild(responseDiv);    
    }    


    scrollToBottom();    
    inputField.value = '';    
}    

function scrollToBottom() {    
    setTimeout(() => {    
         output.scrollTop = output.scrollHeight;    
    }, 0);    
}    

function generateDynamicStorage() {
    // Generate random total disk size (e.g., 100-500 GB)
    const totalDisk = Math.floor(Math.random() * 401) + 100;
    // Generate random free disk space (e.g., 20-80% of total)
    const freeDisk = Math.floor(Math.random() * (totalDisk * 0.6) + totalDisk * 0.2);
    // Generate random total RAM (e.g., 8, 12, 16, 32 GB)
    const totalRAMOptions = [8, 12, 16, 32];
    const totalRAM = totalRAMOptions[Math.floor(Math.random() * totalRAMOptions.length)];
    // Generate random free RAM (e.g., 2-5 GB less than total)
    const freeRAM = Math.max(1, Math.floor(Math.random() * (totalRAM - 2) + 1));
    
    config.dynamicStorage = {
        totalDisk,
        freeDisk,
        totalRAM,
        freeRAM
    };
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
    if (isSystemBricked) {    
        event.preventDefault();    
        return;    
    }    

    if (event.key === 'Enter') {    
        event.preventDefault();    
        const input = inputField.value.trim();    
        if (input) {    
            displayResponse(input);    
        } else {    
            const commandDiv = document.createElement('div');    
            commandDiv.innerHTML = `<p><span class="highlight">${prompt.textContent}</span> </p>`;    
            output.appendChild(commandDiv);    
            scrollToBottom();    
        }    
        inputField.value = '';    
        historyIndex = commandHistory.length;    
    } else if (event.key === 'ArrowUp') {    
        event.preventDefault();    
        if (commandHistory.length > 0) {    
            if (historyIndex > 0) {    
                historyIndex--;    
            }    
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
})

let devToolsOpen = false;
let customOsInstallationActive = false;
let awaitingConfirmation = false;
let awaitingUrl = false;

function clearTerminalKeepIframe() {
    const iframes = output.querySelectorAll('iframe');
    const iframeContainers = [];

    iframes.forEach(iframe => {
        const container = iframe.closest('div');
        if (container && container.parentNode === output) {
            iframeContainers.push(container.cloneNode(true));
        }
    });

    output.innerHTML = '';

    iframeContainers.forEach(container => {
        output.appendChild(container);
    });

    scrollToBottom();
}

const devCommands = {
    'custom os': () => {
        if (!devToolsOpen) {
            return '<p class="error">Command not recognized. Type "help" for available commands.</p>';
        }

        customOsInstallationActive = true;  
        awaitingConfirmation = true;  

        return `  
            <p class="error">⚠️ Warning: Installing a custom ROM can cause severe and irreversible damage to your device. It may corrupt critical system files, prevent the device from booting, disable core functions, or permanently harm hardware components. Only proceed if you fully understand the risks, as improper installation can render your device completely unusable.</p>  
            <p>Type YES to continue and install a custom os</p>  
            <p>Type NO to cancel the installation.</p>  
        `;  
    }
};

commands.dev = () => {
    devToolsOpen = true;
    return `<p class="highlight">Developer Tools Activated</p><p>Additional commands unlocked.</p><p>Available dev commands: Custom os</p><p>Use with caution.</p>`;
};

function handleCustomOsInstallation(input) {
    const lowerInput = input.toLowerCase().trim();

    if (awaitingConfirmation) {  
        if (lowerInput === 'yes') {  
            awaitingConfirmation = false;  
            awaitingUrl = true;  
            return `  
                <p>Please enter the URL of the custom ROM you wish to install. Ensure the link is correct and points to a compatible ROM for this device. Any mistakes during installation can cause system instability, prevent the device from booting, or even permanently damage hardware. Double-check the source before proceeding.</p>  
            `;  
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
                const installationSteps = [  
                    '[BOOT] Preparing installation...',  
                    '[CHECK] ROM integrity check...',  
                    '[OK] Check passed.',  
                    '[SAVE] Backing up system snapshot...',  
                    '[FLASH] Writing system partitions...',  
                    '[PROGRESS] ██████████ 45%',  
                    '[PROGRESS] ███████████████ 72%',  
                    '[CONFIG] Applying default settings...',  
                    '[WARN] Some modules may not be stable.',  
                    '[OK] Flashing complete.',
                    '[WIPE] erasing system...',
                    '[WIPE] erasing userdata...',
                    '[INFO] Rebooting system...',
                ];  

                let stepIndex = 0;  
                const displayStep = () => {  
                    if (stepIndex < installationSteps.length) {  
                        const stepDiv = document.createElement('p');  
                        stepDiv.innerHTML = installationSteps[stepIndex];  
                        if (installationSteps[stepIndex].includes('[WARNING]')) {  
                            stepDiv.style.color = '#ffa500';  
                        } else if (installationSteps[stepIndex].includes('[OK]')) {  
                            stepDiv.style.color = '#4ade80';  
                        }  
                        output.appendChild(stepDiv);  
                        scrollToBottom();  
                        stepIndex++;  
                        setTimeout(displayStep, 800);  
                    } else {  
                        clearTerminalKeepIframe();

                        const iframeContainer = document.createElement('div');  
                        const iframe = document.createElement('iframe');  
                        iframe.src = input;  
                        iframe.style.cssText = 'width: 100%; height: 100%; border: none;';  
                        iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups';  

                        const iframeDiv = document.createElement('div');  
                        iframeDiv.style.cssText = 'width: 100%; height: 600px; border: 2px solid #4ade80; margin: 10px 0;';  
                        iframeDiv.appendChild(iframe);  

                        iframeContainer.innerHTML = '<p class="highlight">Booting up...</p>';  
                        iframeContainer.appendChild(iframeDiv);  

                        let loadTimeout;  
                        let hasLoaded = false;  

                        const triggerPanic = () => {  
                            if (!hasLoaded) {  
                                clearTimeout(loadTimeout);  
                                const panicMessage = document.createElement('p');  
                                panicMessage.innerHTML = `<span style="color: #ff0000; font-weight: bold;">[!!! KERNEL PANIC!!!]</span><br><span style="color: #ff0000;">Failed integrity check on /system.<br>Updater process ended with ERROR: 7.<br>Corrupted block found on /data<br>Installation aborted due to fatal error.<br>not syncing.</span>`;  
                                iframeContainer.appendChild(panicMessage);  
                                inputField.disabled = true;  
                                prompt.style.display = 'none';  
                            }  
                        };  

                        const markAsSuccess = () => {  
                            if (!hasLoaded) {  
                                hasLoaded = true;  
                                clearTimeout(loadTimeout);  
                                const successMsg = document.createElement('p');  
                                successMsg.innerHTML = `<span style="color: #4ade80;">System installed successfully</span>`;  
                                iframeContainer.appendChild(successMsg);
                            }  
                        };  

                        fetch(input, {   
                            method: 'HEAD',   
                            mode: 'no-cors',  
                            cache: 'no-cache'  
                        })  
                        .then(() => {  
                            iframe.onload = () => {  
                                setTimeout(markAsSuccess, 2000);  
                            };  

                            iframe.onerror = () => {  
                                triggerPanic();  
                            };  

                            loadTimeout = setTimeout(() => {  
                                try {  
                                    if (iframe.src === input || iframe.contentWindow) {  
                                        markAsSuccess();  
                                    } else {  
                                        triggerPanic();  
                                    }  
                                } catch(e) {  
                                    markAsSuccess();  
                                }  
                            }, 8000);  
                        })  
                        .catch(() => {  
                            triggerPanic();  
                        });  

                        output.appendChild(iframeContainer);  
                        scrollToBottom();  
                    }  
                };  
                displayStep();  
            }, 500);  

            return `<p>[IMAGE FLASH STARTED]: ${input}</p>`;  
        } else {  
            return '<p class="error">Invalid URL format. Please enter a valid URL starting with http:// or https://</p>';  
        }  
    }  

    return null;
}

function executeCommand(input) {
    if (isSystemBricked) {
        return '<p style="color: #ff6b6b;">Failed to mount /system. No such file or directory.</p>';
    }

    const trimmedInput = input.trim();  
    if (!trimmedInput) {  
        return '';  
    }  

    if (customOsInstallationActive) {  
        const customOsResult = handleCustomOsInstallation(trimmedInput);  
        if (customOsResult !== null) {  
            return customOsResult;  
        }  
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
        outputResult = `<p>Command not found: ${command}. Type 'help' for available commands.</p>`;  
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
    const promptSpan = document.createElement('span');
    promptSpan.className = 'highlight';
    promptSpan.textContent = prompt.textContent;
    const commandText = document.createTextNode(` ${input}`);

    const commandPara = document.createElement('p');
    commandPara.appendChild(promptSpan);
    commandPara.appendChild(commandText);
    commandDiv.appendChild(commandPara);

    output.appendChild(commandDiv);

    const response = executeCommand(input);

    if (response) {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = response;

        if (response.includes('Error') || response.includes('not found') || response.includes('Kernel panic - not syncing') || response.includes('Corrupted block found on /data')) {
            responseDiv.classList.add('error-message');
        }
        output.appendChild(responseDiv);
    }

    scrollToBottom();
    inputField.value = '';
}

function scrollToBottom() {
    setTimeout(() => {
        output.scrollTop = output.scrollHeight;
    }, 0);
}
