document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".calendar-grid");
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");
  const closePopup = document.getElementById("close-popup");
  let countdownInterval; // serve per aggiornare il timer

  const oggi = new Date();
  const anno = oggi.getFullYear();
  const mese = 11; // dicembre (0-based)

  for (let i = 1; i <= 25; i++) {
    const dataGiorno = new Date(anno, mese, i);
    const aperto = oggi >= dataGiorno;

    const box = document.createElement("div");
    box.classList.add("day-box");
    if (i === 25) box.classList.add("day-special");

    const img = document.createElement("img");
    img.src = `img/giorni/${i}.png`;
    img.alt = `Giorno ${i}`;
    img.classList.add("day-image");
    box.appendChild(img);

    // CLICK su giorno
    box.addEventListener("click", () => {
      clearInterval(countdownInterval); // ferma eventuale timer precedente

      if (aperto) {
        // se è aperto → apri la pagina del giorno
        window.location.href = `giorni/${i}.html`;
      } else {
        // se non è ancora disponibile → mostra countdown
        popup.classList.remove("hidden");
        aggiornaCountdown(dataGiorno);

        // aggiorna ogni secondo
        countdownInterval = setInterval(() => aggiornaCountdown(dataGiorno), 1000);
      }
    });

    grid.appendChild(box);
  }

  // Funzione per aggiornare il timer nel popup
  function aggiornaCountdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      popupText.innerHTML = `
        🎁 È arrivato il momento! Puoi ora aprire questa finestra!
      `;
      clearInterval(countdownInterval);
      return;
    }

    const giorni = Math.floor(diff / (1000 * 60 * 60 * 24));
    const ore = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minuti = Math.floor((diff / (1000 * 60)) % 60);
    const secondi = Math.floor((diff / 1000) % 60);

    popupText.innerHTML = `
      <div style="text-align:center; font-size:1.2em; color:#7b0412; font-weight:bold;">
        ⏳ Non ancora disponibile
      </div>
      <p style="text-align:center; margin-top:10px; color:#000;">
        Mancano ancora<br>
        <span style="font-size:1.5em; color:#b71c1c;">
          ${giorni} g : ${String(ore).padStart(2, '0')} h : ${String(minuti).padStart(2, '0')} m : ${String(secondi).padStart(2, '0')} s
        </span><br>
        per l’apertura di questo giorno 🎁
      </p>
    `;
  }

  // Chiudi popup
  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
    clearInterval(countdownInterval);
  });
});
