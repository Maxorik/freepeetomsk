import React from 'react';
import axios from "axios";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

import { config } from "../config";

interface ModalProps {
    state: boolean,
    onCloseHandler: () => void,
    message: string,
    setMessage: (v: string) => void
}

export function ModalWindow({ state, onCloseHandler, message, setMessage }: ModalProps) {
    const changeMessage = (event: any) => {
        setMessage(event.target.value);
    }

    const closeWindow = () => {
        setMessage('');
        onCloseHandler();
    }

    const sendMessage = () => {

        if(message.trim()) {
            axios.post(config.apiUrl.addFeedback, {
                text: message
            }).finally(function () {
                closeWindow();
            })
        }
    }

    return(
        <Modal
            open={ state }
            onClose={ onCloseHandler }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="modal">
                <Typography variant="h6" component="h2">
                    На карте кое-чего не хватает...
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Тогда напишите мне. Можно вставить ссылку на <a href="https://2gis.ru/tomsk" target="_blank">2ГИС</a> и указать описание места.
                </Typography>
                <TextField
                    label="Введите текст"
                    multiline
                    maxRows={8}
                    className="feedback-input text-area"
                    value={message}
                    onInput={changeMessage}
                />
                <div className="modal-footer">
                    <Button variant="outlined" onClick={() => { closeWindow() }}> отмена </Button>
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

