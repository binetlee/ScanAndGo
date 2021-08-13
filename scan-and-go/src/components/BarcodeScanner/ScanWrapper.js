import React, {useState, useRef, useEffect, useContext} from 'react';
import Scanner from './Scanner';
import {TEST_RECEIPT} from "../../mocks/receiptBase";
import {VALID_UPC} from "../../mocks/receiptMock";
import LineItem from "../LineItem";
import {TotalPrice} from "../TotalPrice/TotalPrice.component";
import {MetadataContext} from "../../context";
import {useHistory} from "react-router-dom";

const ScanWrapper = () => {
    const [scanning, setScanning] = useState(false);
    const [lastModified, setTime] = useState(Date.now());
    const [receiptBase, setReceipt] = useState(TEST_RECEIPT);
    const scannerRef = useRef(null);

    const addLineItem = (upc) => {
        if((Date.now() - lastModified < 2000) || (upc === undefined)){
            return;
        }
        setTime(Date.now());
        const curLineItems = receiptBase.receiptDetails.lineItems;
        let found = false;
        //exists, modify qty to +1
        curLineItems.forEach((lineItem) => {
            let { upcCode, quantityOrdered, itemCost} = lineItem;
            if (upcCode === upc) {
                found = true;
                lineItem.quantityOrdered = quantityOrdered + 1;
                lineItem.totalCost = toDbl(itemCost * lineItem.quantityOrdered);
            }
        });
        //or if something if not found, create new
        if(!found){
            const upcObj = VALID_UPC[upc];
            if (upcObj !== undefined){
                const newItem = {
                    upcCode: upc,
                    quantityOrdered: 1,
                    itemDescription: upcObj.itemDescription,
                    itemCost: upcObj.itemCost,
                    totalCost: upcObj.itemCost
                };
                receiptBase.receiptDetails.lineItems.push(newItem);
            }
        }
        calcTotal();
        setReceipt(receiptBase);
        setTimeout(function(){ setTime(Date.now()); }, 1000);
    };

    const calcTotal = () => {

        const curLineItems = receiptBase.receiptDetails.lineItems;
        let sum = 0;
        //exists, modify qty
        curLineItems.forEach((lineItem) => {
            let { totalCost } = lineItem;
            sum += totalCost;
        });

        receiptBase.receiptDetails.subTotal = sum;
        receiptBase.receiptDetails.salesTax = toDbl(sum*.0625);
        receiptBase.receiptDetails.orderTotal = sum + receiptBase.receiptDetails.salesTax;
    };

    const history = useHistory();
    const { dispatch: metadataDispatch } = useContext(MetadataContext);

    const submit = () => {
        console.log(receiptBase);
        metadataDispatch({
            type: 'UPDATE_RECEIPT_INFO',
            receiptDetails: receiptBase
        });
        history.push("/opc");
    };

    const setQty = (upc,qty) => {
        const curLineItems = receiptBase.receiptDetails.lineItems;
        //exists, modify qty to +1
        let itr = 0;
        curLineItems.forEach((lineItem) => {
            let { upcCode, itemCost} = lineItem;

            if (upcCode === upc) {
                if(qty === 0){
                    curLineItems.splice(itr,1);
                } else {
                    lineItem.quantityOrdered = qty;
                    lineItem.totalCost = toDbl(itemCost * lineItem.quantityOrdered);
                }
            }
            itr = itr + 1;
        });
        calcTotal();
        setReceipt(receiptBase);
        setTimeout(function(){ setTime(Date.now()); }, 1000);
    };

    const toDbl = (srcVal) => {
        return Number((Math.round(srcVal * 100) / 100).toFixed(2));
    };

    const subTotalString = (receiptBase.receiptDetails.orderTotal < 1) ? ``:`$${receiptBase.receiptDetails.orderTotal}`;
    return (
        <div className="col__12-12 col__6-12--xs col__6-12--sm col__6-12--md col__6-12--lg col__6-12--xl col__6-12--xxl">
            <button
                className="bttn--primary"
                onClick={() => setScanning(!scanning) }>
                <span className="bttn__content">{scanning ? 'Stop Scanning' : 'Begin Scanning'}</span>
            </button>
            <div ref={scannerRef} style={{position: 'relative'}}>
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px',
                }} width="355" height="140" />
                {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result) => addLineItem(result?.codeResult?.code)} /> : null}
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
                {receiptBase?.receiptDetails?.subTotal > 1 &&
                    <div className="opc-border-bottom-grey" >
                        <span className="opc-your-order-text">Scanned Cart</span>
                    </div>
                }
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl opc-lineItems">
                {receiptBase.receiptDetails.lineItems && receiptBase.receiptDetails.lineItems.map((lineItem) => {
                return (<LineItem
                    upc={lineItem.upcCode}
                    canEditQuantity={true}
                    quantity={lineItem.quantityOrdered}
                    />);}

                )}
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
                {receiptBase?.receiptDetails?.subTotal > 1 &&
                    <TotalPrice subtotal={receiptBase?.receiptDetails?.subTotal} cashbackAmount={0.00}/>
                }
            </div>
            <button
                className="bttn--primary"
                onClick={() => submit() }
            >

            <span className="bttn__content">{`Checkout ${subTotalString}`}</span>

            </button>
        </div>
    );
};

export default ScanWrapper;