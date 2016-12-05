import {connect} from 'react-redux';

import TransactionPlotItem from '../components/TransactionPlotItem';
import selectTransaction from '../actions/selectTransaction';

const mapStateToProps = (state, {config, transaction}) => ({
    selected: config.getMyState(state, ['selectedTransaction']) === transaction.get('id'),
});

const mapDispatchToProps = (dispatch, {config}) => ({
    onTransactionSelected: transactionId => dispatch(selectTransaction(config.instanceKey, transactionId)),
});

const TransactionPlotItemContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionPlotItem);
export default TransactionPlotItemContainer;
