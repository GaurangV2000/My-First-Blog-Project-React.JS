import React, { useEffect, useState } from "react";
import "../App.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../Firbase-Config";
import { useNavigate } from "react-router-dom";

function CreatePost({isAuth}) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollectionRef = collection(db, "Posts");

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/Login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1> Create a Post</h1>
        <div className="inputGp">
          <label>Title</label>
          <input
            placeholder="title..."
            on
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Post</label>
          <textarea
            placeholder="post.."
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
