
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue,
    runTransaction
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// Konfiguracja Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAw74f6_AfleG1vkvp7sTVchjWEyShvV_g",
    authDomain: "serc-dla-alana.firebaseapp.com",
    databaseURL: "https://serc-dla-alana-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "serc-dla-alana",
    storageBucket: "serc-dla-alana.firebasestorage.app",
    messagingSenderId: "152751230995",
    appId: "1:152751230995:web:3eb97533695d7c5423afe6"
};

// Połączenie z Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const licznikRef = ref(db, "liczbaSerc");

const cel = 1000;

// Elementy HTML
const licznik = document.getElementById("heartCount");
const pasek = document.getElementById("progressBar");
const procent = document.getElementById("percentage");
const pozostalo = document.getElementById("remaining");
const przycisk = document.getElementById("buyButton");

// Aktualizacja wyglądu licznika
function aktualizujLicznik(liczbaSerc) {
    const postep = Math.min((liczbaSerc / cel) * 100, 100);
    const brakujace = Math.max(cel - liczbaSerc, 0);

    licznik.textContent = liczbaSerc;
    pasek.style.width = postep + "%";
    procent.textContent = postep.toFixed(1).replace(".", ",") + "% celu";
    pozostalo.textContent = brakujace + " serc do celu";
}

// Pobieranie zmian z Firebase
onValue(licznikRef, (snapshot) => {
    const liczbaSerc = Number(snapshot.val() ?? 0);
    aktualizujLicznik(liczbaSerc);
});

// Zwiększanie licznika po kliknięciu
let trwaAktualizacja = false;

przycisk.addEventListener("click", async () => {
    if (trwaAktualizacja) return;

    trwaAktualizacja = true;

    try {
        await runTransaction(licznikRef, (aktualnaLiczba) => {
            if (aktualnaLiczba === null) {
                return 1;
            }

            if (aktualnaLiczba >= cel) {
                return;
            }

            return aktualnaLiczba + 1;
        });
    } catch (blad) {
        console.error("Błąd aktualizacji licznika:", blad);
        alert("Nie udało się zaktualizować licznika.");
    } finally {
        trwaAktualizacja = false;
    }
});
