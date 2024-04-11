import { createContext } from "react";

const noteContext = createContext(
    {
        notes: [],
        getNotes: () => {},
        updateNote: () => {}, // Add updateNote function
        // Other context functions...
    }
);

export default noteContext;