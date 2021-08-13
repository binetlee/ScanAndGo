import PriceFormatter from "../Opc/PriceFormatter";

export const TotalPrice = ({subtotal, cashback = false, cashbackAmount = 0}) => {

    const taxRate = 0.0625;

    function formatPrice (price) {
        let a = Math.trunc(price), b = Number.isInteger(price) ? "00" : (price + "").split(".")[1];
        return a + "." + b;
    }

    function calculateTax (price) {
        return ((cashback ? (price - cashbackAmount) : price) * taxRate).toFixed(2);
    }

    function calcTotal (price) {
        return ((cashback ? (price - cashbackAmount) : price) * (taxRate + 1)).toFixed(2);
    }

    return (
        <div>
            <div className="bold totalPriceContainer">
                <span className="title">Subtotal</span>
                <span className="text">${formatPrice(subtotal)}</span>
            </div>
            {cashback > 0 &&
                <div className="totalPriceContainer">
                    <span className="cashback-text">Cash Back Savings</span>
                    <span className='cashback-amount'>-${formatPrice(cashbackAmount)}</span>
                </div>
            }
            <div className="totalPriceContainer">
                <span className="float-left">Pickup In Store</span>
                <span className="green float-right">FREE</span>
            </div>
            <div className="totalPriceContainer grey-border">
                <span className="float-left">Estimated Sales Tax*</span>
                <span className="float-right">${calculateTax(subtotal)}</span>
            </div>
            <div className="totalPriceContainer" ><div className="grey-border"/> </div>
            <div className="totalPriceContainer total-shift">
                <span className="total-text float-left">Total</span>
                <span className="float-left total-text"><PriceFormatter price={calcTotal(subtotal)}/> </span>
            </div>
        </div>
    )
}