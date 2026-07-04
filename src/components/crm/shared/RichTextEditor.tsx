"use client";

import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Underline, Heading3, List, RefreshCw } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize editor content once
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    handleInput();
  };

  if (!isMounted) return <div className="h-48 bg-slate-900/5 animate-pulse rounded-lg" />;

  return (
    <div className="border rounded-xl overflow-hidden" style={{ borderColor: "var(--crm-border)", background: "var(--crm-surface)" }}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b" style={{ borderColor: "var(--crm-border)", background: "var(--crm-surface-muted)" }}>
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-slate-700 mx-1" />
        <button
          type="button"
          onClick={() => execCommand("formatBlock", "h3")}
          className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
          title="Heading"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("removeFormat")}
          className="p-1.5 rounded hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
          title="Clear Format"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[220px] max-h-[400px] overflow-y-auto outline-none text-slate-200 prose prose-invert max-w-none text-sm leading-relaxed"
        data-placeholder={placeholder}
        style={{ caretColor: "var(--crm-primary)" }}
      />
      
      {/* Small style rule for placeholder if empty */}
      <style jsx global>{`
        div[contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #64748b;
          cursor: text;
        }
      `}</style>
    </div>
  );
}
