import React, { useEffect, useState } from "react";
import axios from "axios";
import NewGroupForm from "../forms/NewGroupForm";
import GroupItem from "./GroupItem";

const BASE_URL = "http://localhost:3000";

function GroupSelect({ userData, activeGroup }) {
    const [isAddingGroup, setAddingGroup] = useState(false)
    const [userGroup, setUserGroup] = useState(null)


    async function addGroup(resObj) {
        const response = await axios.post(`${BASE_URL}/api/groups`, resObj)

        if (response.status === 200) {
            const budgetResponse = await axios.post(`${BASE_URL}/api/budgets`, { groupId: response.data.id })
        }
    }


    async function deleteGroup(id) {
        await axios.delete(`${BASE_URL}/api/groups/${id}`)

    }


    function handleAddGroup() {
        setAddingGroup(true)
    }
    function handleDoneAdding() {
        setAddingGroup(false)
    }

    function findGroup(id) {
        userGroup.forEach((group) => {
            if (group.id === id) {
                activeGroup(group)
            }
        })
    }
    useEffect(() => {
        async function fetchUserGroup() {
            const response = await axios
                .get(`${BASE_URL}/api/groups/${userData.id}`)

            if (response.status === 200) {
                return setUserGroup(response.data)
            }
        }
        fetchUserGroup()
    }, [userGroup])

    return (
        <div>
            <div className="heading">
                {userData.name}'s Groups
            </div>
            {isAddingGroup ? (
                <>
                    <NewGroupForm addGroup={addGroup} handleDoneAdding={handleDoneAdding} ownerId={userData.id} />
                </>
            ) : (
                <>
                    <div className="add-group" onClick={handleAddGroup}>
                        Create A New Group
                        <div className="add-group-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide  lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        </div>
                    </div>
                </>
            )}
            {userGroup ? (
                <>
                    <div>
                        {userGroup.map((item, index) => (
                            <GroupItem
                                id={item.id}
                                ownerId={item.ownerId}
                                name={item.name}
                                key={index}
                                deleteGroup={deleteGroup}
                                findGroup={findGroup} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <p> You must make a group</p>
                </>
            )}

        </div>
    )
}

export default GroupSelect

/**
 * if groups exist, map over them? otherwise display "you must make a group"
 */