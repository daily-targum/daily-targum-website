import React from 'react';
import { useSelector, useDispatch } from '../store';
import { videoActions } from '../store/ducks/video';
import Theme from './Theme';
import Text from './Text';
import Button from './Button';
import { styleHelpers } from '../utils';
import { IoMdClose } from 'react-icons/io';

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
  const position = useSelector(s => s.video.position);
  const playState = useSelector(s => s.video.playState);
  const styles = Theme.useStyleCreator(styleCreator);


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
    <div style={styles.videoWrap}>
      <video 
        key={src}
        controls
        style={{
          ...styles.video,
          ...style
        }}
        ref={ref}
        playsInline={true}
      >
        <source src={src} type="video/mp4"/>
      </video>
    </div>
  );
}

function PersistentPlayer() {
  const persist = useSelector(s => s.video.persist);
  const src = useSelector(s => s.video.src);
  const styles = Theme.useStyleCreator(styleCreator);
  const dispatch = useDispatch();

  return (
    <div 
      style={{
        ...styles.persistentPlayerWrap,
        display: (!persist || !src) ? 'none' : 'flex'
      }}
    >
      <IoMdClose
        color='#fff'
        size={24}
        style={styles.closeIcon}
        onClick={() => {
          dispatch(videoActions.setPlayState('pause'));
          dispatch(videoActions.setPersist(false));
        }}
      />
      <Player
        slave={!persist}
      />
    </div>
  );
}

function Description() {
  const title = useSelector(s => s.video.title);
  const description = useSelector(s => s.video.description);
  const styles = Theme.useStyleCreator(styleCreator);
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div 
      style={styles.description}
    >
      <Text 
        variant='h2' 
        htmlTag='h1'
        style={styles.text}
      >
        {title||''}
      </Text>
      <Text.Truncate 
        variant='p' 
        htmlTag='p'
        style={styles.text}
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
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  videoWrap: {
    ...styleHelpers.aspectRatioFullWidth(16/9),
    position: 'relative'
  },
  video: {
    ...styleHelpers.absoluteFill(),
    objectFit: 'fill',
    height: '100%',
    width: '100%'
  },
  persistentPlayerWrap: {
    ...styleHelpers.card(theme),
    width: 'calc(150px + 12vw)',
    zIndex: 1000,
    position: 'fixed',
    bottom: 10,
    right: 10,
    boxShadow: '0px 2px 11px #0000004d'
  },
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1001,
    cursor: 'pointer',
    color: '#fff'
  },
  description: {
    padding: theme.spacing(4, 0),
    ...styleHelpers.flex('column')
  },
  text: {
    color: theme.colors.primary.contrastText
  }
}));

export const Video = {
  Player,
  PersistentPlayer,
  Description
}