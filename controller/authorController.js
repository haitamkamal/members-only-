const db = require('../db/query ');

async function renderIndex(req, res) {
  const categories = await db.displayMessage(); 
  const title = req.params.title || null;
  const content = req.params.content || null;

  res.render('viewPost', { categories, title, content });
}

async function deleteMsg(req, res) {
  const msgId = parseInt(req.params.id, 10);
  if (!isNaN(msgId)) {
    await db.deleteMsg(msgId);
  }
  res.redirect("/view-post/messages"); 
}


module.exports = {
  renderIndex,
  deleteMsg
};
