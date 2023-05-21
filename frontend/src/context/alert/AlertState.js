import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
    const [alertData, setAlertData] = useState({showAlert:false, alertClass:"", message:""});
    const success = (text) => {
        window.scroll(0, 0);
        setAlertData({showAlert:true,alertClass:"success", message:text})
        setTimeout(() => {
            clear()
        }, 3000);
    };

    const error = (text) => {
        window.scroll(0, 0);
        setAlertData({showAlert:true,alertClass:"danger", message:text})
        setTimeout(() => {
            clear()
        }, 3000);
    };

    const clear = () => {
        setAlertData({showAlert:false, alertClass:"", message:""});
    };

    return (
        <AlertContext.Provider value={{success, error, alertData}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;