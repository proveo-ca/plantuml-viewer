import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Diagram from './components/Diagram';

function App() {
  const [diagrams, setDiagrams] = useState<string[]>([]);

  useEffect(() => {
    const fetchDiagrams = async () => {
      const files = [
        'id-generator',
        'im-different'
      ];
      setDiagrams(files);
    };

    fetchDiagrams();
  }, []);

  const [firstDiagram, ...rest] = diagrams

  return (
    <>
      <Router>
        <nav>
          <Link to="/">{firstDiagram}</Link>
          {rest.map((name) => (
            <Fragment key={name}>
              {" | "}
              <Link to={`/${name}`}>{name}</Link>
            </Fragment>
          ))}
        </nav>
        <Routes>
          <Route path="/" element={<Diagram name={firstDiagram} />} />
          {rest.map((name) => (
            <Route
              key={name}
              path={`/${name}`}
              element={<Diagram name={name}/>}
            />
          ))}
        </Routes>
      </Router>
    </>
  )
}

export default App;