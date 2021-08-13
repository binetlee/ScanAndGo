const initialMetadataState = {};

function metadataReducer(state, action){
    switch (action.type) {
        case 'UPDATE_RECEIPT_INFO':
            return {
                ...state,
                receiptDetails: action.receiptDetails
            }
        default:
            return state;
    }
}

export { initialMetadataState, metadataReducer };