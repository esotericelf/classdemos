import React, { useState, useRef, useEffect } from "react";
import ExampleBlock from "./components/ExampleBlock";
import InputBox from "./components/InputBox";
import { db, auth, provider } from "./firebase-config";
import { signOut } from "firebase/auth";
import { setDoc, doc, collection, getDocs, query, where } from "firebase/firestore";
import { makeid } from "./components/uniqueID";
import PostList from "./components/PostList";
import InputForm from "./components/inputForm";
import { signInWithPopup } from "firebase/auth";
import UserInfo from "./components/userInfo";


const App = () => {

    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [tag, setTag] = useState([]);
    const [title, setTitle] = useState("");
    const [postList, setPostList] = useState([]);
    const [submit, setSubmit] = useState(0);
    const fixView = useRef(null);
    const [update, setUpdate] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const signInWithGoogle = () => {
        isAuth
            ? signOut(auth).then(() => {
                localStorage.clear()
                setIsAuth(false)
            })
            : signInWithPopup(auth, provider).then((result) => {
                localStorage.setItem("isAuth", true);
                setIsAuth(true);
            })
    }


    const saveQuestion = async () => {

        const id = !update ? makeid(10) : postList[0].id;

        try {
            question != "" || answer != ""
                ? await setDoc(doc(db, "examples", id), {
                    question: question,
                    answer: answer,
                    title: title,
                    tag: tag,
                    id: id,
                    gb: ""
                })
                : console.log("")
        }
        catch (e) {
            console.log(e.message)
        }


        getQuestionList();
        setSubmit(submit => submit + 1)
        setQuestion([]);
        setAnswer([]);
        update ? setUpdate(!update) : console.log("")
    }

    const getQuestionList = async () => {
        const q = query(collection(db, "examples"), where("title", "==", title))
        try {
            const posts = await getDocs(q)
            const data = posts.docs.map((d) => ({ id: d.id, ...d.data() }))
            setPostList(data)
        }
        catch (e) {
            console.log(e.message)
        }
        update ? setUpdate(!update) : console.log("")
    }

    const scrollToBottom = () => {
        fixView.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "end"
        });
    };

    useEffect(() => {
        if (fixView.current) {
            scrollToBottom();
        }
    }, [submit]);


    return <div>
        {isAuth ? <UserInfo auth={auth} /> : null}
        <div className="titleContainer">
            <InputBox types={"Title"} setText={setTitle} submit={submit} />
            <div className="buttonWrap">
                <button className="button-35" onClick={signInWithGoogle}>{isAuth ? "LogOut" : "Login"}</button>
                <button className="button-35" onClick={() => {
                    setSubmit(submit => submit + 1);
                    getQuestionList();
                }}>Search</button>
            </div>
        </div>
        {submit != 0 ?
            <PostList
                postList={postList}
                refresh={getQuestionList}
                setPostList={setPostList}
                setUpdate={setUpdate}
                update={update} />
            : null
        }
        {!update ?
            <ExampleBlock question={question} answer={answer} id={"current"} gb={""} />
            : null}
        <br /><br />
        <InputForm
            setQuestion={setQuestion}
            setAnswer={setAnswer}
            submit={submit}
            saveQuestion={saveQuestion}
            setTag={setTag} />
        <div ref={fixView} />
    </div >
}

export default App;





    // const addField = async () => {
    //     try {
    //         const posts = await getDocs(collection(db, "examples"))
    //         const data = posts.docs.map((d) => ({ id: d.id, ...d.data() }))
    //         data.forEach((d) => {
    //             setDoc(doc(db, "examples", d.id), {
    //                 question: d.question,
    //                 answer: d.answer,
    //                 title: d.title,
    //                 id: d.id,
    //                 geogebra: ""
    //             })
    //         })

    //     }
    //     catch (e) {
    //         console.log(e.message)
    //     }
    // }