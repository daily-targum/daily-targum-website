import React from 'react';

function FakeError() {

  if (typeof window !== 'undefined') {
    // @ts-ignore
    console.log(test2.test2)
  }

  return (
    <h1>Fake Error</h1>
  );
}

export default FakeError;