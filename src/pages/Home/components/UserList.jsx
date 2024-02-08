import {useCallback, useEffect, useState} from "react";
import {loadUsers} from "./api.js";
import {Spinner} from "@/shared/components/Spinner.jsx";
import {UserListItem} from "./UserListItem.jsx";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export function UserList() {
    const [userPage, setUserPage] = useState({
        content: [],
        last: false,
        first: false,
        number: 0
    });
    const {t} = useTranslation();

    const [apiProgress, setApiProgress] = useState(false)

    const getUsers = useCallback(async (page) => {
        setApiProgress(true)
        try {
            const response = await loadUsers(page);
            setUserPage(response.data);
        } catch {

        } finally {
             setApiProgress(false)
        }

    }, [])

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="card">
            <div className="card-header text-center fs-4">{t('userList')}</div>
            <ul className="list-group list-group-flush">
                {userPage.content.map(user => {
                    return (

                         <UserListItem key={user.id} user={user} />

                    )

                })}
            </ul>
            <div className="card-footer text-center">
                {apiProgress && <Spinner></Spinner>}
                {!apiProgress && !userPage.first && <button className="btn btn-secondary btn-sm float-start"
                                            onClick={() => getUsers(userPage.number - 1)}>{t('previous')}</button>}
                {!apiProgress && !userPage.last && <button className="btn btn-secondary btn-sm float-end"
                                           onClick={() => getUsers(userPage.number + 1)}>{t('next')}</button>}
            </div>

        </div>
    )
}