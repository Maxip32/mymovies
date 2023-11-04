import React from 'react'
import { Link } from 'react-router-dom'
import { Search } from './Search'
import  styles from './NavBar.module.css'
import { DropdownMenu } from './DropdownMenu'



export function NavBar () {

    return (
        <>
            <div className={styles.nav}>
                <div className={styles.title}>
                    <Link to="/home">
                        <h1>Proyector Movies</h1>
                    </Link>
                </div>
                <div>
                   <DropdownMenu/>
                </div>
                <div className={styles.search}>
                    <Search />
                </div>
            </div>
        </>
    )
}