import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'

// Tipos para os sons disponíveis
type SoundType = 'background' | 'match' | 'win' | 'lose' | 'click' | 'history';

// Objeto para armazenar os sons carregados
const sounds: Record<SoundType, Sound | null> = {
    background: null,
    match: null,
    win: null,
    lose: null,
    click: null,
    history: null,
};

// Caminhos para os arquivos de áudio
const soundFiles: Record<SoundType, any> = {
    background: require('@/assets/sounds/background.mp3'),
    match: require('@/assets/sounds/match.wav'),
    win: require('@/assets/sounds/win.mp3'),
    lose: require('@/assets/sounds/lose.mp3'),
    click: require('@/assets/sounds/click.mp3'),
    history: require('@/assets/sounds/history.mp3'),
};

/**
 * Carrega todos os sons necessários
 */
export const loadSounds = async () => {
    try {
        // Carrega cada som individualmente
        await Promise.all(
        Object.keys(sounds).map(async (key) => {
            const soundType = key as SoundType;
            const { sound } = await Audio.Sound.createAsync(soundFiles[soundType]);
            sounds[soundType] = sound;
            
            // Configura a música de fundo para loop
            if (soundType === 'background') {
            await sound.setIsLoopingAsync(true);
            }
        })
        );
        console.log('Todos os sons foram carregados');
    } catch (error) {
        console.error('Erro ao carregar sons:', error);
    }
};

/**
 * Toca um som específico
 * @param type Tipo do som a ser tocado
 * @param volume Volume (0 a 1)
 */
export const playSound = async (type: SoundType, volume: number = 1) => {
    try {
        const sound = sounds[type];
        if (sound) {
        await sound.setVolumeAsync(volume);
        await sound.replayAsync();
        }
    } catch (error) {
        console.error(`Erro ao tocar som ${type}:`, error);
    }
};

/**
 * Para todos os sons
 */
export const stopAllSounds = async () => {
    try {
        await Promise.all(
        Object.values(sounds).map(async (sound) => {
            if (sound) {
            await sound.stopAsync();
            }
        })
        );
    } catch (error) {
        console.error('Erro ao parar sons:', error);
    }
};

/**
 * Configura o mute geral
 * @param muted Se deve mutar ou não
 */
export const setMuted = async (muted: boolean) => {
    try {
        const backgroundSound = sounds.background;
        if (backgroundSound) {
        if (muted) {
            await backgroundSound.pauseAsync();
        } else {
            await backgroundSound.playAsync();
        }
        }
    } catch (error) {
        console.error('Erro ao configurar mute:', error);
    }
};