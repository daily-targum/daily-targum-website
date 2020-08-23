import React from 'react';
import Section from './Section';
import Theme from './Theme';
import Grid from './Grid/web';
import Text from './Text';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { GrForwardTen, GrBackTen } from 'react-icons/gr';
import { styleHelpers } from '../utils';
import { clamp, secondsToTimeCode } from '../shared/src/utils';
import { useSelector, useDispatch } from '../store';
import { podcastActions } from '../store/ducks/podcast';

const HEIGHT = 50;

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
  const styles = Theme.useStyleCreator(styleCreator);

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
      <div style={styles.spacer}/>
      <Section 
        style={styles.section}
        styleInside={{
          overflow: 'visible'
        }}
      >
        <Grid.Row>

          {/* Desktop */}
          <Grid.Col xs={0} md={6}>
            <div style={styles.row}>
              <GrBackTen
                size={20}
                style={styles.icon}
                onClick={() => skip(-10)}
              />
              {playState !== 'play' ? (
                <IoIosPlay
                  size={22}
                  onClick={play}
                  style={styles.icon}
                />
              ) : (
                <IoIosPause
                  size={22}
                  onClick={pause}
                  style={styles.icon}
                />
              )}
              <GrForwardTen
                size={20}
                style={styles.icon}
                onClick={() => skip(10)}
              />
            </div>
          </Grid.Col>

          <Grid.Col xs={0} md={12}>
            <div style={styles.row}>
              <span
                style={styles.time}
              >{secondsToTimeCode(position)}</span>
              <ProgressBar
                progress={clamp(0, 100 * position / duration, 100)}
              />
              <span
                style={styles.time}
              >{secondsToTimeCode(duration)}</span>
            </div>
          </Grid.Col>

          <Grid.Col xs={0} md={6} style={{alignItems: 'flex-end'}}>
            <div style={styles.row}>
              <div
                style={{
                  ...styles.coverImage,
                  backgroundImage: `url(${episode?.coverArt})`
                }}
              />
              <div style={styles.col}>
                <Text>{episode?.show || ''}</Text>
                <Text>{episode?.title || ''}</Text>
              </div>
            </div>
          </Grid.Col>

          {/* Mobile */}
          <Grid.Col xs={8} md={0}>
            <div style={styles.row}>
              <div style={styles.col}>
                <Text>{episode?.show || ''}</Text>
                <Text>{episode?.title || ''}</Text>
              </div>
            </div>
          </Grid.Col>
          
          <Grid.Col xs={8} md={0} style={{alignItems: 'center'}}>
            <div style={styles.row}>
              <GrBackTen
                size={20}
                style={styles.icon}
                onClick={() => skip(-10)}
              />
              {playState !== 'play' ? (
                <IoIosPlay
                  size={22}
                  onClick={play}
                  style={styles.icon}
                />
              ) : (
                <IoIosPause
                  size={22}
                  onClick={pause}
                  style={styles.icon}
                />
              )}
              <GrForwardTen
                size={20}
                style={styles.icon}
                onClick={() => skip(10)}
              />
            </div>
          </Grid.Col>

          <Grid.Col xs={8} md={0} style={{alignItems: 'flex-end'}}>
            <div style={styles.row}>
              <span style={styles.time} >
                {secondsToTimeCode(position)} / {secondsToTimeCode(duration)}
              </span>
            </div>
          </Grid.Col>


        </Grid.Row>

      </Section>
    </>
  ) : null;
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  spacer: {
    ...styleHelpers.lockHeight(HEIGHT),
  },
  section: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0,
    ...styleHelpers.lockHeight(HEIGHT),
    justifyContent: 'center',
    borderTop: `1px solid ${theme.colors.divider}`,
    backgroundColor: 'rgba(255,255,255,0.9)',
    backdropFilter: 'saturate(180%) blur(10px)',
  },
  inside: {
    ...styleHelpers.flex('row'),
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    ...styleHelpers.flex('row'),
    alignItems: 'center',
    ...styleHelpers.lockHeight(HEIGHT)
  },
  col: {
    ...styleHelpers.flex('column'),
  },
  icon: {
    marginRight: theme.spacing(2),
    cursor: 'pointer'
  },
  time: {
    padding: theme.spacing(0, 2),
    textAlign: 'center',
    minWidth: 80
  },
  coverImage: {
    ...styleHelpers.lockWidth(HEIGHT - 10),
    ...styleHelpers.lockHeight(HEIGHT - 10),
    ...styleHelpers.centerBackgroundImage()
  },
  centerHorizontally: {
    alignItems: 'center'
  }
}));

export default PodcastPlayerBar;