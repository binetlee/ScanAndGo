import React, {
    useEffect,
    useState
} from 'react';
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
    // const [testState, setTestState] = useState(false);

    // useEffect(() => {
    //     console.log('setting state to false again after intial render');
    // }, []);
    const payload = 'www.google.com';

    return (
        <>
            <OrderConfQRContainer payload={payload} />
            <Footer />
        </>
    )
}

export default OrderConfirmationPage;