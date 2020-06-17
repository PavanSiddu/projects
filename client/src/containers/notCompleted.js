import React from 'react';
//import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Side extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      edit: '',
      id: ''
    };
  }

  render() {
    const Dailog = () => {
      return (<div>
        <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">edit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              todo to edit
          </DialogContentText>
            <TextField
              defaultValue={this.state.edit}
              autoFocus
              margin="dense"
              id="name"
              label="todo"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              ok
          </Button>
          </DialogActions>
        </Dialog>
      </div>
      )
    };



    const handleClickOpen = (id, val) => {
      return () => {
        this.setState({ open: true, edit: val, id: id });
      }
    };

    const handleClose = () => {
      this.setState({ open: false });
      let i = document.getElementById('name').value;
      console.log(i,this.state.id);
      this.props.onEditResult(this.state.id,i);
    };
    let head = {
      textAlign: 'center',
      padding: '5px',
      color: 'white',

    };
    const table = {
      margin: '10px',
      padding: '20px',
    };
    const trow = {
      fontSize: '20px',
      fontStyle: 'italic',

    }


    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 20,
      },
    }))(TableCell);
    const StyledTableRow = withStyles(theme => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.default,
        },
      },
    }))(TableRow);

    function createData(item, comp, edit) {
      return { item, comp, edit };
    }
    const rows = [];
    this.props.storedResults.map((strResult) => {
      if (strResult.status === 0) {
        // this.state.edit = strResult.todos;
        return (
          rows.push(createData(strResult.todos,
            <Button variant="contained" color="primary" onClick={() => this.props.onDeleteResult(strResult._id)}>Completed</Button>,
            // <Button variant="contained" color="primary" onClick={() => edit(strResult._id, strResult.todos)}>Edit</Button>)
            <Button variant="contained" color="primary" onClick={handleClickOpen(strResult._id, strResult.todos)}>Edit</Button>)
          )
        )
      }
    }
    );
    // const edit = (id, val) => {
    //   let inp = prompt('edit this todo', val);
    //   this.props.onEditResult(id, inp);
    // }

    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={head}>Yet to Complete ToDo's:</h1>

        <div style={table}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={trow}>YET TO BE DONE</StyledTableCell>
                  <StyledTableCell align="right" style={trow}>COMPLETED</StyledTableCell>
                  <StyledTableCell align="right" style={trow}>EDIT</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.item}>
                    <StyledTableCell component="th" scope="row">
                      {row.item}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.comp}</StyledTableCell>
                    <StyledTableCell align="right">{row.edit}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {Dailog()}
        {/* <div>
      <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">edit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          todo to edit
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="todo"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          ok
        </Button>
      </DialogActions>
    </Dialog>
    </div> */}

      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    storedResults: state.results
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id, status: 1 }),
    onEditResult: (id, val) => dispatch({ type: actionTypes.EDIT_RESULT, Id: id, value: val })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Side);