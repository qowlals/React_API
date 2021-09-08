import React, { useEffect, useReducer } from 'react';
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        case "LOADING":
            return {
                loading: true,
                data: null,
                error: null
            }
        case "SUCCESS":
            return {
                loading: false,
                data: action.data,
                error: null
            }
        case "ERROR":
            return {
                loading: false,
                data: null,
                error: action.error
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const initialState = {
    loading: false,
    data: null,
    error: false,
}

function Posts() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = async () => {
        dispatch({ type: "LOADING" });
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
            dispatch({ type: "SUCCESS", data: response.data })
        } catch (error) {
            dispatch({ type: "ERROR", error: error })
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    const { data: users } = state;

    return (
        <div>
            <ul>

                {users?.map(user => (
                    <li key={user.id}>
                        {user.title} ({user.body})
                    </li>
                ))}
            </ul>
            <button onClick={fetchData}>다시 불러오기</button>
        </div>
    );
}

export default Posts;