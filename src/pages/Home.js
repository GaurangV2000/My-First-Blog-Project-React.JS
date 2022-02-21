import React, { useEffect, useState } from "react";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../Firbase-Config";
import DeleteIcon from "@material-ui/icons/Delete";
import { Avatar } from "@material-ui/core";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postCollectionRef = collection(db, "Posts");
  const [seed, setSeed] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  });

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "Posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <Avatar
                  className="avatar"
                  src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
                />
                <h1>{post.author.name}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>{`Title :- ${post.title}`}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
