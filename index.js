import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Definições básicas de tamanho da janela
const width = window.innerWidth;
const height = window.innerHeight;

// Criação do renderizador WebGL com suavização de bordas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height); // Define o tamanho do renderizador conforme a janela
document.body.appendChild(renderer.domElement); // Adiciona o canvas do renderizador no corpo do documento

// Configuração da câmera (perspectiva)
const fov = 75; // Campo de visão em graus
const aspect = width / height; // Proporção da tela (largura / altura)
const near = 0.1; // Distância mínima para objetos visíveis
const far = 10; // Distância máxima para objetos visíveis
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 8; // Posição inicial da câmera no eixo Z

// Criação da cena
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);

// Geometria e material do objeto principal (Icosaedro)
const geometry = new THREE.IcosahedronGeometry(1.0, 2); // Icosaedro com subdivisão
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff, // Cor branca
  flatShading: true, // Habilita sombreamento plano
});

// Criação do mesh principal (geometria + material) e adição à cena
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Material para o wireframe (malha de contorno)
const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff, // Cor branca para o wireframe
  wireframe: true, // Ativa o modo wireframe
});

// Criação do mesh de wireframe e escala ligeiramente maior para envolver o objeto principal
const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
wireframeMesh.scale.setScalar(1.001); // Aumenta um pouco a escala para encaixar no objeto
mesh.add(wireframeMesh); // Adiciona o wireframe ao mesh principal

// Adiciona iluminação à cena
const hemisphereLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500, 1); // Luz ambiente suave
scene.add(hemisphereLight);

// Função de animação
function animate(time = 0) {
  requestAnimationFrame(animate); // Chama a próxima animação
  //mesh.rotation.y = time * 0.0001; // Rotaciona o mesh ao longo do eixo Y
  renderer.render(scene, camera); // Renderiza a cena com a câmera
}

// Inicia a animação
animate();
