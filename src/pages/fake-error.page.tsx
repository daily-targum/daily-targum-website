import React from 'react';

function FakeError() {

  React.useEffect(() => {
    throw new Error('Client Test 9')
  }, [])

  return (
    <h1>Fake Error</h1>
  );
}

export default FakeError;