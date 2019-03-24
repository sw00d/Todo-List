import view from "./view";
import { connect } from 'react-redux';
import { addTask, incrementInput, decrementInput } from './actions';

const mapStateToProps = state => {
    const { tasks, inputVal } = state.generalReducer;
    return {
        tasks,
        inputVal
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (e)=>dispatch(addTask(e)),
        incrementInput: ()=>dispatch(incrementInput())

    };
}
const View = connect(mapStateToProps, mapDispatchToProps)(view);

export default View;



  