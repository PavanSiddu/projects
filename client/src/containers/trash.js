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

class Trash extends React.Component {
  render() {
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

    };
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
      if (strResult.status === 2)
        return (
          rows.push(createData(strResult.todos,
            <Button variant="contained" color="primary" onClick={() => this.props.onundoTrash(strResult._id)}>Undo</Button>,
            <Button variant="contained" color="secondary" onClick={() => this.props.onDelTrash(strResult._id)}>Delete</Button>
          )
          )
        )
    }
    );

    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={head}>Trashed ToDo's:</h1>
        <div style={{ float: 'right', marginRight: '29px' }}>
          <Button variant="contained" color="secondary" onClick={this.props.onDeleteAll}>DELETE ALL</Button>
        </div>
        <div style={table}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={trow}>TRASHED</StyledTableCell>
                  <StyledTableCell align="right" style={trow}>UNDO</StyledTableCell>
                  <StyledTableCell align="right" style={trow}>DELETE</StyledTableCell>
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
        <ul>
          {}
        </ul>
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
    onDelTrash: (id) => dispatch({ type: actionTypes.DELETE_TRASH, delId: id,status:3 }),
    onundoTrash: (id) => dispatch({ type: actionTypes.UNDO_TRASH, undoId: id, status: 1 }),
    onDeleteAll: () => dispatch({ type: actionTypes.DELETE_ALL })
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Trash);