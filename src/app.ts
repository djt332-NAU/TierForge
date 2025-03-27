import express from 'express';
import path from 'path';
import tierListRoutes from './routes/tierListRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', tierListRoutes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});