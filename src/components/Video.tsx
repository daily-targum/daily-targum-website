import * as React from 'react';
import { useSelector, useDispatch } from '../store';
import { videoActions } from '../store/ducks/video';
import Text from './Text';
import Button from './Button';
import Image from './Image';
import { imgix } from '../utils';
import { formatDate } from '../utils';
import { IoMdClose, IoMdPlay } from 'react-icons/io';
import Styles from './Video.styles';
const { classNames, StyleSheet } = Styles;

function Player({
  style,
  slave = false
}: {
  style?: React.CSSProperties
  slave?: boolean
}) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();
  const src = useSelector(s => s.video.src);
  const thumbnail = useSelector(s => s.video.thumbnail);
  const position = useSelector(s => s.video.position);
  const playState = useSelector(s => s.video.playState);
  const isStopped = playState === 'stop';


  // Master
  React.useEffect(() => {
    if (ref.current === null || slave) return;

    const player = ref.current;

    // If player was previously slave
    // pick up state from previous master
    if (player.currentTime === 0) {
      player.currentTime = position;
    }

    player.muted = false;
    if (playState === 'play') {
      player.play().catch(() => {
        dispatch(videoActions.setPersist(false));
        dispatch(videoActions.setPlayState('stop'));
      });
    } else {
      player.pause();
    }

    function onCanplay() {
      dispatch(videoActions.setDuration(player.duration));
    }

    function onPlay() {
      dispatch(videoActions.setPlayState('play'));
    }

    function onPause() {
      dispatch(videoActions.setPlayState('pause'));
    }

    function stop() {
      dispatch(videoActions.setPlayState('stop'));
    }

    function onTimeupdate() {
      dispatch(videoActions.setPosition(player.currentTime));
    }

    player.addEventListener('canplay', onCanplay);
    player.addEventListener('play', onPlay);
    player.addEventListener('pause', onPause);
    player.addEventListener('ended', stop);
    player.addEventListener('timeupdate', onTimeupdate);

    return () => {
      player.removeEventListener('canplay', onCanplay);
      player.removeEventListener('play', onPlay);
      player.removeEventListener('pause', onPause);
      player.removeEventListener('ended', stop);
      player.removeEventListener('timeupdate', onTimeupdate);
    }
  }, [src, slave]);

  
  React.useEffect(() => {
    if (ref.current === null || slave) return;

    const player = ref.current;

    if (playState === 'play') {
      player.play().catch(() => {
        dispatch(videoActions.setPersist(false));
        dispatch(videoActions.setPlayState('stop'));
      });
    } else {
      player.pause();
    }

  }, [playState]);


  // Slave
  React.useEffect(() => {
    if (ref.current === null || !slave) return;
    const player = ref.current;

    player.muted = true;
    player.currentTime = position;
    player.pause();

  }, [slave, position, playState]);

  return (
    <>
      <div className={classNames.videoWrap}>
        {src ? (
          <video 
            key={src}
            controls={!isStopped}
            className={classNames.video}
            style={style}
            ref={ref}
            playsInline={true}
          >
            <source src={src} type="video/mp4"/>
          </video>
        ) : null}

        {(isStopped && thumbnail) ? (
          <Image
            aspectRatio={16/9}
            className={classNames.thumbnail}
            data={imgix(thumbnail, {
              xs: imgix.presets.lg('16:9')
            })}
          />
        ) : null}

        {playState !== 'play' ? (
          <button 
            aria-label='Play video'
            data-tooltip-position='center'
            className={classNames.videoOverlay}
            onClick={() => {
              const refClone = ref.current;
              if (refClone) {
                refClone.play();
                
                setTimeout(() => {
                  refClone.focus();
                }, 100);
              }
            }}
          >
            <IoMdPlay 
              style={{
                fontSize: 80
              }}
              color='#fff'
            />
          </button>
        ) : null}
      </div>
      {StyleSheet}
    </>
  );
}

function PersistentPlayer() {
  const persist = useSelector(s => s.video.persist);
  const src = useSelector(s => s.video.src);
  const dispatch = useDispatch();

  return (persist || src) ? (
    <>
      <div 
        className={classNames.persistentPlayerWrap}
        style={{
          display: (!persist || !src) ? 'none' : 'flex'
        }}
      >
        <button
          aria-label='Close video player'
          data-tooltip-position='left'
          onClick={() => {
            dispatch(videoActions.setPlayState('pause'));
            dispatch(videoActions.setPersist(false));
          }}
          className={classNames.closeIcon}
        >
          <IoMdClose
            color='#fff'
            style={{
              fontSize: 24
            }}
          />
        </button>
        <Player
          slave={!persist}
        />
      </div>
      {StyleSheet}
    </>
  ) : null;
}

function Description() {
  const title = useSelector(s => s.video.title);
  const createdAt = useSelector(s => s.video.createdAt);
  const description = useSelector(s => s.video.description);
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <div 
        className={classNames.description}
      >
        <Text 
          variant='h2' 
          htmlTag='h1'
          className={classNames.text}
        >
          {title||''}
        </Text>
        {createdAt ? (
          <Text className={classNames.date} noPadding>{formatDate(createdAt)}</Text>
        ) : null}
        <Text.Truncate 
          variant='p' 
          htmlTag='p'
          className={classNames.text}
          numberOfLines={expanded ? 0 : 3}
        >
          {description||''}
        </Text.Truncate>

        <Button.Text
          onClick={() => setExpanded(bool => !bool)}
        >
          Show {expanded ? 'Less' : 'More'}
        </Button.Text>
      </div>
      {StyleSheet}
    </>
  );
}

export const Video = {
  Player,
  PersistentPlayer,
  Description
}