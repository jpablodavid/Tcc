import React from 'react';
import { loadSounds } from '@/utils/audioManager';
import { HomeScreen } from '@/screens/homeScreen';

// Carrega os sons quando o app inicia
loadSounds().catch(console.error);

export const App = () => {
    return (
        <HomeScreen/>
    );
};