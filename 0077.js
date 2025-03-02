let currentRoom = null;
let teamChatRooms = {};
let currentTeam = {};
let isAdmin = false;

// Utility function for validation
function isValidName(name) {
    return /^[A-Za-z\s]+$/.test(name.trim()) && name.trim().length > 2;
}

function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidPhone(phone) {
    return /^[0-9]{10}$/.test(phone);
}

function isValidPassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

function showError(inputId, message) {
    alert(`Error in ${inputId}: ${message}`);
    document.getElementById(inputId).focus();
}

// Show/hide pages
function showPage(pageId) {
    document.querySelectorAll('.page, .chat-container').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');

    if (pageId === 'chatInterface' && isAdmin) {
        document.getElementById('adminControls').classList.remove('hidden');
    } else {
        document.getElementById('adminControls').classList.add('hidden');
    }
}

// Create team
function createTeamAndJoin() {
    const fullName = document.getElementById('createFullName').value;
    const teamName = document.getElementById('createTeamName').value;
    const password = document.getElementById('createTeamPassword').value;
    const initialBudget = document.getElementById('initialBudget').value;

    if (!isValidName(fullName)) return showError('createFullName', 'Invalid full name');
    if (!isValidName(teamName)) return showError('createTeamName', 'Invalid team name');
    if (password.length < 6) return showError('createTeamPassword', 'Password must be at least 6 characters');
    if (isNaN(initialBudget) || initialBudget <= 0) return showError('initialBudget', 'Enter a valid budget');

    alert(`Team "${teamName}" created by ${fullName}`);

    currentTeam = { name: teamName, owner: fullName, budget: parseFloat(initialBudget) };
    isAdmin = true;

    teamChatRooms[teamName] = ['Team General', 'Team Project', 'Team Events'];
    populateChatRooms(teamName);
    updateBudgetSummary();

    showPage('chatInterface');
}

// Join a team
function joinTeamAndJoin() {
    const fullName = document.getElementById('joinFullName').value;
    const teamId = document.getElementById('joinTeamId').value;
    const password = document.getElementById('joinTeamPassword').value;

    if (!isValidName(fullName)) return showError('joinFullName', 'Invalid full name');
    if (!isValidName(teamId)) return showError('joinTeamId', 'Invalid team name');
    if (password.length < 6) return showError('joinTeamPassword', 'Password must be at least 6 characters');

    alert(`${fullName} joined team "${teamId}"`);

    currentTeam = { name: teamId, owner: 'Someone Else', budget: 5000 };
    isAdmin = false;

    teamChatRooms[teamId] = ['Team General', 'Team Project', 'Team Events'];
    populateChatRooms(teamId);
    updateBudgetSummary();

    showPage('chatInterface');
}

// Register Participant
function registerParticipant() {
    const fullName = document.getElementById('participantFullName').value;
    const email = document.getElementById('participantEmail').value;
    const phone = document.getElementById('participantPhone').value;
    const password = document.getElementById('participantPassword').value;

    if (!isValidName(fullName)) return showError('participantFullName', 'Invalid full name');
    if (!isValidEmail(email)) return showError('participantEmail', 'Invalid email address');
    if (!isValidPhone(phone)) return showError('participantPhone', 'Invalid phone number');
    if (!isValidPassword(password)) return showError('participantPassword', 'Weak password: Must contain uppercase, lowercase, number, and 8+ characters');

    alert(`Participant Registered: ${fullName}, ${email}, ${phone}`);
}

// Register Brand
function registerBrand() {
    const companyName = document.getElementById('brandCompanyName').value;
    const contactName = document.getElementById('brandContactName').value;
    const email = document.getElementById('brandEmail').value;
    const phone = document.getElementById('brandPhone').value;
    const password = document.getElementById('brandPassword').value;

    if (!isValidName(companyName)) return showError('brandCompanyName', 'Invalid company name');
    if (!isValidName(contactName)) return showError('brandContactName', 'Invalid contact name');
    if (!isValidEmail(email)) return showError('brandEmail', 'Invalid email address');
    if (!isValidPhone(phone)) return showError('brandPhone', 'Invalid phone number');
    if (!isValidPassword(password)) return showError('brandPassword', 'Weak password: Must contain uppercase, lowercase, number, and 8+ characters');

    alert(`Brand Registered: ${companyName}, ${contactName}, ${email}, ${phone}`);
}

// Populate chat rooms dynamically
function populateChatRooms(teamName) {
    const chatRoomsList = document.getElementById('chatRooms');
    chatRoomsList.innerHTML = '';

    teamChatRooms[teamName].forEach(room => {
        const roomElement = document.createElement('li');
        roomElement.textContent = room;
        roomElement.onclick = () => enterChatRoom(room);
        chatRoomsList.appendChild(roomElement);
    });
}

// Update budget summary
function updateBudgetSummary() {
    document.getElementById('budgetSummary').textContent = `Current Budget: $${currentTeam.budget}`;
}

// Enter chat room
function enterChatRoom(roomName) {
    currentRoom = roomName;
    document.getElementById('currentChatRoom').textContent = `Chat Room: ${roomName}`;
}
