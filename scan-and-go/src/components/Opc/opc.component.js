import React, {useState} from "react";
import thd_logo from './img/thd_logo.svg';

export function Opc({ }) {

    const [testState, setTestState] = useState(false);
    return (
        <>
        <div className="grid isBound">
            <div className="opc-header">
                <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
                    <span><img src={thd_logo} className="opc-image-align"  alt="THD Logo"/></span>
                    <span className="opc-scan-go-text">Scan & Go Checkout</span>
                    <span className="opc-edit-cart">Edit Cart (4)</span>
                </div>
            </div>
        </div>
        </>
    )
}

export default Opc;