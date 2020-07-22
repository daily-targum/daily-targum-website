import { Howl } from 'howler';
import types, { State } from './types';
import { clamp } from '../../../shared/src/utils';
import { getPodcast } from '../../../shared/src/client';

let privateState: {
  intervalId?: number
  id?: number
} = {
  intervalId: undefined,
  id: undefined
};

export function play() {
  return (dispatch: any, getState: () => { podcast: State }) => {
    const state = getState();
    if (state.podcast.playState === 'play') {
      return;
    }

    dispatch({
      type: types.SET_PLAY_STATE,
      payload: 'play'
    });

    privateState.id = state.podcast.player?.play(privateState.id);

    function updatePosition() {
      if(!state.podcast.player) {
        return;
      }
      let position = state.podcast.player.seek(undefined, privateState.id);
      if (typeof position !== 'number') {
        position = 0;
      }

      dispatch({
        type: types.SET_POSITION,
        payload: position
      });
    }

    updatePosition();
    clearInterval(privateState.intervalId); // Clean Up
    privateState.intervalId = setInterval(updatePosition, 100);
  }
}

export function pause() {
  return (dispatch: any, getState: () => { podcast: State }) => {
    // Clean Up
    clearInterval(privateState.intervalId);

    const state = getState();
    state.podcast.player?.pause(privateState.id);

    dispatch({
      type: types.SET_PLAY_STATE,
      playState: 'pause'
    });
  }
}

export function skip(num: number) {
  return (dispatch: any, getState: () => { podcast: State }) => {
    const state = getState();

    if(!state.podcast.player) {
      return;
    }

    let newPos = clamp(0, state.podcast.position + num, state.podcast.duration);
    state.podcast.player.seek(newPos);
    
    dispatch({
      type: types.SET_POSITION,
      payload: newPos
    });


    if(newPos < state.podcast.duration) {
      dispatch(play());
    }
  }
}

export function loadPodcast(id: string) {
  return async (dispatch: any, getState: () => { podcast: State }) => {
    const state = getState();

    // Clean Up
    clearInterval(privateState.intervalId);
    if (state.podcast.player) {
      state.podcast.player.unload();
    }

    const podcast = (
      await getPodcast({
        show: 'Targum Tea',
        limit: 5
      })
    ).items.filter(episode => episode.id === id)[0];

    dispatch({
      type: types.SET_EPISODE,
      payload: podcast
    });

    const howl = new Howl({
      src: [podcast.audioFile],
      onplay: () => {
        dispatch({
          type: types.SET_PLAY_STATE,
          payload: 'play'
        });
      },
      onpause: () => {
        dispatch({
          type: types.SET_PLAY_STATE,
          payload: 'pause'
        });
      },
      onstop: () => {
        dispatch({
          type: types.SET_PLAY_STATE,
          payload: 'stop'
        });
      },
      onend: () => {
        clearInterval(privateState.intervalId);
        dispatch({
          type: types.SET_PLAY_STATE,
          payload: 'stop'
        });
        dispatch({
          type: types.SET_DURATION,
          payload: howl.duration() ?? 0
        });
      },
      onload: () => {
        dispatch({
          type: types.SET_DURATION,
          payload: howl.duration() ?? 0
        });
        dispatch({
          type: types.SET_POSITION,
          payload: 0
        });
      }
    });
    state.podcast.player?.unload();

    dispatch({
      type: types.SET_PLAYER,
      payload: howl
    });

  }
}