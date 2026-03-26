import Card from "./Card";
// import logo from "../assets/hero.png"
import { useEffect, useState } from "react";
import type { Post } from "../types";
import FormCard from "./FormCard";
// import Count from "./Count";

 type FormPost = {
  title: string 
  body: string 
  tag: string
}


const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false)
    const [data, setData] = useState<Post[]>([])
    const [cards, setCards] = useState<FormPost[]>([])

   

    useEffect(() => {
        async function fetchData() {
        setLoading(true)
        const user = await fetch("https://dummyjson.com/posts?limit=6");
        const res = await user.json();

        setData(res.posts)
        setLoading(false)  
        }

        fetchData()
    }, [])

    function handleAddNewFormBtn() {
      setShowModal(true)
    }

    function closeNewFormBtn() {
      setShowModal(false)
    }

    function addCard(newCard : FormPost) {
      setCards((prev) => [...prev, newCard])
    }

  return (
    <div>
      <h1>Mini BLOG</h1>
      <div>
        <button disabled={showModal} onClick={handleAddNewFormBtn}>+ Add new form</button>
      </div>

      <div>
        {/* <Count /> */}
        {/* {showModal ? <FormCard /> : null} */}
        <button onClick={closeNewFormBtn}>{showModal ? "X" : null }</button>
        {showModal && <FormCard newCard={addCard} />}
      </div>

      <div style={{display:"flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem"}}>
         {
            loading ? "Loading...." : (
              data.map((d) => (
                <Card key={d.id} id={d.id} body={d.body} title={d.title} reactions={d.reactions} views={d.views} tags={d.tags} />
              ))
            )
        }
      </div>
      <div>
        {cards.map((card) => (
             <Card key={44}  id={99} body={card.body} title={card.title} reactions={{likes: 45, dislikes: 23}}  views={99} tags={["Trial", card.tag]}  />
        ))}
        
      </div>
    </div>
  );
};

export default Dashboard;
