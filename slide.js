// Definindo as variáveis globais
let count = 1;
const totalSlides = 3;
const slideInterval = 5000; // Tempo em milissegundos entre os slides (5 segundos)
let slideTimer;

// Função para iniciar o slideshow automaticamente
function startSlideShow() {
  slideTimer = setInterval(function() {
    nextSlide();
  }, slideInterval);
}

// Função para avançar para o próximo slide
function nextSlide() {
  count++;
  if (count > totalSlides) {
    count = 1;
  }
  updateSlide();
}

// Função para atualizar a visualização do slide
function updateSlide() {
  // Ocultar todos os slides primeiro
  const slides = document.querySelectorAll('.slide-box');
  slides.forEach(slide => {
    slide.style.opacity = 0;
    slide.style.zIndex = 0;
  });
  
  // Mostrar o slide atual
  const currentSlide = document.querySelector(count === 1 ? '.slide-box.primeiro' : 
                                           count === 2 ? '.slide-box:nth-of-type(2)' : 
                                           '.slide-box:nth-of-type(3)');
  if (currentSlide) {
    currentSlide.style.opacity = 1;
    currentSlide.style.zIndex = 1;
  }
  
  // Atualizar o radio button correspondente
  document.getElementById('radio' + count).checked = true;
}

// Função para ir para um slide específico quando os botões manuais são clicados
function goToSlide(slideNumber) {
  count = slideNumber;
  updateSlide();
  
  // Reiniciar o timer para evitar mudanças rápidas demais
  clearInterval(slideTimer);
  startSlideShow();
}

// Inicializar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Marcar o primeiro radio button automaticamente
  document.getElementById('radio1').checked = true;
  
  // Garantir que o primeiro slide esteja visível
  const firstSlide = document.querySelector('.slide-box.primeiro');
  if (firstSlide) {
    firstSlide.style.opacity = 1;
    firstSlide.style.zIndex = 1;
  }
  
  // Adicionar event listeners aos botões manuais
  const manualButtons = document.querySelectorAll('.manual-btn');
  for (let i = 0; i < manualButtons.length; i++) {
    manualButtons[i].addEventListener('click', function() {
      goToSlide(i + 1);
    });
  }
  
  // Iniciar o slideshow
  startSlideShow();
});