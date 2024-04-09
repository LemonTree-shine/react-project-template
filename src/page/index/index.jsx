import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import { sum } from "@/utils/index"

export default function Index() {
    const [text, setText] = useState('this is index')
    const navigate = useNavigate();
    console.log(history)
    return <div>
        {text}
        <div>
            <Button onClick={() => {
                console.log(sum())
                navigate("/demo")
            }}>跳转到demo</Button>
        </div>
    </div>
}