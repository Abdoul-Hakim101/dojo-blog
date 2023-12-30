import {useState} from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
    const history = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("Abdoul-Hakim");
    const [isPending, setPending] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author}
        console.log(blog);
        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(r => {
            console.log("new blog added")
            setPending(false)
            history("/");
        })

    }
    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input value={title} required={true} onChange={(e) => setTitle(e.target.value)}/>
                <label>Blog Body</label>
                <textarea required={true}
                          value={body}
                          onChange={(e) => setBody(e.target.value)}/>
                <label>Author</label>
                <select required={true}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}>
                    <option value="Abdoul-Hakim">Abdoul-Hakim</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled={true}>Adding Blog</button>}

            </form>
            <p>{title}</p>
            <p>{body}</p>
            <p>{author}</p>
        </div>
    );
}
export default Create;