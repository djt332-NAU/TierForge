document.addEventListener('DOMContentLoaded', () => {
    const tierListForm = document.getElementById('tier-list-form');
    const tierListsContainer = document.getElementById('tier-lists');

    const predefinedTiers = ["S", "A", "B", "C", "D"]; // Define the tiers

    const fetchTierLists = async () => {
        const response = await fetch('/api/tier-lists');
        const tierLists = await response.json();
        tierListsContainer.innerHTML = '';
        tierLists.forEach(tierList => {
            const tierListElement = document.createElement('div');
            tierListElement.className = 'tier-list';
            tierListElement.innerHTML = `
                <h2>${tierList.title}</h2>
                ${predefinedTiers.map(tier => `
                    <div class="tier" data-tier="${tier}">
                        <div class="tier-label">${tier}</div>
                        <div class="tier-items" data-tier="${tier}">
                            ${tierList.items[tier]?.map(item => `<span class="tier-item" draggable="true" data-item="${item}">${item}</span>`).join('') || ''}
                        </div>
                    </div>
                `).join('')}
                <form class="add-item-form" data-id="${tierList.id}">
                    <input type="text" class="new-item-input" placeholder="Add new item" required>
                    <select class="tier-select">
                        ${predefinedTiers.map(tier => `<option value="${tier}">${tier}</option>`).join('')}
                    </select>
                    <button type="submit">Add Item</button>
                </form>
                <button class="delete-button" data-id="${tierList.id}">Delete</button>
            `;
            tierListsContainer.appendChild(tierListElement);
        });

        addDragAndDropListeners();
        addItemFormListeners();

        // Add event listeners to all delete buttons
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.target.getAttribute('data-id');
                deleteTierList(id);
            });
        });
    };

    const createTierList = async (title, items) => {
        const tieredItems = predefinedTiers.reduce((acc, tier) => {
            acc[tier] = []; // Initialize each tier with an empty array
            return acc;
        }, {});

        // Distribute items into tiers (for simplicity, all items go into "S" by default)
        items.forEach(item => {
            tieredItems["S"].push(item);
        });

        await fetch('/api/tier-lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, items: tieredItems })
        });
        fetchTierLists();
    };

    const deleteTierList = async (id) => {
        await fetch(`/api/tier-lists/${id}`, {
            method: 'DELETE'
        });
        fetchTierLists();
    };

    const addItemFormListeners = () => {
        const addItemForms = document.querySelectorAll('.add-item-form');
        addItemForms.forEach(form => {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                const tierListId = form.getAttribute('data-id');
                const newItemInput = form.querySelector('.new-item-input');
                const tierSelect = form.querySelector('.tier-select');
                const newItem = newItemInput.value.trim();
                const selectedTier = tierSelect.value;

                if (newItem) {
                    // Fetch the tier list to update
                    const response = await fetch('/api/tier-lists');
                    const tierLists = await response.json();
                    const tierList = tierLists.find(tl => tl.id === tierListId);

                    // Add the new item to the selected tier
                    tierList.items[selectedTier].push(newItem);

                    // Update the tier list on the server
                    await fetch(`/api/tier-lists/${tierList.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(tierList)
                    });

                    // Refresh the UI
                    fetchTierLists();
                }
            });
        });
    };

    const addDragAndDropListeners = () => {
        const tierItems = document.querySelectorAll('.tier-item');
        const tierContainers = document.querySelectorAll('.tier-items');

        let draggedItem = null;

        tierItems.forEach(item => {
            item.addEventListener('dragstart', (event) => {
                draggedItem = event.target;
                event.dataTransfer.setData('text/plain', event.target.dataset.item);
                event.dataTransfer.effectAllowed = 'move';
            });

            item.addEventListener('dragend', () => {
                draggedItem = null;
            });
        });

        tierContainers.forEach(container => {
            container.addEventListener('dragover', (event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
            });

            container.addEventListener('drop', async (event) => {
                event.preventDefault();
                const item = event.dataTransfer.getData('text/plain');
                const sourceTier = draggedItem.closest('.tier-items').dataset.tier;
                const targetTier = event.target.closest('.tier-items').dataset.tier;

                if (sourceTier !== targetTier) {
                    const response = await fetch('/api/tier-lists');
                    const tierLists = await response.json();
                    const tierList = tierLists[0]; // Assuming a single tier list for simplicity

                    // Remove the item from the source tier
                    const sourceIndex = tierList.items[sourceTier].indexOf(item);
                    if (sourceIndex > -1) {
                        tierList.items[sourceTier].splice(sourceIndex, 1);
                    }

                    // Add the item to the target tier
                    tierList.items[targetTier].push(item);

                    // Update the tier list on the server
                    await fetch(`/api/tier-lists/${tierList.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(tierList)
                    });

                    // Update the UI
                    fetchTierLists();
                }
            });
        });
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