import React, { useState } from "react"
// import type { Post } from "../types"
// import Card from "./Card"
// import Dashboard from "./Dashboard"

type Props = {
  newCard: (card: {
    title: string
    body: string
    tag: string
  }) => void
}


const FormCard = ({newCard}: Props) => {
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [tag, setTag] = useState<string>("")

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault()
      if(!title || !body || !tag) {
        return "Please fill all the inputs"
      }

      newCard({title, body, tag}) 
      setTitle("")
      setBody("")
      setTag("")
    }

    function handleTitleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    function handleBodyChange(e : React.ChangeEvent<HTMLTextAreaElement>) {
        setBody(e.target.value)
    }

    function handleTagChange(e : React.ChangeEvent<HTMLInputElement>) {
        setTag(e.target.value)
    }



  return (
    <div>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap:"1rem", height: "200px"}}>
        <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        />

        <textarea
        id="body"
        value={body}
        onChange={handleBodyChange}
        placeholder="body"
        />

        <input
        type="tag"
        value={tag}
        onChange={handleTagChange}
        placeholder="tags"
        />

        <button type="submit">Add</button>

      </form>
    </div>
  )
}

export default FormCard
