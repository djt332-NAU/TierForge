document.addEventListener('DOMContentLoaded', () => {
    const tierListForm = document.getElementById('tier-list-form');
    const tierListsContainer = document.getElementById('tier-lists');

    const fetchTierLists = async () => {
        const response = await fetch('/api/tier-lists');
        const tierLists = await response.json();
        tierListsContainer.innerHTML = '';
        tierLists.forEach(tierList => {
            const tierListElement = document.createElement('div');
            tierListElement.className = 'tier-list';
            tierListElement.innerHTML = `
                <h2>${tierList.title}</h2>
                <p>${tierList.items.join(', ')}</p>
                <button onclick="deleteTierList(${tierList.id})">Delete</button>
            `;
            tierListsContainer.appendChild(tierListElement);
        });
    };

    const createTierList = async (title, items) => {
        await fetch('/api/tier-lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, items })
        });
        fetchTierLists();
    };

    const deleteTierList = async (id) => {
        await fetch(`/api/tier-lists/${id}`, {
            method: 'DELETE'
        });
        fetchTierLists();
    };

    tierListForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const items = document.getElementById('items').value.split(',').map(item => item.trim());
        createTierList(title, items);
        tierListForm.reset();
    });

    fetchTierLists();
});