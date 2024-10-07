import Image from '../assets/img.png';
import scenesArray from './ScenesArray';
import { Pannellum } from 'pannellum-react';
import React, { useState, useRef } from 'react';
import ImageMapper from 'react-image-mapper';

function TestBox() {
	const [currentScene, setCurrentScene] = useState(0);
	const [yaw, setYaw] = useState(0);
	const [pitch, setPitch] = useState(0);
	const panImage = useRef(null);

	const hotspotIcon = (hotSpotDiv) => {
		const image = document.createElement('img');
		image.classList.add('image');
		image.setAttribute('width', '30');
		image.setAttribute('height', '30');
		image.setAttribute('src', 'https://i.postimg.cc/cHDx7cdb/image.png');
		hotSpotDiv.appendChild(image);
	};

	const map = {
		name: 'my-map',
		areas: [
			{ name: '0', shape: 'circle', coords: [205, 220, 7], preFillColor: 'blue' },
			{ name: '1', shape: 'circle', coords: [280, 220, 7], preFillColor: 'blue' },
			{ name: '2', shape: 'circle', coords: [280, 185, 7], preFillColor: 'blue' },
			{ name: '3', shape: 'circle', coords: [280, 155, 7], preFillColor: 'blue' },
			{ name: '4', shape: 'circle', coords: [270, 75, 7], preFillColor: 'blue' },
			{ name: '5', shape: 'circle', coords: [210, 80, 7], preFillColor: 'blue' },
			{ name: '6', shape: 'circle', coords: [220, 160, 7], preFillColor: 'blue' },
			{ name: '7', shape: 'circle', coords: [175, 135, 7], preFillColor: 'blue' },
			{ name: '8', shape: 'circle', coords: [90, 110, 7], preFillColor: 'blue' },
			{ name: '9', shape: 'circle', coords: [160, 75, 7], preFillColor: 'blue' },
			{ name: '10', shape: 'circle', coords: [217, 25, 7], preFillColor: 'blue' },
		],
	};

	const width_window = 350;

	return (
		<>
			<section className='flex flex-col h-dvh'>
				<main>
					{/* <span>
						pitch: {pitch}, yaw: {yaw}, transition: "0"
					</span> */}
					<Pannellum
						ref={panImage}
						width='100%'
						height='500px'
						image={scenesArray[currentScene].scenePanoImg + '?resize=800%2C600'}
						pitch={10}
						yaw={380}
						hfov={80}
						showControls={true}
						autoLoad
						autoRotate={6} // it might cuase an error.
						showZoomCtrl={false}
						orientationOnByDefault={true}
						onMouseup={(event) => {
							setPitch(panImage.current.getViewer().mouseEventToCoords(event)[0]);
							setYaw(panImage.current.getViewer().mouseEventToCoords(event)[1]);
						}}>
						{scenesArray[currentScene].hotSpotsArr.map((hotSpot, index) => {
							return (
								<Pannellum.Hotspot
									key={`hs${index}`}
									type="custom"
									pitch={hotSpot.pitch}
									yaw={hotSpot.yaw}
									tooltip={hotspotIcon}
									handleClick={(evt, name) =>
										setCurrentScene(Number(hotSpot.transition))
									}
									name={`hs${index}`}
								/>
							)
						})}
					</Pannellum>
				</main>
				<aside className='flex flex-col justify-center items-center bg-white h-dvh w-dvw'>
					<ImageMapper className={''} src={Image} width={width_window} onImageClick={(evt) => console.log(`${evt.pageX}, ${evt.pageY}`)} onClick={(area) => setCurrentScene(parseInt(area.name))} map={map} />
				</aside>
			</section>
		</>
	);
}

export default TestBox;
