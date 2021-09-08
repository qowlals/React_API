import React, { useState } from 'react';
import axios from "axios";
import Post from './Post';
import useAsync from '../useAsync';

async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
    );
    return response.data;
}

function Posts() {
    const [userId, setUserId] = useState(null);
    const [state, refetch] = useAsync(getUsers, [], true);

    const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return <button onClick={refetch}>불러오기</button>;

    return (
        <div>
            {users && users.map(user => (
                <div key={user.id} onClick={() => setUserId(user.id)}>
                    {user.title} <div style={{ color: "red" }}>({user.body})</div>
                </div>
            ))}
            <button onClick={refetch}>다시 불러오기</button>
            {userId && <Post id={userId} />}
        </div>
    );
}

export default Posts;