// ---------- hover: muda o texto ----------
const hoverText = document.getElementById("hoverText");
hoverText.addEventListener("mouseover", () => {
  hoverText.textContent = "Obrigado por passares!";
});
hoverText.addEventListener("mouseout", () => {
  hoverText.textContent = "Passa por aqui!";
});

// ---------- pinta o “Pinta-me!” ----------
const paintMe = document.getElementById("paintMe");
document.querySelectorAll('button[data-color]').forEach(btn => {
  btn.addEventListener("click", () => {
    paintMe.style.color = btn.dataset.color; // red/green/blue
  });
});

const writeBox = document.getElementById("writeBox");

// ----------  três cores de fundo para alternar ----------
const bgColors = ["#ffb3b3", "#b3ffb3", "#b3b3ff"]; // vermelho claro, verde claro, azul claro

writeBox.addEventListener("input", () => {
  const len = writeBox.value.length;

  if (len === 0) {
    writeBox.style.backgroundColor = ""; // volta ao padrão
    return;
  }

  const idx = len % 3; // 0,1,2
  writeBox.style.backgroundColor = bgColors[idx];
});

// ----------  submeter uma cor em inglês -> muda o fundo ----------
const knownColors = new Set([
  "red","green","blue","yellow","purple","orange","pink","black","white",
  "gray","grey","cyan","magenta","teal","navy","lime","brown","gold","silver"
]);

const colorForm = document.getElementById("colorForm");
const bgColorInput = document.getElementById("bgColor");

colorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = bgColorInput.value.trim().toLowerCase();

  if (!val) return;

  document.body.style.backgroundColor = val;
  if (!knownColors.has(val)) {
    alert("Tente uma cor em inglês (ex.: red, green, blue, yellow…).");
  }
});

// ---------- contador: +1 por clique ----------
const countBtn = document.getElementById("countBtn");
const countVal = document.getElementById("countVal");
let count = 0;

countBtn.addEventListener("click", () => {
  count += 1;
  countVal.textContent = count;
});

// imagem aleatória muda quando clicas
const randomImg = document.getElementById("randomImg");

randomImg.addEventListener("click", () => {
  // gerar um novo link aleatório com ID diferente
  const randomId = Math.floor(Math.random() * 1000);
  randomImg.src = `https://picsum.photos/150?random=${randomId}`;
});



document.querySelector('form').onsubmit = (e) => {
    e.preventDefault()
    const name = inputName.value.trim();
    const age = inputAge.value.trim();

    if (name && age) {
        txtUserResult.textContent = `Olá ${name}, tens ${age} anos!`;
    } else {
        txtUserResult.textContent = "Por favor, preenche ambos os campos.";
    }
};

// ---------- contador: +1 por segundo ----------
function updateCounter() {
  autoCount++;
  autoCounter.textContent = autoCount;
  localStorage.setItem("autoCount", autoCount);
}

document.addEventListener("DOMContentLoaded", () => {
  autoCounter.textContent = autoCount;

  setInterval(updateCounter, 1000);
});