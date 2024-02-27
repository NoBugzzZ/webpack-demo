import React, { useState } from "react";
import ReactDOM from 'react-dom'
import './index.css'
import Header from "mf/header";

function App() {
    const options = ["hello1", "hello2", "hello3"];
    const [content, setContent] = useState("change on click");

    return (
        <main className="max-w-md mx-auto space-y-8">
            <Header />
            <aside>
                <ul className="flex space-x-8">
                    {
                        options.map(option => (
                            <li key={option}>
                                <button
                                    className="rounded bg-blue-500 text-white p-2"
                                    onClick={() => {
                                        setContent(option)
                                    }}>
                                    {option}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </aside>
            <article>{content}</article>
        </main>
    )
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)