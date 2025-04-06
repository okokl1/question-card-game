const words = ["He", "has", "finished", "his", "assignment", "."];
const container = document.getElementById("card-container");
const feedback = document.getElementById("feedback");

let draggableInstance;

function createCards(wordList) {
  container.innerHTML = "";
  wordList.forEach((word) => {
    const card = document.createElement("li");
    card.className = "card";
    card.textContent = word;
    container.appendChild(card);
  });

  // If draggable already exists, destroy it first to avoid duplicates
  if (draggableInstance) {
    draggableInstance.destroy();
  }

  draggableInstance = new Draggable.Sortable(container, {
    draggable: 'li',
    mirror: {
      constrainDimensions: true,
    }
  });

  draggableInstance.on('sortable:stop', () => {
    checkAnswer();
  });
}

function checkAnswer() {
  let current = [...container.children].map(c => c.textContent);

  let last = current[current.length - 1];
  if (last !== "?") {
    if (["has", "have", "is", "are", "did", "does", "do"].includes(current[0].toLowerCase())) {
      current[0] = capitalize(current[0]);
      current[1] = lowercase(current[1]);
      current[current.length - 1] = "?";
      current = current.map((w, i) => {
        if (i > 1) return lowercase(w);
        return w;
      });

      feedback.textContent = "✅ Great! You made a question!";

      // Replace card text only, do NOT recreate elements
      [...container.children].forEach((card, i) => {
        card.textContent = current[i];
      });
    } else {
      feedback.textContent = "";
    }
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function lowercase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

document.addEventListener("DOMContentLoaded", () => {
  createCards(words);
});
