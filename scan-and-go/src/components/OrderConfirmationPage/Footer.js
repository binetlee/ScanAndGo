import React from 'react';
import '../../styles/orderConfirmation.scss';

const extraOrderConfText = 'Your order details will be available in My Account in approximately 5 minutes. Scroll down to view an order summary and next steps related to your order.\n\nFor returns, please head to the Customer Service Desk.';

const ForgetSomethingParagraph = () => (
    <div class='forget-something-paragraph'>
        {/* Top Row */}
        <div class='top-row'>
            <div class='forget-something-text'>Forget Something?</div>
            <div class='keep-shopping-button'>Keep Shopping</div>
        </div>
        <div>
            <div class='click-here'>Click Here </div>to add more items to your order before you exit the store.
        </div>
        <br/>
        <div>
            You can continue to shop until the associate scans your <b>Exit Pass QR Code</b> above.
        </div>
    </div>
);
const OrderConfirmationInfo = ({orderInfo}) => {
    // Get items to display top expensive item in info
    const purchasedItems = ['RYOBI Black Oxide Drill', 'Drive Kit', 'Hammer', 'Nail'];
    const formattedItems = 'RYOBI Black Oxide Drill and Drive Kit(31-Piece)... and 3 ther items';
    const userEmail = 'larry@gmail.com';
    const receiptNumber = '32938-32323-32323';
    const orderTotal = 128.65;
    // Container
    return (
        <div class='order-conf-info-container'>
            {/* Items Info */}
            <div class='items-info' >
                {`Your order of ${formattedItems} is complete! A confirmation has been sent to ` }
                <b>{`${userEmail}.`}</b>
            </div>
            {/* Receipt/Order Total */}
            <div class='receipt-order-total'>
                <div>
                    {`Receipt #${receiptNumber}`}
                </div>
                <div>
                    {`Order Total: ${orderTotal}`}
                </div>
            </div>
            {/* Extra Footer Info */}
            <div clas='extra-footer-info'>
                {extraOrderConfText}
            </div>
        </div>
    );
};

export const Footer = ({orderInfo}) => (
    <>
        <ForgetSomethingParagraph />
        <OrderConfirmationInfo orderInfo={orderInfo} />
    </>
);
export default Footer;