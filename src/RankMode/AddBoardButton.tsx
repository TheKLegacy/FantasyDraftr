import { Button } from "@mui/material";
import React, { useState } from "react";
import CreateBoardModal from "./CreateBoardModal";

export const AddBoardButton: React.FC = () => {
    const [openBoardModal, setOpenBoardModal] = useState<boolean>(false);

    return (
        <>
            <Button variant="outlined" size="large" onClick={() => setOpenBoardModal(true)}>
                Add Board
            </Button>
            <CreateBoardModal open={openBoardModal} onClose={() => setOpenBoardModal(false)} />
        </>
    );
};
