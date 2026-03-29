import type { Post } from "../types"

export type CardDetails = {
    name: string
    email: string
    avatar: string
}

const Card = ({body, title, reactions, tags, views, id} : Omit<Post, "userId">) => {
  return (
    <div style={{height: 500, width: 500, padding: "1rem", border: "1px solid white", borderRadius: "2rem"}}>
      <h2>{title}</h2>
      <p style={{padding:"2rem"}}>{body}</p>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <p><span>{reactions.likes}</span> | <span>{reactions.dislikes}</span></p>
        <p>{views}</p>
      </div>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        {tags.map((tag) => (
          <ul>
            <li style={{listStyle: "none", padding:"0.5rem", border: "1px solid white", borderRadius: "5rem"}} key={id}>{tag}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default Card
