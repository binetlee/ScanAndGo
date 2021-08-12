const initialMetadataState = {};

function metadataReducer(state, action){
    console.log(`Reached reducer with action type: ${action.type}`);
    switch (action.type) {
        case 'UPDATE_RECEIPT_INFO':
            return {
                ...state,
                receiptInfo: action.receiptInfo
            }
        default:
            return state;
    }
}

export { initialMetadataState, metadataReducer };