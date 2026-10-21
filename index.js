const express = require('express');
const { FreeFireAPI } = require('shan-ffapi');

const app = express();
const api = new FreeFireAPI();

// গুরুত্বপূর্ণ: public ফোল্ডারের স্ট্যাটিক ফাইল পরিবেশন করুন, যাতে / অ্যাক্সেস করলে index.html লোড হয়
app.use(express.static('public'));

// API রুট: UID দিয়ে প্লেয়ার তথ্য জিজ্ঞাসা
app.get('/api/player/:uid', async (req, res) => {
  const uid = req.params.uid;

  if (!uid || uid.length < 5) {
    return res.status(400).json({ error: 'অনুগ্রহ করে সঠিক UID প্রদান করুন' });
  }

  try {
    const profile = await api.getPlayerProfile(uid);
    const basic = profile.basicinfo || {};
    const social = profile.socialinfo || {};

    res.json({
      uid: uid,
      nickname: basic.nickname || 'অজানা',
      level: basic.level || 0,
      likes: social.liked || 0,
      region: basic.region || 'অজানা',
      raw: profile
    });
  } catch (err) {
    console.error('ত্রুটি:', err.message);
    res.status(500).json({ error: 'তথ্য পাওয়া যায়নি, UID সঠিক কিনা বা লাইব্রেরি আপডেট হয়েছে কিনা দেখুন' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`সার্ভার পোর্ট ${PORT} এ চলছে`);
});
