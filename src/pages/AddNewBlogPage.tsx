import NewBlog from '@/components/TextEditor'
import { useBlogStore } from '@/store/useBlogStore';
import { useState } from 'react'
import StarterKit from "@tiptap/starter-kit"
import {useEditor} from "@tiptap/react"
import { toast } from 'sonner';


const AddNewBlog = () => {
  const [title, setTitle]  = useState<string>();
  const addPost = useBlogStore((state) => state.addPost)
  const handlePublish = () => {
    if(!title?.trim() || !editor) return;

    const newPost = {
      id: crypto.randomUUID(),
      title,
      content: editor.getHTML(),
      createdAt: new Date().toISOString(),
    }

    console.log("NewPost: >>", newPost)

    addPost(newPost)
    setTitle('')
    editor.commands.clearContent()
    toast.success("Post Saved Successfully!")
  }
    const editor = useEditor({
    extensions: [StarterKit], // This used for which features to enable
    content: null,
  })
  return (
    <div className='h-screen'>
      <h1 className='text-center'>Add new blog</h1>
      <div>
        <form action={handlePublish} className='flex flex-col gap-4'>
          {/* Title input container */}
          <div className='flex flex-col gap-3'>
            <label><h2>Title</h2></label>
            <input className='border-2 border-black rounded-md p-2 outline-0' 
            type="text"
            placeholder='Title for Blog..' 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* editor container */}
          <NewBlog editor={editor} />

          {/* Submit btn container */}
          <div>
            <button type='submit' className='p-2 rounded-md font-bold bg-blue-400 cursor-pointer'>Publish</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewBlog
