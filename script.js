const output = document.getElementById('output');
const input = document.getElementById('commandInput');

const subjects = [
    'Mathematics', 'English Language Arts', 'Science', 'Social Studies', 
    'Physical Education', 'Art', 'Music', 'Home and Careers',
 
];

const gradeComments = {
    excellent: [
        "Outstanding performance!",
        "Exceptional work throughout the term.",
        "Shows remarkable understanding.",
        "Among the top performers in class.",
        "Consistently exceeds expectations."
    ],
    good: [
        "Shows good progress.",
        "Demonstrates solid understanding.",
        "Maintains steady performance.",
        "Good effort shown.",
        "Participates actively in class."
    ],
    average: [
        "Meeting basic requirements.",
        "Could benefit from additional practice.",
        "Shows potential for improvement.",
        "Inconsistent performance.",
        "More effort recommended."
    ],
    poor: [
        "Needs significant improvement.",
        "Missing several assignments.",
        "Additional support recommended.",
        "Schedule parent-teacher conference.",
        "At risk of falling behind."
    ]
};

function getRandomGrade() {
    const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];
    const weights = [5, 10, 10, 15, 15, 10, 10, 8, 7, 5, 3, 2];
    let total = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * total;
    
    for (let i = 0; i < grades.length; i++) {
        if (random < weights[i]) return grades[i];
        random -= weights[i];
    }
    return 'C';
}

function getCommentType(grade) {
    if (grade.startsWith('A')) return 'excellent';
    if (grade.startsWith('B')) return 'good';
    if (grade.startsWith('C')) return 'average';
    return 'poor';
}

function getRandomComment(type) {
    const comments = gradeComments[type];
    return comments[Math.floor(Math.random() * comments.length)];
}

const progressChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let progressInterval;

function typeText(text, className = '') {
    const div = document.createElement('div');
    div.className = className;
    output.appendChild(div);
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            div.textContent += text[i];
            i++;
        } else {
            clearInterval(typing);
        }
    }, 30);
}

function simulateProgress(duration = 3000) {
    let i = 0;
    const progressDiv = document.createElement('div');
    output.appendChild(progressDiv);
    
    progressInterval = setInterval(() => {
        progressDiv.textContent = progressChars[i % progressChars.length] + ' Processing... ' + 
            Math.floor((i / (duration/100)) * 100) + '%';
        i++;
    }, 100);

    setTimeout(() => {
        clearInterval(progressInterval);
        progressDiv.remove();
        const results = [
            '[SUCCESS] Connection established',
            '[INFO] Advanced encryption bypassed',
            '[WARNING] Multiple security protocols detected',
            '[ALERT] System monitoring active',
            '[SUCCESS] Access granted - Security Level 3'
        ];
        results.forEach((result, index) => {
            setTimeout(() => {
                typeText(result + '\n', 
                    result.includes('SUCCESS') ? 'success' : 
                    result.includes('WARNING') ? 'warning' : 
                    result.includes('ALERT') ? 'error' : '');
            }, index * 200);
        });
    }, duration);
}

