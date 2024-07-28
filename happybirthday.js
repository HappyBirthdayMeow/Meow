document.addEventListener('DOMContentLoaded', () => {
    const lines = [
      "Abe Oyeeee...",
      "I guess it's somebody's birthday today...",
      "Oh yes, it's the birthday of a very special person.",
      "Ha Ha I know this might be too much,",
      "over the top, that I spent time making a website",
      "which doesn't even look good.",
      "But I wanna say that I really love you.",
      "Oops...",
      "To the point:",
      "Happy Birthday, my cutie patootie Meonkeeeeee!",
      "You are an amazing person and I love you.",
      "Every day you make me happy.",
      "I want you to be happy forever.",
      "",
      "Wanna see my smol sa bandhar?...",
      "Wait a sec...",
      "I'll show you...",
      "Just a moment...",
      "Here it is...",
      "3...",
      "2...",
      "1...",
    ];
  
    let currentIndex = 0;
    const fadeInText = document.getElementById('fadeInText');
    const photoContainer = document.getElementById('photo-container');
  
    function showNextLine() {
      if (currentIndex < lines.length) {
        fadeInText.textContent = lines[currentIndex];
        fadeInText.style.opacity = 1;
        setTimeout(() => {
          fadeInText.style.opacity = 0;
          setTimeout(showNextLine, 2000);
        }, 4000);
        currentIndex++;
      } else {
        fadeInText.classList.add('hidden');
        photoContainer.classList.remove('hidden');
        photoContainer.style.opacity = 1;
      }
    }
  
    showNextLine();
  });
  