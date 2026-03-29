import type { useEditor } from '@tiptap/react'
import "../tiptap.css"
// import clsx from "clsx"
import React from 'react'

const Toolbar = ({editor} : {editor: ReturnType<typeof useEditor>}) => {
    if(!editor) return null
    // const boldButtonClass = clsx(
    //     'border-2 border-black rounded-md px-1',
    //     {
    //         'bg-yellow-300 text-black' : editor.isActive('bold'),
    //         'bg-blue-500 text-white' : !editor.isActive('bold')
    //     });
  return (
       <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
      {/* editor.chain() starts a command chain */}
      {/* .focus() refocuses the editor after button click */}
      {/* .toggleBold() toggles bold on selection */}
      {/* .run() executes the chain */}
      <button
      type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        // disabled={!editor.can().chain().focus().toggleBold().run()}
        className = {editor.isActive('bold') 
    ? 'bg-blue-500 text-white' 
    : 'bg-gray-200 text-black'
  }
      >
        Bold
      </button>

      <button
      type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        style={{ fontStyle: editor.isActive('italic') ? 'italic' : 'normal' }}
        className='border-2 border-black rounded-md px-1  bg-blue-300 active:bg-blue-600'

      >
        Italic
      </button>

      <button
      type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        style={{ textDecoration: editor.isActive('strike') ? 'line-through' : 'none' }}
        className='border-2 border-black rounded-md px-1  bg-blue-300 active:bg-blue-600'

      >
        Strike
      </button>

      {/* Headings use the same toggleHeading command, just with a level attribute */}
      {([1, 2, 3] as const).map(level => (
        <button
        type="button"
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          style={{ fontWeight: editor.isActive('heading', { level }) ? 'bold' : 'normal' }}
          className='border-2 border-black rounded-md px-1 bg-blue-300 active:bg-blue-600'

        >
          H{level}
        </button>
      ))}

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} 
        className='border-2 border-black rounded-md px-1  bg-blue-300 active:bg-blue-600'
        >
        • List
      </button>

      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className='border-2 border-black rounded-md px-1  bg-blue-300 active:bg-blue-600'
        >
        1. List
      </button>

      <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className='border-2 border-black rounded-md px-1  bg-blue-300 active:bg-blue-600'
        >
        Code Block
      </button>

      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className='border-2 border-black rounded-md px-1  bg-blue-300 active:bg-blue-600'
        >
        Quote
      </button>

      {/* Undo/Redo — editor.can() checks if the command is currently possible */}
      <button
      type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className='border-2 border-black rounded-md px-1  bg-blue-300 active:bg-blue-600'
      >
        Undo
      </button>

      <button
      type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className='border-2 border-black rounded-md px-1  bg-blue-300 active:bg-blue-600'
      >
        Redo
      </button>
    </div>
  )
}

export default Toolbar
