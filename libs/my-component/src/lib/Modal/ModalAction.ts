type OpenModalAction = {
    type:"OPEN_MODAL", 
};
type CloseModalAction = {
    type:"CLOSE_MODAL",
};

export type ModalAction = OpenModalAction | CloseModalAction;

export type ModalActionMethod = {
    openModal: ()=>void;
    closeModal: ()=>void;
}
type Dispatcher = React.Dispatch<ModalAction>

export default function useModalAction(dispatch:Dispatcher):ModalActionMethod{
    return {
        closeModal:()=>{dispatch({type:"CLOSE_MODAL"})},
        openModal: ()=>{dispatch({type:"OPEN_MODAL"})}
    }
} 



