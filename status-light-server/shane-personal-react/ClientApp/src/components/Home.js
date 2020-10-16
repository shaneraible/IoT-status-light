import React, { Component } from 'react';
import { Welcome } from './Welcome';
import { About } from './aboutme';

import '../styles/personal.css'

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <div style={{paddingTop:"1.3em"}}>
              <Welcome />
              <About/>
        </div>
    );
  }
}
