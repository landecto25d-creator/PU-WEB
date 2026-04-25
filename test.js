const fs = require('fs');
const jsCode = fs.readFileSync('script.js', 'utf8');

// Better Mock DOM
const mockElement = () => ({
    style: {},
    classList: { add: ()=>{}, remove: ()=>{} },
    offsetWidth: 0,
    innerText: '',
    innerHTML: '',
    querySelector: mockElement,
    querySelectorAll: () => [mockElement(), mockElement(), mockElement(), mockElement()],
    appendChild: () => {}
});

const dom = {
    document: {
        querySelector: mockElement,
        querySelectorAll: () => [mockElement(), mockElement(), mockElement(), mockElement()],
        getElementById: mockElement,
        documentElement: { lang: '' },
        addEventListener: () => {},
        createElement: mockElement
    },
    window: { va: () => {} },
    setTimeout: (cb) => cb(),
    console: console,
    Math: Math
};

const vm = require('vm');
const context = vm.createContext(dom);

try {
    vm.runInContext(jsCode, context);
    console.log("Script loaded successfully.");
    
    vm.runInContext('setLanguage("id");', context);
    console.log("Language set to ID.");
    
    vm.runInContext('startQuiz();', context);
    console.log("Quiz started.");
    
    vm.runInContext('selectAnswer(1, "a", 3, 0, 2, 0);', context);
    console.log("Answer 1 selected. availableQuestions left:", context.availableQuestions.length);
} catch (e) {
    console.error("Error during execution:", e);
}
