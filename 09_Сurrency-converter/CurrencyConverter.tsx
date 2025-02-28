import { useEffect, useState, useMemo } from "react";
import "./CurrencyConverter.css";

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const cachedRates = localStorage.getItem("currencyRates");
    if (cachedRates) {
      try {
        const parsedRates = JSON.parse(cachedRates);
        if (parsedRates && parsedRates.rates) {
          setRates(parsedRates.rates);
          setCurrencies(Object.keys(parsedRates.rates));
        }
        setLoading(false);
      } catch (error) {
        console.error("Ошибка парсинга данных из localStorage:", error);
      }
    }

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки данных");
        return res.json();
      })
      .then((data) => {
        setRates(data.conversion_rates);
        setCurrencies(Object.keys(data.conversion_rates));
        setLoading(false);
        localStorage.setItem("currencyRates", JSON.stringify(data));
      })
      .catch(() => {
        setError("Не удалось загрузить курсы валют");
        setLoading(false);
      });
  }, []);


  const convertedAmount = useMemo(() => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;
    return (amount * rates[toCurrency]) / rates[fromCurrency];
  }, [amount, fromCurrency, toCurrency, rates]);


  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="converter-container">
      <h2>Конвертер валют</h2>

      {loading ? (
        <p className="loading">Загрузка курсов валют...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="converter">
          <div className="input-group">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              min="0"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <button className="swap-btn" onClick={swapCurrencies}>
            ⇄
          </button>

          <div className="input-group">
            <input type="text" value={convertedAmount.toFixed(2)} readOnly />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
