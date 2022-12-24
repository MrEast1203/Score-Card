import ScoreCard from '../models/ScoreCard.js';

const saveScoreCard = async ({ name, subject, score }) => {
  let existing = await ScoreCard.findOne({ name, subject });
  try {
    if (existing) {
      const updateCard = await ScoreCard.updateOne(
        { name, subject },
        { $set: { score: score } }
      );
      console.log('Updating', updateCard);
      return `Updating (${name}, ${subject}, ${score})`;
    } else {
      const newCard = await new ScoreCard({ name, subject, score });
      console.log('Adding', newCard);
      newCard.save();
      return `Adding (${name}, ${subject}, ${score})`;
    }
  } catch (e) {
    throw new Error('Card creation error: ' + e);
  }
};
export default saveScoreCard;
