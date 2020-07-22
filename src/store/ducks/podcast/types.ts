import { Howl } from 'howler';
import { Podcast } from '../../../shared/src/client';

export default {
  SET_PLAY_STATE: 'SET_PLAY_STATE',
  SET_DURATION: 'SET_DURATION',
  SET_POSITION: 'SET_POSITION',
  SET_PLAYER: 'SET_PLAYER',
  SET_EPISODE: 'SET_EPISODE'
}

export interface State {
  player?: Howl
  playState: 'stop' | 'pause' | 'play'
  position: number
  duration: number
  episode?: Podcast
}