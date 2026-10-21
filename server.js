const express = require('express');
const { FreeFireAPI } = require('shan-ffapi');
const app = express();
const api = new FreeFireAPI();

app.get('/api/player', async (req, res) => {
  const uid = req.query.uid;
  if (!uid) return res.status(400).json({ error: 'UID প্রয়োজন' });
  try {
    const profile = await api.getPlayerProfile(uid);
    res.json({ success: true, player: profile.basicinfo, raw: profile });
  } catch (err) {
    res.status(500).json({ error: 'ডেটা আনতে ব্যর্থ, UID সঠিক কিনা দেখুন' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log('running on ' + PORT));
