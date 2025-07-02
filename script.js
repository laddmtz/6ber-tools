// Générateur de mot de passe
const generateBtn = document.getElementById('generateBtn');
const generatedPassword = document.getElementById('generatedPassword');
const lengthInput = document.getElementById('length');

generateBtn.addEventListener('click', () => {
  const length = parseInt(lengthInput.value);
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
  let password = "";
  for(let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  generatedPassword.value = password;
});

// Copier le mot de passe au clic + tooltip
generatedPassword.addEventListener('click', () => {
  if(!generatedPassword.value) return;
  generatedPassword.select();
  navigator.clipboard.writeText(generatedPassword.value).then(() => {
    const tooltip = document.getElementById('copyTooltip');
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
    setTimeout(() => {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    }, 1500);
  });
});

// Vérificateur simple de force mot de passe
const checkBtn = document.getElementById('checkBtn');
const passwordToCheck = document.getElementById('passwordToCheck');
const checkResult = document.getElementById('checkResult');

checkBtn.addEventListener('click', () => {
  const pwd = passwordToCheck.value.trim();
  if (!pwd) {
    checkResult.textContent = "Veuillez entrer un mot de passe.";
    checkResult.style.color = '#f44336'; // rouge
    return;
  }

  let score = 0;
  if(pwd.length >= 8) score++;
  if(/[A-Z]/.test(pwd)) score++;
  if(/[a-z]/.test(pwd)) score++;
  if(/[0-9]/.test(pwd)) score++;
  if(/[^A-Za-z0-9]/.test(pwd)) score++;

  let message = "";
  let color = "#5eead4";

  switch(score) {
    case 5: message = "Très fort 🔒"; color = "#4caf50"; break;
    case 4: message = "Fort 🔐"; break;
    case 3: message = "Moyen ⚠️"; color = "#ff9800"; break;
    case 2: message = "Faible ❌"; color = "#f44336"; break;
    default: message = "Très faible ❌"; color = "#b71c1c"; break;
  }
  checkResult.textContent = message;
  checkResult.style.color = color;
});

// Simulation de scan de ports (limité)
const scanBtn = document.getElementById('scanBtn');
const hostInput = document.getElementById('host');
const scanResult = document.getElementById('scanResult');

scanBtn.addEventListener('click', () => {
  const host = hostInput.value.trim();
  if(!host) {
    alert("Merci d'entrer un domaine ou une IP valide.");
    return;
  }
  scanResult.textContent = "Analyse en cours...";
  scanResult.style.color = "#5eead4";

  // Simulation avec délai
  setTimeout(() => {
    const ports = [21, 22, 80, 443, 8080];
    const openPorts = ports.filter(() => Math.random() > 0.5);
    if(openPorts.length === 0) {
      scanResult.textContent = "Aucun port ouvert détecté (simulation).";
      scanResult.style.color = "#f44336";
    } else {
      scanResult.textContent = `Ports ouverts détectés (simulation) : ${openPorts.join(", ")}`;
      scanResult.style.color = "#4caf50";
    }
  }, 1500);
});
