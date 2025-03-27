const output = document.getElementById('output');
const inputField = document.getElementById('input');
const prompt = document.getElementById('prompt');

let commandHistory = [];
let historyIndex = -1;

const config = {
    username: 'root',
    hostname: 'orbit',
    version: '3.0.1',
    lastBootTime: new Date().toLocaleString(),
    systemInfo: {
        os: 'OrbitOS',
        version: '3.0.1 - stable',
        kernel: '5.4.0-1059-gcp',
        architecture: 'x86_64',
        memory: '4.0GiB',
        disk: '1.0GiB',
        processes: 3,
    },
};

const commands = {
    help: () => `
        <p><span class="highlight">Available Commands:</span></p>
        <p>help           - Shows this help message</p>
        <p>clear          - Clears the terminal screen</p>
        <p>echo [text]    - Prints the specified text</p>
        <p>ls            - Lists files in current directory</p>
        <p>date          - Shows current date and time</p>
        <p>neofetch      - Displays system information</p>
        <p>whoami        - Shows current user</p>
        <p>history       - Shows command history</p>
        <p>battery       - Shows battery status</p>
        <p>software      - Shows system changelog</p>
        <p>weather       - Shows weather information</p>
        <p>processes     - Lists running processes</p>
        <p>shutdown      - Shutsdown OrbitOS</p>
        <p>calc    - Calculate something</p>
    `,

    clear: () => {
        output.innerHTML = '';
        return 'Terminal cleared.';
    },

    echo: (args) => args || 'Nothing to echo.',

    ls: () => `
        <p class="highlight">Current directory contents:</p>
        <p>📁 Documents/</p>
        <p>📁 Downloads/</p>
        <p>📁 Pictures/</p>
        <p>📄 system.log</p>
        <p>📄 readme.md</p>
    `,

    date: () => new Date().toLocaleString(),

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

    history: () => commandHistory.map((cmd, i) => `<p>${i + 1}. ${cmd}</p>`).join(''),

    battery: () => `
        <p>Battery Status:</p>
        <p>Charge: 100%</p>
        <p>Status: Not charging</p>
        <p>Time remaining: 2d 7h</p>
    `,

    software: () => `
        <p class="highlight">OrbitOS ${config.version} Changelog:</p>
        <p>🧮 Added calculator command</p>
        <p>📴 Renamed "exit" command to "shutdown"</p>
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
        const response = 'Shutting down...';
        setTimeout(() => {
            window.close();
        }, 1000);
        return response;
    },

    calc: (args) => {
        try {
            if (!args) return "Usage: calc [expression]";
            const result = eval(args.replace(/[^-()\d/*+.]/g, ''));
            return `<p>Result: ${result}</p>`;
        } catch (error) {
            return `<p>Error: Invalid expression</p>`;
        }
    },
};

function getUptime() {
    const now = new Date();
    const boot = new Date(config.lastBootTime);
    const diff = now - boot;
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minutes`;
}

function executeCommand(input) {
    const [command, ...args] = input.trim().toLowerCase().split(' ');
    const output = commands[command]
        ? commands[command](args.join(' '))
        : `Command not found: ${command}. Type 'help' for available commands.`;

    if (command) {
        commandHistory.push(input);
        historyIndex = commandHistory.length;
    }

    return output;
}

function displayResponse(input) {
    const commandDiv = document.createElement('div');
    commandDiv.innerHTML = `<p><span class="highlight">${prompt.textContent}</span> ${input}</p>`;
    output.appendChild(commandDiv);

    const responseDiv = document.createElement('div');
    responseDiv.innerHTML = executeCommand(input);
    output.appendChild(responseDiv);

    scrollToBottom();
    inputField.value = '';
}

function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
}

inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const input = inputField.value.trim();
        if (input) {
            displayResponse(input);
        }
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            inputField.value = commandHistory[historyIndex];
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputField.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            inputField.value = '';
        }
    }
});

document.querySelector('.terminal').addEventListener('click', () => {
    inputField.focus();
});
