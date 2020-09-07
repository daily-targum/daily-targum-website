import React from 'react';
import Section from './Section';
import Theme from './Theme';
import Grid from './Grid/web';
import Text from './Text';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { GrForwardTen, GrBackTen } from 'react-icons/gr';
import { clamp, secondsToTimeCode } from '../shared/src/utils';
import { useSelector, useDispatch } from '../store';
import { podcastActions } from '../store/ducks/podcast';
import styles from './PodcastPlayerBar.module.scss';

function ProgressBar({
  progress
}: {
  progress: number
}) {
  const theme = Theme.useTheme();
  return (
    <div
      style={{
        flex: 1,
        height: 4,
        backgroundColor: theme.colors.divider
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: theme.colors.accent,
          transition: 'all 0.1s',
          transitionTimingFunction: 'linear'
        }}
      />
    </div>
  );
}

export function PodcastPlayerBar() {
  const dispatch = useDispatch();
  const playState = useSelector(s => s.podcast.playState);
  const duration = useSelector(s => s.podcast.duration);
  const position = useSelector(s => s.podcast.position);
  const episode = useSelector(s => s.podcast.episode);
  const persist = useSelector(s => s.podcast.persist);

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
      <div className={styles.spacer}/>
      <Section 
        className={styles.section}
        styleInside={{
          overflow: 'visible'
        }}
      >
        <Grid.Row>

          {/* Desktop */}
          <Grid.Col xs={0} md={6}>
            <div className={styles.row}>
              <GrBackTen
                size={20}
                className={styles.icon}
                onClick={() => skip(-10)}
              />
              {playState !== 'play' ? (
                <IoIosPlay
                  size={22}
                  onClick={play}
                  className={styles.icon}
                />
              ) : (
                <IoIosPause
                  size={22}
                  onClick={pause}
                  className={styles.icon}
                />
              )}
              <GrForwardTen
                size={20}
                className={styles.icon}
                onClick={() => skip(10)}
              />
            </div>
          </Grid.Col>

          <Grid.Col xs={0} md={12}>
            <div className={styles.row}>
              <span
                className={styles.time}
              >{secondsToTimeCode(position)}</span>
              <ProgressBar
                progress={clamp(0, 100 * position / duration, 100)}
              />
              <span
                className={styles.time}
              >{secondsToTimeCode(duration)}</span>
            </div>
          </Grid.Col>

          <Grid.Col xs={0} md={6} style={{alignItems: 'flex-end'}}>
            <div className={styles.row}>
              <div
                className={styles.coverImage}
                style={{
                  backgroundImage: `url(${episode?.coverArt})`
                }}
              />
              <div className={styles.col}>
                <Text>{episode?.show || ''}</Text>
                <Text>{episode?.title || ''}</Text>
              </div>
            </div>
          </Grid.Col>

          {/* Mobile */}
          <Grid.Col xs={8} md={0}>
            <div className={styles.row}>
              <div className={styles.col}>
                <Text>{episode?.show || ''}</Text>
                <Text>{episode?.title || ''}</Text>
              </div>
            </div>
          </Grid.Col>
          
          <Grid.Col xs={8} md={0} style={{alignItems: 'center'}}>
            <div className={styles.row}>
              <GrBackTen
                size={20}
                className={styles.icon}
                onClick={() => skip(-10)}
              />
              {playState !== 'play' ? (
                <IoIosPlay
                  size={22}
                  onClick={play}
                  className={styles.icon}
                />
              ) : (
                <IoIosPause
                  size={22}
                  onClick={pause}
                  className={styles.icon}
                />
              )}
              <GrForwardTen
                size={20}
                className={styles.icon}
                onClick={() => skip(10)}
              />
            </div>
          </Grid.Col>

          <Grid.Col xs={8} md={0} style={{alignItems: 'flex-end'}}>
            <div className={styles.row}>
              <span className={styles.time} >
                {secondsToTimeCode(position)} / {secondsToTimeCode(duration)}
              </span>
            </div>
          </Grid.Col>


        </Grid.Row>

      </Section>
    </>
  ) : null;
}

export default PodcastPlayerBar;