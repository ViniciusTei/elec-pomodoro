

export function createAudioElement() {
    const audioSrc = "../../assets/sounds/retro-game-alarm.wav";

    const audioPlayer = document.createElement("audio");
    audioPlayer.src = audioSrc;
    audioPlayer.controls = true;
    audioPlayer.autoplay = true;
    audioPlayer.loop = true;

    return audioPlayer;
}
