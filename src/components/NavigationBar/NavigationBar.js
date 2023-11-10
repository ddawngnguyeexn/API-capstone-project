import {NavLink} from "react-router-dom";

import styles from "./NavigationBar.module.css";

function NavigationBar()
{
    const routes = [
        {to: "/", text: "🌎 Home"},
        {to: "/characters", text: "Characters"},
        {to: "/houses", text: "Houses"}
      ];
    
      return (
        <nav className={styles["navigation"]}>
          {
            routes.map((route, index) =>
                         <NavLink
                           key={index}
                           className={({isActive, isPending}) => `${styles["navigation__item"]} ${isActive ? styles["navigation__item--active"] : ""}`}
                           to={route.to}
                         >
                           {route.text}
                         </NavLink>
            )
          }
        </nav>
      );
}

export default NavigationBar;