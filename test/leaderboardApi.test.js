import { populateScore } from '../src/Config/leaderboardApi';

describe('LeaderBoard Test', () => {
  it('Should POST player name and score', () => {
    populateScore('Joe', 50).then((result) => {
      expect(result.result).toBe('Leaderboard score created correctly.');
    }).catch((err) => err);
  });
  it('Should NOT POST player with no user name', () => {
    populateScore('', 50).then((result) => {
      expect(result.message).toBe('You need to provide a valid user for the score');
    }).catch((err) => err);
  });

  it('Should NOT POST player with no score', () => {
    populateScore('Joe', 0.00).then((result) => {
      expect(result.message).toBe('You need to provide a valid user for the score');
    }).catch((err) => err);
  });
});
