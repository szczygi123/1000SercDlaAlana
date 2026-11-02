
const cel = 1000;

// Pobieranie zapisanej liczby serc
let liczbaSerc = Number(localStorage.getItem("liczbaSerc") ?? 0);
// Pobieranie elementów HTML
const licznik = document.getElementById("heartCount");
const pasek = document.getElementById("progressBar");
const procent = document.getElementById("percentage");
const pozostalo = document.getElementById("remaining");

// Aktualizacja licznika
function aktualizujLicznik() {
    const postep = Math.min((liczbaSerc / cel) * 100, 100);
    const brakujace = Math.max(cel - liczbaSerc, 0);

    licznik.textContent = liczbaSerc;
    pasek.style.width = postep + "%";
    procent.textContent = postep.toFixed(1).replace(".", ",") + "% celu";
    pozostalo.textContent = brakujace + " serc do celu";

    // Zapisywanie liczby serc
    localStorage.setItem("liczbaSerc", liczbaSerc);
}

// Kliknięcie Kup Serce
function KupSerce() {
    if (liczbaSerc < cel) {
        liczbaSerc++;
        aktualizujLicznik();
    }
}

// Uruchomienie licznika
aktualizujLicznik();
