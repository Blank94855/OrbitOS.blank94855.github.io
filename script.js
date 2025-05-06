const output = document.getElementById('output');
const inputField = document.getElementById('input');
const prompt = document.getElementById('prompt');

let isSystemBricked = false;
let terminalVisible = true;
let stoppedProcesses = [];

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
        <p class="highlight">Security patch: 1 May 2025</p>
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
    version: '3.3.1',
    lastBootTime: new Date().toLocaleString(),
    systemInfo: {
        os: 'OrbitOS',
        version: '3.3.1 - beta',
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
    },
    
    fortuneCookies: [
        "You will find happiness in unexpected places.",
        "A journey of a thousand miles begins with a single step.",
        "The greatest risk is not taking one.",
        "Your code will compile on the first try... someday.",
        "A bug in hand is worth two in production.",
        "Fortune favors the bold. And the backups.",
        "You will meet a tall, dark, and handsome... error message.",
        "Have you tried turning it off and on again?",
        "The best firewall is common sense.",
        "A watched pot never boils, but an unwatched terminal crashes.",
        "Two factor authentication is your friend.",
        "Beware of malware disguised as kittens.",
        "The cloud is just someone else's computer.",
        "Your password is probably not as secure as you think.",
        "Always read the documentation. Twice."
    ],
    
    cowsayAnimals: [
        "cow", "tux", "sheep", "dragon", "kitty"
    ],
    
    jokes: [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "There are 10 types of people in this world: those who understand binary, and those who don't.",
        "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
        "Why did the developer go broke? Because he used up all his cache.",
        "!false, it's funny because it's true!",
        "What do you call a computer that sings? A Dell.",
        "Why don't programmers like nature? It has too many bugs and no debugging tool.",
        "What is a programmer's favorite hangout place? Foo Bar.",
        "Why was the function sad after a party? It didn't get called."
    ]
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
        <p>- Fun commands added: fortune, joke, cowsay, and figlet!</p>
        
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

function generateCowsay(text, animal) {
    const animalArt = getCowsayAnimal(animal || 'cow');
    const message = text || 'Moo!';
    
    // Create speech bubble
    const lines = message.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    const border = '_' + '_'.repeat(maxLength + 2) + '_';
    
    let speech = border + '\n';
    
    if (lines.length === 1) {
        speech += `< ${message} >\n`;
    } else {
        speech += `/ ${lines[0].padEnd(maxLength, ' ')} \\\n`;
        for (let i = 1; i < lines.length - 1; i++) {
            speech += `| ${lines[i].padEnd(maxLength, ' ')} |\n`;
        }
        speech += `\\ ${lines[lines.length - 1].padEnd(maxLength, ' ')} /\n`;
    }
    
    speech += '-' + '-'.repeat(maxLength + 2) + '-\n';
    speech += animalArt;
    
    return speech;
}

