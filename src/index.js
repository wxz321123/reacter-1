import React from 'react';
import ReactDOM from 'react-dom';

import MiniDrawer from './kuangjia';
const App=(props,context)=>{

  return (
    <div>
    <MiniDrawer >
    </MiniDrawer>
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
