import express from 'express';
import cors from 'cors';

import indexRoutes from './routes/index.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import columnsRoutes from './routes/column.routes.js';
import cardRoutes from './routes/card.routes.js';

const app = express();
const port = 3001;

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:3000']
  })
);

app.use(indexRoutes);
app.use('/api', settingsRoutes);
app.use('/api', columnsRoutes);
app.use('/api', cardRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'endpoint not found' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
