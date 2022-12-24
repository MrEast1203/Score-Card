import ScoreCard from '../models/ScoreCard';

const deleteDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    console.log('Database deleted');
  } catch (e) {
    throw new Error('Database deletion failed');
  }
};

export default deleteDB;
