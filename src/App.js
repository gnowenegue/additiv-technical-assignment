import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Overview from 'pages/Overview';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/overview/:name'>
          <Overview />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
