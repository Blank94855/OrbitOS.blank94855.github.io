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
                return '<p class="error-message">Browser process already stopped.</p>';    
            }    
            stoppedProcesses.push('browser');    
            return '<p>Browser process stopped. "browser" command is now disabled.</p>';    
        }    
        else if (processName === 'process') {    
            const pid = Math.floor(Math.random() * 1000) + 1;    
            return `<p>Process with PID ${pid} stopped successfully.</p>`;    
        }    
        else {    
            return `<p class="error-message">Error: Process '${processName}' not found or cannot be stopped.</p>`;    
        }    
    },    

    date: () => `<p>${new Date().toLocaleString()}</p>`,    

    neofetch: () => {
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
        const checkMessage = '<p style="color: var(--terminal-success);">Checking for updates...</p>';

        setTimeout(() => {
            const updateMessage = document.createElement('div');
            updateMessage.innerHTML = `
                <p style="color: var(--terminal-error);">No new updates found.</p>
                <p>Last successful update: September 13, 2025</p>
                <p>Version 3.4.3</p>
                <p>Changelog:</p>
                <ul>
                    <li>Removed files command (like ls, CD, cat) probably will come in future versions as I am remaking it</li>
                    <li>storage is now dynamic </li>
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
            if (!safeArgs) return `<p class="error-message">Error: Invalid characters in expression</p>`;    
            const result = new Function(`return ${safeArgs}`)();    
            return `<p>Result: ${result}</p>`;    
        } catch (error) {    
            console.error("Calc Error:", error);    
            return `<p class="error-message">Error: Invalid expression or calculation failed</p>`;    
        }    
    },    

    browser: (args) => {    
        if (stoppedProcesses.includes('browser')) {    
            return '<p class="error-message">Browser process is stopped. Use "reboot" to restore functionality.</p>';    
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
            return `<p class="error-message">Error 404: Site '${siteName}' not found in terminal network.</p>`;    
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
            "All the effort you are making will ultimately pay off."
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

        return `<pre style="font-family: 'JetBrains Mono', monospace;">${topLine}
${textLine}
${bottomLine}${cow}</pre>`;
    }    
};    

const devCommands = {
    'custom os': () => {
        if (!devToolsOpen) {
            return '<p class="error-message">Command not recognized. Type "help" for available commands.</p>';
        }

        customOsInstallationActive = true;  
        awaitingConfirmation = true;  

        return `  
            <p class="error-message">⚠️ Warning: Installing a custom ROM can cause severe and irreversible damage to your device. It may corrupt critical system files, prevent the device from booting, disable core functions, or permanently harm hardware components. Only proceed if you fully understand the risks, as improper installation can render your device completely unusable.</p>  
            <p>Type YES to continue and install a custom os</p>  
            <p>Type NO to cancel the installation.</p>  
        `;  
    }
};

commands.dev = () => {
    devToolsOpen = true;
    return `<p class="highlight">Developer Tools Activated</p><p>Additional commands unlocked.</p><p>Available dev commands: Custom os</p><p>Use with caution.</p>`;
};


