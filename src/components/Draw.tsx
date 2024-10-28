import { createReactBlockSpec } from "@blocknote/react";
import { Tldraw } from "tldraw";

export const Draw = createReactBlockSpec(
  {
    type: "draw",
    propSchema: {},
    content: "inline",
  },
  {
    render: () => {
      return (
        <div className={"tldraw w-full"}>
          <Tldraw className='h-96 w-full' options={{}} />
        </div>
      );
    },
  }
);
