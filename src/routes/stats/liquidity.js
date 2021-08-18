const { DB } = require('../../db');

exports.route = (app) => {
  app.get('/static/calculated/skill/liquidity', async (req, res) => {
    const data = await DB.$dataPoints.findOne({ type: 'liquidity' }, { sort: { timestamp: -1 } });
    if (!data) return res.write(`${603515}`);

    return res.send(`${data.total}`);
  });

  app.post('/calculated/skill/liquidity', async (req, res) => {
    const { total } = req.body;
    let { timestamp } = req.body;

    if (!total) {
      return res.status(400).json({ error: 'Invalid body. Must pass total.' });
    }

    if (!timestamp) timestamp = Date.now();

    DB.$dataPoints.insert({ type: 'liquidity', total, timestamp });

    return res.json({ added: true });
  });
};