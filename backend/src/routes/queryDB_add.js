import ScoreCard from '../models/ScoreCard';

function createData(name, subject, score) {
  return { name, subject, score };
}

const queryDB_add = async ({ type, queryString }) => {
  var targetCard;
  var output = [];
  if (type === 'name') {
    targetCard = await ScoreCard.find({ name: queryString });
  } else {
    targetCard = await ScoreCard.find({ subject: queryString });
  }
  if (targetCard.length === 0) {
    return false;
  } else {
    for (var i = 0; i < targetCard.length; i++) {
      output[i] = createData(
        targetCard[i].name,
        targetCard[i].subject,
        targetCard[i].score
      );
    }
    return output;
  }
};

export default queryDB_add;
