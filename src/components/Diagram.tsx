import { useState, useEffect } from 'react';
import encoder from 'plantuml-encoder';

interface DiagramProps {
  name: string
}

const Diagram = ({ name }: DiagramProps) => {
  const [encodedDiagram, setEncodedDiagram] = useState('');
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  useEffect(() => {
    const fetchDiagram = async () => {
      const response = await fetch(`/diagrams/${name}.plantuml?timestamp=${lastUpdated}`);
      const text = await response.text();
      const encoded = encoder.encode(text);
      setEncodedDiagram(encoded);
    };

    const interval = setInterval(() => {
      fetchDiagram();
      setLastUpdated(Date.now());
    }, 2500);

    fetchDiagram();

    return () => clearInterval(interval);
  }, [name, lastUpdated]);

  if (!name) return null;

  return (
    <>
      <h2>{name.replace('-', ' ').toUpperCase()}</h2>
      {encodedDiagram && (
        <>
          <img
            src={`https://www.plantuml.com/plantuml/svg/${encodedDiagram}`}
            alt={name}
          />
          <div>{`Last updated: ${new Date(lastUpdated)}`}</div>
        </>
      )}
    </>
  );
};

export default Diagram;