import React, { useEffect, useState } from "react";

export default function App() {
  return (
    <div>
      <CurrencyChanger />
    </div>
  );
}

function CurrencyChanger() {
  const [amount, setAmount] = useState("");

  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function handleCurrencyChange() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur} `
      );
      const data = await res.json();
      console.log(data.rates["USD"]);

      setResult(data.rates[toCur]);
      setIsLoading(false);
    }

    if (fromCur === toCur) return setResult(amount);

    handleCurrencyChange();
  }, [amount, fromCur, toCur]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />

      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
        <option value="USD">USD</option>
      </select>

      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
        <option value="USD">USD</option>
      </select>

      <p>
        {result} {toCur}
      </p>
    </div>
  );
}
