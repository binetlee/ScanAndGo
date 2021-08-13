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

const OrderConfQRContainer = ({payload, name}) => (
    <div class='qr-container'>
        <div class='top-qr-container'>
            {/* Image */}
            <div class='left-image'>
                <img class='image-size' src={orderIcon} alt={'https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y'} />
            </div>
            
            {/* Thank you message component */}
            <div class='thank-you-message'>
                {`Thanks for shopping with us, ${name}!`}
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
        </div>
    </div>
);
// 21x23.5px?
export function OrderConfirmationPage() {
    const { state: metadataState, dispatch: metadataDispatch } = useContext(MetadataContext);
    const [ qrPayload, setQrPayload ] = useState();
    
    useEffect(()=> {
        metadataDispatch({	
            type: 'UPDATE_RECEIPT_INFO',	
            receiptDetails : {	
                receiptId: 'W123452005',
                receiptCreatedDate: "2020-03-21",
                subTotal: 48.00,
                salesTax : 3.00,
                orderTotal : 51.00,
                paymentType: {
                    cardName : "family card",
                    cardType : "PLCC",
                    cashbackAmt : "2.56",
                    lastFour : "4321"
                },
                billingAddress: {
                  addressLine1: "3950 Spring Valley Rd",
                  addressLine2: "Hackberry Creek",
                  addressLine3: "",
                  addressLine4: "",
                  addressLine5: "",
                  city: "Farmers Branch",
                  dayPhone: "214-562-6856",
                  emailId: "raju_datla@homedepot.com",
                  firstName: "Raju",
                  lastName: "Datla",
                  middleName: "L",
                  mobilePhone: "214-525-6366",
                  state: "TX",
                  zipCode: "75244"
                },
                lineItems: [
                    {
                        lineItemId: "101",
                        upcCode: "8049393624",
                        quantityOrdered: 5,
                        itemDescription: "Hart 25 oz. Milled Face Hicory Farming Hammer",
                        itemShortDescription: "Hart 25 oz. Hammer",
                        itemCost: 4.25,
                        totalCost: 21.25
                    },
                    {
                        lineItemId: "102",
                        upcCode: "72440143197",
                        quantityOrdered: 5,
                        itemDescription: "Meredith Home and Landscape Series Magazine",
                        itemShortDescription: "Meredith Home and Landscape Series Magazine",
                        itemCost: 4.25,
                        totalCost: 26.75
                    }
                ]
            }	
        });
    }, []);
    useEffect(()=> {
        // Call backend to register receipt
        fetch('https://scan-and-go-backend.herokuapp.com/setReceipt', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(metadataState.receiptDetails)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((e)=>console.log(e));
        console.log("metadata changed to:", metadataState.receiptDetails);
        const qrParsedData = `https://scan-and-go-backend.herokuapp.com/getReceipt?receiptId=${metadataState.receiptDetails.receiptId}`;
        setQrPayload(qrParsedData);
        // ping endpoint in case it goes down, use mock endpoint instead
        const mockPayload = 'https://mocki.io/v1/029e8bd3-dce3-4cf4-a355-711783b907ae';
        fetch(qrParsedData, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((e)=> setQrPayload(mockPayload));
    }, [metadataState]);

    return (
        <div style={{backgroundColor: '#F5F5F5'}}>
            <HFapp />
            <OrderConfQRContainer payload={qrPayload} name={metadataState.receiptDetails?.billingAddress?.firstName} />
            <Footer receiptDetails={metadataState.receiptDetails}/>
        </div>
    )
}

export default OrderConfirmationPage;