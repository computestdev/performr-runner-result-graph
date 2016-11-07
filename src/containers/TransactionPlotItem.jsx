import {connect} from 'react-redux';

import TransactionPlotItem from '../components/TransactionPlotItem';
import selectTransaction from '../actions/selectTransaction';

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onTransactionSelected: transactionId => dispatch(selectTransaction(transactionId)),
});

const TransactionPlotItemContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionPlotItem);
export default TransactionPlotItemContainer;
