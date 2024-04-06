import React, { useRef, useState } from 'react';
import { Box, IconButton, ListItemIcon, ListItemText, MenuItem, Popover } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { stores } from '../stores';
import PropTypes from 'prop-types';


const LanguagePopover = observer(() => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSwitchLang = lang => {
        stores.userStore.setLanguage(lang);
        handleClose();
    };

    return <>
        <IconButton
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
                position: 'absolute',
                top: '1vh',
                right: '1vw',
                padding: 0,
                width: '30px',
                boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.15)',
            }}
            size="large">
            <img src={LANGUAGES.find(l => l.value === stores.userStore.language).icon} alt={LANGUAGES.find(l => l.value === stores.userStore.language).label}
                style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: 'auto', objectFit: 'contain' }}
            />
        </IconButton>


        <Language open={open} onClose={handleClose} anchorEl={anchorRef.current}>
            <Box sx={{ py: 1, boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.15)' }}>
                {LANGUAGES.map(option => (
                    <MenuItem
                        key={option.value}
                        selected={option.value === LANGUAGES.find(l => l.value === stores.userStore.language).value}
                        onClick={() => handleSwitchLang(option.value)}
                        sx={{ py: 1, px: 2.5 }}
                    >
                        <ListItemIcon>
                            <Box component='img' alt={option.label} src={option.icon} sx={{ width: '35px', marginRight: '10px' }} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: 'body2' }}>{option.label}</ListItemText>
                    </MenuItem>
                ))}
            </Box>
        </Language>
    </>;
});

const Language = ({ children, sx, ...other }) => {
    return (
        <Popover
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    mt: 1,
                    ml: 0.5,
                    overflow: 'inherit',
                    boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.1)',
                    width: 200,
                }
            }}
            {...other}
        >
            {children}
        </Popover>
    )
};
Language.propTypes = {
    children: PropTypes.node.isRequired,
    sx: PropTypes.object,
};

const LANGUAGES = [
    {
        value: 'en',
        label: 'English',
        icon: '/img/en.png',
    },
    {
        value: 'pt',
        label: 'Português',
        icon: '/img/pt.png',
    },
    {
        value: 'es',
        label: 'Español',
        icon: '/img/es.png',
    },
    {
        value: 'fr',
        label: 'Français',
        icon: '/img/fr.png',
    },

    {
        value: 'it',
        label: 'Italiano',
        icon: '/img/it.png',
    },
    {
        value: 'de',
        label: 'Deutsch',
        icon: '/img/de.png',
    }
]

export default LanguagePopover;