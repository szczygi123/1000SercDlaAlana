const cel = 1000;

const adresWorkera = "https://licznik-alana.michalszczygiel2007.workers.dev/";

const licznik = document.getElementById("heartCount");
const pasek = document.getElementById("progressBar");
const procent = document.getElementById("percentage");
const pozostalo = document.getElementById("remaining");

async function aktualizujLicznik() {
    try {
        const response = await fetch(adresWorkera);
        const dane = await response.json();

        if (!Number.isFinite(dane.count)) {
            throw new Error("Nie udało się pobrać liczby wpłacających.");
        }

        const liczbaSerc = Math.min(dane.count, cel);
        const postep = (liczbaSerc / cel) * 100;
        const brakujace = Math.max(cel - liczbaSerc, 0);

        licznik.textContent = liczbaSerc;
        pasek.style.width = postep + "%";
        procent.textContent = postep.toFixed(1).replace(".", ",") + "% celu";
        pozostalo.textContent = brakujace + " serc do celu";

    } catch (error) {
        console.error("Błąd licznika:", error);
    }
}

aktualizujLicznik();

setInterval(aktualizujLicznik, 5 * 60 * 1000);