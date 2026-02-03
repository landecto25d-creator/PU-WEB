let scores = {
    analisis: 0,
    kreatif: 0,
    praktik: 0,
    sosial: 0
};

let historyStack = [];

let availableQuestions = ['q2', 'q3', 'q4', 'q5'];

let currentQuestionId = 'q1';

document.addEventListener('DOMContentLoaded', () => {
    showQuestion('q1');
    updateBackIconVisibility();
});

function showQuestion(id) {
    // Height handled by CSS min-height: 100vh
    const mainContainer = document.querySelector('.main');
    if (mainContainer) mainContainer.style.height = ''; // Clear manual height

    const allQuestions = document.querySelectorAll('.question-container');
    allQuestions.forEach(q => q.style.display = 'none');

    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'block';
        currentQuestionId = id;
    }
}

function selectAnswer(questionNum, answerChar, a, k, p, s) {
    const points = { analisis: a, kreatif: k, praktik: p, sosial: s };
    
    scores.analisis += points.analisis;
    scores.kreatif += points.kreatif;
    scores.praktik += points.praktik;
    scores.sosial += points.sosial;
    
    console.log("Scores updated:", scores);

    historyStack.push({
        questionId: currentQuestionId,
        points: points
    });
    if (availableQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const nextId = availableQuestions[randomIndex];
        
        availableQuestions.splice(randomIndex, 1);
        
        showQuestion(nextId);
    } else {
        showResult();
    }
    
    updateBackIconVisibility();
}

function handleBack(e) {
    e.preventDefault();
    
    if (historyStack.length === 0) {
        window.location.href = 'index.html';
        return;
    }
    const lastAction = historyStack.pop();
    
    scores.analisis -= lastAction.points.analisis;
    scores.kreatif -= lastAction.points.kreatif;
    scores.praktik -= lastAction.points.praktik;
    scores.sosial -= lastAction.points.sosial;
    
    console.log("Rollback scores:", scores);

    if (currentQuestionId !== 'result') {
        if (currentQuestionId !== 'result') {
            availableQuestions.push(currentQuestionId);
        if (currentQuestionId !== 'result') {
            availableQuestions.push(currentQuestionId);
        }
    }
    
    showQuestion(lastAction.questionId);
    updateBackIconVisibility();
}
}

const resultDetails = {
    analisis: {
        title: "Si Analitis",
        desc: "Kamu suka memecahkan masalah dengan logika dan data.",
        jurusan: [
            "Teknik Informatika",
            "Matematika",
            "Statistika",
            "Data Science",
            "Teknik Industri"
        ],
        karir: [
            "Software Engineer",
            "Data Scientist",
            "System Analyst",
            "Quant Analyst",
            "AI Engineer"
        ],
        skill: [
            "Programming",
            "Algoritma",
            "Logic & Math",
            "Problem Solving"
        ]
    },
    kreatif: {
        title: "The Creator (Si Kreatif)",
        desc: "Punya imajinasi tinggi dan suka berkarya!",
        jurusan: [
            "Desain Komunikasi Visual (DKV)",
            "Arsitektur",
            "Film & Broadcasting",
            "Seni Rupa",
            "Creative Writing"
        ],
        karir: [
            "UI/UX Designer",
            "Content Creator",
            "Art Director",
            "Animator",
            "Arsitek"
        ],
        skill: [
            "Adobe Creative Suite",
            "Storytelling",
            "Tren & Estetika",
            "Portfolio Building"
        ]
    },
    sosial: {
        title: "Si Sosial",
        desc: "Kamu jago berinteraksi dan memahami orang lain.",
        jurusan: [
            "Psikologi",
            "Ilmu Komunikasi",
            "Hubungan Internasional",
            "Manajemen",
            "Hukum"
        ],
        karir: [
            "HR Manager",
            "Marketing Manager",
            "Public Relations",
            "Psikolog",
            "Diplomat"
        ],
        skill: [
            "Communication",
            "Empathy",
            "Leadership",
            "Negotiation"
        ]
    },
    praktik: {
        title: "Si Praktis",
        desc: "Kamu suka hal yang nyata dan langsung bisa diterapkan.",
        jurusan: [
            "Teknik Mesin",
            "Teknik Elektro",
            "Teknik Sipil",
            "Kedokteran",
            "Farmasi"
        ],
        karir: [
            "Mechanical Engineer",
            "Project Manager",
            "Dokter",
            "Product Manager",
            "Operations Manager"
        ],
        skill: [
            "Technical Skills",
            "Project Management",
            "Quality Control",
            "Hands-on Work"
        ]
    }
};

function showResult() {
    
    const mainContainer = document.querySelector('.main');
    if (mainContainer) mainContainer.style.height = ''; 

    const allQuestions = document.querySelectorAll('.question-container');
    allQuestions.forEach(q => q.style.display = 'none');
    
    const resDiv = document.getElementById('result');
    if (resDiv) {
        resDiv.style.display = 'block';
        currentQuestionId = 'result';
        
        const maxScore = Math.max(scores.analisis, scores.kreatif, scores.praktik, scores.sosial);
        
        let dominantKey = 'sosial'; 
        if (scores.analisis === maxScore) dominantKey = 'analisis';
        else if (scores.kreatif === maxScore) dominantKey = 'kreatif';
        else if (scores.praktik === maxScore) dominantKey = 'praktik';
        else if (scores.sosial === maxScore) dominantKey = 'sosial';
        
        const resultData = resultDetails[dominantKey];
        
        const display = document.getElementById('score-display');
        display.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h2 style="font-size: 28px; margin-bottom: 10px;">${resultData.title}</h2>
                <p>${resultData.desc}</p>
            </div>

            <div style="text-align: left; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                <strong>📚 Jurusan yang Direkomendasikan:</strong>
                <ul style="margin-top: 5px; margin-bottom: 15px; padding-left: 20px;">
                    ${resultData.jurusan.map(item => `<li>${item}</li>`).join('')}
                </ul>

                <strong>💼 Karir Potensial:</strong>
                <ul style="margin-top: 5px; margin-bottom: 15px; padding-left: 20px;">
                    ${resultData.karir.map(item => `<li>${item}</li>`).join('')}
                </ul>

                <strong>🛠 Skill yang Dibutuhkan:</strong>
                <ul style="margin-top: 5px; margin-bottom: 0px; padding-left: 20px;">
                    ${resultData.skill.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <p style="font-size: 12px; opacity: 0.7;">
                Skor Akhir: Analisis:${scores.analisis}, Kreatif:${scores.kreatif}, Praktik:${scores.praktik}, Sosial:${scores.sosial}
            </p>
        `;
    }
}

function updateBackIconVisibility() {
    const btnVec = document.querySelector('.btn-back svg'); 
}
