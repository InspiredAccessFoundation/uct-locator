const express = require("express");
const router = express.Router();

// @route GET api/health/check
// @desc Make sure we can respond
// @access Public
router.get("/check", async (req, res) => {
    res.json({
        "STATUS": "UP"
    });
});

// Export routes
module.exports = router;
