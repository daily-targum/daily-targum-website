import * as React from 'react';
import Button from './Button';
import { useVisibility, styleHelpers } from '../utils';
import ActivityIndicator from './ActivityIndicator';

export function LoadMoreButton({
  handleLoad,
  loading = false
}: {
  handleLoad: () => any;
  loading: boolean
}) {
  const [isVisible, ref] = useVisibility<HTMLDivElement>(2.5);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    if (isVisible && !disabled) {
      setDisabled(true);

      handleLoad();
      const id = setTimeout(() => {
        setDisabled(false);
      }, 2000);

      return () => {
        clearTimeout(id);
        setDisabled(false);
      };
    }
  }, [handleLoad, isVisible]);

  return (
    <>
      <div 
        className='progressiveLoader' 
        ref={ref}
      >
        <Button 
          disabled={loading}
          cursor={loading ? 'wait' : undefined}
          onClick={handleLoad}
          style={{
            backgroundColor: styleHelpers.color('primary_main'),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          {loading ? (
            <>
              Loading
              &nbsp;
              <ActivityIndicator.Spinner 
                className='force-dark-mode'
                size={20}
              />
            </>
          ) : 'Load More'}
        </Button> 
      </div>
      <style jsx>
        {`
          .progressiveLoader {
            padding: 20px;
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </>
  )
}

export default LoadMoreButton;