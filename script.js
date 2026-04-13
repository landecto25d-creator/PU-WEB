let scores = {
    analisis: 0,
    kreatif: 0,
    praktik: 0,
    sosial: 0
};

let historyStack = [];

let availableQuestions = ['q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];

let currentQuestionId = 'q1';
let currentLang = 'id'; // Default

const translations = {
    id: {
        landing: {
            how_title: "Cara Main",
            step1: "1. Kamu akan menghadapi 10 situasi kehidupan nyata",
            step2: "2. Pilih respons yang paling natural buat kamu",
            step3: "3. Dapatkan profil personality + rekomendasi jurusan & karir yang cocok!",
            start: "MULAI"
        },
        progress: "Soal {current} dari {total}",
        result: {
            title_prefix: "",
            jurusan_label: "📚 Jurusan:",
            karir_label: "💼 Karir:",
            skill_label: "🛠 Skill:",
            back_home: "Kembali ke Halaman Depan",
            score_label: "Skor",
            categories: {
                analisis: "Analisis",
                kreatif: "Kreatif",
                praktik: "Praktik",
                sosial: "Sosial"
            }
        },
        questions: {
            q1: {
                title: "Hackathon Malam",
                desc: "Kamu dan tim punya 24 jam untuk bikin aplikasi!",
                a: "Menjadi lead programmer",
                b: "Desain UI/UX nya",
                c: "Presentasi ke juri",
                d: "Mengatur strategi tim"
            },
            q2: {
                title: "Project Film Sekolah",
                desc: "Tugas kelompok bikin short movie, kamu pilih jadi apa?",
                a: "Sutradara & konsep cerita",
                b: "Aktor/aktris utama",
                c: "Editor & efek visual",
                d: "Produser & logistik"
            },
            q3: {
                title: "Eksperimen Lab Gagal",
                desc: "Percobaan kimia kamu tidak sesuai teori. Apa yang kamu lakukan?",
                a: "Menganalisis ulang data & variabel",
                b: "Mencari metode alternatif kreatif",
                c: "Berdiskusi dengan guru & teman",
                d: "Mencoba lagi dengan lebih teliti"
            },
            q4: {
                title: "Startup Kantin Sekolah",
                desc: "Kamu mau buka usaha jajanan. Fokus ke mana?",
                a: "Melakukan riset pasar & hitung untung",
                b: "Membuat branding & packaging keren",
                c: "Marketing & promosi ke teman",
                d: "Optimasi produksi & kualitas"
            },
            q5: {
                title: "Proyek Lingkungan",
                desc: "Kampanye peduli lingkungan di sekolah, peran kamu?",
                a: "Membuat poster & konten sosmed",
                b: "Riset data sampah & solusi",
                c: "Koordinasi relawan & event",
                d: "Implementasi sistem daur ulang"
            },
            q6: {
                title: "Tim E-Sports Sekolah",
                desc: "Sekolah mau ikut kompetisi e-sports. Kamu kontribusi di mana?",
                a: "Menjadi strategi coach & analisis lawan",
                b: "Desain logo & jersey tim",
                c: "Menjadi kapten & motivator tim",
                d: "Mengatur jadwal latihan & logistik"
            },
            q7: {
                title: "Aplikasi Solusi Sekolah",
                desc: "Kamu punya ide bikin aplikasi untuk mempermudah siswa. Fokus kamu ke mana?",
                a: "Coding & develop fitur-fiturnya",
                b: "Melakukan riset kebutuhan user & survey",
                c: "Desain interface yang user-friendly",
                d: "Membuat materi untuk presentasi"
            },
            q8: {
                title: "Acara Donor Darah",
                desc: "OSIS mengadakan donor darah. Peran kamu yang paling sesuai?",
                a: "Koordinasi PMI & atur rundown acara",
                b: "Membuat kampanye & ajak teman-teman",
                c: "Desain poster & konten promosi",
                d: "Mencatat data & kelola database pendonor"
            },
            q9: {
                title: "Festival Budaya Sekolah",
                desc: "Sekolah mengadakan festival budaya. Kamu mau berkontribusi sebagai apa?",
                a: "Koreografer tari tradisional",
                b: "MC & pembawa acara",
                c: "Manage panggung & sound system",
                d: "Dokumentasi foto & video"
            },
            q10: {
                title: "Lomba Inovasi Teknologi",
                desc: "Kamu ikut lomba cipta inovasi teknologi untuk memecahkan masalah sosial.",
                a: "Melakukan riset masalah & kumpulkan data lapangan",
                b: "Bikin prototype & testing produk",
                c: "Desain packaging & branding produk",
                d: "Presentasi & menyampaikan ide ke investor"
            }
        },
        result_details: {
            analisis: {
                title: "Si Analitis",
                desc: "Kamu suka memecahkan masalah dengan logika dan data.",
                jurusan: ["Teknik Informatika", "Matematika", "Statistika", "Data Science", "Teknik Industri"],
                karir: ["Software Engineer", "Data Scientist", "System Analyst", "Quant Analyst", "AI Engineer"],
                skill: ["Programming", "Algoritma", "Logic & Math", "Problem Solving"]
            },
            kreatif: {
                title: "The Creator (Si Kreatif)",
                desc: "Punya imajinasi tinggi dan suka berkarya!",
                jurusan: ["Desain Komunikasi Visual (DKV)", "Arsitektur", "Film & Broadcasting", "Seni Rupa", "Creative Writing"],
                karir: ["UI/UX Designer", "Content Creator", "Art Director", "Animator", "Arsitek"],
                skill: ["Adobe Creative Suite", "Storytelling", "Tren & Estetika", "Portfolio Building"]
            },
            sosial: {
                title: "Si Sosial",
                desc: "Kamu jago berinteraksi dan memahami orang lain.",
                jurusan: ["Psikologi", "Ilmu Komunikasi", "Hubungan Internasional", "Manajemen", "Hukum"],
                karir: ["HR Manager", "Marketing Manager", "Public Relations", "Psikolog", "Diplomat"],
                skill: ["Communication", "Empathy", "Leadership", "Negotiation"]
            },
            praktik: {
                title: "Si Praktis",
                desc: "Kamu suka hal yang nyata dan langsung bisa diterapkan.",
                jurusan: ["Teknik Mesin", "Teknik Elektro", "Teknik Sipil", "Kedokteran", "Farmasi"],
                karir: ["Mechanical Engineer", "Project Manager", "Dokter", "Product Manager", "Operations Manager"],
                skill: ["Technical Skills", "Project Management", "Quality Control", "Hands-on Work"]
            }
        }
    },
    en: {
        landing: {
            how_title: "How to Play",
            step1: "1. You will face 10 real-life situations",
            step2: "2. Choose the response that feels most natural to you",
            step3: "3. Get your personality profile + suitable major & career recommendations!",
            start: "START"
        },
        progress: "Question {current} of {total}",
        result: {
            title_prefix: "",
            jurusan_label: "📚 Majors:",
            karir_label: "💼 Careers:",
            skill_label: "🛠 Skills:",
            back_home: "Back to Home Page",
            score_label: "Score",
            categories: {
                analisis: "Analysis",
                kreatif: "Creative",
                praktik: "Practical",
                sosial: "Social"
            }
        },
        questions: {
            q1: {
                title: "Night Hackathon",
                desc: "You and your team have 24 hours to build an app!",
                a: "Be the lead programmer",
                b: "Design the UI/UX",
                c: "Present to the judges",
                d: "Manage team strategy"
            },
            q2: {
                title: "School Film Project",
                desc: "Group task to make a short movie, what role do you choose?",
                a: "Director & story concept",
                b: "Main actor/actress",
                c: "Editor & visual effects",
                d: "Producer & logistics"
            },
            q3: {
                title: "Failed Lab Experiment",
                desc: "Your chemistry experiment didn't go as theoretically planned. What do you do?",
                a: "Re-analyze data & variables",
                b: "Look for creative alternative methods",
                c: "Discuss with teacher & friends",
                d: "Try again more carefully"
            },
            q4: {
                title: "School Canteen Startup",
                desc: "You want to open a snack business. What's your focus?",
                a: "Market research & profit calculation",
                b: "Creating cool branding & packaging",
                c: "Marketing & promotion to friends",
                d: "Production optimization & quality"
            },
            q5: {
                title: "Environmental Project",
                desc: "School environmental care campaign, what's your role?",
                a: "Creating posters & social media content",
                b: "Researching waste data & solutions",
                c: "Coordinating volunteers & events",
                d: "Implementing recycling systems"
            },
            q6: {
                title: "School E-Sports Team",
                desc: "School wants to join e-sports competition. Where do you contribute?",
                a: "Strategy coach & opponent analysis",
                b: "Team logo & jersey design",
                c: "Team captain & motivator",
                d: "Scheduling practice & logistics"
            },
            q7: {
                title: "School Solution App",
                desc: "You have an idea for an app to help students. What do you focus on?",
                a: "Coding & developing features",
                b: "User needs research & surveys",
                c: "Designing user-friendly interface",
                d: "Creating presentation materials"
            },
            q8: {
                title: "Blood Donation Event",
                desc: "Student council holding blood donation. Most suitable role suitable for you?",
                a: "Coordinating with Red Cross & event rundown",
                b: "Creating campaign & inviting friends",
                c: "Designing posters & promotion content",
                d: "Recording data & donor database management"
            },
            q9: {
                title: "School Culture Festival",
                desc: "School holding culture festival. How do you want to contribute?",
                a: "Traditional dance choreographer",
                b: "MC & host",
                c: "Stage management & sound system",
                d: "Photo & video documentation"
            },
            q10: {
                title: "Tech Innovation Contest",
                desc: "Joining tech innovation contest to solve social problems.",
                a: "Problem research & field data collection",
                b: "Building prototype & product testing",
                c: "Packaging design & product branding",
                d: "Presentation & pitching idea to investors"
            }
        },
        result_details: {
            analisis: {
                title: "The Analyst",
                desc: "You like solving problems with logic and data.",
                jurusan: ["Computer Science", "Mathematics", "Statistics", "Data Science", "Industrial Engineering"],
                karir: ["Software Engineer", "Data Scientist", "System Analyst", "Quant Analyst", "AI Engineer"],
                skill: ["Programming", "Algorithms", "Logic & Math", "Problem Solving"]
            },
            kreatif: {
                title: "The Creator",
                desc: "High imagination and loves to create!",
                jurusan: ["Visual Communication Design", "Architecture", "Film & Broadcasting", "Fine Arts", "Creative Writing"],
                karir: ["UI/UX Designer", "Content Creator", "Art Director", "Animator", "Architect"],
                skill: ["Adobe Creative Suite", "Storytelling", "Trends & Aesthetics", "Portfolio Building"]
            },
            sosial: {
                title: "The Socializer",
                desc: "You are great at interacting and understanding others.",
                jurusan: ["Psychology", "Communication Studies", "International Relations", "Management", "Law"],
                karir: ["HR Manager", "Marketing Manager", "Public Relations", "Psychologist", "Diplomat"],
                skill: ["Communication", "Empathy", "Leadership", "Negotiation"]
            },
            praktik: {
                title: "The Pragmatist",
                desc: "You like tangible things and direct application.",
                jurusan: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Medicine", "Pharmacy"],
                karir: ["Mechanical Engineer", "Project Manager", "Doctor", "Product Manager", "Operations Manager"],
                skill: ["Technical Skills", "Project Management", "Quality Control", "Hands-on Work"]
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Show Modal, Hide everything else is handled by CSS (landing hidden by default)
    // Wait for setLanguage call
});

function setLanguage(lang) {
    currentLang = lang;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    applyTranslations();
    
    const modal = document.getElementById('language-modal');
    const landing = document.getElementById('landing-page');
    
    // Ensure landing page is visible behind the modal before fading out
    landing.style.display = 'block';
    
    // Trigger exit animation
    modal.classList.add('closing');
    
    // Wait for animation to finish
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
    }, 280);
}

function openLanguageModal() {
    document.getElementById('language-modal').style.display = 'flex';
    // Show back button because we are coming from the app
    const backBtn = document.getElementById('modal-back-btn');
    if(backBtn) backBtn.style.display = 'flex';
}

function closeLanguageModal() {
    const modal = document.getElementById('language-modal');
    modal.classList.add('closing');
    
    // Wait for animation to finish (300ms matches CSS)
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
    }, 280); // Slightly less than 300ms to avoid flicker
}

