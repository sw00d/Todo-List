import view from "./view";
import { connect } from 'react-redux';
import { addTask } from './actions';

const mapStateToProps = state => {
    return {tasks: state.generalReducer.tasks};
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (e)=>dispatch(addTask(e))
    };
}
const View = connect(mapStateToProps, mapDispatchToProps)(view);

export default View;



  