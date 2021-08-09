const initialMetadataState = {};

function metadataReducer(state, action){
    console.log(`Reached reducer with action type: ${action.type}`);
    switch (action.type) {
        case 'TRANSITION_BARCODE':
            return {
                ...state,
                data:{
                    coolData: 'mockData'
                }
            }
        default:
            return state;
    }
}

export { initialMetadataState, metadataReducer };