const initState = {
    isMobile : window.innerWidth <= 768,
}
export default function rootReducer(state=initState,action){
    return state;
}