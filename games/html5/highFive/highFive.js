let spielerPunkte = 0;
let computerPunkte = 0;

document.addEventListener("DOMContentLoaded", function () {
    const karteLinks = document.getElementById("karteLinks");
    const karteRechts = document.getElementById("karteRechts");
    const message = document.getElementById("nachricht");

    message.textContent = "Karten wurden ausgeteilt! Viel Glück! Wähle eine Karte.";

    karteLinks.addEventListener("click", function () {
        spieleRunde(karteLinks, karteRechts)
        wahlAnzeigen(karteLinks)
    });

    karteRechts.addEventListener("click", function () {
        spieleRunde(karteRechts, karteLinks)
        wahlAnzeigen(karteRechts)
    });

    function wahlAnzeigen(karte) {
        document.querySelectorAll(".karte").forEach(k => k.classList.remove("selected"));
        karte.classList.add("selected");
    }

    function spieleRunde(spielerKarte, computerKarte) {
        const spielerZahl = Math.floor(Math.random() * 10) + 1;
        spielerKarte.textContent = spielerZahl;
        spielerKarte.dataset.value = spielerZahl;

        const computerZahl = Math.floor(Math.random() * 10) + 1;
        computerKarte.textContent = computerZahl;
        computerKarte.dataset.value = computerZahl;
        computerKarte.classList.add("umgedreht")

        if (spielerZahl > computerZahl) {
            spielerPunkte++;
            if (spielerPunkte <= 4) {
                markiereKreis('A', spielerPunkte);
                message.innerHTML = "Deine Zahl: " + spielerZahl + " - Coputer Zahl: " + computerZahl + "<br>Spieler gewinnt die Runde."
            } else if (spielerPunkte === 5) {
                document.getElementById('kreisC1').classList.add('spielerGewinnt');
                message.textContent = 'Glückwunsch!';
                spielEnde();
            }
        } else if (computerZahl > spielerZahl) {
            computerPunkte++;
            if (computerPunkte <= 4) {
                markiereKreis('B', computerPunkte);
                message.innerHTML = "Deine Zahl: " + spielerZahl + " - Coputer Zahl: " + computerZahl + "<br>Computer gewinnt die Runde"
            } else if (computerPunkte === 5) {
                document.getElementById(`kreisC1`).classList.add('computerGewinnt');
                message.textContent = 'Versuchs nochmal';
                spielEnde();
            }
        } else {
            message.textContent = 'Unentschieden';
        }
        setTimeout(()=> {
            spielerKarte.textContent = "?";
            spielerKarte.removeAttribute("data-value");

            computerKarte.textContent = "?";
            computerKarte.dataset.value = "";
            document.querySelectorAll(".karte").forEach(k => k.classList.remove('selected','umgedreht'));
        },3000);

        function markiereKreis(typ, nummer) {
            const kreisID = `kreis${typ}${nummer}`;
            document.getElementById(kreisID).classList.add('active');
        }

        function spielEnde() {
            karteLinks.disabled = true;
            karteRechts.disabled = true;
        }

        function resetSpiel() {
            spielerPunkte = 0;
            computerPunkte = 0;
             document.querySelectorAll(".karte").forEach(k => k.classList.remove('selected','umgedreht'));
            document.querySelectorAll('.kreis').forEach(k => {
                k.classList.remove('active', 'spielerGewinnt', 'computerGewinnt');
            })
            karteLinks.disabled = false;
            karteRechts.disabled = false;
            karteLinks.textContent = '?';
            karteRechts.textContent = '?';
            spielerKarte.dataset.value = "";
            computerKarte.dataset.value = "";
            message.textContent = 'Neue Runde, neues Glück'
        }
        document.getElementById('geben').addEventListener('click', resetSpiel);
    };

}

)
