console.log("fsociety");

const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url) // promises of response
    .then(res => res.json()) // promise o json data
    .then(data => displayLessons(data.data))
}
loadLessons();

const displayLessons = (lessons) => {
    console.log(lessons);
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
            <button id="lesson-btn-${lesson.level_no}"  class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;
        
        // 4. append into container
        levelContainer.append(btnDiv);
    });

}