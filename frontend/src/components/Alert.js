import React from "react";
import { useContext } from 'react';
import AlertContext from "../context/alert/AlertContext";

export const Alert = () => {
    const alertContext = useContext(AlertContext);

    return (
        alertContext.alertData.showAlert !== false && (
            <div className={`alert alert-${alertContext.alertData.alertClass}  my-2`} role="alert">
                {alertContext.alertData.message}
            </div>
        )
    )
}