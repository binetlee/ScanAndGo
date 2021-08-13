
export function PriceFormatter ({price, className="opc-price-format-wrapper"}) {

    function parseDollar (total) {
        return Math.trunc(total);
    }

    function parseCents(total) {
        if (Number.isInteger(total)) {
            return "00";
        } else {
            return (total+"").split(".")[1];
        }
    }

    return (
        <>
            <span className={className}>
                <span className="opc-price-format">$</span>
                {parseDollar(price)}
                <span className="opc-price-format">{parseCents(price)}</span>
            </span>
        </>
        )
}

export default PriceFormatter;