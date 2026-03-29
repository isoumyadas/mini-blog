// we need useEditor hook, EditorContent for display
import {EditorContent} from "@tiptap/react"
import type { useEditor } from '@tiptap/react'

import Toolbar from './Toolbar'

const NewBlog = ({editor} : {editor: ReturnType<typeof useEditor>}) => {

  return (
    <div className='border-2 border-black rounded-md p-2 outline-0 h-1/2'>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default NewBlog
