
export function PriceFormatter ({price}) {

    function parseDollar (total : Number) {
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
            <span className="opc-price-format-wrapper">
                <span className="opc-price-format">$</span>
                {parseDollar(price)}
                <span className="opc-price-format">{parseCents(price)}</span>
            </span>
        </>
        )
}

export default PriceFormatter;