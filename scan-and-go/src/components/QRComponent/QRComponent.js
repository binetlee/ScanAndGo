import QRCode from 'qrcode.react';
import homedepotLogo from './homedepotLogo.svg';

const UnavalidableQRCodeComponent = () => (
    <>
        {'QR Code Unavailable ¯\\_(ツ)_/¯'}
    </>
);

export function QRComponent({payload}) {
    return (
        <>
            {payload ? 
                <QRCode 
                    value={payload}
                    // imageSettings={
                    //     {
                    //         src: 'https://corporate.homedepot.com/sites/default/files/image_gallery/THD_logo.jpg',
                    //         height: 25,
                    //         width: 25,
                    //         level: 'H',
                    //         includeMargin: true,
                    //         excavate: true
                    //     }
                    // }
                /> : 
                <UnavalidableQRCodeComponent / >
            }
        </>
    )
}

export default QRComponent;