import React from 'react';
import logo from './logo.svg';
import './App.css';
import init, {Client} from "@chainsafe/mina-signer-wasm";
import {Keypair} from "@chainsafe/mina-signer-wasm/node";

function App() {
  const [state, setState] = React.useState<string | Keypair>("Getting Keypair");
  React.useEffect(() => {
    (async () => {
      await init();
      generateKey();
    })();
  }, []);

  const generateKey = () => {
    const client = new Client({ network: "testnet" });
    setState(client.genKeys());
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {typeof state === "string" ? state :
          <React.Fragment>
            <code>Public Key: {state.publicKey}</code>
            <code>Private Key: {state.privateKey}</code>
          </React.Fragment>
        }
        <br />
        <a className="App-link" onClick={generateKey}>Get a new key</a>
      </header>
    </div>
  );
}

export default App;
