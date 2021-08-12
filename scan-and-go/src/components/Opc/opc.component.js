import React, {useContext, useEffect} from "react";
import thd_logo from './img/thd_logo.svg';
import {MetadataContext} from "../../context";

export function Opc({}) {

    const { state: metadataState, dispatch: metadataDispatch } = useContext(MetadataContext);
    useEffect(()=> {
        metadataDispatch({
            type: 'UPDATE_RECEIPT_INFO',
            receiptDetails : {
                receiptId: 'W123452003',
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
                        itemCost: 4.25,
                        totalCost: 21.25
                    },
                    {
                        lineItemId: "102",
                        upcCode: "72440143197",
                        quantityOrdered: 5,
                        itemDescription: "Meredith Home and Landscape Series Magazine",
                        itemCost: 4.25,
                        totalCost: 26.75
                    }
                ]
            }
        });
    }, []);
    // useEffect(()=> {
    //     console.log("metadata changed to:", metadataState.receiptDetails);
    // }, [metadataState]);
    return (
        <>
        <div className="grid isBound">
            <div className="opc-header">
                <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
                    <span><img src={thd_logo} className="opc-image-align"  alt="THD Logo"/></span>
                    <span className="opc-scan-go-text">Scan & Go Checkout</span>
                    <span className="opc-edit-cart">Edit Cart (4)</span>
                </div>
            </div>
            <div className="opc-your-order">
                <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl opc-border-bottom-grey" >
                    <span className="opc-your-order-text">Your Order</span>
                    <span className="opc-price-format-wrapper">
                        <span className="opc-price-format">$</span>
                        28
                        <span className="opc-price-format">98</span>
                    </span>
                </div>
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl opc-lineItems">
                <ul >
                    {metadataState.receiptDetails.lineItems.map(i => (
                        <li key={i.lineItemId}>{i.itemCost}</li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}

export default Opc;