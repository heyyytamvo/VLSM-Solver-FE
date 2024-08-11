import React, { useState } from 'react';
import Footer from './Footer';

const VLSMSolver = () => {
  const [majorNetwork, setMajorNetwork] = useState('');
  const [subnets, setSubnets] = useState([]);
  const [result, setResult] = useState(null);

  const handleAddSubnet = () => {
    setSubnets([...subnets, { order: subnets.length + 1, numberOfHost: 0 }]);
  };

  const handleSubnetChange = (index, field, value) => {
    const updatedSubnets = [...subnets];
    updatedSubnets[index][field] = value;
    setSubnets(updatedSubnets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5003/api/vlsm/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          majorNetwork,
          listOfSubnets: subnets,
        })
      });
  
      const data = await response.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>VLSM Solver</h1>
      <p>The solver can only process approriate problem, If you do not see the response, please check your CIDR Block again</p>
      <p>Sample CIDR Block: 192.168.0.0/16</p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="majorNetwork">CIDR Block:</label>
          <input
            type="text"
            id="majorNetwork"
            value={majorNetwork}
            onChange={(e) => setMajorNetwork(e.target.value)}
            required
            className="form-control"
            
          />
        </div>
        <button type="button" onClick={handleAddSubnet} className="btn btn-primary">
          Add Subnet
        </button>

        {subnets.map((subnet, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`subnet-${index}`}>Number of hosts for Subnet {subnet.order}:</label>
            <input
              type="number"
              id={`subnet-${index}`}
              value={subnet.numberOfHost}
              onChange={(e) =>
                handleSubnetChange(index, 'numberOfHost', Number(e.target.value))
              }
              min={0}
              required
              className="form-control"
              
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary">
          Solve
        </button>
      </form>

      {result && (
        <div className="result">
          <h2>VLSM Solver Results</h2>
          <p>Major Network: {result.majorNetwork}</p>
          <ul>
            {result.result.map((subnet) => (
              <li key={subnet.order}>
                Subnet: {subnet.order}, Network Address: {subnet.networkAddress}
              </li>
            ))}
          </ul>
        </div>
      )}
    <Footer />
    </div>
  );
};

export default VLSMSolver;