import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from './DropdownMenu.module.css'

export function DropdownMenu () {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className={styles.dropdown}>
            <button className={styles.dropdown_toggle} onClick={toggleMenu}>
                Toggle Menu
            </button>
            {isOpen && (
                <ul className="items">
                    <Link to='/home'>
                        <li>Home</li>
                    </Link>
                </ul>
            )}
        </div>
    )
}