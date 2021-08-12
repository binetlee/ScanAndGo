import React, { useState, useRef } from 'react';
import Scanner from './Scanner';

const ScanWrapper = () => {
    const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState([]);
    const scannerRef = useRef(null);

    return (
        <div className="col__12-12 col__6-12--xs col__6-12--sm col__6-12--md col__6-12--lg col__6-12--xl col__6-12--xxl">
            <button
                className="bttn--primary"
                onClick={() => setScanning(!scanning) }>
                <span className="bttn__content">{scanning ? 'Stop Scanning' : 'Begin Scanning'}</span>
            </button>
            {/*<button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop Scanning' : 'Begin Scanning'}</button>*/}
            {/*<div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}>*/}
            <div ref={scannerRef} style={{position: 'relative'}}>
                {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px',
                    // left: '0px',
                    // height: '100%',
                    // width: '100%',
                    // border: '3px solid green',
                }} width="355" height="140" />
                {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result) => setResults([...results, result])} /> : null}
            </div>
        </div>
    );
};

export default ScanWrapper;