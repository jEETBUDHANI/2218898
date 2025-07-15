const Url = require('../models/urlModel');
const generateShortCode = require('../utils/generateShortCode');

exports.shortenUrl = async (url, validity = 30, shortcode) => {
  const expiry = new Date(Date.now() + validity * 60000);
  const code = shortcode || generateShortCode();
  const exists = await Url.findOne({ shortCode: code });
  if (exists) throw new Error('Shortcode already in use');

  const newUrl = await Url.create({
    originalUrl: url,
    shortCode: code,
    expiry,
  });

  return {
    shortLink: `http://localhost:5000/${code}`,
    expiry: expiry.toISOString(),
  };
};

exports.getUrlStats = async (shortcode) => {
  const url = await Url.findOne({ shortCode: shortcode });
  if (!url) throw new Error('Shortcode not found');

  return {
    originalUrl: url.originalUrl,
    createdAt: url.createdAt,
    expiry: url.expiry,
    totalClicks: url.clicks.length,
    clicks: url.clicks,
  };
};
