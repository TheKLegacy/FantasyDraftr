import React, { useState } from "react";
import { Button, Box, Stack } from "@mui/material";
import LoginModal from "./LoginModal";
import CreateUserModal from "./CreateUserModal";
import { logOut } from "../Firebase/FirebaseAuth";
import { useAtom } from "jotai";
import { userAtom } from "../Atoms";

const ProfileIcon: React.FC = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [user, setUser] = useAtom(userAtom);

    return (
        <>
            <Box
                sx={{
                    position: "fixed",
                    top: 16,
                    right: 16,
                    zIndex: 1000,
                }}
            >
                <Stack direction="row" spacing={1}>
                    {!user ? (
                        <>
                            <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                Sign In
                            </Button>

                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={() => setIsCreateModalOpen(true)}
                            >
                                Register
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    logOut();
                                    setUser(undefined);
                                }}
                            >
                                Log out
                            </Button>
                        </>
                    )}
                </Stack>

                <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

                <CreateUserModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
            </Box>
        </>
    );
};

export default ProfileIcon;
