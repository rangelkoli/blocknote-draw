import { createReactBlockSpec } from "@blocknote/react";
import { Tldraw, getSnapshot, useEditor, loadSnapshot } from "tldraw";
import { BlockNoteEditor, insertOrUpdateBlock } from "@blocknote/core";
import { MdDraw } from "react-icons/md";
import "tldraw/tldraw.css";
import { useEffect, useCallback, useState } from "react";

export const Draw = createReactBlockSpec(
  {
    type: "draw",
    propSchema: {
      content: "{}" as any,
    },
    content: "inline",
  },
  {
    render: ({ block, editor }) => {
      console.log("Bas", block);

      function SnapshotToolbar() {
        const drawingEditor = useEditor();

        const save = useCallback(() => {
          // [2]
          const snapshot = getSnapshot(drawingEditor.store);
          // [3]
          console.log(snapshot);

          editor.updateBlock(block.id, {
            type: "draw",
            props: {
              content: JSON.stringify(snapshot),
            },
          });

          console.log(block);
        }, [drawingEditor]);

        const load = useCallback(() => {
          const snapshot = block.props.content;
          console.log(snapshot);
          loadSnapshot(drawingEditor.store, JSON.parse(snapshot as any));
          // [4]
        }, [editor]);
        if (block.props.content) {
          load();
        }
        const [showCheckMark, setShowCheckMark] = useState(false);
        useEffect(() => {
          if (showCheckMark) {
            const timeout = setTimeout(() => {
              setShowCheckMark(false);
            }, 1000);
            return () => clearTimeout(timeout);
          }
          return;
        });

        return (
          <div
            style={{
              padding: 20,
              pointerEvents: "all",
              display: "flex",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.2s ease, opacity 0.2s ease",
                transform: showCheckMark ? `scale(1)` : `scale(0.5)`,
                opacity: showCheckMark ? 1 : 0,
              }}
            >
              Saved ✅
            </span>
            <button
              onClick={() => {
                save();
                setShowCheckMark(true);
              }}
            >
              Save Snapshot
            </button>
            <button onClick={load}>Load Snapshot</button>
          </div>
        );
      }

      return (
        <div className='w-full'>
          <div
            className='tldraw w-full'
            style={{
              height: "500px",
              width: "100%",
            }}
          >
            <Tldraw
              className='w-full'
              options={{ maxPages: 1 }}
              components={{
                MainMenu: null,
                ContextMenu: null,
                ActionsMenu: null,
                HelpMenu: null,
                ZoomMenu: null,
                Minimap: null,
                PageMenu: null,
                NavigationPanel: null,
                SharePanel: SnapshotToolbar,
              }}
            />
          </div>
        </div>
      );
    },
  }
);

export const insertDraw = () => ({
  title: "Whiteboard",
  group: "Other",
  onItemClick: (editor: BlockNoteEditor) => {
    insertOrUpdateBlock(editor, {
      type: "draw" as any,
    });
  },
  aliases: ["whiteboard", "draw"],
  icon: <MdDraw />,
  subtext: "Insert a whiteboard.",
});
