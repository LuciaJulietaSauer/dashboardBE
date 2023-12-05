import pool from '../db.js';

export const getSetting = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM settings WHERE code = ?', [req.params.code]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Setting not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const updateSetting = async (req, res) => {
  try {
    const { code } = req.params;
    const { value } = req.body;

    if (!code || !value) {
      res.status(400).json({ message: 'Check parameters' });
    }

    const [result] = await pool.query('UPDATE settings SET value = IFNULL(?, value)WHERE code = ?', [value, code]);
    if (result.affectedRows === 0) {
      res.status(404).json({
        message: 'Setting not found'
      });
    }

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong' });
  }
};
