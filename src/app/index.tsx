import React from 'react'
import { loadSounds } from '@/utils/audioManager'
import  HomeScreen  from '@/screens/homeScreen'
import Map from '@/screens/map'

// Carrega os sons quando o app inicia
loadSounds().catch(console.error);

const App = () => {
    return (
        <Map/>
    );
};

export default App