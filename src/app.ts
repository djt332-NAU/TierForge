import express from 'express';
import path from 'path';
import tierListRoutes from './routes/tierListRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', tierListRoutes);

// Example Express route for updating a tier list
// Temporary in-memory storage for tier lists
let tierLists: { id: string; [key: string]: any }[] = [];

app.put('/api/tier-lists/:id', (req, res) => {
    const { id } = req.params;
    const updatedTierList = req.body;

    // Update the tier list in your database or in-memory storage
    tierLists = tierLists.map(tierList => 
        tierList.id === id ? updatedTierList : tierList
    );

    res.status(200).json({ message: 'Tier list updated successfully' });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});