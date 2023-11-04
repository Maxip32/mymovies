import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.module.css'

export function LandingPage () {
    
    return(
        <div>
            <Link to = '/Home'>
                <button className={styles.button} type="submit">
                    Home
                </button>
            </Link>
        </div>
    )
}

