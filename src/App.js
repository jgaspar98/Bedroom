import './App.scss';
import React, { useRef } from 'react';

//Components
import Header from "./components/header";
import {Section} from './components/section';

// Imports
import { Canvas, useFrame } from 'react-three-fiber';
import { Html, useGLTF, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
//!Suspense is needed in order to load the model and then open the page

//Import of the Model Downloaded
const Model = () => {
  const gltf = useGLTF('/scene.gltf', true)
  return <primitive object={gltf.scene} dispose={null} />;
};

//Set the Light of the Canvas
const Light = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight position={[1000,0,0]} intensity={1} />
    </>
  )
}

//HTML of the page
const HTML = () => {
  return (
    <>
      <Html fullscreen>
          <div className='container'>
            <h1 className='title'>Welcome to my room</h1>
          </div>
        </Html>
    </>
  )
}

// Sets the Model on the Page and defines the Scale
//! Section Tag is a component used to set diferent models in my case not used
//! Just used to position on the page
const ModelImport = () => {
  const ref = useRef();
  useFrame(()=> (ref.current.rotation.y += 0.01)) 
  return (
    <>
        <Section
          factor={1.5}
          offset={1}
        >
          <group ref={ref}  position={[0,52,0]}>
            <mesh  scale={[0.015,0.015,0.015]} position={[0,-35,0]}>
              <Model/>
            </mesh>
        </group>
      </Section>
      <OrbitControls/>
      </>
  );
};

function App() {
  return (
    <>
      <Header />
      <Canvas
        colorManagement
        camera={{ positon: [0, 0, 120], fov: 102}}
      >
        <Light/>
        <Suspense fallback={null}>
          <HTML/>
          <ModelImport />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
