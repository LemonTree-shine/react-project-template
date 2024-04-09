import { useState } from "react";

export default function Index() {
    const [text, setText] = useState('this is demo')

    return <div>{text}</div>
}