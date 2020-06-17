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


class Completed extends React.Component {
  render() {
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

    function createData(item, Delete) {
      return { item, Delete };
    }
    const rows = [];

    this.props.storedResults.map((strResult) => {
      if (strResult.status === 1)
        return (
          rows.push(createData(strResult.todos,
            <Button variant="contained" color="secondary" onClick={() => this.props.onTrashResult(strResult._id)}>Put Into Bin</Button>)
          )
        )
    }
    );


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

    return (
      <div>
        <h1 style={head}>Completed ToDo's:</h1>
        <div style={table}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={trow}>COMPLETED</StyledTableCell>
                  <StyledTableCell align="right" style={trow}>DELETE</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.item}>
                    <StyledTableCell component="th" scope="row">
                      {row.item}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Delete}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
    onTrashResult: (id) => dispatch({ type: actionTypes.TRASH_RESULT, trashId: id, status: 2 }),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Completed);