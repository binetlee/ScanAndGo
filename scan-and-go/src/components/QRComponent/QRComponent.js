import QRCode from 'qrcode.react';
import homedepotLogo from './homedepotLogo.svg';

const UnavalidableQRCodeComponent = () => (
    <>
        {'QR Code Unavailable ¯\\_(ツ)_/¯ (Invalid Payload)'}
    </>
);

export function QRComponent({payload}) {
    return (
        <>
            {payload ? 
                <QRCode 
                    value={payload}
                /> : 
                <UnavalidableQRCodeComponent />
            }
        </>
    )
}

export default QRComponent;