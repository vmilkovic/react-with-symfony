import React, { Component } from "react";
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import RepLogs from './RepLogs';
import { getRepLogs, deleteRepLog, createRepLog } from '../api/rep_log_api';

export default class RepLogApp extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: '',
        }

        this.succesMessageTimeoutHandle = 0;

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
    }

    componentDidMount(){
        getRepLogs()
            .then(data => {
                this.setState({
                    repLogs: data,
                    isLoaded: true
                })
            });
    }

    componentWillUnmount(){
        clearTimeout(this.succesMessageTimeoutHandle);
    }

    handleRowClick(repLogId){
        this.setState({highlightedRowId:repLogId});
    }

    handleAddRepLog(item, reps){    
        const newRep = {
            reps: reps,
            item: item,
        }

        this.setState({
            isSavingNewRepLog: true
        })

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    // Add to array without state mutation
                    const newRepLogs = [...prevState.repLogs, repLog];

                    return {
                        repLogs: newRepLogs,
                        isSavingNewRepLog: false,
                    };
                });

                this.setSuccessMessage('Rep Log Saved');
            });
    }

    setSuccessMessage(message){
        this.setState({
            successMessage: message
        });

        clearTimeout(this.succesMessageTimeoutHandle);
        this.succesMessageTimeoutHandle = setTimeout(() => {
            this.setState({
                successMessage: ''
            });

            this.succesMessageTimeoutHandle = 0;
        }, 3000)
    }

    handleHeartChange(heartCount){
        this.setState({numberOfHearts: heartCount})
    }

    handleDeleteRepLog(id) {
        this.setState(prevState => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if(repLog.id !== id){
                        return repLog;
                    }

                    // State is not mutated beacouse we add is deleting to current repLog
                    // and then the repLog we pass to a new object that we set to repLogs state
                    return Object.assign({}, repLog, {isDeleting: true})
                })
            }
        });

        deleteRepLog(id)
            .then(() => {
                this.setState(prevState => {
                    return {
                        // Removing from array without state mutation
                        repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
                    }
                });

                this.setSuccessMessage('Item was Un-lifted!');
            });
    }

    render() {

        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                onAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
                onDeleteRepLog={this.handleDeleteRepLog}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool
}