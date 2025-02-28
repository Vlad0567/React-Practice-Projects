import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404 - Страница не найдена</h1>
      <p>К сожалению, такой страницы нет. Вернитесь на <Link to="/">главную</Link>.</p>
    </div>
  );
};

export default NotFound;
