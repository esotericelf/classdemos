import React from 'react';
import InputBox from './InputBox';

const InputForm = ({ setQuestion, setAnswer, submit, saveQuestion, setTag }) => {
    return <>
        <div className="formContainer">
            <InputBox types={"Questions"} setText={setQuestion} submit={submit} />
            <InputBox types={"Solutions"} setText={setAnswer} submit={submit} />
            <InputBox types={"Tags"} setText={setTag} submit={submit} />
        </div>
        <br />
        <div className="formContainer">
            <button className="button-35" onClick={saveQuestion}>Save</button>
        </div></>
}

export default InputForm;