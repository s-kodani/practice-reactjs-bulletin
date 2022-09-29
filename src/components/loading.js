import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = () => (
  <div>
    <Dimmer active>
      <Loader>ロード中</Loader>
    </Dimmer>
  </div>
)

export default Loading