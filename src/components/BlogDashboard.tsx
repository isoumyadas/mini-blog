import { useBlogStore } from "@/store/useBlogStore"
import { NavLink } from "react-router"

const BlogDashboard = () => {
  const posts = useBlogStore((state) => state.posts)
  const deletePost = useBlogStore((state) => state.deletePost)

  if(posts.length === 0) {
    return (
      <div>
        <p>No Posts Yet!</p>
        <button>
          <NavLink to={"/new"}>Create One</NavLink>
        </button>
      </div>
    )
  }
  return (
    <div className="h-screen">
      <h1>All Blogs</h1>
      <div className="flex flex-col flex-wrap gap-2">
        {
          posts.map((post) => (
            <div key={post.id} className="flex flex-col border-2 border-black p-2 rounded-lg flex-wrap"> 
              <h3>{post.title}</h3>
              <small>{new Date(post.createdAt).toLocaleDateString()}</small>

               {/* Render saved HTML content */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />

              <button type="button" onClick={() => deletePost(post.id)}>
                Delete
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BlogDashboard
