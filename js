let usciti = [];

const tabelloneDiv = document.querySelector("#tabellone");
const ultimoNumeroSpan = document.querySelector("#ultimo-numero");
const cronologiaP = document.querySelector("#cronologia");
const btnEstrai = document.querySelector("#estrai");
const btnReset = document.querySelector("#reset");

function rendiTabellone() {
  tabelloneDiv.innerHTML = "";
  for (let i = 1; i <= 90; i++) {
    const divNum = document.createElement("div");
    divNum.classList.add("numero");
    divNum.textContent = i;
    if (usciti.includes(i)) {
      divNum.classList.add("uscito");
    }
    tabelloneDiv.appendChild(divNum);
  }
}

function rendiCronologia() {
  if (usciti.length === 0) {
    cronologiaP.textContent = "Nessun numero estratto.";
    return;
  }
  const ultimi10 = usciti.slice(-10).reverse();
  cronologiaP.textContent = ultimi10.join(", ");
}

function estrai() {
  const disponibili = [];
  for (let i = 1; i <= 90; i++) {
    if (!usciti.includes(i)) {
      disponibili.push(i);
    }
  }

  if (disponibili.length === 0) {
    alert("Tutti i numeri sono usciti!");
    return;
  }

  btnEstrai.disabled = true;

  let contatoreAnimazione = 0;
  const intervallo = setInterval(() => {
    const indiceCasuale = Math.floor(Math.random() * disponibili.length);
    ultimoNumeroSpan.textContent = disponibili[indiceCasuale];
    contatoreAnimazione++;

    if (contatoreAnimazione > 20) {
      clearInterval(intervallo);
      const indiceDefinitivo = Math.floor(Math.random() * disponibili.length);
      const numeroScelto = disponibili[indiceDefinitivo];
      usciti.push(numeroScelto);
      ultimoNumeroSpan.textContent = numeroScelto;
      rendiTabellone();
      rendiCronologia();
      btnEstrai.disabled = false;
    }
  }, 50);
}

btnEstrai.addEventListener("click", estrai);

btnReset.addEventListener("click", () => {
  usciti = [];
  ultimoNumeroSpan.textContent = "—";
  rendiTabellone();
  rendiCronologia();
});

rendiTabellone();
