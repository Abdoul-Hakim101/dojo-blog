import {useNavigate, useParams} from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const history = useNavigate();
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    function handleDelete(e) {
        e.preventDefault();
        fetch("http://localhost:8000/blogs/" + id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).then(res => res.json())
            .then(deletedBlog => {
                console.log("Blog DELETED:", deletedBlog);
                history("/");
            })

    }
    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                </article>
            )}
            {!isPending && <button onClick={handleDelete}>Delete Blog</button>}
        </div>
    );
}

export default BlogDetails;