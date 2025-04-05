import { Button } from "@mui/material";
import React from "react";
import { buttonForModalProps } from "../Types";

export const LiveDraftButton: React.FC<buttonForModalProps> = (props: buttonForModalProps) => {
    return (
        <>
            <Button
                variant="outlined"
                size="large"
                onClick={() => {
                    props.openModal(true);
                }}
            >
                Join Sleeper Draft
            </Button>
        </>
    );
};
