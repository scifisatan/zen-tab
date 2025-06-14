# Board Components Architecture

This folder contains all board-related components organized in a scalable structure that makes it easy to add new board types.

## Folder Structure

```
board/
├── Board.tsx                    # Main board wrapper component
├── BoardRenderer.tsx            # Board factory/renderer
├── BoardTitle.tsx               # Board title component
├── index.tsx                    # Barrel export file
├── README.md                    # Documentation
├── add-new-board.md             # Guide for adding new board types
└── board-types/                 # Individual board type implementations
    ├── index.ts                 # Barrel exports for main board components only
    ├── jira-board/
    │   ├── JiraBoard.tsx        # Main Jira board component
    │   ├── JiraTask.tsx         # Individual Jira task component (no barrel export)
    │   ├── JiraTasksList.tsx    # Jira tasks list component (no barrel export)
    │   └── index.ts             # Only exports JiraBoard
    └── links-board/
        ├── LinksBoard.tsx       # Main Links board component
        ├── LinkItem.tsx         # Individual link item component (no barrel export)
        ├── LinksList.tsx        # Links list component (no barrel export)
        └── index.ts             # Only exports LinksBoard

```

## Architecture Overview

### 1. Main Board Component (`Board.tsx`)

The main wrapper component that handles:

- Board state management
- Dashboard configuration updates
- Rendering the appropriate board type via BoardRenderer

### 2. Board Renderer (`BoardRenderer.tsx`)

Acts as a factory pattern implementation that:

- Routes board rendering to the appropriate board type component
- Maintains a registry of available board types
- Provides helper functions for board type management

### 3. Board Types (`board-types/`)

Contains individual implementations for each board type:

- **LinksBoard**: Handles link management with add/edit/delete functionality
- **JiraBoard**: Displays Jira tasks based on JQL queries
- Each board type is self-contained with its own logic and UI

### 4. Board-Specific Components

Each board type contains its supporting components directly in the same folder:

- **BoardTitle.tsx**: Reusable title component for all boards
- **jira-board/JiraTask.tsx**: Individual Jira task display component
- **jira-board/JiraTasksList.tsx**: List container for Jira tasks
- **links-board/LinkItem.tsx**: Individual link display component
- **links-board/LinksList.tsx**: List container for links

## Adding a New Board Type

To add a new board type (e.g., "notes"), follow these steps:

### 1. Update Types

First, add the new board type to your types definition:

```typescript
// types/dashboard.ts
export type BoardType = "links" | "jira" | "notes";

export interface Board {
  id: string;
  title: string;
  type: BoardType;
  // ... existing fields
  notes?: Note[]; // Add type-specific fields
}
```

### 2. Create Board Type Component

Create a new folder and component for your board type:

```typescript
// board-types/notes-board/NotesBoard.tsx
import { Board } from "@/types";

interface NotesBoardProps {
  board: Board;
  onUpdateBoard: (updatedBoard: Board) => void;
}

export function NotesBoard({ board, onUpdateBoard }: NotesBoardProps) {
  // Implement your notes board logic here
  return (
    <div className="flex flex-col gap-4">
      {/* Your notes board UI */}
    </div>
  );
}
```

```typescript
// board-types/notes-board/index.ts
export { NotesBoard } from "./NotesBoard";
```

### 3. Update Board Types Index

Add your new board type to the barrel export:

```typescript
// board-types/index.ts
export { LinksBoard } from "./links-board";
export { JiraBoard } from "./jira-board";
```

### 4. Update Board Renderer

Add your board type to the renderer:

```typescript
// BoardRenderer.tsx
import { LinksBoard, JiraBoard } from "./board-types";

export function BoardRenderer({ board, onUpdateBoard }: BoardRendererProps) {
  switch (board.type) {
    case "links":
      return <LinksBoard board={board} onUpdateBoard={onUpdateBoard} />;
    case "jira":
      return <JiraBoard board={board} onUpdateBoard={onUpdateBoard} />;
    default:
      return <div>Unknown board type: {board.type}</div>;
  }
}

// Update the registry
export const BOARD_TYPES: Record<BoardType, { label: string; description: string }> = {
  links: {
    label: "Links Board",
    description: "A board for managing and organizing your favorite links",
  },
  jira: {
    label: "Jira Board",
    description: "A board for displaying Jira tasks based on JQL queries",
  }
};
```

### 5. Create Supporting Components (if needed)

If your board type needs supporting components, create them directly alongside the main component file:

```
board-types/notes-board/
├── NotesBoard.tsx      # Main board component
├── NoteItem.tsx        # Individual note component
├── NotesList.tsx       # Notes list component
└── index.ts            # Only exports the main board component
```

The supporting components are imported directly without barrel exports:

```typescript
// board-types/notes-board/NotesBoard.tsx
import { NoteItem } from "./NoteItem";
import { NotesList } from "./NotesList";

export function NotesBoard({ board, onUpdateBoard }: NotesBoardProps) {
  return (
    <div className="flex flex-col gap-4">
      <NotesList>
        {board.notes?.map(note => (
          <NoteItem key={note.id} note={note} />
        ))}
      </NotesList>
    </div>
  );
}
```

The board type's index file only exports the main component:

```typescript
// board-types/notes-board/index.ts
export { NotesBoard } from "./NotesBoard";
```

### 6. Update Main Barrel Export

The main board index will automatically export your board type:

```typescript
// index.tsx
export { Board } from "./Board";
export { BoardTitle } from "./BoardTitle";
export {
  BoardRenderer,
  BOARD_TYPES,
  getAvailableBoardTypes,
} from "./BoardRenderer";
export * from "./board-types"; // This exports all main board type components
```

Supporting components are not exported through barrel exports and should be imported directly when needed externally:

```typescript
// Direct imports for supporting components (when needed externally)
import { LinkItem } from "@/components/board/board-types/links-board/LinkItem";
import { JiraTask } from "@/components/board/board-types/jira-board/JiraTask";
import { NoteItem } from "@/components/board/board-types/notes-board/NoteItem";
```

## Benefits of This Architecture

1. **Scalability**: Easy to add new board types without modifying existing code
2. **Separation of Concerns**: Each board type manages its own logic and state
3. **Encapsulation**: Board-specific components are contained within their board type folders
4. **Maintainability**: Clear structure makes it easy to locate and modify components
5. **Type Safety**: Full TypeScript support with proper type checking
6. **Barrel Exports**: Clean import statements throughout the application
7. **Component Isolation**: Board types are completely self-contained with their own components

## Import Examples

Thanks to barrel exports, you can import components cleanly:

```typescript
// Import the main board component
import { Board } from "@/components/board";

// Import specific board types
import { LinksBoard, JiraBoard } from "@/components/board";

// Import the board type registry
import { BOARD_TYPES, getAvailableBoardTypes } from "@/components/board";

// Supporting components must be imported directly (no barrel exports)
import { LinkItem } from "@/components/board/board-types/links-board/LinkItem";
import { JiraTask } from "@/components/board/board-types/jira-board/JiraTask";
import { NoteItem } from "@/components/board/board-types/notes-board/NoteItem";
```

This architecture ensures that the board system remains flexible and maintainable as new requirements emerge.
