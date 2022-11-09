import React from "react";
import {Outlet} from "react-router";
import {useNavigate} from "react-router-dom";

const ConvertTo = () => {
    const navigate = useNavigate()
    return(
        <div>
            <Outlet/>
            <div className="d-flex justify-content-center m-5">
                <button
                    onClick={() => {
                        navigate('/')
                    }}
                    className="back-button">
                    Back
                </button>
            </div>
        </div>
    )
}

export default ConvertTo