import Image from '../assets/img.png';
import scenesArray from './ScenesArray';
import { Pannellum } from 'pannellum-react';
import React, { useState, useRef } from 'react';
import ImageMapper from 'react-image-mapper';

import bathroom from '../assets/bathroom.png';
import bedroom from '../assets/bedroom.png';
import hallway from '../assets/hallway.png';
import kitchen from '../assets/kitchen.png';
import livingRoom from '../assets/livingroom.png';
import terrace from '../assets/terrace.png';
import toilet from '../assets/toilet.png';
import wardrobe from '../assets/wardrobe.png';
// import bathroom from '../assets/bathroom.png';

function TestBox() {
	const [currentScene, setCurrentScene] = useState(0);
	const [yaw, setYaw] = useState(0);
	const [pitch, setPitch] = useState(0);
	const panImage = useRef(null);

	const hotspotIcon = (hotSpotDiv, index) => {
		const image = document.createElement('img');
		image.classList.add('image');
		image.setAttribute('width', '40');
		image.setAttribute('height', '40');
		switch (index) {
			case '0':
				image.setAttribute('src', hallway);
				break;
			case '1':
				image.setAttribute('src', wardrobe);
				break;
			case '2':
				image.setAttribute('src', bathroom);
				break;
			case '3':
				image.setAttribute('src', toilet);
				break;
			case '4':
				image.setAttribute('src', bedroom);
				break;
			case '5':
				image.setAttribute('src', kitchen);
				break;
			case '6':
				image.setAttribute('src', hallway);
				break;
			case '7':
				image.setAttribute('src', hallway);
				break;
			case '8':
				image.setAttribute('src', livingRoom);
				break;
			case '9':
				image.setAttribute('src', bedroom);
				break;
			case '10':
				image.setAttribute('src', terrace);
				break;
			default:
				image.setAttribute('src', 'https://i.postimg.cc/cHDx7cdb/image.png');
				break;
		}
		hotSpotDiv.appendChild(image);
		// Example of using the index: you can customize the image or any other behavior based on the index
		console.log(`Hotspot index: ${index}`);
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
									type={`${hotSpot.type}`}
									pitch={hotSpot.pitch}
									yaw={hotSpot.yaw}
									tooltip={(hotSpotDiv) => hotspotIcon(hotSpotDiv, hotSpot.transition)} // Pass the index here
									handleClick={(evt, name) => setCurrentScene(Number(hotSpot.transition))}
									name={`hs${index}`}
									text={hotSpot.text}
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
