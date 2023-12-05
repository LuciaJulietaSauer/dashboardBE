import pool from '../db.js';

export const getColumns = async (_, res) => {
  try {
    const [cardOrder] = await pool.query('SELECT value FROM settings WHERE code = "cardOrder" LIMIT 1');

    const orderBy = cardOrder.length > 0 ? cardOrder[0].value : 'creationDate';

    const [rows] = await pool.query(
      `SELECT c.id, c.title, cd.id as cardId, cd.name, cd.description, cd.creationDate FROM columns c LEFT JOIN card cd ON c.id = cd.columnId ORDER BY c.id, ${orderBy} ASC`
    );

    const response = rows.reduce((accum, row) => {
      const column = accum.find(r => r.id === row.id);

      let newCard;
      if (row.cardId) {
        newCard = { id: row.cardId, name: row.name, description: row.description, creationDate: row.creationDate };
      }

      if (column) {
        column.cards.push(newCard);
      } else {
        accum.push({ id: row.id, title: row.title, cards: newCard ? [newCard] : [] });
      }
      return accum;
    }, []);

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createColumns = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ message: 'Check parameters' });
    }

    const [rows] = await pool.query('INSERT INTO columns(title) VALUES (?)', [title]);
    res.send({ id: rows.insertId, title });
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong' });
  }
};
