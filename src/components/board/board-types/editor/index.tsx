import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { Board } from "@/types";
import { useEditorContent } from "@/hooks/useEditorContent";

interface EditorProps {
  board: Board;
}

function Editor({ board }: EditorProps) {
  const { content, setContent } = useEditorContent(board.id);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable unwanted features
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        codeBlock: false,
        code: false,
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          // Base prose styling
          "prose prose-neutral dark:prose-invert max-w-none focus:outline-none",
          // Layout
          "min-h-[500px] p-8 w-full",
          // Focus states
          "[&_.ProseMirror-focused]:outline-none",
          // Custom class for live preview
          "obsidian-editor",
        ),
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-background relative h-full w-full overflow-auto">
      {/* Bubble Menu for selected text */}
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="bg-background border-border flex items-center gap-0.5 rounded-lg border p-1 shadow-lg"
      >
        <Button
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="h-7 w-7 rounded p-0"
        >
          <Bold size={12} />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-7 w-7 rounded p-0"
        >
          <Italic size={12} />
        </Button>
        <Button
          variant={editor.isActive("strike") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="h-7 w-7 rounded p-0"
        >
          <Strikethrough size={12} />
        </Button>
      </BubbleMenu>

      {/* Editor Content */}
      <EditorContent editor={editor} className="h-full w-full" />
    </div>
  );
}

export { Editor };