const commands = {
    'help': 'Available commands: help, access, decrypt, download, clear, students, grades, schedule, attendance, faculty, search, security, network, system, backup, logs\nTo look up student grades, type: "what are [name] grades?"',
    'clear': 'clear',
    'access': '[INITIALIZING] Establishing secure connection to Athena MS mainframe...\n[SCANNING] Identifying access points...\n[STATUS] Multiple entry points detected\n[EXECUTING] Attempting primary database connection...',
    'decrypt': '[PROCESS] Initializing decryption algorithm...\n[STATUS] Analyzing encryption patterns...\n[ALERT] AES-256 encryption detected\n[EXECUTING] Running quantum decryption sequence...',
    'download': '[INITIALIZING] Preparing secure transfer protocol...\n[STATUS] Establishing encrypted tunnel...\n[PROGRESS] Packet capture initiated\n[WARNING] Large data transfer detected',
    'students': 'Retrieving student directory...',
    'grades': 'Accessing grade records...',
    'schedule': 'Accessing master schedule database...',
    'attendance': '[SCANNING] Accessing attendance database...\n[STATUS] Processing daily logs...\n[ALERT] Detecting attendance patterns...\n[DATA] Analyzing student movement records...',
    'faculty': 'Accessing faculty directory...',
    'search': '[INITIALIZING] Database search protocol activated...\n[STATUS] Indexing all databases...\n[PROCESS] Creating search parameters...\n[ALERT] Deep search activated',
    'security': 'Analyzing security systems...',
    'network': 'Scanning network infrastructure...',
    'system': '[INITIALIZING] System diagnostic sequence started...\n[SCANNING] Checking core processes...\n[STATUS] Analyzing system integrity...\n[ALERT] Running vulnerability assessment...',
    'backup': '[PROCESS] Accessing secure backup servers...\n[STATUS] Mapping archive structure...\n[ALERT] Retrieving encrypted backups...\n[DATA] Processing backup integrity...',
    'logs': 'Retrieving system logs...'
};

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'q') {
        const newCommand = prompt('Enter new command name:');
        if (newCommand) {
            const response = prompt('Enter command response:');
            if (response) {
                commands[newCommand.toLowerCase()] = response;
                typeText('[SYSTEM] New command added: ' + newCommand + '\n', 'success');
                typeText('[ACTIVATED] Quick Access Protocol\n', 'success');
                simulateProgress(2000);
                setTimeout(() => {
                    typeText('[SYSTEM] Welcome to Athena Middle School Mainframe\n');
                    typeText('[INFO] Security Level: ADMIN\n');
                    typeText('[INFO] Database Status: ACTIVE\n');
                    typeText('[INFO] Last Access: ' + new Date().toLocaleString() + '\n');
                }, 2500);
            }
        }
    }
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = input.value.toLowerCase().trim();
        typeText('> ' + command + '\n');
        
        if (command.match(/what are .+ grades\?/) || command.match(/what are .+ grades/)) {
            const name = command.replace(/what are /, '').replace(/ grades\??/, '');
            typeText(`[ACCESSING] Student Records for: ${name.toUpperCase()}\n`);
            simulateProgress(1500);
            
            setTimeout(() => {
                typeText(`[DATA] Grade Report for ${name.toUpperCase()} - ${new Date().toLocaleDateString()}\n`);
                typeText('----------------------------------------\n');
                
                subjects.forEach(subject => {
                    const grade = getRandomGrade();
                    const comment = getRandomComment(getCommentType(grade));
                    setTimeout(() => {
                        typeText(`${subject}: ${grade}\n`);
                        typeText(`  Comment: ${comment}\n`);
                    }, subjects.indexOf(subject) * 200);
                });
                
                setTimeout(() => {
                    const average = getRandomGrade();
                    typeText('----------------------------------------\n');
                    typeText(`Overall GPA: ${average}\n`, getCommentType(average) === 'excellent' ? 'success' : getCommentType(average) === 'poor' ? 'error' : '');
                }, subjects.length * 200 + 200);
            }, 2000);
            
        } else if (commands[command]) {
            if (command === 'clear') {
                output.innerHTML = '';
            } else {
                typeText(commands[command] + '\n');
                if (command === 'students') {
                    simulateProgress(2000);
                    setTimeout(() => {
                        typeText('[DATA] Student Count: 847\n');
                        typeText('[DATA] Active Enrollments: 812\n');
                        typeText('[DATA] Transfer Students: 35\n');
                        typeText('[DATA] New Registrations (This Week): 3\n');
                        typeText('[DATA] Pending Transfers: 5\n');
                    }, 2500);
                } else if (command === 'grades') {
                    simulateProgress(2000);
                    setTimeout(() => {
                        typeText('[DATA] Grade Distribution:\n');
                        typeText('Grade 6: 278 students\n');
                        typeText('  - Honor Roll: 89 students\n');
                        typeText('  - Academic Warning: 12 students\n');
                        typeText('Grade 7: 285 students\n');
                        typeText('  - Honor Roll: 95 students\n');
                        typeText('  - Academic Warning: 15 students\n');
                        typeText('Grade 8: 284 students\n');
                        typeText('  - Honor Roll: 92 students\n');
                        typeText('  - Academic Warning: 10 students\n');
                    }, 2500);
                } else if (command === 'faculty') {
                    simulateProgress(2000);
                    setTimeout(() => {
                        typeText('[DATA] Total Faculty: 67\n');
                        typeText('[DATA] Teachers: 52\n');
                        typeText('  - Full-time: 48\n');
                        typeText('  - Part-time: 4\n');
                        typeText('[DATA] Administration: 8\n');
                        typeText('[DATA] Support Staff: 7\n');
                        typeText('[ALERT] 2 substitute teachers on duty today\n');
                    }, 2500);
                } else if (command === 'attendance') {
                    simulateProgress(2000);
                    setTimeout(() => {
                        const total = 847;
                        const present = Math.floor(Math.random() * 30) + 800;
                        const absent = total - present;
                        const late = Math.floor(Math.random() * 15) + 5;
                        
                        typeText('[DATA] Daily Attendance Report - ' + new Date().toLocaleDateString() + '\n');
                        typeText('[DATA] Total Students: ' + total + '\n');
                        typeText('[DATA] Present: ' + present + ' (' + Math.round(present/total*100) + '%)\n');
                        typeText('[DATA] Absent: ' + absent + ' (' + Math.round(absent/total*100) + '%)\n');
                        typeText('[DATA] Late Arrivals: ' + late + '\n');
                        typeText('[DATA] Early Dismissals: ' + Math.floor(Math.random() * 8) + '\n');
                        typeText('[ALERT] Attendance below threshold in Grade 7\n', 'warning');
                        typeText('[STATUS] Automated parent notification system activated\n');
                    }, 2500);
                } else if (command === 'schedule') {
                    simulateProgress(2000);
                    setTimeout(() => {
                        typeText('[DATA] Current Term: Fall 2023\n');
                        typeText('[DATA] Total Classes: 248\n');
                        typeText('[DATA] Active Rooms: 45\n');
                        typeText('[DATA] Current Period: ' + getCurrentPeriod() + '\n');
                        typeText('[DATA] Next Period: ' + getNextPeriod() + '\n');
                        typeText('[ALERT] Room 204 requires maintenance\n', 'warning');
                    }, 2500);
                } else {
                    simulateProgress();
                }
            }
        } else {
            typeText('Unknown command. Type "help" for available commands.\n', 'error');
        }
        
        input.value = '';
    }
});

function getCurrentPeriod() {
    const hour = new Date().getHours();
    if (hour < 8) return 'Before School';
    if (hour < 9) return 'Period 1';
    if (hour < 10) return 'Period 2';
    if (hour < 11) return 'Period 3';
    if (hour < 12) return 'Period 4';
    if (hour < 13) return 'Lunch';
    if (hour < 14) return 'Period 5';
    if (hour < 15) return 'Period 6';
    return 'After School';
}

function getNextPeriod() {
    const hour = new Date().getHours();
    if (hour < 8) return 'Period 1';
    if (hour < 9) return 'Period 2';
    if (hour < 10) return 'Period 3';
    if (hour < 11) return 'Period 4';
    if (hour < 12) return 'Lunch';
    if (hour < 13) return 'Period 5';
    if (hour < 14) return 'Period 6';
    return 'Day End';
}

typeText('Athena Middle School Database Terminal v1.0\nType "help" for available commands.\n');