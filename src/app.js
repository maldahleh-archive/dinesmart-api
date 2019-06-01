import express from 'express';

import { loadData, getData } from './helpers/data-provider';

const app = express();
app.get('/inspections', (req, res) => res.json(getData()));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    loadData()
});