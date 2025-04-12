import { getFirestore, serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./Firebase";
import { user } from "./FirebaseAuth";
import { Board } from "../Shared/Filters";
import { BoardPayload, PlayerNote } from "../Types";
import { User } from "firebase/auth";

const db = getFirestore(app);

const collectionNames = {
    UserBoards: "UserBoards",
    UserNotes: "UserNotes",
} as const;
type CollectionName = keyof typeof collectionNames;

// Create a reference directly to the user's document
const userStoreRef = (cUser: User, collectionName: CollectionName, ...pathSegments: string[]) =>
    doc(db, collectionName, cUser.uid || (cUser.email ?? "unknown"), ...pathSegments);

export const writeUserBoards = async (boards: Board[]) => {
    if (!user) return;
    try {
        await setDoc(userStoreRef(user, collectionNames.UserBoards), {
            boards: boards.map((b) => ({
                ...b,
                Players: b.Players.map((p) => p.player_id),
            })),
            updatedAt: serverTimestamp(),
        });
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

export const writeUserNotes = async (note: PlayerNote) => {
    if (!user) return;
    try {
        console.log("payload", note);
        await setDoc(userStoreRef(user, collectionNames.UserNotes, "PlayerNote", note.playerId), {
            note: note.content,
            updatedAt: serverTimestamp(),
        });
        console.log("Document updated for user: ", user.email);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

export const getUserBoards = async (): Promise<BoardPayload[] | null> => {
    if (!user) return null;
    try {
        const docSnap = await getDoc(userStoreRef(user, collectionNames.UserBoards));

        if (docSnap.exists()) {
            return docSnap.data().boards;
        }

        console.log("No boards found for user");
        return [];
    } catch (e) {
        console.error("Error getting user boards: ", e);
        return null;
    }
};

export const getUserPlayerNote = async (playerId: string): Promise<PlayerNote | null> => {
    if (!user) return null;
    try {
        const docSnap = await getDoc(userStoreRef(user, collectionNames.UserNotes, "PlayerNote", playerId));

        if (docSnap.exists()) {
            return {
                playerId,
                content: docSnap.data().note
            };
        }

        console.log("No note found for player");
        return null;
    } catch (e) {
        console.error("Error getting user player notes: ", e);
        return null;
    }
};
