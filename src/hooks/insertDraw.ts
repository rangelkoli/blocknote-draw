
const insertDraw = (editor: typeof schema.BlockNoteEditor) => ({
    title: "Insert Draw",
    onItemClick: () => {
      // Block that the text cursor is currently in.
      insertOrUpdateBlock(editor, { type: "draw" });
    },
    aliases: ["draw"],
    group: "Other",
    icon: <HiOutlineGlobeAlt size={18} />,
    subtext: "Used to insert a draw block below.",
  });