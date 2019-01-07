import view from "./view";
import { connect } from 'react-redux';
import { checkItem, moveUp, moveDown, dragToMove, updateValue } from './actions';
const mapStateToProps = state => {
    const { tasks } = state.generalReducer
    return {tasks};
}

const mapDispatchToProps = dispatch => {
    return {
        up: (e)=>dispatch(moveUp(e)),
        down: (e)=>dispatch(moveDown(e)),
        dragToMove: (from, to)=>dispatch(dragToMove(from, to)),
        updateValue: (oldVal, newVal)=>dispatch(updateValue(oldVal, newVal)),
        checkItem: (val)=>dispatch(checkItem(val))
    };

} 
const View = connect(mapStateToProps, mapDispatchToProps)(view);

export default View;