// components/Navbar.js
import React from 'react';
import Link from 'next/link';
import s from './Navbar.module.css';



const Navbar = () => {
 
  return (
    
    <nav className={s.navbar}>
      <ul className={s.navbarItems}>
        <li className={s.navbarItem}>
          <Link legacyBehavior href="/">
            Home
          </Link>
        </li>
        <li className={s.navbarItem}>
          <Link legacyBehavior href="/about">
           <a> Acerca de </a>  
          </Link>
        </li>
        <li className={s.navbarItem}>
          <Link legacyBehavior href="/contacto">
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;