function getCowsayAnimal(animal) {
    const animals = {
        'cow': `        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
        'tux': `        \\
         \\
          \\
           \\
            \\ .--.
             |o_o |
             |:_/ |
            //   \\ \\
           (|     | )
          /'\\_   _/\`\\
          \\___)=(___/`,
        'sheep': `        \\
         \\
          \\
           \\
              __     
             /  \\    
            ( oo )   
            (____) 
              ||   
              ||   
             ^^^^  `,
        'dragon': `      \\                    / \\  //\\
       \\    |\\___/|      /   \\//  \\\\
            /0  0  \\__  /    //  | \\ \\    
           /     /  \\/_/    //   |  \\  \\  
           @_^_@'/   \\/_   //    |   \\   \\ 
           //_^_/     \\/_ //     |    \\    \\
        ( //) |        \\///      |     \\     \\
      ( / /) _|_ /   )  //       |      \\     _\\
    ( // /) '/,_ _ _/  ( ; -.    |    _ _\\.-~        .-~~~^-.
  (( / / )) ,-{        _      \`-.|.-~-.           .~         \`.
 (( // / ))  '/\\      /                 ~-. _ .-~      .-~^-.  \\
 (( /// ))      \`.   {            }                   /      \\  \\
  (( / ))     .----~-.\\        \\-'                 .~         \\  \`. \\^-.
             ///.----..>        \\             _ -~             \`.  ^-\`  ^-_
               ///-._ _ _ _ _ _ _}^ - - - - ~                     ~-- ,.-~
                                                                  /.-~`,
        'kitty': `     \\
      \\
       \\ /\\_/\\
        (o.o)
         >^<`
    };
    
    return animals[animal.toLowerCase()] || animals['cow'];
}

function getFigletText(text) {
    // Simple ASCII art generator for text
    // This is a very basic implementation
    const fontMap = {
        'A': [
            "  /\\  ",
            " /  \\ ",
            "/----\\",
            "|    |"
        ],
        'B': [
            "|--, ",
            "|--< ",
            "|--' ",
            "    "
        ],
        'C': [
            " --- ",
            "|    ",
            "|    ",
            " --- "
        ],
        'D': [
            "|--. ",
            "|   |",
            "|   |",
            "|--' "
        ],
        'E': [
            "|--- ",
            "|--- ",
            "|    ",
            "|--- "
        ],
        'F': [
            "|--- ",
            "|--- ",
            "|    ",
            "|    "
        ],
        'G': [
            " --- ",
            "|    ",
            "| -- ",
            " --- "
        ],
        'H': [
            "|   |",
            "|---|",
            "|   |",
            "|   |"
        ],
        'I': [
            "--- ",
            " |  ",
            " |  ",
            "--- "
        ],
        'J': [
            "    |",
            "    |",
            "|   |",
            " --- "
        ],
        'K': [
            "|  / ",
            "|-/  ",
            "| \\  ",
            "|  \\ "
        ],
        'L': [
            "|    ",
            "|    ",
            "|    ",
            "|--- "
        ],
        'M': [
            "|\\  /|",
            "| \\/ |",
            "|    |",
            "|    |"
        ],
        'N': [
            "|\\  |",
            "| \\ |",
            "|  \\|",
            "|   |"
        ],
        'O': [
            " --- ",
            "|   |",
            "|   |",
            " --- "
        ],
        'P': [
            "|--- ",
            "|   |",
            "|--- ",
            "|    "
        ],
        'Q': [
            " --- ",
            "|   |",
            "|  \\|",
            " ---\\"
        ],
        'R': [
            "|--  ",
            "|  \\ ",
            "| - \\",
            "|   |"
        ],
        'S': [
            " --- ",
            "|    ",
            "    |",
            " --- "
        ],
        'T': [
            "-----",
            "  |  ",
            "  |  ",
            "  |  "
        ],
        'U': [
            "|   |",
            "|   |",
            "|   |",
            " --- "
        ],
        'V': [
            "\\   /",
            " \\ / ",
            "  V  ",
            "     "
        ],
        'W': [
            "|   |",
            "|   |",
            "| / |",
            " V V "
        ],
        'X': [
            "\\ / ",
            " X  ",
            "/ \\ ",
            "    "
        ],
        'Y': [
            "\\   /",
            " \\ / ",
            "  |  ",
            "  |  "
        ],
        'Z': [
            "----",
            "  / ",
            " /  ",
            "----"
        ],
        ' ': [
            "    ",
            "    ",
            "    ",
            "    "
        ],
        '!': [
            " | ",
            " | ",
            " | ",
            " o "
        ],
        '.': [
            "   ",
            "   ",
            "   ",
            " o "
        ],
        ',': [
            "   ",
            "   ",
            "   ",
            " / "
        ],
        '?': [
            " -- ",
            "   /",
            "    ",
            "  o "
        ],
        '0': [
            " --- ",
            "|   |",
            "|   |",
            " --- "
        ],
        '1': [
            " /| ",
            "/ | ",
            "  | ",
            "----"
        ],
        '2': [
            " --- ",
            "    |",
            " /   ",
            "/----"
        ],
        '3': [
            " --- ",
            "  __|",
            "    |",
            " --- "
        ],
        '4': [
            "|  | ",
            "|  | ",
            "|---|",
            "   | "
        ],
        '5': [
            "|----",
            "|--- ",
            "    |",
            "---- "
        ],
        '6': [
            " --- ",
            "|    ",
            "|--- ",
            " --- "
        ],
        '7': [
            "-----",
            "   / ",
            "  /  ",
            " /   "
        ],
        '8': [
            " --- ",
            "|---|",
            "|   |",
            " --- "
        ],
        '9': [
            " --- ",
            "|   |",
            " ---|",
            " --- "
        ]
    };
    
    const textUpper = text.toUpperCase();
    let result = ['', '', '', ''];
    
    for (let i = 0; i < textUpper.length; i++) {
        const char = textUpper[i];
        const charLines = fontMap[char] || fontMap[' '];
        
        for (let line = 0; line < 4; line++) {
            result[line] += charLines[line];
        }
    }
    
    return result.join('\n');
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
        <p>stop [process] - Stop a process or component</p>
        <p>shutdown       - Shutsdown OrbitOS</p>
        <p>reboot         - Reboots OrbitOS</p>
        <p class="highlight">Fun Commands:</p>
        <p>fortune        - Displays a random fortune cookie message</p>
        <p>cowsay [text]  - Makes an ASCII cow say something</p>
        <p>joke           - Tells a programming joke</p>
        <p>figlet [text]  - Creates ASCII art text</p>
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
        <p>Orbit OS 3.3.1 upgrade.</p>
        
        <p>✅ New 'stop' command to halt processes</p>
        <p>✅ Added fun commands: fortune, cowsay, joke, figlet</p>
        <p>⛔ May security updates applied</p>
        <p>⛔ System improvements</p>
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