import { useState } from "react";
import React from "react";

const TestComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    setSubmittedValue(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <h2>Тестовый компонент</h2>
      <input
        type="text"
        placeholder="Введите текст..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Отправить</button>
      {submittedValue && <p data-testid="output">Вы ввели: {submittedValue}</p>}
    </div>
  );
};

export default TestComponent;
