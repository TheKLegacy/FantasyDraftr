import React, { useState, useEffect, useCallback, useRef } from "react";
import { TextField } from "@mui/material";
import { useAtom } from "jotai";
import { playerNotes } from "../../Atoms";
import { debounce } from "lodash";
import { writeUserNotes, getUserPlayerNote } from "../../Firebase/Firestore";
import { user } from "../../Firebase/FirebaseAuth";

type NoteProps = {
    playerId: string;
};

const PlayerModal: React.FC<NoteProps> = ({ playerId }) => {
    const [notes, setNotes] = useAtom(playerNotes);
    const [inputValue, setInputValue] = useState("");
    const pendingNoteRef = useRef<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); 

    // Fetch player note from Firebase or local state on mount
    useEffect(() => {
        console.log("fetching player notes", playerId)
        const fetchPlayerNote = async () => {
            setIsLoading(true);
            const playerNote = user
                ? await getUserPlayerNote(playerId)
                : notes.find((note) => note.playerId === playerId);
            console.log("notes", notes)
            console.log("playernotes",playerNote)
            setInputValue(playerNote?.content ?? "");
            setIsLoading(false);
        };
        fetchPlayerNote();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        pendingNoteRef.current = newValue;
        debouncedSetNotes(newValue);
    };

    const saveNote = useCallback(
        (content: string) => {
            const note = { playerId, content };

            !user &&
                setNotes((prevNotes) => {
                    const noteIndex = prevNotes.findIndex((note) => note.playerId === playerId);
                    if (noteIndex >= 0) {
                        const updatedNotes = [...prevNotes];
                        updatedNotes[noteIndex] = note;
                        return updatedNotes;
                    }
                    return [...prevNotes, note];
                });

            user && writeUserNotes(note);
        },
        [playerId, setNotes, user]
    );

    const debouncedSetNotes = useCallback(
        debounce((value: string) => {
            saveNote(value);
            pendingNoteRef.current = null;
        }, 500),
        [saveNote]
    );

    useEffect(() => {
        return () => {
            debouncedSetNotes.cancel();
            if (pendingNoteRef.current !== null) {
                saveNote(pendingNoteRef.current);
                console.log("saving note on unmount for player:", playerId);
            }
        };
    }, [debouncedSetNotes, saveNote]);

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
            disabled={isLoading}
        />
    );
};

export default PlayerModal;
