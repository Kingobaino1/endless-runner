import 'jest-canvas-mock';
import BootScene from '../src/scenes/BootScene';
import CreditScene from '../src/scenes/CreditScene';
import GameScene from '../src/scenes/GameScene';
import LeaderBoardScene from '../src/scenes/LeaderBoardScene';
import PreloaderScene from '../src/scenes/PreloaderScene';
import TitleScene from '../src/scenes/TitleScene';


describe('Scenes are functions test', () => {
  it('Boot Scene is a function', () => {
    expect(typeof BootScene).toBe('function');
  });
  it('Credit Scene is a function', () => {
    expect(typeof CreditScene).toBe('function');
  });
  it('Game Scene is a function', () => {
    expect(typeof GameScene).toBe('function');
  });
  it('LeaderBoard Scene is a function', () => {
    expect(typeof LeaderBoardScene).toBe('function');
  });
  it('Preloader Scene is a function', () => {
    expect(typeof PreloaderScene).toBe('function');
  });
  it('Title Scene is a function', () => {
    expect(typeof TitleScene).toBe('function');
  });

  it('Boot Scene is not to be undefined', () => {
    expect(typeof BootScene).not.toBe('undefined');
  });

  it('Credit Scene is not to be undefined', () => {
    expect(typeof CreditScene).not.toBe('undefined');
  });

  it('Preloader Scene is not to be undefined', () => {
    expect(typeof PreloaderScene).not.toBe('undefined');
  });

  it('Title Scene is not to be undefined', () => {
    expect(typeof TitleScene).not.toBe('undefined');
  });

  it('Game Scene is not to be undefined', () => {
    expect(typeof GameScene).not.toBe('undefined');
  });

  it('Leaderboard Scene is not to be undefined', () => {
    expect(typeof LeaderBoardScene).not.toBe('undefined');
  });
});
