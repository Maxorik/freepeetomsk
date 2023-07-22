import React from 'react';
import axios from "axios";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

import { config } from "../config";
import Typography from "@mui/material/Typography";

interface WindowProps {
    onCloseHandler: () => void,
    cX: number,
    cY: number
}

const useFormField = (initialValue: string = '') => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);
    return { value, onChange };
};

export function AddPlaceWindow({ onCloseHandler, cX, cY }: WindowProps) {
    const descr = useFormField();
    const pointName = useFormField();
    const image = useFormField();

    console.log(cX, cY)

    const sendMessage = () => {
        const data = {
            "descr": descr.value,
            "image": image.value || '',
            "name": pointName.value,
            "positionX": cX,
            "positionY": cY
        };

        console.log(data)

        if (checkValidForm()) {
            axios.post(config.apiUrl.getPoints, data);
            onCloseHandler();
        }
    }

    const checkValidForm = () => {
        return descr.value.trim() && pointName.value.trim();
    }

    return(
        <Modal
            open={ true }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="modal">
                <Typography variant="h6" component="h2">
                    Добавляем новую точку на карту
                </Typography>
                <Typography variant="h6" component="h3">
                    * - обязательно заполнить
                </Typography>
                <TextField
                    required
                    id="outlined-required"
                    label="Название"
                    {...pointName}
                    className="feedback-input"
                />
                <TextField
                    label="Описание - как найти туалет в здании?"
                    className="feedback-input text-area"
                    required
                    multiline
                    {...descr}
                />
                <TextField
                    label="Картинка (ссылкой, необязательно)"
                    className="feedback-input"
                    {...image}
                />
                <Typography variant="h6" component="h3" style={{marginTop: '10px'}}>
                    После закрытия окна точка добавится после обновления карты
                </Typography>
                <div className="modal-footer">
                    <Button variant="outlined" onClick={() => { onCloseHandler() }}> отмена </Button>
                    <Button variant="contained"
                            startIcon={<SendIcon />}
                            size="medium"
                            onClick={() => { sendMessage() }}
                    >
                        Добавить!
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}