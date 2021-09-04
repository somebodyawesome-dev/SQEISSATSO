var reponses = [];
var commentaires = [];
var niveau = [];
var formulaires = [];
var matieres = [];
const modalContainer = document.getElementById("modalContainer");
modalContainer.style.display = "none";
const closeBtn = document.getElementById("closeBtn");
const getNextNode = (ele) => {
  let next = ele.nextSibling;
  while (next && next.nodeType !== 1) {
    next = next.nextSibling;
  }
  return next;
};
const showResponse = (ele) => {
  const responseContainer = getNextNode(ele);
  if (!responseContainer) return;
  responseContainer.style.display =
    responseContainer.style.display === "none" ? "block" : "none";
};

const getCommentaireByReponse = (repId) => {
  console.log(repId);
  let result = [];
  for (const comm of commentaires) {
    if (repId === comm.reponse) {
      result.push(comm);
    }
  }
  return result;
};
const setComment = (comments = []) => {
  const commentsContainer = document.getElementById("commentsContainer");
  commentsContainer.innerHTML = "";
  for (const comm of comments) {
    commentsContainer.innerHTML += ` <div class="comment">
    <h2 class="contant" ><span class="title">concernat:</span> ${comm.sujet}/${comm.relatedTo}</h2>
    <h2 class="contant" ><span class="title">note:</span> ${comm.note}/5</h2>
    <h2 class="contant" ><span class="title">commentaire:</span>${comm.commentaire}</h2>
  </div>`;
  }
  modalContainer.style.display = "flex";
};
const getHTMLforRep = (id) => {
  let matiere = matieres.filter((ele) => {
    return ele.niveau === id;
  });

  let result = "";
  for (const mat of matiere) {
    result += `<h2 >${mat.nomMatiere} :${getAverage(mat.nomMatiere)}</h2>`;
  }
  return result;
};
const getAverage = (id) => {
  const comment = commentaires.filter((ele) => {
    return ele.sujet === "matiere" && id === ele.relatedTo;
  });
  return comment.length === 0
    ? "not rated yet"
    : (
        comment.reduce((a, b) => a + parseInt(b.note), 0) / comment.length
      ).toString() + "/5";
};
const getInfos = async () => {
  try {
    const response = await fetch("/getStats", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      reponses = data.reponses;
      commentaires = data.commentaires;
      niveau = data.niveau;
      formulaires = data.formulaires;
      matieres = data.matieres;
      let itemsContainer = document.getElementById("itemContainer");
      itemsContainer.innerHTML = "";
      for (const niv of niveau) {
        itemsContainer.innerHTML += `<div class="item">
        <div class="niv" onclick="showResponse(this)">
          <h2>${niv.id}</h2>
        </div>
        <div class="item response" style="display: none">
          ${getHTMLforRep(niv.id)}
        </div>
      </div>`;
      }
    } else {
      console.log(await reponse.text());
    }
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await getInfos();
})();

//events

closeBtn.onclick = () => {
  console.log("qweqew");
  modalContainer.style.display = "none";
};
