import { useEffect, useRef } from 'react';
import { SkinViewer, WaveAnimation } from 'skinview3d';
import { getUserData } from '../../utils';
import { useAtomValue } from 'jotai';

import defaultSkin from '../assets/images/steve.png';
import { titlebarUser } from './TitleBar/states';

export default function SkinView() {
    const skinCanvas = useRef<HTMLCanvasElement>(null);
    const username = useAtomValue(titlebarUser);

    useEffect(() => {
        const skinViewer = new SkinViewer({
            canvas: skinCanvas.current,
            width: 220,
            height: 440,
        });

        skinViewer.camera.position.x = -20;
        skinViewer.camera.position.y = 20;
        skinViewer.zoom = 0.7;
        skinViewer.controls.enableZoom = true;
        skinViewer.nameTag = username;

        skinViewer.animation = new WaveAnimation();

        // Поддержка загрузки и отображения скина
        const { skinUrl, capeUrl, isAlex } = getUserData();
        skinViewer.loadSkin(skinUrl ?? defaultSkin);
        if (capeUrl) skinViewer.loadCape(capeUrl);
        if (isAlex) skinViewer.playerObject.skin.modelType = 'slim';
    }, []);

    return <canvas ref={skinCanvas} />;
}
