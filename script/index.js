console.log("fsociety");

const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url) // promises of response
    .then(res => res.json()) // promise o json data
    .then(data => displayLessons(data.data))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWords(data.data))
}

const displayLevelWords = words => {
    // 1. get the container & empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

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
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold">Meaning / Pronunciation</p>
                <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}"</div> 
                <div class="flex justify-between items-center">
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>
        `;
        wordContainer.append(cardDiv);
    });
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