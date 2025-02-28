import { Link } from "react-router-dom";
import styles from "./RouterApp.module.css";

const RouterApp = () => {
  return (
    <div className={styles.container}>
      <h1>React Projects Navigation</h1>
      <ul className={styles.navList}>
        <li><Link to="/projects/11">Context API Example</Link></li>
        <li><Link to="/projects/12">Custom Hook Example</Link></li>
      </ul>
    </div>
  );
};

export default RouterApp;
