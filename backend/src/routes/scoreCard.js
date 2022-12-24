import { Router } from 'express';
import ScoreCard from '../models/ScoreCard';
import saveScoreCard from './saveScoreCard';
import deleteDB from './deleteDB';
import queryDB from './queryDB';
import queryDB_add from './queryDB_add';

const router = Router();
router.delete('/cards', async (req, res) => {
  await deleteDB();
  res.json({ message: 'Database cleared' });
});
router.post('/card', async (req, res) => {
  console.log('post card', req.body);
  let card = await saveScoreCard(req.body);
  res.json({ message: card, card: true });
});
router.get('/cards', async (req, res) => {
  var messages = await queryDB(req.query);
  var message = null;
  if (!messages) {
    message = `${req.query.type} (${req.query.queryString}) not found!`;
  }
  res.json({ messages: messages, message: message });
});

router.get('/cards_add', async (req, res) => {
  var messages = await queryDB_add(req.query);
  res.json({ messages_query: messages });
});
export default router;
