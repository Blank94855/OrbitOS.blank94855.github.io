const output = document.getElementById('output');
const inputField = document.getElementById('input');
const prompt = document.getElementById('prompt');


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
    return new Promise((resolve) => {
        output.innerHTML = '';

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
}

let commandHistory = [];
let historyIndex = -1;

const config = {
    username: 'root',
    hostname: 'orbit',
    version: '3.1',
    lastBootTime: new Date().toLocaleString(),
    systemInfo: {
        os: 'OrbitOS',
        version: '3.1 - beta',
        kernel: '5.4.1-1059-gcp',
        architecture: 'x86_64',
        memory: '4.0GiB',
        disk: '1.0GiB',
        processes: 3,
    },
};

const terminalSites = {
    'notavirus.zip': `
        <p class="highlight">--- notavirus.zip ---</p>
        <p>Scanning contents...</p>
        <p>...</p>
        <p>Definitely not a virus. Contents:</p>
        <p>  - totally_safe.exe</p>
        <p>  - free_money.txt</p>
        <p>  - instructions.rtf</p>
        <p class="highlight">Scan complete. No threats detected (probably).</p>
    `,
    'google.term': `
        <p><span class="highlight">Google.term Search</span></p>
        <p>----------------------</p>
        <p>Enter search query:</p>
        <p> [____________________]</p>
        <p>(Search functionality not implemented in this simulation)</p>
    `,
    'news.orb': `
        <p><span class="highlight">OrbitOS News Feed</span></p>
        <p>-------------------</p>
        <p>- OrbitOS version 3.1 is here.</p>
        <p>- New 'browser' command added!.</p>
        <p>- Weather in Terminal City: Still clear.</p>
        <p>- Local cat discovers infinite treat loop.</p>
        `,  
    'about.os': `
        <p><span class="highlight">About OrbitOS</span></p>
        <p>Version: ${config.systemInfo.version}</p>
        <p>Kernel: ${config.systemInfo.kernel}</p>
        <p>A lightweight, terminal-focused operating system simulation.</p>
        <p>Developed for fun and learning.</p>
    `
};


const commands = {
    help: () => `
        <p><span class="highlight">Available Commands:</span></p>
        <p>help           - Shows this help message</p>
        <p>clear          - Clears the terminal screen</p>
        <p>echo [text]    - Prints the specified text</p>
        <p>ls             - Lists files in current directory</p>
        <p>date           - Shows current date and time</p>
        <p>neofetch       - Displays system information</p>
        <p>whoami         - Shows current user</p>
        <p>history        - Shows command history</p>
        <p>battery        - Shows battery status</p>
        <p>software       - Shows system changelog</p>
        <p>weather        - Shows weather information</p>
        <p>processes      - Lists running processes</p>
        <p>calc [expr]    - Calculate mathematical expression</p>
        <p>browser [site] - Access predefined terminal websites</p> <p>shutdown       - Shutsdown OrbitOS</p>
    `, 

    clear: () => {
        output.innerHTML = '';
        return ''; 
    },

    echo: (args) => args ? `<p>${args}</p>` : '<p>Nothing to echo.</p>', // Wrap in <p> for consistency

    ls: () => `
        <p class="highlight">Current directory contents:</p>
        <p>📁 Documents/</p>
        <p>📁 Downloads/</p>
        <p>📁 Pictures/</p>
        <p>📄 system.log</p>
        <p>📄 readme.md</p>
    `,

    date: () => `<p>${new Date().toLocaleString()}</p>`, // Wrap in <p>

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

    history: () => commandHistory.map((cmd, i) => `<p>${i + 1}. ${cmd}</p>`).join('') || '<p>No command history yet.</p>', // Handle empty history

    battery: () => `
        <p>Battery Status:</p>
        <p>Charge: 100%</p>
        <p>Status: Not charging</p>
        <p>Time remaining: 2d 7h</p>
    `,

    software: () => `
        <p class="highlight">OrbitOS ${config.version} Changelog:</p>
        <p>Orbit OS 3.1 is here.   .</p>
        <p>✅ Added 'browser' command.</p>
        <p>⛔ System improvements.</p>
    `,

    weather: () => `
        <p class="highlight">Current Weather:</p>
        <p>Location: Terminal City</p>
        <p>Temperature: 22°C</p>
        <p>Condition: Clear skies</p>
        <p>Humidity: 45%</p>
    `,

    processes: () => `
        <p class="highlight">Running Processes:</p>
        <p>1. system_core    (PID: 1)</p>
        <p>2. terminal       (PID: 245)</p>
        <p>3. user_session   (PID: 892)</p>
    `,

    shutdown: () => {
        const response = '<p>Shutting down...</p>';
        setTimeout(() => {
            
            document.body.innerHTML = '<p style="color: #ccc; font-family: monospace;">System halted.</p>';
        }, 1000);
        return response;
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
            return `<p>Usage: browser [site_name]</p><p>Available sites: ${Object.keys(terminalSites).join(', ')}</p>`;
        }

        const siteContent = terminalSites[siteName];

        if (siteContent) {
            
            let output = `<p>Connecting to ${siteName}...</p>`;
            output += `<p>Loading content...</p>`;
            output += siteContent; 
            return output;
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
    const trimmedInput = input.trim();
    if (!trimmedInput) {
        return '';
    }

    const [command, ...args] = trimmedInput.split(' ');
    const lowerCaseCommand = command.toLowerCase(); 
    const outputResult = commands[lowerCaseCommand]
        ? commands[lowerCaseCommand](args.join(' '))
        : `<p>Command not found: ${command}. Type 'help' for available commands.</p>`;

    
    if (commands[lowerCaseCommand] || trimmedInput) {
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

    const responseDiv = document.createElement('div');
    
    responseDiv.innerHTML = executeCommand(input);
    
    if (responseDiv.innerHTML.includes('Error') || responseDiv.innerHTML.includes('not found')) {
       responseDiv.classList.add('error-message');
    }
     if (responseDiv.innerHTML) {
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
    inputField.disabled = true; 
    prompt.style.display = 'none'; 
    await simulateBootSequence();
    finalizeBootSequence();
    inputField.disabled = false; 
    prompt.style.display = 'inline'; 
    inputField.focus();
    prompt.textContent = `${config.username}@${config.hostname}:~$`;
});

inputField.addEventListener('keydown', function (event) {
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
    
    if (e.target !== inputField) {
      inputField.focus();
    }
});
