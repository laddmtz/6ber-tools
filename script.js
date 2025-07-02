// 1. Générateur mot de passe
const generatePassBtn = document.getElementById('generatePassBtn');
const generatedPass = document.getElementById('generatedPass');
const passLength = document.getElementById('passLength');
generatePassBtn.onclick = () => {
  const len = Math.min(Math.max(6, +passLength.value), 64);
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
  let pass = "";
  for(let i=0;i<len;i++) pass += chars.charAt(Math.floor(Math.random()*chars.length));
  generatedPass.value = pass;
};
generatedPass.onclick = () => {
  if(!generatedPass.value) return;
  generatedPass.select();
  navigator.clipboard.writeText(generatedPass.value);
};

// 2. Vérificateur force mot de passe
const checkPassBtn = document.getElementById('checkPassBtn');
const passToCheck = document.getElementById('passToCheck');
const checkPassResult = document.getElementById('checkPassResult');
checkPassBtn.onclick = () => {
  const pwd = passToCheck.value.trim();
  if(!pwd) return checkPassResult.textContent = "Entrez un mot de passe.";
  let score=0;
  if(pwd.length>=8) score++;
  if(/[A-Z]/.test(pwd)) score++;
  if(/[a-z]/.test(pwd)) score++;
  if(/[0-9]/.test(pwd)) score++;
  if(/[^A-Za-z0-9]/.test(pwd)) score++;
  const levels = [
    "Très faible ❌", "Faible ❌", "Moyen ⚠️", "Fort 🔐", "Très fort 🔒"
  ];
  let message = score>=4 ? levels[4] : levels[score] || levels[0];
  let color = ["#b71c1c","#f44336","#ff9800","#388e3c","#2e7d32"][score] || "#b71c1c";
  checkPassResult.textContent = message;
  checkPassResult.style.color = color;
};

// 3. Générateur phrase de passe
const generatePhraseBtn = document.getElementById('generatePhraseBtn');
const phraseWords = document.getElementById('phraseWords');
const phraseResult = document.getElementById('phraseResult');
const wordList = [
  "cyber", "sécurité", "firewall", "hacker", "cryptage",
  "serveur", "réseau", "virus", "pare-feu", "motdepasse",
  "script", "attaque", "défense", "pirate", "données",
  "système", "connexion", "algorithme", "protection", "authentification"
];
generatePhraseBtn.onclick = () => {
  const count = Math.min(Math.max(2,+phraseWords.value),8);
  let phrase = [];
  for(let i=0;i<count;i++) phrase.push(wordList[Math.floor(Math.random()*wordList.length)]);
  phraseResult.textContent = phrase.join(" ");
};

// 4 & 5 Base64 encode / decode
const base64Input = document.getElementById('base64Input');
const base64Result = document.getElementById('base64Result');
document.getElementById('encodeBase64Btn').onclick = () => {
  try {
    base64Result.textContent = btoa(base64Input.value);
  } catch {
    base64Result.textContent = "Erreur d'encodage";
  }
};
document.getElementById('decodeBase64Btn').onclick = () => {
  try {
    base64Result.textContent = atob(base64Input.value);
  } catch {
    base64Result.textContent = "Erreur de décodage";
  }
};

// 6. Hash MD5 via SparkMD5
const md5Input = document.getElementById('md5Input');
const md5Result = document.getElementById('md5Result');
document.getElementById('generateMd5Btn').onclick = () => {
  const text = md5Input.value.trim();
  if(!text) return md5Result.textContent = "Entrez un texte.";
  md5Result.textContent = SparkMD5.hash(text);
};

// 7 & 8. ROT13 encode / decode
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}
const rot13Input = document.getElementById('rot13Input');
const rot13Result = document.getElementById('rot13Result');
document.getElementById('encodeRot13Btn').onclick = () => {
  rot13Result.textContent = rot13(rot13Input.value);
};
document.getElementById('decodeRot13Btn').onclick = () => {
  rot13Result.textContent = rot13(rot13Input.value);
};

