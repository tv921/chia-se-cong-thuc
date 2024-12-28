const express = require('express');
const router = express.Router();
const { recordVisit, getStatistics } = require('../controllers/visit.controller');

// Route ghi nhận lượt truy cập
router.post('/record', recordVisit);

// Route lấy dữ liệu thống kê
router.get('/stats', getStatistics);

module.exports = router;
