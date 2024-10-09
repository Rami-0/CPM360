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

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.classList.add('bg-black');
    nameDiv.classList.add('text-white');
    nameDiv.classList.add('rounded-lg');
    nameDiv.classList.add('h-fit');

    const image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("width", "30");
    image.setAttribute("height", "30");
    image.setAttribute(
      "src",
      "https://img.icons8.com/material/4ac144/256/camera.png"
    );

    nameDiv.appendChild(image);

		// Set the name based on the index
		switch (index) {
			case '0':
				nameDiv.textContent = 'Холл';
				// image.setAttribute('src', hallway);
				break;
			case '1':
				nameDiv.textContent = 'Гардероб';
				// image.setAttribute('src', wardrobe);
				break;
			case '2':
				nameDiv.textContent = 'Ванная';
				// image.setAttribute('src', bathroom);
				break;
			case '3':
				nameDiv.textContent = 'Туалет';
				// image.setAttribute('src', toilet);
				break;
			case '4':
				nameDiv.textContent = 'Спальня';
				// image.setAttribute('src', bedroom);
				break;
			case '5':
				nameDiv.textContent = 'Кухня';
				// image.setAttribute('src', kitchen);
				break;
			case '6':
				nameDiv.textContent = 'Холл';
				// image.setAttribute('src', hallway);
				break;
			case '7':
				nameDiv.textContent = 'Коридор';
				// image.setAttribute('src', hallway);
				break;
			case '8':
				nameDiv.textContent = 'Гостиная';
				// image.setAttribute('src', livingRoom);
				break;
			case '9':
				nameDiv.textContent = 'Спальня';
				// image.setAttribute('src', bedroom);
				break;
			case '10':
				nameDiv.textContent = 'Балкон';
				// image.setAttribute('src', terrace);
				break;
			default:
				nameDiv.textContent = 'Unknown Location';
				// image.setAttribute('src', 'https://i.postimg.cc/cHDx7cdb/image.png');
				break;
		}
	
		// Append the nameDiv to the hotSpotDiv instead of the image
		hotSpotDiv.appendChild(nameDiv);
		
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
				<aside className='flex flex-col justify-top items-center bg-white h-dvh w-dvw pt-5'>
					<ImageMapper className={''} src={Image} width={width_window} onImageClick={(evt) => console.log(`${evt.pageX}, ${evt.pageY}`)} onClick={(area) => setCurrentScene(parseInt(area.name))} map={map} />
				</aside>
			</section>
		</>
	);
}

export default TestBox;
