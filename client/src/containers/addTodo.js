import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import * as actionTypes from '../store/actions';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as Axios from "../all-axios";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    handleClick = () => {
        this.setState({ open: true });
        //e.preventDefault();
        //this.clearForm();
    };


    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    // clearForm = () => {
    //     document.getElementById("myForm").reset(); 
    //   }

    render() {
        let sty = {
            width: '300px',
            height: '32px',
        };
        let cont = {
            textAlign: 'center',
            pading: '10px',
            margin: '20px'
        };
        let list = {
            padding: '5px',
            color: 'white',
        };
        let input;
        return (
            <div style={cont}>
                <Container>
                    <h1 style={list}>Put Your ToDo's Here:</h1>
                    <form  id="myForm" onSubmit={async(e) => {
                        e.preventDefault();
                        // if (!input.value.trim()) {
                        //     return
                        // }

                        let todo = await Axios.post_data({
                            todos: input.value,
                            status: 0
                        })

                        console.log(todo);
                        this.props.onStoreResult(todo);
                        document.getElementById("myForm").reset(); 
                        //alert('TODO ADDED SUCCESSFULLY');
                    }}>
                      <input ref={node => (input = node)} style={sty} type='text' placeholder="Eg : To Do Home Work" required />{' '}
                        <Button type='submit' onClick={this.handleClick} variant="contained" color="primary">ADD TODO</Button>
                        <Snackbar open={this.state.open} autoHideDuration={2000} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity="success">
                                ToDo successfully Added.
                     </Alert>
                        </Snackbar>
                    </form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedResults: state.results
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onStoreResult: (todo) => dispatch({ type: actionTypes.STORE_RESULT, id: todo.data.data._id, result: todo.data.data.todos, status: todo.data.data.status }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);