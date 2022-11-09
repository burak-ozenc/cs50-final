import React from "react";
import {Outlet} from "react-router";

const ConvertTo = () => {
    return(
        <div>
            <Outlet/>
            <div className="d-flex justify-content-center m-5">
                <button className="back-button">Back</button>
            </div>
        </div>
    )
}

export default ConvertTo