import ScoreCard from '../models/ScoreCard';

const queryDB = async ({ type, queryString }) => {
  var targetCard;
  var output = [];
  if (type === 'name') {
    targetCard = await ScoreCard.find({ name: queryString });
    if (targetCard.length === 0) {
      return false;
    } else {
      for (var i = 0; i < targetCard.length; i++) {
        output[
          i
        ] = `Found card with name: (${targetCard[i].name},${targetCard[i].subject},${targetCard[i].score})`;
      }
      return output;
    }
  } else {
    targetCard = await ScoreCard.find({ subject: queryString });
    if (targetCard.length === 0) {
      return false;
    } else {
      for (var i = 0; i < targetCard.length; i++) {
        output[
          i
        ] = `Found card with name: (${targetCard[i].name},${targetCard[i].subject},${targetCard[i].score})`;
      }
      return output;
    }
  }
};

export default queryDB;
