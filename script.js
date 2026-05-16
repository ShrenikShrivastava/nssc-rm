const navLinks = document.querySelectorAll('.nav-link');
const tabs = document.querySelectorAll('.tab-content');

function switchTab(targetId) {
  navLinks.forEach(link => link.classList.remove('active'));
  tabs.forEach(tab => tab.classList.remove('active'));

  const activeLink = document.querySelector(`[data-target="${targetId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  const activeTab = document.getElementById(targetId);
  if (activeTab) {
    activeTab.classList.add('active');
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('data-target');
    switchTab(target);
  });
});

const launchBtn = document.getElementById('launchBtn');
if (launchBtn) {
  launchBtn.addEventListener('click', function() {
    switchTab("schedule");
  });
}

const sendBtn = document.getElementById('sendMsgBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('contactName').value.trim() || "Anonymous Explorer";
    alert("🚀 Space packet broadcasted successfully, " + name + "! Mission control has registered your coordinate map.");
  });
}

const loginFormPanel = document.getElementById('loginFormPanel');
const dashboardPanel = document.getElementById('dashboardPanel');
const profileNameDisplay = document.getElementById('profileNameDisplay');
const navAuthLink = document.getElementById('navAuthLink');

function syncAuthState() {
  const activeSessionUser = localStorage.getItem('nssc_user');
  if (activeSessionUser) {
    loginFormPanel.style.display = 'none';
    dashboardPanel.style.display = 'block';
    profileNameDisplay.innerText = activeSessionUser;
    navAuthLink.innerText = "Dashboard";
  } else {
    loginFormPanel.style.display = 'block';
    dashboardPanel.style.display = 'none';
    navAuthLink.innerText = "Login";
  }
}

const loginButton = document.getElementById('loginBtn');
if (loginButton) {
  loginButton.addEventListener('click', function() {
    const user = document.getElementById('loginUser').value.trim();
    if (user) {
      localStorage.setItem('nssc_user', user);
      alert("Welcome aboard, " + user + "! Subspace link online. 🛸");
      syncAuthState();
      switchTab('home');
    } else {
      alert('Please map a valid Operator Username identifier.');
    }
  });
}

const logoutButton = document.getElementById('logoutBtn');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('nssc_user');
    alert('Secure connection closed. Operational telemetry wiped.');
    syncAuthState();
    switchTab('home');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  syncAuthState();
});