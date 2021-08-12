import React, {
    useContext,
    useEffect,
    useState
} from 'react';
import { MetadataContext } from '../../context';
import HFapp from '../HFapp/HFapp.component';
import {
    QRComponent
} from '../QRComponent';
import {
    Footer
} from './Footer';
import orderIcon from './orderIcon.png';
import '../../styles/orderConfirmation.scss';

const OrderConfQRContainer = ({payload}) => (
    <div class='qr-container'>
        <div class='top-qr-container'>
            {/* Image */}
            <div class='left-image'>
                <img class='image-size' src={orderIcon} alt={'https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y'} />
            </div>
            
            {/* Thank you message component */}
            <div class='thank-you-message'>
                {'Thanks for shopping with us, Larry!'}
            </div>
        </div>
        {/* Underline */}
        <div class='underline'>
        </div>

        {/* Exit Pass Container */}
        <div class='exit-pass-container'>
            <div class='exit-pass'>
                {'EXIT PASS'}
            </div>
            <div class='top-text'>
                {'Present this barcode in-store an associate before you head out.'}
            </div>
            <div class='qr-code'>
                <QRComponent payload={payload} />
            </div>
            {/* bottom QR code message */}
            <div class='bottom-text'>
                {'This QR code is dynamic and changes every few minutes'}
            </div>
        </div>
    </div>
);
// 21x23.5px?
export function OrderConfirmationPage() {
    // const { state: metadataState } = useContext(MetadataContext);
    const mockPayload = 'https://mocki.io/v1/029e8bd3-dce3-4cf4-a355-711783b907ae';//'https://webhook.site/829ea928-29b6-47e0-9dcc-affd0c3120d9';
    
    // useEffect(() => {
    //     console.log(`Metadata has changed to ${metadataState}`);
    // }, [metadataState]);

    return (
        <>
            <HFapp />
            <OrderConfQRContainer payload={mockPayload} />
            <Footer />
        </>
    )
}

export default OrderConfirmationPage;