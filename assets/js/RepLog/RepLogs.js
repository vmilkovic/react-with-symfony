import React from 'react';
import PropTypes from 'prop-types';
import RepLogList from './RepLogList';
import RepLogCreator from './RepLogCreator';
// import RepLogCreator from './RepLogCreatorControllerComponents';

const calculateTotalWeightLifted = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);

export default function RepLogs(props){

    const { 
        withHeart,
        highlightedRowId,
        repLogs,
        onRowClick,
        onAddRepLog,
        numberOfHearts,
        onHeartChange,
        onDeleteRepLog,
        isLoaded,
        isSavingNewRepLog,
        successMessage
    } = props;

    let heart = "";
    if (withHeart) {
        heart = <span>{'❤️'.repeat(numberOfHearts)}</span>;
    }

    return (
        <div className="col-md-7">
            <h2>Lift History {heart}</h2>

            <input 
                type="range"
                defaultValue={numberOfHearts}
                onChange={(e) => {
                    onHeartChange(+e.target.value)
                }}
            />

            {successMessage && (
                <div className="alert alert-success text-center">
                    {successMessage}
                </div>
            )}

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
                    onDeleteRepLog={onDeleteRepLog}
                    isLoaded={isLoaded}
                    isSavingNewRepLog={isSavingNewRepLog}
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
            
            <div className="row">
                <div className="col-md-6">
                    <RepLogCreator onAddRepLog={onAddRepLog} />
                </div>
            </div>
        </div>
    );
}

RepLogs.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    repLogs: PropTypes.array.isRequired,
    numberOfHearts: PropTypes.number.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onAddRepLog: PropTypes.func.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    onHeartChange: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired
}
