import React, { useEffect, useState } from 'react';

export function TestPage2({}) {
    const [testState, setTestState] = useState(false);

    useEffect(() => {
        console.log('setting state to false again after intial render');
    }, []);

    return (
        <>
            <div>
                {'A cool second page'}
            </div>
            <div>
                {`State: ${testState?'true': 'false'}`}
            </div>
            <button onClick={()=>{setTestState(!testState)}}>
                {'Change State'}
            </button>
        </>
    )
}

export default TestPage2;