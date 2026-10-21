const express = require('express');
const { FreeFireAPI } = require('shan-ffapi');
const app = express();
const api = new FreeFireAPI();

app.get('/api/player', async (req, res) => {
  const uid = req.query.uid;
  if (!uid) return res.status(400).json({ error: 'UID প্রয়োজন' });

  try {
    const profile = await api.getPlayerProfile(uid);
    // এখানে আপনি ডেটা ফরম্যাট করতে পারেন, যাতে ফ্রন্টএন্ড পেজের প্রত্যাশার সাথে মিলে যায়
    // DevAbid পেজটি player নামের অবজেক্ট প্রত্যাশা করে, তাই লাইব্রেরি থেকে পাওয়া তথ্য এর ভেতরে রাখুন
    res.json({ success: true, player: profile.basicinfo, raw: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'ডেটা আনতে ব্যর্থ, UID সঠিক কিনা দেখুন বা লাইব্রেরি আপডেট হয়েছে কিনা দেখুন' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`সার্ভার চলছে: ${PORT}`));
