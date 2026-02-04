let scores = {
    analisis: 0,
    kreatif: 0,
    praktik: 0,
    sosial: 0
};

let historyStack = [];

let availableQuestions = ['q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];

let currentQuestionId = 'q1';

    // We don't auto-show currentQuestionId on load anymore, waiting for startQuiz
    // showQuestion('q1'); // Removed
    // updateBackIconVisibility(); // Removed

function startQuiz() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    
    // Reset state if needed (though reload usually clears it, this helps if we don't reload)
    // For now we assume clean slate or simple reset
    
    showQuestion('q1');
}

function showQuestion(id) {

    const mainContainer = document.querySelector('.main');
    if (mainContainer) mainContainer.style.height = ''; 

    const allQuestions = document.querySelectorAll('.question-container');
    allQuestions.forEach(q => q.style.display = 'none');

    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'block';
        currentQuestionId = id;
    }
    
    // Progress Bar Logic
    const progressContainer = document.getElementById('progress-container');
    const backBtn = document.querySelector('.btn-back');
    
    if (id === 'result') {
        if (progressContainer) progressContainer.style.display = 'none';
        if (backBtn) backBtn.style.display = 'none'; // Hide back button on result
    } else {
        if (progressContainer) progressContainer.style.display = 'block';
        if (backBtn) backBtn.style.display = 'flex'; // Show back button on questions
        updateProgressBar();
    }
}

function updateProgressBar() {
    const allQs = 10; // Total questions hardcoded as per requirement (5 initial + 5 added)
    // Calculate current question number: 1 (initial) + history size
    let currentNum = historyStack.length + 1;
    if (currentNum > allQs) currentNum = allQs;

    const barInner = document.getElementById('progress-bar-inner');
    const textLabel = document.getElementById('progress-text');
    
    if (barInner) {
        barInner.innerHTML = '';
        for (let i = 1; i <= allQs; i++) {
            const seg = document.createElement('div');
            seg.style.flex = '1';
            seg.style.height = '4px';
            seg.style.borderRadius = '2px';
            seg.style.transition = 'all 0.3s ease';
            
            if (i === currentNum) {
                // Active Question: Glowing/Lit
                seg.style.background = '#ffffff';
                seg.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
                seg.style.opacity = '1';
            } else if (i < currentNum) {
                // Past Questions: Semi-lit/completed
                seg.style.background = 'rgba(255, 255, 255, 0.5)';
                seg.style.boxShadow = 'none';
            } else {
                // Future Questions: Darker/Idle
                seg.style.background = 'rgba(255, 255, 255, 0.1)';
                seg.style.boxShadow = 'none';
            }
            barInner.appendChild(seg);
        }
    }
    
    if (textLabel) textLabel.innerText = `Soal ${currentNum} dari ${allQs}`;
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
    
    // updateBackIconVisibility(); // Removed as irrelevant? No, logic moved to showQuestion
}

function handleBack(e) {
    e.preventDefault();
    
    if (historyStack.length === 0) {
        // Go back to landing page
        document.getElementById('landing-page').style.display = 'block';
        document.getElementById('quiz-page').style.display = 'none';
        
        // Optional: Reset scores specifically if they want to ensure no residue, 
        // though logically if we're at stack 0, we haven't answered anything yet 
        // OR we just undid the first answer?
        // Actually if stack is 0, we are at Q1. User hasn't answered Q1 yet (or just undid it).
        // So scores should be 0.
        return;
    }
    const lastAction = historyStack.pop();
    
    scores.analisis -= lastAction.points.analisis;
    scores.kreatif -= lastAction.points.kreatif;
    scores.praktik -= lastAction.points.praktik;
    scores.sosial -= lastAction.points.sosial;
    
    console.log("Rollback scores:", scores);

    // Push back the current question to available if it wasn't the result page
    if (currentQuestionId !== 'result') {
         availableQuestions.push(currentQuestionId);
    }
    
    showQuestion(lastAction.questionId);
    // updateBackIconVisibility();
}

function updateBackIconVisibility() {
    // Deprecated/integrated into showQuestion
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
    
    // Hide Progress Bar and Back Button
    const progressContainer = document.getElementById('progress-container');
    if (progressContainer) progressContainer.style.display = 'none';
    const backBtn = document.querySelector('.btn-back');
    if (backBtn) backBtn.style.display = 'none';

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
            <div class="mb-3">
                <h2 style="font-size: 24px; margin-bottom: 5px;">${resultData.title}</h2>
                <p style="font-size: 14px; margin-bottom: 0;">${resultData.desc}</p>
            </div>

            <div class="text-start" style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 10px; margin-bottom: 10px;">
                <div class="row g-2">
                    <div class="col-6">
                        <strong style="font-size: 13px;">📚 Jurusan:</strong>
                        <ul style="margin: 0; padding-left: 15px; font-size: 12px;">
                            ${resultData.jurusan.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="col-6">
                        <strong style="font-size: 13px;">💼 Karir:</strong>
                        <ul style="margin: 0; padding-left: 15px; font-size: 12px;">
                            ${resultData.karir.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="mt-2">
                    <strong style="font-size: 13px;">🛠 Skill:</strong>
                    <div style="font-size: 12px; margin-top: 2px;">
                        ${resultData.skill.map(item => `<span class="badge bg-light text-dark bg-opacity-75 me-1" style="font-weight: normal;">${item}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <p style="font-size: 10px; opacity: 0.6; margin: 0;">
                Skor: Analisis:${scores.analisis} Kreatif:${scores.kreatif} Praktik:${scores.praktik} Sosial:${scores.sosial}
            </p>
        `;
    }
}

function updateBackIconVisibility() {
    const btnVec = document.querySelector('.btn-back svg'); 
}
