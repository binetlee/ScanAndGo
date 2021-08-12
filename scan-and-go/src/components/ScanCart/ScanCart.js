import React, { useEffect, useState } from 'react';
import ScanWrapper from '../BarcodeScanner/ScanWrapper';

export function ScanCart({}) {
    const [testState, setTestState] = useState(false);

    useEffect(() => {
        console.log('setting state to false again after intial render');
    }, []);

    return (
        <div className="grid isBound">
            <ScanWrapper/>
            <button
                className="bttn--primary"
                // onClick={() => setScanning(!scanning) }
                >
                <span className="bttn__content">Checkout</span>
            </button>
        </div>
    )
}

export default ScanCart;