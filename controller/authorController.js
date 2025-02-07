const db = require('../db/query ');

async function renderIndex(req, res) {
  const categories = await db.displayMessage(); 
  const title = req.params.title || null;
  const content = req.params.content || null;

  res.render('viewPost', { categories, title, content });
}



module.exports = {
  renderIndex,
};
