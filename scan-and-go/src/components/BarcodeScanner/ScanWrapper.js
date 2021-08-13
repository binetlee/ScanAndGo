import React, { useState, useRef } from 'react';
import Scanner from './Scanner';
import {TEST_RECEIPT} from "../../mocks/receiptBase";
import {VALID_UPC} from "../../mocks/receiptMock";
import LineItem from "../LineItem";

const ScanWrapper = () => {
    const [scanning, setScanning] = useState(false);
    const [receiptBase, setReceipt] = useState(TEST_RECEIPT);
    const scannerRef = useRef(null);

    const addLineItem = (upc) => {
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
            const newItem = {
                upcCode: upc,
                quantityOrdered: 1,
                itemDescription: upcObj.itemDescription,
                itemCost: upcObj.itemCost,
                totalCost: upcObj.itemCost
            };
            receiptBase.receiptDetails.lineItems.push(newItem);
        }
        calcTotal();
        setReceipt(receiptBase);
        console.log(receiptBase);
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

    const setQty = (upc,qty) => {
        const curLineItems = receiptBase.receiptDetails.lineItems;
        //exists, modify qty to +1
        let itr = 0;
        curLineItems.forEach((lineItem) => {
            let { upcCode, quantityOrdered, itemCost} = lineItem;

            if (upcCode === upc) {
                if(qty == 0){
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
        console.log(receiptBase);
    };

    const toDbl = (srcVal) => {
        return Number((Math.round(srcVal * 100) / 100).toFixed(2));
    };

    return (
        <div className="col__12-12 col__6-12--xs col__6-12--sm col__6-12--md col__6-12--lg col__6-12--xl col__6-12--xxl">
            <button
                className="bttn--primary"
                onClick={() => addLineItem('899744003749') }>
                <span className="bttn__content">899744003749</span>
            </button>
            <button
                className="bttn--primary"
                onClick={() => addLineItem('025315283740') }>
                <span className="bttn__content">025315283740</span>
            </button>
            <button
                className="bttn--primary"
                onClick={() => setQty('025315283740',2) }>
                <span className="bttn__content">025315283740_2</span>
            </button>
            <button
                className="bttn--primary"
                onClick={() => setQty('025315283740',0) }>
                <span className="bttn__content">025315283740_0</span>
            </button>
            <button
                className="bttn--primary"
                onClick={() => setScanning(!scanning) }>
                <span className="bttn__content">{scanning ? 'Stop Scanning' : 'Begin Scanning'}</span>
            </button>
            {/*<button onClick={() => setScanning(!scanning) }>{scanning ? 'Stop Scanning' : 'Begin Scanning'}</button>*/}
            {/*<div ref={scannerRef} style={{position: 'relative', border: '3px solid red'}}>*/}
            <div ref={scannerRef} style={{position: 'relative'}}>
                {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px',
                    // left: '0px',
                    // height: '100%',
                    // width: '100%',
                    // border: '3px solid green',
                }} width="355" height="140" />
                {/*{scanning ? <Scanner scannerRef={scannerRef} onDetected={(result) => setResults([...results, result])} /> : null}*/}
                {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result) => addLineItem(result)} /> : null}
            </div>
            <ul>
                {/*{results.map((result) =>*/}
                {/*    (result.codeResult && <div>{result.codeResult.code}</div> ))*/}
                {/*}*/}
                {/*<div>*/}
                {/*    {receiptBase}*/}
                {/*</div>*/}
                {/*receiptBase.receiptDetails.lineItems*/}
            </ul>
        </div>
    );
};

export default ScanWrapper;