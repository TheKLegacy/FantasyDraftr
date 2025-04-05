import React, { useState, useEffect, useCallback, useRef } from "react";
import { TextField } from "@mui/material";
import { useAtom } from "jotai";
import { playerNotes } from "../../Atoms";
import { debounce } from "lodash";
import { writeUserNotes } from "../../Firebase/Firestore";

type NoteProps = {
    playerId: string;
};

const PlayerModal: React.FC<NoteProps> = ({ playerId }) => {
    const [notes, setNotes] = useAtom(playerNotes);
    const [inputValue, setInputValue] = useState("");
    const pendingNoteRef = useRef<string | null>(null);

    // Initialize the input value from stored notes if available
    useEffect(() => {
        writeUserNotes(notes);
        if (notes[playerId]) {
            setInputValue(notes[playerId]);
        } else {
            setInputValue(""); // Reset if no notes exist for this player
        }
    }, [playerId, notes]);

    // Create a debounced function to update notes
    const debouncedSetNotes = useCallback(
        debounce((value: string) => {
            setNotes((prevNotes) => ({
                ...prevNotes,
                [playerId]: value,
            }));
            pendingNoteRef.current = null;
        }, 500), 
        [playerId, setNotes]
    );

    // Handle input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue); // Update local state immediately for responsive UI
        pendingNoteRef.current = newValue; // Store the latest value in ref
        debouncedSetNotes(newValue); // Debounce the actual state update
    };

    // Save any pending changes on unmount
    useEffect(() => {
        return () => {
            debouncedSetNotes.cancel();

            if (pendingNoteRef.current !== null) {
                setNotes((prevNotes) => ({
                    ...prevNotes,
                    [playerId]: pendingNoteRef.current as string,
                }));
                console.log("saving note on unmount for player:", playerId);
            }
        };
    }, [debouncedSetNotes, playerId, setNotes]);

    return (
        <TextField
            id="filled-multiline-static"
            label="Notes"
            multiline
            rows={4}
            value={inputValue}
            onChange={handleChange}
            variant="filled"
            fullWidth
        />
    );
};

export default PlayerModal;
