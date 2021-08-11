import React from 'react';

const extraOrderConfText = 'Your order details will be available in My Account in approximately 5 minutes. Scroll down to view an order summary and next steps related to your order.\n\nFor returns, please head to the Customer Service Desk.';

const ForgetSomethingParagraph = () => (
    <div style={{backgroundColor: '#F3F4F5', marginBottom: '25px', padding: '15px 10px 10px 10px'}}>
        {/* Top Row */}
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
            <div style={{fontFamily: 'Helvetica Neue LT Pro', fontSize: '18px', lineHeight: '21px'}}>Forget Something?</div>
            <div style={{fontSize: '14px', lineHeight: '21px', color: '#3E7697'}}>Keep Shopping</div>
        </div>
        <div>
            <div style={{color: '#3E7697', display: 'inline', fontSize: '14px', fontFamily: 'Helvetica Neue LT Pro', lineHeight: '19px'}}>Click Here </div>to add more items to your order before you exit the store.
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
        <div style={{marginBottom: '40px'}}>
            {/* Items Info */}
            <div style={{fontSize: '14px', lineHeight: '19px', marginBottom: '8px'}}>
                {`Your order of ${formattedItems} is complete! A confirmation has been sent to ` }
                <b>{`${userEmail}.`}</b>
            </div>
            {/* Receipt/Order Total */}
            <div style={{fontSize: '18px', lineHeight: '21px', color: '#333333', fontFamily: 'Helvetica Neue LT Pro', marginBottom: '5px'}}>
                <div>
                    {`Receipt #${receiptNumber}`}
                </div>
                <div>
                    {`Order Total: ${orderTotal}`}
                </div>
            </div>
            {/* Extra Footer Info */}
            <div style={{fontSize: '14px', lineHeight: '19px', whiteSpace: 'pre-line'}}>
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