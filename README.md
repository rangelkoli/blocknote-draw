# Drawing Canvas for Blocknote

![Stability Badge](https://img.shields.io/badge/stability-stable-green.svg)
![](https://badgen.net/badge/Version/v1.0.0/blue)

Code block for [Blocknote](https://www.blocknotejs.org/).

![](assets/demo.gif)

## Installation

### Install via YARN

Get the package

```shell
$ yarn add blocknote-draw
```

## Usage

Include module at your application

```javascript
import { Draw, insertDraw } from "blocknote-draw";
```

Create schema with code block.

```javascript
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    draw: Draw,
  },
});
```

Add slash menu item.

```javascript
<BlockNoteView editor={editor} slashMenu={false}>
  <SuggestionMenuController
    triggerCharacter={"/"}
    getItems={async (query) =>
      filterSuggestionItems(
        [...getDefaultReactSlashMenuItems(editor), insertDraw()],
        query
      )
    }
  />
</BlockNoteView>
```
