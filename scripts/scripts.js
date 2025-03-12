const loadCategoryButton = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayDataButton(data.categories));
};

const displayCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const selectedButton = document.querySelectorAll(
        "#category-container button"
      );
      for (const button of selectedButton) {
        button.classList.remove("bg-red-500", "text-white");
        document.getElementById('first-button').classList.remove('bg-red-500')
      }
      const clickedButton = document.getElementById(`button-${id}`);
      clickedButton.classList.add("bg-red-500", "text-white");
      document.getElementById('first-button').classList.add('bg-red-500', 'text-white')
      displayVideos(data.category);
    });
};

const displayDataButton = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  for (const categoryName of categories) {
    const { category, category_id } = categoryName;
    const categoryButton = document.createElement("button");
    categoryButton.addEventListener("click", function () {
      displayCategoryVideos(categoryName.category_id);
    });
    categoryButton.setAttribute("id", `button-${category_id}`);
    categoryButton.classList.add("btn", "btn-sm");
    categoryButton.innerText = category;
    categoryContainer.appendChild(categoryButton);
  }
};

const loadVideos = (search = '') => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
};

const loadVideoDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayVideoDetails(data);
    });
};

const displayVideoDetails = (details) => {
  console.log(details.video.title);
  document.getElementById("my_modal_2").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
      <div class="card bg-base-100 image-full shadow-sm">
      <figure>
        <img
          src="${details.video.thumbnail}" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${details.video.title}</h2>
        <p>${details.video.description}</p>
      </div>
    </div>
  `;
};

const displayVideos = (videosData) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videosData.length === 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full flex flex-col justify-center items-center">
        <img src="./images/Icon.png" alt="">
        <h1>Oops!! No Video Available</h1>
      </div>
    `;
  }

  videosData.forEach((video) => {
    const { thumbnail, title, authors, others } = video;
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="">
                <img
                src="${thumbnail}"
                alt="Shoes"
                class="rounded-xl w-full h-52 object-cover" />
            </figure>
                <div class="mt-5 flex gap-x-5">
                    <div>
                        <img class="w-10 h-10 p-[2px] object-cover rounded-full border border-gray-400" src="${authors[0].profile_picture}" alt="">
                    </div>
                    <div>
                        <h2 class="card-title">${title}</h2>
                        <div class="flex items-center gap-x-3">
                            <p class="text-gray-600">${authors[0].profile_name}</p>
                            ${authors[0].verified === true ? `<img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=yuCwxPX1Yonx&format=png&color=000000">` : `` }
                        </div>
                        <p>${others.views} views</p>
                    </div>
                </div>
                <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-wide w-full mt-6">Show Details</button>
            </div>
    </div>
        `;
    videoContainer.appendChild(videoCard);
  });
};

document.getElementById('search-input').addEventListener('keyup', (e) => {
  const searchValue = e.target.value;
  loadVideos(searchValue)
})

loadCategoryButton();
