import express from 'express';

import { loadData, getData } from './helpers/data-provider';

const app = express();
app.get('/inspections', (req, res) => res.json(getData()));
app.listen(process.env.PORT || 3000, () => loadData());