

export default function Square({ value, onSquareClicked, txtColor }) {
    let graphic = null;
    if (value === "X") {
        graphic = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" stroke={txtColor} d="M6 18L18 6M6 6l12 12" />;
    } else if (value === "O") {
        graphic = <circle r="10" cx="12" cy="12" stroke={txtColor} strokeWidth="3" />;
    }

    return (
        <>
            <button className="btn btn-square btn-outline" onClick={onSquareClicked} color={txtColor}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {graphic}
                </svg>
            </button>
        </>
    );
}