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
const userBoardsRef = (cUser: User, collectionName: CollectionName) =>
    doc(db, collectionName, cUser.uid || (cUser.email ?? "unknown"));

export const writeUserBoards = async (boards: Board[]) => {
    if (!user) return;
    try {
        await setDoc(userBoardsRef(user, collectionNames.UserBoards), {
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

export const writeUserNotes = async (notes: PlayerNote) => {
    if (!user) return;
    try {
        console.log("payload", notes);
        await setDoc(userBoardsRef(user, collectionNames.UserNotes), {
            notes,
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
        const docSnap = await getDoc(userBoardsRef(user, collectionNames.UserBoards));

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

export const getUserNotes = async (): Promise<PlayerNote | null> => {
    if (!user) return null;
    try {
        const docSnap = await getDoc(userBoardsRef(user, collectionNames.UserNotes));

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
