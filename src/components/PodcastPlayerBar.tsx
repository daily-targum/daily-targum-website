import * as React from 'react';
import Section from './Section';
import Grid from './Grid/web';
import Text from './Text';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { MdForward10, MdReplay10 } from 'react-icons/md';
import { clamp, secondsToTimeCode } from '../utils';
import { useSelector, useDispatch } from '../store';
import { podcastActions } from '../store/ducks/podcast';
import Styles from './PodcastPlayerBar.styles';
const { classNames, StyleSheet } = Styles;

function ProgressBar({
  progress
}: {
  progress: number
}) {
  return (
    <>
      <div className={classNames.progressBar}>
        <div
          className={classNames.progressBarProgress}
          style={{
            width: `${progress}%`
          }}
        />
      </div>
      {StyleSheet}
    </>
  );
}

export function PodcastPlayerBar() {
  const dispatch = useDispatch();
  const playState = useSelector(s => s.podcast.playState);
  const duration = useSelector(s => s.podcast.duration);
  const position = useSelector(s => s.podcast.position);
  const episode = useSelector(s => s.podcast.episode);
  const persist = useSelector(s => s.podcast.persist);

  const loading = playState === 'play' && duration < 1;

  const visible = episode && persist;

  function play() {
    dispatch(podcastActions.play());
  }

  function pause() {
    dispatch(podcastActions.pause());
  }

  function skip(num: number) {
    dispatch(podcastActions.skip(num));
  }

  return visible ? (
    <>
      <div className={classNames.spacer}/>
      <Section 
        className={classNames.section}
        styleInside={{
          overflow: 'visible'
        }}
      >
        <Grid.Row>

          {/* Desktop */}
          <Grid.Col xs={0} md={6}>
            <div className={classNames.row}>
              <button 
                onClick={() => skip(-10)}
                className={classNames.hideButton}
              >
                <MdReplay10
                  size={28}
                  className={classNames.icon}
                />
              </button>

              <button 
                onClick={() => {
                  if (playState !== 'play') {
                    play();
                  } else {
                    pause();
                  }
                }}
                className={classNames.hideButton}
              >
                {playState !== 'play' ? (
                  <IoIosPlay
                    size={28}
                    className={classNames.icon}
                  />
                ) : (
                  <IoIosPause
                    size={28}
                    className={classNames.icon}
                  />
                )}
              </button>

              <button 
                onClick={() => skip(10)}
                className={classNames.hideButton}
              >
                <MdForward10
                  size={28}
                  className={classNames.icon}
                />
              </button>
            </div>
          </Grid.Col>

          <Grid.Col xs={0} md={12}>
            <div className={classNames.row}>
              {!loading ? (
                <>
                  <span
                    className={classNames.time}
                  >{secondsToTimeCode(position)}</span>
                  <ProgressBar
                    progress={clamp(0, 100 * position / duration, 100)}
                  />
                  <span
                    className={classNames.time}
                  >{secondsToTimeCode(duration)}</span>
                </>
              ) : (
                <span style={{width: '100%', textAlign: 'center'}}>Loading...</span>
              )}
            </div>
          </Grid.Col>

          <Grid.Col xs={0} md={6} style={{alignItems: 'flex-end'}}>
            <div className={classNames.row}>
              <div
                className={classNames.coverImage}
                style={{
                  backgroundImage: `url(${episode?.coverArt})`
                }}
              />
              <div className={classNames.col}>
                <Text>{episode?.show || ''}</Text>
                <Text.Truncate numberOfLines={1}>{episode?.title || ''}</Text.Truncate>
              </div>
            </div>
          </Grid.Col>

          {/* Mobile */}
          <Grid.Col xs={8} md={0}>
            <div className={classNames.row}>
              <div className={classNames.col}>
                <Text>{episode?.show || ''}</Text>
                <Text>{episode?.title || ''}</Text>
              </div>
            </div>
          </Grid.Col>
          
          <Grid.Col xs={8} md={0} style={{alignItems: 'center'}}>
            <div className={classNames.row}>
              <button 
                onClick={() => skip(-10)}
                className={classNames.hideButton}
              >
                <MdReplay10
                  size={28}
                  className={classNames.icon}
                />
              </button>

              <button 
                onClick={() => {
                  if (playState !== 'play') {
                    play();
                  } else {
                    pause();
                  }
                }}
                className={classNames.hideButton}
              >
                {playState !== 'play' ? (
                  <IoIosPlay
                    size={28}
                    className={classNames.icon}
                  />
                ) : (
                  <IoIosPause
                    size={28}
                    className={classNames.icon}
                  />
                )}
              </button>

              <button 
                onClick={() => skip(10)}
                className={classNames.hideButton}
              >
                <MdForward10
                  size={28}
                  className={classNames.icon}
                />
              </button>
            </div>
          </Grid.Col>

          <Grid.Col xs={8} md={0} style={{alignItems: 'flex-end'}}>
            <div className={classNames.row}>
              <span className={classNames.time} >
                {secondsToTimeCode(position)} / {secondsToTimeCode(duration)}
              </span>
            </div>
          </Grid.Col>


        </Grid.Row>

      </Section>
      {StyleSheet}
    </>
  ) : null;
}

export default PodcastPlayerBar;