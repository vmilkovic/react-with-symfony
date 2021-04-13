import React from 'react';
import PropTypes from 'prop-types';
import RepLogList from './RepLogList';
import RepLogCreator from './RepLogCreator';

const calculateTotalWeightLifted = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);

export default function RepLogs(props){

    const { withHeart, highlightedRowId, repLogs, onRowClick, onNewItemSubmit } = props;

    let heart = "";
    if (withHeart) {
        heart = <span>❤️</span>;
    }

    return (
        <div className="col-md-7">
            <h2>Lift History {heart}</h2>

            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>What</th>
                    <th>How many times?</th>
                    <th>Weight</th>
                    <th>&nbsp;</th>
                    </tr>
                </thead>
                <RepLogList 
                    highlightedRowId={highlightedRowId}
                    onRowClick={onRowClick}
                    repLogs={repLogs}
                />
                <tfoot>
                    <tr>
                    <td>&nbsp;</td>
                    <th>Total</th>
                    <th>{calculateTotalWeightLifted(repLogs)}</th>
                    <td>&nbsp;</td>
                    </tr>
                </tfoot>
            </table>
            
            <RepLogCreator onNewItemSubmit={onNewItemSubmit} />
        </div>
    );
}

RepLogs.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    repLogs: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onNewItemSubmit: PropTypes.func.isRequired,
}
