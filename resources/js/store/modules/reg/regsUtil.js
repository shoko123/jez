export default {
    findStatus(state, getters) {

        if (state.newItem.areaSeasonIndex === null ||
            state.newItem.registration_categoryIndex === null) {
            return { ready: false, tag: "" };
        }
        //This logic works only becuse B,A, and P can't equal zero.
        let B = getters["basketNos"][state.newItem.basket_noIndex].value;
        let A = getters["artifactNos"][state.newItem.artifact_noIndex].value;
        let P = getters["pieceNos"][state.newItem.piece_noIndex].value;
        let usePiece = state.newItem.usePiece;
        if ((usePiece && !P) || (!B && !A) || (B && !A && P)) {
            return { ready: false, tag: "" };
        }

        let tag = "";
        if (B) { tag += "B" + B} 
        if (A) { 
            if (B) {
                tag += ".";
            }
            tag += "A" + A;
        }         
        if (P) { tag += ".P" + P}

        return { ready: true, tag: tag };
    }
}
