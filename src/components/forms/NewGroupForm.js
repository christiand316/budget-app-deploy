import React, { useState } from 'react'

function NewGroupForm({ addGroup, handleDoneAdding, ownerId }) {
    const [nameValue, setNameValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const resObj = {
            name: nameValue,
            ownerId: ownerId
        }
        addGroup(resObj)
        handleDoneAdding(false)
        //addTodo(value)
        //setValue('')
    }

    return (
        <form onSubmit={handleSubmit} className="new-form">
            <input type="text" value={nameValue} onChange={(e) => { setNameValue(e.target.value) }} placeholder='Budget name' />
            <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 22" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </button>
        </form>
    )
}

export default NewGroupForm