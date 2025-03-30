import {
	getFirestore,
	serverTimestamp,
	doc,
	setDoc,
	getDoc,
} from "firebase/firestore";
import { app } from "./Firebase";
import { user } from "./FirebaseAuth";
import { Board } from "../Shared/Filters";
import { BoardPayload } from "../types";

const db = getFirestore(app);

export const writeUserBoards = async (boards: Board[]) => {
	if (!user) return;
	try {
		// Create a reference directly to the user's document
		const userBoardsRef = doc(
			db,
			"UserBoards",
			user.uid || (user.email ?? "unknown")
		);

		//console.log("payload", boards)
		// Set the document with the boards data
		await setDoc(userBoardsRef, {
			boards: boards.map((b) => ({
				...b,
				Players: b.Players.map((p) => p.player_id),
			})),
			updatedAt: serverTimestamp(),
		});

		//console.log("Document updated for user: ", user.email);
	} catch (e) {
		console.error("Error updating document: ", e);
	}
};

export const getUserBoards = async (): Promise<BoardPayload[] | null> => {
	if (!user) return null;
	try {
		const userBoardsRef = doc(
			db,
			"UserBoards",
			user.uid || (user.email ?? "unknown")
		);
		const docSnap = await getDoc(userBoardsRef);

		if (docSnap.exists()) {
			return docSnap.data().boards;
		} else {
			console.log("No boards found for user");
			return [];
		}
	} catch (e) {
		console.error("Error getting user boards: ", e);
		return null;
	}
};
