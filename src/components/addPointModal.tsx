import React, {useState} from 'react';
import axios from "axios";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

import { config } from "../config";

const useFormField = (initialValue: string = '') => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
    return { value, onChange };
};

export function AddModalWindow() {
    const descr = useFormField();
    const pointName = useFormField();
    const image = useFormField();
    const positionX = useFormField();
    const positionY = useFormField();

    const sendMessage = () => {
        // axios.post(config.apiUrl.addFeedback,
        const data = {
            "descr": descr.value,
            "image": image.value,
            "name": pointName.value,
            "positionX": positionX.value,
            "positionY": positionY.value
        };

        axios.post(config.apiUrl.getPoints, data);
    }

    return(
        <Modal
            open={ true }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="modal">
                <TextField
                    label="Название"
                    className="feedback-input text-area"
                    {...pointName}
                />
                <TextField
                    label="Описание"
                    className="feedback-input text-area"
                    {...descr}
                />
                <TextField
                    label="Картинка"
                    className="feedback-input text-area"
                    {...image}
                />
                <TextField
                    label="X"
                    className="feedback-input text-area"
                    {...positionX}
                />
                <TextField
                    label="Y"
                    className="feedback-input text-area"
                    {...positionY}
                />
                <div className="modal-footer">
                    <Button variant="contained" startIcon={<SendIcon />} size="medium"
                            onClick={() => { sendMessage() }}
                    >
                        Отправить
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