function applyTranslations() {
    const t = translations[currentLang];
    
    // Landing Page
    document.querySelector('[data-i18n="landing.how_title"]').innerText = t.landing.how_title;
    document.querySelector('[data-i18n="landing.step1"]').innerText = t.landing.step1;
    document.querySelector('[data-i18n="landing.step2"]').innerText = t.landing.step2;
    document.querySelector('[data-i18n="landing.step3"]').innerText = t.landing.step3;
    document.querySelector('[data-i18n="landing.start"]').innerText = t.landing.start;
    
    // Questions (Iterate through IDs)
    for (let i = 1; i <= 10; i++) {
        const qId = `q${i}`;
        const qEl = document.getElementById(qId);
        if (qEl && t.questions[qId]) {
            const qData = t.questions[qId];
            qEl.querySelector('.boxTitle').innerText = qData.title;
            const descEl = qEl.querySelector('.textBox p:nth-child(2)'); // 2nd p in textBox
            if(descEl) descEl.innerText = qData.desc;
            
            // Buttons - order is usually a, b, c, d but we need to match carefully
            // The HTML structure has 4 buttons, we can traverse them.
            // But we have onclick="selectAnswer(..., 'a', ...)" in HTML. 
            // We can select based on that if we want, or just assume order.
            // Safest: select all .buttonText inside this question container
            const btnTexts = qEl.querySelectorAll('.buttonText');
            if (btnTexts.length >= 4) {
                // Assuming standard order layout: a,b,c,d is NOT guaranteed by DOM order if rows change??
                // Wait, HTML structure is Row -> Col -> Button. They appear in order.
                // Let's rely on mapping indices 0-3 to a-d
                btnTexts[0].innerText = qData.a;
                btnTexts[1].innerText = qData.b;
                btnTexts[2].innerText = qData.c;
                btnTexts[3].innerText = qData.d;
            }
        }
    }
    
    // Result Page Button
    const resBtn = document.querySelector('#result .buttonText');
    if(resBtn) resBtn.innerText = t.result.back_home;
}

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
                seg.style.background = '#000000';
                seg.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.4)';
                seg.style.opacity = '1';
            } else if (i < currentNum) {
                // Past Questions: Semi-lit/completed
                seg.style.background = 'rgba(0, 0, 0, 0.5)';
                seg.style.boxShadow = 'none';
            } else {
                // Future Questions: Darker/Idle
                seg.style.background = 'rgba(0, 0, 0, 0.1)';
                seg.style.boxShadow = 'none';
            }
            barInner.appendChild(seg);
        }
    }
    
    // Translate Progress Text
    const t = translations[currentLang];
    if (textLabel) textLabel.innerText = t.progress.replace('{current}', currentNum).replace('{total}', allQs);
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
}

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
        
        // Track 'Quiz Completed' event with Vercel Analytics
        if (window.va) {
            window.va('event', { name: 'Quiz Completed', data: { result: dominantKey } });
        }
        
        const t = translations[currentLang];
        const resultData = t.result_details[dominantKey];
        
        const display = document.getElementById('score-display');
        display.innerHTML = `
            <div class="mb-4">
                <h2 style="font-size: 32px; margin-bottom: 10px;">${resultData.title.replace(' (', '<br>(')}</h2>
                <p style="font-size: 18px; margin-bottom: 0;">${resultData.desc}</p>
            </div>

            <div class="text-start" style="background: rgba(0,0,0,0.05); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                <div class="row g-3">
                    <div class="col-12">
                        <strong style="font-size: 18px;">${t.result.jurusan_label}</strong>
                        <ul style="margin: 0; padding-left: 20px; font-size: 16px; margin-top: 5px;">
                            ${resultData.jurusan.map(item => `<li class="mb-1">${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="col-12">
                        <strong style="font-size: 18px;">${t.result.karir_label}</strong>
                        <ul style="margin: 0; padding-left: 20px; font-size: 16px; margin-top: 5px;">
                            ${resultData.karir.map(item => `<li class="mb-1">${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="mt-4">
                    <strong style="font-size: 18px;">${t.result.skill_label}</strong>
                    <div style="font-size: 16px; margin-top: 8px;">
                        ${resultData.skill.map(item => `<span class="badge bg-light text-dark bg-opacity-75 me-2 mb-2 p-2" style="font-weight: normal; font-size: 14px;">${item}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <p style="font-size: 14px; opacity: 0.6; margin: 0;">
                ${t.result.score_label}: ${t.result.categories.analisis}:${scores.analisis} ${t.result.categories.kreatif}:${scores.kreatif} ${t.result.categories.praktik}:${scores.praktik} ${t.result.categories.sosial}:${scores.sosial}
            </p>
            
            ${dominantKey === 'sosial' ? `
            <div class="mt-4">
                <a href="https://pu-ir-web-mckc.vercel.app/" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                    <div class="button" style="background: linear-gradient(135deg, #0ba360 0%, #3cba92 100%); width: 100%;">
                        <p class="buttonText m-0 text-center">Tes Kecocokan IR</p>
                    </div>
                </a>
            </div>
            ` : ''}
        `;
    }
}

function resetQuiz() {
    // Reset Variables
    scores = { analisis: 0, kreatif: 0, praktik: 0, sosial: 0 };
    historyStack = [];
    availableQuestions = ['q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];
    currentQuestionId = 'q1';
    
    // Switch Views
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result').style.display = 'none'; 
    
    // Trigger Landing Animation
    const landing = document.getElementById('landing-page');
    landing.style.display = 'block';
    // Reset animation
    landing.classList.remove('animate-pop');
    void landing.offsetWidth; // Force reflow
    landing.classList.add('animate-pop');
}

function handleBack(e) {
    e.preventDefault();
    
    if (historyStack.length === 0) {
        // Go back to landing page
        const landing = document.getElementById('landing-page');
        document.getElementById('quiz-page').style.display = 'none';
        
        landing.style.display = 'block';
        // Reset animation
        landing.classList.remove('animate-pop');
        void landing.offsetWidth; // Force reflow
        landing.classList.add('animate-pop');
        
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
}

function setLanguage(lang) {
    currentLang = lang;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    applyTranslations();
    
    const modal = document.getElementById('language-modal');
    const landing = document.getElementById('landing-page');
    
    // Ensure landing page is visible behind the modal before fading out
    landing.style.display = 'block';
    
    // Trigger Landing Animation
    landing.classList.remove('animate-pop');
    void landing.offsetWidth; // Force reflow
    landing.classList.add('animate-pop');
    
    // Trigger exit animation for modal
    modal.classList.add('closing');
    
    // Wait for animation to finish
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
    }, 280);
}
