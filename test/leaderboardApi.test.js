import { populateScore } from '../src/Config/leaderboardApi';

describe('LeaderBoard Test', () => {
  it('Should POST player name and score', () => {
    populateScore('Joe', 50).then(result => {
      expect(result.result).toBe('Leaderboard score created correctly.');
    }).catch(err => err);
  });
});
