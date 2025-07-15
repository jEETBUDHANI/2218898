const urlService = require('../services/urlService');
const log = require('../../logging-middleware/log');

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    const result = await urlService.shortenUrl(url, validity, shortcode);
    await log("backend", "info", "controller", "Short URL created successfully");
    return res.status(201).json(result);
  } catch (error) {
    await log("backend", "error", "controller", error.message);
    return res.status(400).json({ error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const shortcode = req.params.shortcode;
    const stats = await urlService.getUrlStats(shortcode);
    await log("backend", "info", "controller", "URL statistics retrieved successfully");
    return res.status(200).json(stats);
  } catch (error) {
    await log("backend", "error", "controller", error.message);
    return res.status(404).json({ error: error.message });
  }
};
