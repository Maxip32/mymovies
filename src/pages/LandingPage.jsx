import React from "react";
import { Link } from "react-router-dom";
// import style from ''

export function LandingPage () {
    
    return(
        <div>
            <Link to = '/Home'>
                <button type="submit">Home</button>
            </Link>
        </div>
    )
}

