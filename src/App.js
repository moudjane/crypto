import React from 'react';
import CryptoDisplay from './components/CryptoDisplay/CryptoDisplay';
// import CryptoCompare from './CryptoCompare'; // Si vous avez créé ce composant

function App() {
  return (
    <div className="App">
      <h1>Cryptomonnaies sur Binance</h1>
      <CryptoDisplay />
      {/* <CryptoCompare /> */}
    </div>
  );
}

export default App;
