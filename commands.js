const commands = {
    help: () => `
        <p><span class="highlight">Available Commands:</span></p>
        <p>help           - Shows this help message</p>
        <p>fonts          - Change the terminal font</p>
        <p>clear          - Clears the terminal screen</p>
        <p>echo [text]    - Prints the specified text</p>
        <p>run [filename] - Executes a specified file (if runnable)</p>
        <p>date           - Shows current date and time</p>
        <p>fastfetch      - Displays system information</p>
        <p>whoami         - Shows current user</p>
        <p>history        - Shows command history</p>
        <p>battery        - Shows battery status</p>
        <p>software       - Shows system changelog</p>
        <p>weather        - Shows weather information</p>
        <p>processes      - Lists running processes</p>
        <p>calc [expr]    - Calculate mathematical expression</p>
        <p>browser [url]  - Opens a URL in an iframe</p>
        <p>stop [process] - Stop a process or component</p>
        <p>fortune        - Get a random fortune</p>
        <p>cowsay [text]  - Display a cow saying your message</p>
        <p>shutdown       - Shutsdown OrbitOS</p>
        <p>reboot         - Reboots OrbitOS</p>
    `,

    fonts: (args) => {
        const fontNumber = parseInt(args.trim());
        if (!args || isNaN(fontNumber)) {
            return `
                <p>Available fonts:</p>
                <p>1. JetBrains Mono (Default)</p>
                <p>2. Fira Code</p>
                <p>3. Source Code Pro</p>
                <p>4. IBM Plex Mono</p>
                <p>5. Anonymous Pro</p>
                <p>Usage: fonts [number]</p>
            `;
        }
        if (applyFont(fontNumber)) {
             return `<p>Font updated successfully.</p>`;
        } else {
            return `<p style="color: red;">Error: Invalid font number. Please choose a number between 1 and 5.</p>`;
        }
    },

    clear: () => {
        output.innerHTML = '';
        return '';
    },

    echo: (args) => args ? `<p>${args}</p>` : '<p>Nothing to echo.</p>',

    run: (args) => {
        return `<p style="color: red;">Error: No runnable files found in the current system.</p>`;
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
                return '<p style="color: red;">Browser process already stopped.</p>';
            }
            stoppedProcesses.push('browser');
            return '<p>Browser process stopped. "browser" command is now disabled.</p>';
        }
        else if (processName === 'process') {
            const pid = Math.floor(Math.random() * 1000) + 1;
            return `<p>Process with PID ${pid} stopped successfully.</p>`;
        }
        else {
            return `<p style="color: red;">Error: Process '${processName}' not found or cannot be stopped.</p>`;
        }
    },

    date: () => `<p>${new Date().toLocaleString()}</p>`,

    fastfetch: () => {
        const { totalDisk, freeDisk, totalRAM, freeRAM } = config.dynamicStorage;
        return `
            <pre class="highlight" style="font-family: 'JetBrains Mono', monospace;">
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
        const checkMessage = '<p>Checking for updates...</p>';

        setTimeout(() => {
            const updateMessage = document.createElement('div');
            updateMessage.innerHTML = `
                <p style="color: green;">You are using the latest version!</p>
                <p>Last successful update: 1 October 2025</p>
                <p>Version 3.5.4 (stable)</p>
                <p></p>
                <p>Changelog:</p>
                <ul>
                    <li>• Important security updates to enhance system stability.</li>
                    <li>• Fixed several minor bugs and performance issues.</li>
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
            document.body.innerHTML = '<p style="color: #ccc; font-family: JetBrains Mono, monospace; text-align: center; margin-top: 50px;">System halted.</p>';
        }, 1000);
        return response;
    },

    reboot: () => {
        output.innerHTML = '<p>Rebooting system...</p>';
        inputField.disabled = true;
        prompt.style.display = 'none';


        (async () => {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (typeof simulateBootSequence === 'function') {
                await simulateBootSequence();
            }
            if (typeof finalizeBootSequence === 'function') {
               finalizeBootSequence();
            }
        })();

        return '';
    },

    calc: (args) => {
        try {
            if (!args) return "<p>Usage: calc [expression]</p>";
            const safeArgs = args.replace(/[^-()\d/*+.]/g, '');
            if (!safeArgs) return `<p style="color: red;">Error: Invalid characters in expression</p>`;
            const result = new Function(`return ${safeArgs}`)();
            return `<p>Result: ${result}</p>`;
        } catch (error) {
            console.error("Calc Error:", error);
            return `<p style="color: red;">Error: Invalid expression or calculation failed</p>`;
        }
    },

    browser: (args) => {
        if (stoppedProcesses.includes('browser')) {
            return '<p style="color: red;">Browser process is stopped. Use "reboot" to restore functionality.</p>';
        }

        const url = args.trim();
        if (!url) {
            return `<p>Usage: browser [url]</p><p>Example: browser https://example.com</p>`;
        }

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `<p style="color: red;">Invalid URL. Please include http:// or https://</p>`;
        }

        return `
            <p class="highlight" style="color: var(--error-color);">
            ⚠️ OrbitOS uses a sandboxed iframe to load sites. Not all sites may load or function correctly.
            </p>
            <p>Loading ${url}...</p>
            <div style="width:100%; height:600px; border: 1px solid #444; margin-top: 10px; background-color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); overflow: hidden;">
                <iframe src="${url}" style="width:100%; height:100%; border:none;" sandbox="allow-scripts allow-same-origin"></iframe>
            </div>
        `;
    },

    fortune: () => {
        const fortunes = [
            "The early bird gets the worm, but the second mouse gets the cheese.",
            "A wise man once said nothing.",
            "You will find a thing. It may be a new thing, or it may be a thing you have lost.",
            "The journey of a thousand miles begins with a single step. And a flat tire.",
            "Your reality check is about to bounce.",
            "If you can't convince them, confuse them.",
            "An alien of some sort will be appearing to you shortly.",
            "You are not illiterate."
        ];

        const randomIndex = Math.floor(Math.random() * fortunes.length);
        return `<p class="highlight">Your fortune:</p><p>${fortunes[randomIndex]}</p>`;
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

        return `<pre style="font-family: 'JetBrains Mono', monospace;">${topLine}
${textLine}
${bottomLine}${cow}</pre>`;
    },

    rm: (args) => {
        const validFlags = ['-rf', '-rf /', '-rf --no-preserve-root'];
        if (!validFlags.includes(args.trim())) {
             return `<p>rm: missing operand</p><p>Try 'rm --help' for more information.</p>`;
        }

        inputField.disabled = true;
        prompt.style.display = 'none';

        const generateRandomPath = () => {
            const dirs = ['/bin', '/etc', '/home', '/usr', '/var', '/lib', '/root', '/tmp', '/dev', '/proc', '/sbin', '/opt'];
            const subdirs = ['local', 'share', 'log', 'mail', 'spool', 'games', 'X11R6', 'include', 'config', 'cache', 'www'];
            const files = ['kernel.log', 'config.sys', 'profile', 'bashrc', 'shadow', 'passwd', 'fstab', 'hosts', 'null', 'random', 'zero', 'vmlinuz', 'initrd.img'];

            let path = dirs[Math.floor(Math.random() * dirs.length)];
            const depth = Math.floor(Math.random() * 4);

            for (let i = 0; i < depth; i++) {
                path += '/' + subdirs[Math.floor(Math.random() * subdirs.length)];
            }

            path += '/' + files[Math.floor(Math.random() * files.length)] + Math.random().toString(36).substring(2, 8);
            return path;
        };

        const deletionInterval = setInterval(() => {
            const errorElement = document.createElement('p');
            errorElement.style.color = 'red';
            errorElement.style.margin = '0';
            errorElement.style.lineHeight = '1.2';
            errorElement.textContent = `rm: cannot remove '${generateRandomPath()}': No such file or directory`;
            output.appendChild(errorElement);
            scrollToBottom();
        }, 40);

        setTimeout(() => {
            clearInterval(deletionInterval);
            document.body.innerHTML = `<div style="background-color: #0000AA; color: #FFFFFF; width: 100%; height: 100vh; font-family: 'Perfect DOS VGA', monospace; padding: 2em; box-sizing: border-box;">
                <p style="text-align: center; background-color: #CCCCCC; color: #0000AA; display: inline-block; padding: 0 0.5em;"> BIOS </p>
                <p>A fatal exception 0E has occurred at 0137:BFF73456. /sys could not be mounted.</p>
                <br>
                <p>* Press any key to try again</p>
                <p>* Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.</p>
                <br>
                <p style="text-align: center;">Press any key to continue _</p>
            </div>`;
        }, 8000);

        return '';
    }
};

