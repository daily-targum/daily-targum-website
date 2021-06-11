import types, { State } from "./types";
import { clamp } from "../../../utils";
import { videoActions } from "../video";
// import { Howl } from "howler";
import webAudioTouchUnlock from "web-audio-touch-unlock";
// import soundjs from "soundjs";

if (typeof window !== "undefined") {
  // @ts-ignore
  var context = new (window.AudioContext || window.webkitAudioContext)();
  webAudioTouchUnlock(context).then(function () {});
}

let privateState: {
  id?: number;
  intervalId?: number;
} = {
  id: undefined,
  intervalId: undefined,
};

export function play() {
  return (dispatch: any, getState: () => { podcast: State }) => {
    const state = getState();
    if (state.podcast.playState === "play") {
      return;
    }

    console.log(state);

    dispatch(videoActions.setPlayState("stop"));
    dispatch(videoActions.setPersist(false));

    dispatch({
      type: types.SET_PLAY_STATE,
      payload: "play",
    });

    dispatch(setPersist(true));

    console.log(state);
    privateState.id = state.podcast.player?.play(
      privateState.id === null ? undefined : privateState.id
    );
    console.log(privateState.id);

    function updatePosition() {
      if (!state.podcast.player) {
        return;
      }
      let position = state.podcast.player.seek(undefined);
      if (typeof position !== "number") {
        position = 0;
      }

      dispatch({
        type: types.SET_POSITION,
        payload: position,
      });
    }

    updatePosition();
    window.clearInterval(privateState.intervalId); // Clean Up
    privateState.intervalId = window.setInterval(updatePosition, 100);
  };
}

export function pause() {
  return (dispatch: any, getState: () => { podcast: State }) => {
    // Clean Up
    clearInterval(privateState.intervalId);

    const state = getState();
    state.podcast.player?.pause(privateState.id);

    dispatch({
      type: types.SET_PLAY_STATE,
      playState: "pause",
    });
  };
}

export function skip(num: number) {
  return (dispatch: any, getState: () => { podcast: State }) => {
    const state = getState();

    if (!state.podcast.player) {
      return;
    }

    let newPos = clamp(0, state.podcast.position + num, state.podcast.duration);
    state.podcast.player.seek(newPos);

    dispatch({
      type: types.SET_POSITION,
      payload: newPos,
    });

    if (newPos < state.podcast.duration) {
      dispatch(play());
    }
  };
}

function syncPlayback() {
  return async (dispatch: any, getState: () => { podcast: State }) => {
    const state = getState();
    if (state.podcast.playState === "play") {
      dispatch(play());
    }
  };
}

export function loadPodcast(show: string, id: string) {
  return async (dispatch: any, getState: () => { podcast: State }) => {
    const { getPodcast } = await import("../../../aws");
    const { Howl } = await import("howler");

    const state = getState();

    // Clean Up
    window.clearInterval(privateState.intervalId);
    if (state.podcast.player) {
      state.podcast.player.unload();
    }

    const podcast = (
      await getPodcast({
        show,
        limit: 5,
      })
    ).items.filter((episode) => episode.id === id);
    console.log(podcast);

    dispatch({
      type: types.SET_EPISODE,
      payload: podcast[0],
    });

    // const audioContext = new AudioContext();
    // const file = new Audio(podcast.audioFile);
    // const track = audioContext.createMediaElementSource(file);

    //file.play();

    const howl = new Howl({
      src: [podcast[0].audioFile],
      html5: true,
      mute: false,
      autoplay: false,

      onplay: () => {
        dispatch({
          type: types.SET_PLAY_STATE,
          payload: "play",
        });
      },
      onpause: () => {
        dispatch({
          type: types.SET_PLAY_STATE,
          payload: "pause",
        });
      },
      onstop: () => {
        dispatch({
          type: types.SET_PLAY_STATE,
          payload: "stop",
        });
      },
      onend: () => {
        dispatch({
          type: types.SET_PLAY_STATE,
          payload: "stop",
        });
        dispatch({
          type: types.SET_DURATION,
          payload: howl.duration() ?? 0,
        });
      },
      onload: () => {
        dispatch({
          type: types.SET_DURATION,
          payload: howl.duration() ?? 0,
        });
        dispatch({
          type: types.SET_POSITION,
          payload: 0,
        });
        dispatch(syncPlayback());
      },
      onunlock: () => {
        // alert("unlock");
      },
    });

    if (typeof window !== "undefined") {
      try {
        // @ts-ignore
        window.navigator.mediaSession.setActionHandler("play", () =>
          howl.play()
        );
        // @ts-ignore
        window.navigator.mediaSession.setActionHandler("pause", () =>
          howl.pause()
        );
      } catch (e) {}
    }

    dispatch({
      type: types.SET_PLAYER,
      payload: howl,
    });

    dispatch(setPersist(true));
  };
}

export function setPersist(persist: boolean) {
  return {
    type: types.SET_PERSIST,
    payload: persist,
  };
}
