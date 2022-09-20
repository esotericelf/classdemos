import React, { useEffect, useState } from 'react';

const InputBox = ({ types, setText, submit }) => {

    const [value, setValue] = useState("")

    useEffect(() => {
        if (types != "Title") { setValue("") }
    }, [submit])

    const handleInput = (e) => {
        if (types != "Title") {
            const textArray = e.target.value.split(',');
            setText(textArray);
        } else {
            setText(e.target.value.toLowerCase());
        }
        setValue(e.target.value)
    }

    return <fieldset>
        <legend>{types}</legend>
        <textarea className={types === "Title" ? "titleClass" : "inputBox"} type="text" placeholder={types} onChange={handleInput} value={value} />
    </fieldset>
}

export default InputBox;