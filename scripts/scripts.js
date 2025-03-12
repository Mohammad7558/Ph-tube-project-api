const loadCategoryButton = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayDataButton(data.categories));
};

const displayDataButton = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  for (const categoryName of categories) {
    const { category } = categoryName;
    const categoryButton = document.createElement("button");
    categoryButton.classList.add("btn", "btn-sm");
    categoryButton.innerText = category;
    categoryContainer.appendChild(categoryButton);
  }
};

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data));
};

const displayVideos = (videosData) => {
  const videoContainer = document.getElementById("video-container");
  const videos = videosData.videos;
  videos.forEach((video) => {
    const authorProfile = video?.authors[0]?.profile_picture;
    const authorName = video?.authors[0]?.profile_name;
    const views = video?.others?.views;
    const { title, thumbnail } = video;
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
                        <img class="w-10 h-10 p-[2px] object-cover rounded-full border border-gray-400" src="${authorProfile}" alt="">
                    </div>
                    <div>
                        <h2 class="card-title">${title}</h2>
                        <div class="flex items-center gap-x-3">
                            <p class="text-gray-600">${authorName}</p>
                            <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=yuCwxPX1Yonx&format=png&color=000000"> 
                        </div>
                        <p>${views} views</p>
                    </div>
                
                </div>
            </div>
    </div>
        `;
    videoContainer.appendChild(videoCard);
  });
};

loadCategoryButton();
loadVideos();