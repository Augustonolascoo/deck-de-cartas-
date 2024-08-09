document.getElementById('butao').addEventListener('click', fetchCards);

        async function fetchCards() {
            try {
                const deckResponse = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                const deckData = await deckResponse.json();
                const deckId = deckData.deck_id;

                const cards = [];
                while (cards.length < 3) {
                    const cardsResponse = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`);
                    const cardsData = await cardsResponse.json();
                    // Filtra as cartas para remover 8, 9 e 10
                    const validCards = cardsData.cards.filter(card => !['8', '9', '10'].includes(card.value));
                    cards.push(...validCards);
                }

                // Limita a 3 cartas válidas
                displayCards(cards.slice(0, 3));
            } catch (error) {
                console.error('Erro ao buscar as cartas:', error);
            }
        }

        function displayCards(cards) {
            const cartasDiv = document.getElementById('cartas');
            cartasDiv.innerHTML = ''; 

            cards.forEach(card => {
                const img = document.createElement('img');
                img.src = card.image;
                img.alt = `${card.value} de ${card.suit}`;
                cartasDiv.appendChild(img);
            });
        }