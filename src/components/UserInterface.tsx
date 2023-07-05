import React, {useState} from 'react';
import { Button, IconButton } from "@mui/material";

import ReplayIcon from '@mui/icons-material/Replay';
import ShareIcon from '@mui/icons-material/Share';
import EmailIcon from '@mui/icons-material/Email';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { ModalWindow } from './Modal';

import { config } from "../config";

export function UserInterface() {
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
                { !config.isMobile && <p>ТУАЛЕТЫ ТОМСКА</p> }
                <div className={ 'interface' }>
                    <Button
                        startIcon={ <HelpOutlineIcon /> }
                        onClick={() => { reloadPage() }}
                    >
                        Где я
                    </Button >
                    { config.isMobile && <>
                    <Button
                        startIcon={ <ReplayIcon /> }
                        onClick={() => { reloadPage() }}
                    >
                        Обновить
                    </Button >
                    <Button
                        startIcon={ <ShareIcon /> }
                        onClick={() => { shareApp() }}
                    >
                        Поделиться
                    </Button> </> }
                    { !config.isMobile && <Button variant="contained" startIcon={ <EmailIcon /> } size="medium"
                        onClick={() => { setShowWindow(true) }}
                    >
                        Написать
                    </Button> }
                    { config.isMobile && <Button startIcon={ <MailOutlineIcon /> } onClick={() => { setShowWindow(true) }}>
                        Написать
                    </Button> }
                </div>
            </div>
        </>
    )
}

