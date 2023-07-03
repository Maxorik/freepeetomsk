import React, {useState} from 'react';
import { Button, IconButton } from "@mui/material";

import ReplayIcon from '@mui/icons-material/Replay';
import ShareIcon from '@mui/icons-material/Share';
import EmailIcon from '@mui/icons-material/Email';

import { ModalWindow } from './Modal';

import { config } from "../config";

export function Header() {
    const [showWindow, setShowWindow] = useState(false);
    const closeModal = () => setShowWindow(false);

    // перезагрузить карту
    const reloadPage = () => {
        window.location.reload();
    }

    // поделиться картой, используется для мобильных браузеров
    const shareApp = () => {
        navigator.share && navigator.share({
            title: 'Туалеты Томска',
            text: 'Карта бесплатных туалетов',
            url: document.location.href,
        })
    }

    return(
        <>
            {
                showWindow && <ModalWindow state={ showWindow } onCloseHandler={ closeModal }  />
            }
            <div className={ 'header' }>
                <p>ТУАЛЕТЫ ТОМСКА</p>
                <div className={ 'interface' }>
                    <IconButton aria-label="replay" size="large" color="primary"
                        onClick={() => { reloadPage() }}
                    >
                        <ReplayIcon />
                    </IconButton >
                    { config.isMobile &&  <IconButton aria-label="replay" size="large" color="primary"
                         onClick={() => { shareApp() }}
                    >
                        <ShareIcon/>
                    </IconButton>}
                    <Button variant="contained" startIcon={<EmailIcon />} size="medium"
                        onClick={() => { setShowWindow(true) }}
                    >
                        Написать
                    </Button>
                </div>
            </div>
        </>
    )
}