// 9 & 10. Texte ↔ Hex
const hexInput = document.getElementById('hexInput');
const hexResult = document.getElementById('hexResult');
function textToHex(text) {
  return text.split('').map(c=>c.charCodeAt(0).toString(16).padStart(2,'0')).join('');
}
function hexToText(hex) {
  try {
    return hex.match(/.{1,2}/g).map(b=>String.fromCharCode(parseInt(b,16))).join('');
  } catch {
    return "Hex invalide";
  }
}
document.getElementById('toHexBtn').onclick = () => {
  hexResult.textContent = textToHex(hexInput.value);
};
document.getElementById('toTextBtn').onclick = () => {
  hexResult.textContent = hexToText(hexInput.value.trim());
};

// 11. Validation email
const emailInput = document.getElementById('emailInput');
const emailResult = document.getElementById('emailResult');
document.getElementById('validateEmailBtn').onclick = () => {
  const email = emailInput.value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailResult.textContent = re.test(email) ? "Email valide ✅" : "Email invalide ❌";
  emailResult.style.color = re.test(email) ? "#4caf50" : "#f44336";
};

// 12. Validation URL simple
const urlInput = document.getElementById('urlInput');
const urlResult = document.getElementById('urlResult');
document.getElementById('validateUrlBtn').onclick = () => {
  const url = urlInput.value.trim();
  try {
    new URL(url);
    urlResult.textContent = "URL valide ✅";
    urlResult.style.color = "#4caf50";
  } catch {
    urlResult.textContent = "URL invalide ❌";
    urlResult.style.color = "#f44336";
  }
};

// 13. Timestamp UNIX
const timestampInput = document.getElementById('timestampInput');
const dateResult = document.getElementById('dateResult');
const generateTimestampBtn = document.getElementById('generateTimestampBtn');
const timestampResult = document.getElementById('timestampResult');
document.getElementById('timestampToDateBtn').onclick = () => {
  const ts = parseInt(timestampInput.value);
  if(isNaN(ts) || ts < 0) return dateResult.textContent = "Timestamp invalide";
  const date = new Date(ts * 1000);
  dateResult.textContent = date.toLocaleString();
};
generateTimestampBtn.onclick = () => {
  const now = Math.floor(Date.now() / 1000);
  timestampResult.textContent = now.toString();
};

// 14. Scan ports réel via API publique hackertarget.com
const scanHost = document.getElementById('scanHost');
const scanResult = document.getElementById('scanResult');
document.getElementById('scanPortsBtn').onclick = () => {
  const host = scanHost.value.trim();
  if(!host) return scanResult.textContent = "Entrez un domaine ou IP";
  scanResult.textContent = "Scan en cours...";
  // Appel API publique hackertarget (port scan)
  // Limite: max 15 requêtes par minute depuis une même IP
  fetch(`https://api.hackertarget.com/nmap/?q=${encodeURIComponent(host)}`)
    .then(res => {
      if(!res.ok) throw new Error("Erreur API : " + res.status);
      return res.text();
    })
    .then(text => {
      scanResult.textContent = text;
    })
    .catch(e => {
      scanResult.textContent = "Erreur lors du scan : " + e.message;
    });
};

// 15. Recherche mots clés dans texte
const textToScan = document.getElementById('textToScan');
const keywordsInput = document.getElementById('keywordsInput');
const keywordsResult = document.getElementById('keywordsResult');
document.getElementById('searchKeywordsBtn').onclick = () => {
  const text = textToScan.value.toLowerCase();
  const keywords = keywordsInput.value.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
  if(!text) return keywordsResult.textContent = "Entrez un texte à analyser";
  if(keywords.length === 0) return keywordsResult.textContent = "Entrez au moins un mot clé";
  const found = keywords.filter(k => text.includes(k));
  if(found.length === 0) keywordsResult.textContent = "Aucun mot clé trouvé";
  else keywordsResult.textContent = "Mots clés trouvés : " + found.join(", ");
};
