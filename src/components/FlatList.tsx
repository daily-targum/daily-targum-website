/**
 * Made this cause I miss React Native, and
 * the lack of FlatList in React makes me sad.
 * This implementation does not use virtualization,
 * but I thought the API alone was worth it
 *
 * @summary like React Native FlatList, but worse
 * @author Christian Juth
 */

import * as React from 'react';

export function FlatList<T>({
  data, 
  renderItem, 
  keyExtractor,
  inverted = false,
  ItemSeparatorComponent = null,
  ListEmptyComponent = null,
  ListHeaderComponent = null,
  ListFooterComponent = null,
  horizontal = false,
  className,
  style
}: {
  data: T[],
  renderItem: (item: T, index: number) => any,
  keyExtractor?: (item: T, index: number) => string | number,
  inverted?: boolean,
  ItemSeparatorComponent?: React.ReactNode,
  ListEmptyComponent?: React.ReactNode,
  ListHeaderComponent?: React.ReactNode,
  ListFooterComponent?: React.ReactNode,
  horizontal?: boolean,
  className?: string,
  style?: React.CSSProperties
}): any {

  if(data.length === 0) return ListEmptyComponent;

  function renderItemWithExtras(item: any, i: number) {
    return <>
      {i !== 0 ? ItemSeparatorComponent : null}
      {renderItem(item, i)}
    </>;
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        ...style
      }}
    >
      {ListHeaderComponent}
      {(inverted ? data.reverse() : data)
      .map((item: any, i: number) => (
        keyExtractor ? (
          <React.Fragment key={keyExtractor(item, i)}>
            {renderItemWithExtras(item, i)}
          </React.Fragment>
        ) : renderItemWithExtras(item, i))
      )}
      {ListFooterComponent}
    </div>
  );
}

export default FlatList;