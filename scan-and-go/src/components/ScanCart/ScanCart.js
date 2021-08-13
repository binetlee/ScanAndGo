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
        </div>
    )
}

export default ScanCart;