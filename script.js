const output = document.getElementById('output');
const inputField = document.getElementById('input');
const prompt = document.getElementById('prompt');

let isSystemBricked = false;

const bootSequence = [
    "Initializing OS...",
    "Checking hardware compatibility...",
    "Loading kernel 5.4.1-1059-gcp...",
    "Mounting root filesystem...",
    "Setting up system directories...",
    "Configuring network interfaces...",
    "Loading system modules...",
    "Initializing security protocols...",
    "Checking system integrity...",
    "Updating system components...",
    "Applying security patches...",
    "Starting system services...",
    "Loading user environment...",
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
        <p class="highlight">Security patch: 1 April 2025</p>
    `;
    inputField.disabled = false;
    prompt.style.display = 'inline';
    inputField.focus();
    prompt.textContent = `${config.username}@${config.hostname}:~$`;
}

let commandHistory = [];
let historyIndex = -1;

const config = {
    username: 'root',
    hostname: 'orbit',
    version: '3.2',
    lastBootTime: new Date().toLocaleString(),
    systemInfo: {
        os: 'OrbitOS',
        version: '3.2 - beta',
        kernel: '5.4.1-1059-gcp',
        architecture: 'x86_64',
        memory: '4.0GiB',
        disk: '1.0GiB',
        processes: 3,
    },

    batteryInfo: {
        percentage: Math.floor(Math.random() * 100) + 1, // 1-100%
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
    }
};


function generateBatteryTimeRemaining(percentage, isCharging) {
    if (isCharging) {

        const remainingPercentage = 100 - percentage;
        const minutesPerPercent = Math.floor(Math.random() * 2) + 1; // 1-2 minutes per percent
        const totalMinutes = remainingPercentage * minutesPerPercent;

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (percentage === 100) {
            return "Fully charged";
        } else {
            return `${hours}h ${minutes}m until full`;
        }
    } else {

        const minutesPerPercent = Math.floor(Math.random() * 10) + 5; // 5-15 minutes per percent
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
        <p>- OrbitOS version 3.2 is here.</p>
        <p>- Battery & weather is now dynamic!.</p>
        
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
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
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
    brickMessage.innerHTML = `<span class="highlight error">[!!! KERNEL PANIC !!!]</span><br>System integrity compromised. Unrecoverable error.<br>Corrupted sector: 0xDEADBEEF<br>Unable to load core modules.<br>System halted. Please reboot the system.`;
    brickMessage.style.color = '#ff6b6b';
    brickMessage.style.fontWeight = 'bold';
    output.appendChild(brickMessage);
    scrollToBottom();
}


const commands = {
    help: () => `
        <p><span class="highlight">Available Commands:</span></p>
        <p>help           - Shows this help message</p>
        <p>clear          - Clears the terminal screen</p>
        <p>echo [text]    - Prints the specified text</p>
        <p>ls             - Lists files in current directory</p>
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
        <p>shutdown       - Shutsdown OrbitOS</p>
        <p>reboot         - Reboots OrbitOS</p>
    `,

    clear: () => {
        output.innerHTML = '';
        return '';
    },

    echo: (args) => args ? `<p>${args}</p>` : '<p>Nothing to echo.</p>',

    ls: () => `
        <p class="highlight">Current directory contents:</p>
        <p>📁 Documents/</p>
        <p>📁 Downloads/</p>
        <p>📁 Pictures/</p>
        <p>📄 system.log</p>
        <p>📄 readme.md</p>
        <p>📄 notavirus.zip (Use browser to view contents)</p>
    `,

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


    date: () => `<p>${new Date().toLocaleString()}</p>`,

    neofetch: () => `
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
        <p>Memory: ${config.systemInfo.memory}</p>
        <p>Disk: ${config.systemInfo.disk}</p>
        <p>Uptime: ${getUptime()}</p>
    `,

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

    software: () => `
        <p class="highlight">OrbitOS ${config.version} Changelog:</p>
        <p>Orbit OS 3.3 is here.</p>
        <p>✅ Battery & weather are now dynamic!</p>
        <p>⛔ System improvements.</p>
    `,

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

    return uptimeString.trim() || 'Just booted';
}


function executeCommand(input) {
     if (isSystemBricked) {
        return '<p style="color: #ff6b6b;">System unresponsive.</p>';
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

        if (response.includes('Error') || response.includes('not found') || response.includes('KERNEL PANIC')) {
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


window.addEventListener('DOMContentLoaded', async () => {
    
    config.batteryInfo.percentage = Math.floor(Math.random() * 100) + 1;
    config.batteryInfo.charging = Math.random() > 0.5;
    
    
    generateRandomWeather();

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
});
