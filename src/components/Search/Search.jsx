import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName } from "../../features/auth/authSlice";

const Search = () => {
    const { name } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserByName(name))
    }, [name]);

    const user = useSelector((state) => state.auth.findUser)
    if (!user) {
        return <p>cargando...</p>
    }
    return <>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{user.role}</h6>
                <p className="card-text">Followers: {user.followers.map((follower) => {
                    <span>{follower}</span>
                })}</p>
                <p className="card-text">Following: {user.following.map((follower) => {
                    <span>{follower}</span>
                })}</p>
                <p className="card-text">
                    Posts :
                    {user.postsId.map((post) => {
                        return <span key={post._id}>{post.text}</span>
                    })}
                </p>

            </div>
        </div>
    </>
};

export default Search;