import "katex/dist/katex.min.css";
import "./TipTapEditor.styles.scss";

import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  List, ListOrdered, Quote, Redo, Undo,
} from "lucide-react";
import { QuizAnswer } from "@/lib/types";
import { Button } from "@/components/ui/common/shadcn/button";
import { QuizQuestionFormValues } from "../CreateQuizQuestionPage";

interface TipTapEditorProps {
  disabled?: boolean;
  field: ControllerRenderProps<QuizQuestionFormValues, "question" | "answers">;
  i?: number;
  className?: string;
}

function TipTapEditor({
  field,
  disabled,
  className,
  i,
}: TipTapEditorProps) {
  const { name } = field;
  const onUpdate = ({ editor: e }: { editor: Editor }) => {
    const html = e?.getHTML();
    if (name === "question") {
      field.onChange(html);
    } else {
      const newQuizAnswerObj = { ...field.value[i!] as QuizAnswer };
      newQuizAnswerObj.answer = html;
      const newValue = [...field.value];
      newValue[i!] = newQuizAnswerObj;
      field.onChange(newValue);
    }
  };
  const content = name === "question" ? field.value : (field.value[i!] as QuizAnswer).answer;
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit,
      Mathematics,
    ],
    onUpdate,
    content,
  });
  return (
    (
      <div className={cn("relative group w-full", {
        "pointer-events-none opacity-50": disabled,
      })}
      >
        {" "}
        {!editor ? null : (
          <div className="absolute bg-white bottom-[99%] group-focus-within:flex flex-wrap border border-b-0 border-input hidden pb-4">
            <Button
              variant="borderL"
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <strong>
                B
              </strong>
            </Button>
            <Button
              type="button"
              variant="borderL"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <em>
                I
              </em>
            </Button>
            <Button
              type="button"
              variant="borderL"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <del>
                S
              </del>
            </Button>
            <Button
              type="button"
              variant="borderL"
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
              className={cn("", {
                "is-active": editor.isActive("code"),
              })}
            >
              <span className="text-emerald-700 border bg-black/10 ">
                C
              </span>
            </Button>
            <Button
              type="button"
              variant="borderL"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive("codeBlock") ? "is-active" : ""}
            >
              <span className="text-emerald-200 border bg-black font-bol">
                C
              </span>
            </Button>
            <Button
              type="button"
              variant="borderL"
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive("paragraph") ? "is-active" : ""}
            >
              P
            </Button>
            <Button
              type="button"
              variant="borderL"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn("relative", {
                "is-active": editor.isActive("bulletList"),
              })}
            >
              <List />
              <span className="sr-only">
                Ordered list
              </span>
            </Button>
            <Button
              type="button"
              variant="borderL"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn("relative", {
                "is-active": editor.isActive("orderedList"),
              })}
            >
              <ListOrdered />
              <span className="sr-only">
                Ordered list
              </span>
            </Button>
            <Button
              type="button"
              variant="borderL"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              <Quote size={16} />
            </Button>
            <Button
              type="button"
              variant="borderL"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
            >
              <Undo size={16} />
            </Button>
            <Button
              type="button"
              variant="borderL"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
            >
              <Redo size={16} />
            </Button>
          </div>
        )}
        <EditorContent editor={editor} className={cn("p-3 border border-input", className)} />
      </div>
    )
  );
}

export default TipTapEditor;
