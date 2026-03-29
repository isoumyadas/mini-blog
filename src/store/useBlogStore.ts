import {create} from "zustand"
import {persist} from "zustand/middleware"

// 1. Type defination for a single blog post
export interface BlogPost {
    id: string,
    title: string,
    content: string,
    createdAt: string
}

// 2. shape of entire store
interface BlogStore {
    posts: BlogPost[]
    addPost: (post: BlogPost) => void
    deletePost: (id: string) => void
    updatePost: (id: string, data: Partial<BlogPost>) => void
}

// 3. Create the store
export const useBlogStore = create<BlogStore>()(

    persist(
        (set) => ({
            posts : [], // initial state - empty array

        addPost: (post) =>
            set((state) => ({
            posts: [...state.posts, post]  // add new post to array
            })),

        deletePost: (id) =>
            set((state) => ({
            posts: state.posts.filter((p) => p.id !== id)  // remove by id
            })),

        updatePost: (id, data) =>
            set((state) => ({
            posts: state.posts.map((p) =>
                p.id === id ? { ...p, ...data } : p  // update matching post
            )
            })),

        }),
        {name: "blog-store"}
    )
)   