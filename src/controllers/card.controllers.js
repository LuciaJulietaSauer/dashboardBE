import pool from '../db.js';

export const createCard = async (req, res) => {
  try {
    const { name, columnId } = req.body;
    if (!name || !columnId) {
      res.status(400).json({ message: 'Check parameters' });
    }

    const [rows] = await pool.query('INSERT INTO card(name, columnId) VALUES (?, ?)', [name, columnId]);
    res.send({ id: rows.insertId, name });
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, columnId, description } = req.body;

    const [result] = await pool.query(
      'UPDATE card SET name = IFNULL(?, name), columnId = IFNULL(?, columnId), description = IFNULL(?,description) WHERE id = ?',
      [name, columnId, description, +id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Column not found' });
    }

    const [rows] = await pool.query('SELECT * FROM card WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM card WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Column not found' });
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong' });
  }
};
