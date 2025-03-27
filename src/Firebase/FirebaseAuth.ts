import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword } from "firebase/auth";
import { app, firebaseErrorString } from "./Firebase";

const auth = getAuth(app);
const authErrorString = `${firebaseErrorString} Auth ->`;

export const createUser = async (email: string, password: string): Promise<User | null> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`${authErrorString} Create User -> Code:`, (error as any).code);
            console.error(`${authErrorString} Create User -> Msg:`, error.message);
        } else {
            console.error(`${authErrorString} Create User -> Unknown error`, error);
        }
        return null;
    }
};

export const signInUser = async (email: string, password: string): Promise<User | null> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`${authErrorString} Sign In -> Code:`, (error as any).code);
            console.error(`${authErrorString} Sign In -> Msg:`, error.message);
        } else {
            console.error(`${authErrorString} Sign In -> Unknown error`, error);
        }
        return null;
    }
};
