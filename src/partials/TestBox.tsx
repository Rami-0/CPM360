import Image from '../assets/Mask group.png';
import scenesArray from './ScenesArray';
import { Pannellum } from 'pannellum-react';
import * as React from 'react';
import ImageMapper from 'react-image-mapper';

function TestBox(_props) {
	const [currentScene, setCurrentScene] = React.useState(0);
	const [imgCoords, setImgCoords] = React.useState('');
	const [yaw, setYaw] = React.useState(0);
	const [pitch, setPitch] = React.useState(0);
	const [sceneImg, setSceneImg] = React.useState(scenesArray[currentScene].scenePanoImg);
	const panImage = React.useRef(null);
	const hotspotIcon = (hotSpotDiv) => {
		const image = document.createElement('img');
		image.classList.add('image');
		image.setAttribute('width', '30');
		image.setAttribute('height', '30');
		image.setAttribute('src', 'https://img.icons8.com/material/4ac144/256/camera.png');
		hotSpotDiv.appendChild(image);
	};
	const map = {
		name: 'my-map',
		areas: [
			{
				name: '0',
				shape: 'circle',
				coords: [270, 200, 5],
				preFillColor: 'blue',
			},
			{
				name: '1',
				shape: 'circle',
				coords: [110, 150, 5],
				preFillColor: 'blue',
			},
			{
				name: '2',
				shape: 'circle',
				coords: [200, 138, 5],
				preFillColor: 'blue',
			},
			{
				name: '3',
				shape: 'circle',
				coords: [260, 120, 5],
				preFillColor: 'blue',
			},
			{
				name: '4',
				shape: 'circle',
				coords: [350, 165, 5],
				preFillColor: 'blue',
			},
			{
				name: '5',
				shape: 'circle',
				coords: [230, 165, 5],
				preFillColor: 'blue',
			},
			{
				name: '6',
				shape: 'circle',
				coords: [330, 103, 5],
				preFillColor: 'blue',
			},
			{
				name: '7',
				shape: 'circle',
				coords: [262, 30, 5],
				preFillColor: 'blue',
			},
			{
				name: '8',
				shape: 'circle',
				coords: [330, 265, 5],
				preFillColor: 'red',
			},
			{
				name: '9',
				shape: 'circle',
				coords: [330, 230, 5],
				preFillColor: 'red',
			},
			{
				name: '10',
				shape: 'circle',
				coords: [330, 200, 5],
				preFillColor: 'red',
			},
			{
				name: '11',
				shape: 'circle',
				coords: [255, 265, 5],
				preFillColor: 'red',
			},
		],
	};
	const width_window = 430;
	return (
		<>
			<section className='flex flex-col h-dvh'>
				<main>
					<span>
						pitch: {pitch}, yaw: {yaw}, transition: "0"
					</span>
					<Pannellum
						ref={panImage}
						width='100%'
						height='400px'
						image={scenesArray[currentScene].scenePanoImg + '?resize=800%2C600'}
						pitch={10}
						yaw={180}
						hfov={110}
						autoLoad
						showZoomCtrl={false}
						onMouseup={(event: any) => {
							setPitch(panImage.current?.getViewer().mouseEventToCoords(event)[0]);
							setYaw(panImage.current?.getViewer().mouseEventToCoords(event)[1]);
						}}>
						{scenesArray[currentScene].hotSpotsArr.map((hotSpot) => {
							return <Pannellum.Hotspot type='custom' pitch={hotSpot.pitch} yaw={hotSpot.yaw} tooltip={hotspotIcon} handleClick={(_evt: any, _name: any) => setCurrentScene(parseInt(hotSpot.transition))} name='image info' />;
						})}
					</Pannellum>
				</main>
				<aside className='flex flex-col min-h-fit max-w-fit'>
					<div className='bg-red-500'>{imgCoords}</div>
					<ImageMapper className={'w-dvw'} src={Image} width={width_window} onImageClick={(evt: { pageX: string; pageY: string }) => setImgCoords('' + evt.pageX + ', ' + evt.pageY)} onClick={(area: { name: string }) => setCurrentScene(parseInt(area.name))} map={map} />
				</aside>
			</section>
		</>
	);
}

export default TestBox;
