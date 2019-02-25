import React from 'react';
import { Button } from 'reactstrap';

function ControlButtons(
    {
        isEmptyEditedData,
        isEmptyUserIdsToBeDeleted,
        onAddClick,
        onSaveClick,
        onDeleteClick,
    }
) {
    return (
        <div className='footer control-buttons'>
            <Button
                color='success'
                onClick={onAddClick}
            >
                <i className="fas fa-user-plus" />
            </Button>
            <Button
                color='warning'
                disabled={isEmptyEditedData}
                onClick={onSaveClick}
            >
                Save
            </Button>
            <Button
                color='danger'
                disabled={isEmptyUserIdsToBeDeleted}
                onClick={event => onDeleteClick(event, true)}
            >
                Delete
            </Button>
        </div>
    );
}

export { ControlButtons };
