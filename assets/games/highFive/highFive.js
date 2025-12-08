let spielerPunkte = 0;
let computerPunkte = 0;

document.addEventListener("DOMContentLoaded", function () {
    const karteLinks = document.getElementById("karteLinks");
    const karteRechts = document.getElementById("karteRechts");
    const message = document.getElementById("nachricht");

    message.textContent = "Karten wurden ausgeteilt! Viel Glück! Wähle eine Karte.";

    karteLinks.addEventListener("click", function () {
        spieleRunde(karteLinks, karteRechts)
    });

    karteRechts.addEventListener("click", function () {
        spieleRunde(karteRechts, karteLinks)
    });

    function spieleRunde(spielerButton, computerButton) {
        const spielerZahl = Math.floor(Math.random() * 10) + 1;
        spielerButton.textContent = spielerZahl;

        const computerZahl = Math.floor(Math.random() * 10) + 1;
        computerButton.textContent = computerZahl;

        

if (spielerZahl > computerZahl) {
    spielerPunkte++;
    if (spielerPunkte <= 4) {
        markiereKreis('A', spielerPunkte);
        message.innerHTML = "Deine Zahl: " + spielerZahl + "<br>Spieler gewinnt die Runde."
    } else if (spielerPunkte === 5) {
        document.getElementById('kreisC1').classList.add('spielerGewinnt');
        message.textContent = 'Glückwunsch!';
        spielEnde();
    }
} else if (computerZahl > spielerZahl) {
    computerPunkte++;
    if (computerPunkte <= 4) {
        markiereKreis('B', computerPunkte);
        message.innerHTML = "Deine Zahl: " + spielerZahl + "<br>Computer gewinnt die Runde"
    } else if (computerPunkte === 5) {
        document.getElementById(`kreisC1`).classList.add('computerGewinnt');
        message.textContent = 'Versuchs nochmal';
        spielEnde();
    }
} else {
    message.textContent = 'Unentschieden';
}


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
            document.querySelectorAll('.kreis').forEach(k => {
                k.classList.remove('active', 'spielerGewinnt', 'computerGewinnt');
            })
            karteLinks.disabled = false;
            karteRechts.disabled = false;
            karteLinks.textContent = '?';
            karteRechts.textContent = '?';
            message.textContent='Neue Runde, neues Glück'
        }

        document.getElementById('geben').addEventListener('click', resetSpiel);
    };

}

)
