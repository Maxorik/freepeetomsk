import React from 'react';
import {Button, IconButton} from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';

import { config } from "../config";

export function Header() {
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
                <Button variant="outlined" startIcon={<AddIcon />} size="medium">
                    Добавить место
                </Button>
            </div>
        </div>
    )
}

