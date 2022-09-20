import React from "react";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import ExampleBlock from "./ExampleBlock";
import '../App.css';

const PostList = ({ postList, refresh, setPostList, update, setUpdate }) => {

    const deleteQuestion = async (id) => {
        await deleteDoc(doc(db, "examples", id));
        refresh();
    }


    return <div>
        {postList.map((d, index) => {
            return <div key={d.id}>
                <div className="diagramWrap">
                    <ExampleBlock question={d.question} answer={d.answer} id={index} gb={d.gb} />
                </div>
                {!update ?
                    <div className="buttonWrapHorizontal">
                        <div style={{ flex: "1" }}>
                            <button
                                className="button-35"
                                onClick={() => {
                                    deleteQuestion(d.id);
                                }}>
                                Delete
                            </button>
                        </div>
                        <div style={{ flex: "1" }}>
                            <button
                                className="button-35"
                                onClick={() => {
                                    setPostList([d]);
                                    setUpdate(!update);
                                }}>
                                Update
                            </button>
                        </div>
                        <div style={{ flex: "4" }}></div>
                    </div>
                    : null}
            </div>
        })}</div>
}

export default PostList;


// const updateQuestion = async (d) => {
//     await setDoc(doc(db, "examples", d.id), {
//         question: d.question,
//         answer: d.answer,
//         title: d.title,
//         id: d.id,
//         gb: ""
//     })
// }