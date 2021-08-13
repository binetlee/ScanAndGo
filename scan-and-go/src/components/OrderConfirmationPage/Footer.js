import React from 'react';
import '../../styles/orderConfirmation.scss';

const extraOrderConfText = 'Your order details will be available in My Account in approximately 5 minutes. Scroll down to view an order summary and next steps related to your order.\n\nFor returns, please head to the Customer Service Desk.';

const formatItems = (lineItems) => {
    let output = '';
    // sort based on price (associate will have it sorted based on risk)
    output += lineItems[lineItems.length-1].itemDescription;
    if (lineItems.length > 1) {
        output += `... and ${lineItems.length-1} other items`;
    }
    return output;
}

const OrderConfirmationInfo = ({receiptDetails}) => {
    // Get items to display top expensive item in info
    console.log(`Receipt Details ${receiptDetails}`);
    const { receiptId, orderTotal, lineItems, billingAddress } = receiptDetails;
    
    const formattedItems = formatItems(lineItems);
    const userEmail = billingAddress.emailId;
    
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
                    {`Receipt #${receiptId}`}
                </div>
                <div>
                    {`Order Total: $${orderTotal}`}
                </div>
            </div>
            {/* Extra Footer Info */}
            <div class='extra-footer-info'>
                {extraOrderConfText}
            </div>
        </div>
    );
};

export const Footer = ({receiptDetails}) => (
    <>
        {/* <ForgetSomethingParagraph /> */}
        {receiptDetails ? 
            <OrderConfirmationInfo receiptDetails={receiptDetails} /> :
            <> </>
        }
    </>
);
export default Footer;