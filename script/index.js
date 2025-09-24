console.log("fsociety");

const manageSpinner = (status) => {
    if (status  === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}

const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url) // promises of response
    .then(res => res.json()) // promise o json data
    .then(data => displayLessons(data.data))
}

const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach(btn => {
        btn.classList.remove("active")
    });
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive(); // remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active"); // add active class
        displayLevelWords(data?.data)});
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const response = await fetch(url);
    const detail = await response.json();
    displayWordDetail(detail.data);
    
}

const displayWordDetail = wordDetail => {
    const detailsBox = document.getElementById("detail-container");
    /*
        {
            "word": "Eager",
            "meaning": "আগ্রহী",
            "pronunciation": "ইগার",
            "level": 1,
            "sentence": "The kids were eager to open their gifts.",
            "points": 1,
            "partsOfSpeech": "adjective",
            "synonyms": [
                "enthusiastic",
                "excited",
                "keen"
            ],
            "id": 5
        }
    */ 
    const synonymsHTML = wordDetail?.synonyms?.length ? wordDetail.synonyms.map(syn => `<span class="btn">${syn}</span>`).join(" ") : `<span class="text-gray-500">No synonyms found</span>`;

    detailsBox.innerHTML = `
        <div>
            <h2 class="text-3xl font-semibold">${wordDetail.word} (<i class="fa-solid fa-microphone-lines"></i> : ${wordDetail.pronunciation})</h2>
        </div>
        <div>
            <h3 class="text-2xl font-semibold">Meaning</h3>
            <p class="text-2xl font-medium font-bangla">${wordDetail.meaning}</p>
        </div>
        <div>
            <h3 class="text-2xl font-semibold">Example</h3>
            <p class="text-2xl">${wordDetail.sentence}</p>
        </div>
        <div>
            <h3 class="text-2xl font-medium font-bangla">সমার্থক শব্দ গুলো</h3>
        </div>
        <div>
            <h2 class="font-bold">Synonym</h2>
            <div>${synonymsHTML}</div>
            
        </div>
    `
    document.getElementById("word_modal").showModal();
}

const displayLevelWords = words => {
    // 1. get the container & empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (!words || words.length == 0) {
        wordContainer.innerHTML = `
            <div class="text-center bg-sky-100 col-span-full py-10 px-6 space-y-6 rounded-xl text-lg font-semibold font-bangla">
                <img class="mx-auto" src="././assets/alert-error.png" alt="">
                <p class="text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
                <h2 class="font-bold text-4xl mt-3">নেক্সট Lesson এ যান</h2>
            </div>
        `;
        manageSpinner(false);
        return;
    }

    // 2. get into every words
    words.forEach((word) => {
        // 3. create Element
        const cardDiv = document.createElement("div");
        /*
            {
                "id": 2,
                "level": 6,
                "word": "Benevolent",
                "meaning": "দয়ালু",
                "pronunciation": "বেনেভোলেন্ট"
            }
        */ 
        cardDiv.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-6 font-bangla">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold">Meaning / Pronunciation</p>
                <p class="text-2xl font-medium font-bangla">
                    ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}
                </p> 
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>
        `;

        // 4. append into container
        wordContainer.append(cardDiv);
    });
    manageSpinner(false);
}

const displayLessons = (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. get into every lessons
    lessons.forEach(lesson => {
        // 3. create Element
        const btnDiv = document.createElement("div");
        /*
            {
                "id": 101,
                "level_no": 1,
                "lessonName": "Basic Vocabulary"
            }
        */ 
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;

        // 4. append into container
        levelContainer.append(btnDiv);
    });

};

loadLessons();