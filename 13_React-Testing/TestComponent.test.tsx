import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestComponent from "./TestComponent"
import "@testing-library/jest-dom";


describe("TestComponent", () => {
  test("Рендерится без ошибок", () => {
    render(<TestComponent />);
    expect(screen.getByText("Тестовый компонент")).toBeInTheDocument();
  });

  test("Поле ввода принимает текст", () => {
    render(<TestComponent />);
    const input = screen.getByPlaceholderText("Введите текст...");
    fireEvent.change(input, { target: { value: "Привет" } });
    expect(input).toHaveValue("Привет");
  });

  test("Нажатие на кнопку очищает поле и отображает текст", () => {
    render(<TestComponent />);
    const input = screen.getByPlaceholderText("Введите текст...");
    const button = screen.getByText("Отправить");

    fireEvent.change(input, { target: { value: "Тестовый ввод" } });
    fireEvent.click(button);

    expect(input).toHaveValue("");
    expect(screen.getByTestId("output")).toHaveTextContent("Вы ввели: Тестовый ввод");
  });

  test("Не добавляет пустой текст", () => {
    render(<TestComponent />);
    const button = screen.getByText("Отправить");
    fireEvent.click(button);
    expect(screen.queryByTestId("output")).not.toBeInTheDocument();
  });
});

// npx jest --env=jsdom