import React, { useState } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';

function Edit() {
    // =================== Redux state & dispatch.
    const editId = useSelector(state => state.edit.editId);
    const nestedEdit = useSelector(state => state.edit.nestedEdit);
    const nestedCommentId = useSelector(state => state.edit.nestedCommentId);
    const textToEdit = useSelector(state => state.edit.textToBeEdited);
    // =================== Local state & ref.
    const [ textToBeEdited, setTextToBeEdited ] = useState(textToEdit);

    // =================== Handle change.
    const handleEditChange = (e) => {
        setTextToBeEdited(e.target.value);
    }

    return (
        <textarea name="edit" value={textToBeEdited} onChange={handleEditChange}></textarea>
    )
}

export default Edit;