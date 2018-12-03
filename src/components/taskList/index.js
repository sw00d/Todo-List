import view from "./view";
import { connect } from 'react-redux';
import { moveUp, moveDown } from './actions';
const mapStateToProps = state => {
    const { tasks } = state.generalReducer
    return {tasks};
}

const mapDispatchToProps = dispatch => {
    return {
        up: (e)=>dispatch(moveUp(e)),
        down: (e)=>dispatch(moveDown(e)),
    };

} 
const View = connect(mapStateToProps, mapDispatchToProps)(view);

export default View;