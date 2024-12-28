const Visit = require('../models/visits');

// Ghi nhận lượt truy cập
exports.recordVisit = async (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const visit = await Visit.findOneAndUpdate(
      { date: today },
      { $inc: { visits: 1 } },
      { new: true, upsert: true }
    );
    res.status(200).json(visit);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record visit' });
  }
};

// Lấy dữ liệu thống kê
exports.getStatistics = async (req, res) => {
  try {
    const stats = await Visit.find().sort({ date: -1 }); // Sắp xếp mới nhất trước
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};
