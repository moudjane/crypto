import React, { useState, useEffect } from 'react';

const CryptoDisplay = () => {
    const [cryptoName, setCryptoName] = useState('');
    const [cryptoPrice, setCryptoPrice] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allCryptos, setAllCryptos] = useState([]);

    useEffect(() => {
        const fetchCryptoSymbols = async () => {
            const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
            const data = await response.json();
            const symbols = data.symbols.map(symbol => symbol.baseAsset).filter((value, index, self) => self.indexOf(value) === index);
            setAllCryptos(symbols);
        };
        fetchCryptoSymbols();
    }, []);

    const fetchCryptoPrice = async () => {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${cryptoName.toUpperCase()}USDT`);
        const data = await response.json();
        if (data.price) {
            setCryptoPrice(`${data.price} $`);
        } else {
            setCryptoPrice('Cryptomonnaie non trouvée ou paire USDT non disponible.');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCryptoPrice();
    };

    const handleChange = (e) => {
        const input = e.target.value.toUpperCase();
        setCryptoName(input);
        const filteredSuggestions = allCryptos.filter(crypto => crypto.startsWith(input));
        setSuggestions(filteredSuggestions.slice(0, 5)); // Limite à 5 suggestions
    };

    const handleSuggestionClick = (suggestion) => {
        setCryptoName(suggestion);
        setSuggestions([]);
        // Vous pouvez ici appeler fetchCryptoPrice si vous souhaitez rechercher le prix directement après la sélection
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={cryptoName}
                    onChange={handleChange}
                    placeholder="Entrez le nom d'une crypto (ex: BTC)"
                    autoComplete="off"
                />
                <button type="submit">Rechercher</button>
            </form>
            <div>
                {suggestions.map((suggestion, index) => (
                    <div key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ cursor: 'pointer' }}>
                        {suggestion}
                    </div>
                ))}
            </div>
            {cryptoPrice && <p>Prix: {cryptoPrice}</p>}
        </div>
    );
};

export default CryptoDisplay;
