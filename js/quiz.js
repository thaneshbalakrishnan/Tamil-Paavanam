(function(){

    var data = {
        quizContent: [
            {
                question: " 'அறம் செய்ய விரும்பு' என்பதன் பொருள் என்ன?",
                answer1: "பிறருக்குச் செய்யப்படும் உதவியைத் தடுக்கக் கூடாது",
                answer2: "கொடுக்க இயன்றதை இல்லை என்று மறைக்கக்கூடாது",
                answer3: "தருமம் மற்றும் நன்மை தரும் செயல்களைச் செய்வதில் நாட்டம் கொள்",
                fact:"சரியான பதில், தருமம் மற்றும் நன்மை தரும் செயல்களைச் செய்வதில் நாட்டம் கொள்",
                correctAnswer: 3
            },
            {
                question: " 'மளமள' எனும் இரட்டைக்கிளவியின் பொருள் ?",
                answer1: "உடல் மெலிந்து காணப்படுதல்",
                answer2: "ஒன்றை விரைவாகவும் சுறுசுறுப்பாகவும் செய்தல்",
                answer3: "ஓடும் போது ஏற்படும் ஓசை",
                fact:"சரியான விடை 'ஒன்றை விரைவாகவும் சுறுசுறுப்பாகவும் செய்தல்' ",
                
                correctAnswer: 2
            },
            {
                question:  "இனிய உளவாக இன்னாத கூறல் ......",
                answer1: "நற்றாள் தொழாஅர் எனின்",
                answer2: "கனியிருப்பக் காய்கவர்ந் தற்று",
                answer3: "நிற்க அதற்குத் தக",
                fact:"சரியான விடை 'கனியிருப்பக் காய்கவர்ந் தற்று' ",
                correctAnswer: 2
            },
            {
                question: "பணக்காரர்களுக்குச் சிறப்பு, உறவினர்களை ஆதரித்தல் ஆகும் என்பதற்கு ஏற்ற வெற்றிவேற்கை என்ன?",
                answer1: "தனந்தேடி யுண்ணாமற் புதக்க வேண்டாம்",
                answer2: "ஒன்று பட்டால் உண்டு வாழ்வு",
                answer3: "செல்வர்க் கழகு செழுங்கிளை தாங்குதல்",
                fact:"சரியான விடை 'செல்வர்க் கழகு செழுங்கிளை தாங்குதல்' ",
                correctAnswer: 3
            },
            {
                question  : "வெறும் கற்பனை எனும் பொருள் தரும் மரபுத்தொடர் யாது?",
                answer1  : "மனக்கோட்டை",
                answer2  : "ஒற்றைக் காலில் நிற்றல்",
                answer3  : "தொன்று தொட்டு",
                fact:"சரியான விடை 'மனக்கோட்டை'",
                correctAnswer: 1
                  
                    
            }
        ],
        points: 0
    };
    
	adbuddiz.showAd();
	
    var display = {
        getApp: document.getElementById('app'),

        // Updates DOM on start/restart of the quiz
        mainPage: function() {
            var newEl = '<div class="quest-number"><p id="questNumber"></p></div><h1 id="questionDisplay" class="h3"></h1>';
                newEl += '<ul><li><label><input type="radio" name="answers" id="input1" value="1"><span class="outer"><span class="inner"></span></span><div id="answerDisplay1"></div></label></li>';
                newEl += '<li><label><input type="radio" name="answers" id="input2" value="2"><span class="outer"><span class="inner"></span></span><div id="answerDisplay2"></div></label></li>';
                newEl += '<li><label><input type="radio" name="answers" id="input3" value="3"><span class="outer"><span class="inner"></span></span><div id="answerDisplay3"></div></label></li></ul>';
                
                newEl += '<div class="points-wrap"><p id="currentPoints"></p></div>';

            this.getApp.innerHTML = newEl;
        },

        // Updates DOM with each question
        updateMainPage: function() {
            var getQuestNumber = document.getElementById('questNumber'),
                getQuestion = document.getElementById('questionDisplay'),
                getAnswer1 = document.getElementById('answerDisplay1'),
                getAnswer2 = document.getElementById('answerDisplay2'),
                getAnswer3 = document.getElementById('answerDisplay3'),
               
                getCurrentPoints = document.getElementById('currentPoints'),
                sumOfQuestions = data.quizContent.length;
                
            getQuestNumber.innerHTML = control.count + 1 + '/' + sumOfQuestions;
            getQuestion.innerHTML = data.quizContent[control.count].question;
            getAnswer1.innerHTML = data.quizContent[control.count].answer1;
            getAnswer2.innerHTML = data.quizContent[control.count].answer2;
            getAnswer3.innerHTML = data.quizContent[control.count].answer3;
         
            getCurrentPoints.innerHTML = 'புள்ளி:' + ' ' + data.points;
            this.newElement('button', 'submit', 'பதிலளி');
        },
        addAnswer: function(showMessage) {
            var sumOfQuestions = data.quizContent.length;

            if(showMessage === 'correct') {
                this.newElement('p', 'showAnswer', 'சரியான பதில்!');
            } else {
                
                var x=data.quizContent[control.count].fact
              
                
                
                this.newElement('p', 'showAnswer', 'தவறான பதில் !'+x );
            }

            if (control.count < sumOfQuestions - 1) {
                this.newElement('button', 'nextQuest', 'அடுத்தப் புதிர்');
            } else {
                this.newElement('button', 'result', 'முடிவுகளை காணவும்');
            }
        },
        removeAnswer: function(event) {
            var getShowAnswer = document.getElementById('showAnswer');
            var getShowAnswerParent = getShowAnswer.parentNode;
            getShowAnswerParent.removeChild(getShowAnswer);
            var clickedEl = event.target;
            var clickedElParent = clickedEl.parentNode;
            clickedElParent.removeChild(clickedEl);
            var radioButtons = document.getElementsByName('answers');
            var allRadioButtons = radioButtons.length;
            var i;

            for(i = 0; i < allRadioButtons; i++) {
                radioButtons[i].checked = false;
            }
        },

        // Displays final page of the quiz
        resultPage: function() {
            this.getApp.innerHTML = '<h1 class="h3">நீங்கள் ' + data.points + ' கேள்விக்கு  சரியான பதிலளித்துள்ளீர். வாழ்த்துகள்!</h1>';
            this.newElement('button', 'restart', 'புதிர் தொடங்கு');
        },
        newElement: function(elem, elemId, elemText) {
            var newElem = document.createElement(elem);
            var newElemText = document.createTextNode(elemText);
            newElem.appendChild(newElemText);
            newElem.id = elemId;
            this.getApp.appendChild(newElem);
        }
    };

    var control = {
        init: function() {
            var start = document.getElementById('start') || document.getElementById('restart');
            start.addEventListener('click', function() {
                display.mainPage();
                control.update();
            }, false);
        },
        update: function() {
            display.updateMainPage();
            var submit = document.getElementById('submit');
            submit.addEventListener('click', this.checkAnswer, false);
        },

        /**
        * Alerts if none of the radios is checked on submit 
        * Verifies correct/incorrect answer
        * Directs quiz to the next question or to the final page
        */
        checkAnswer: function(event) {
            var radioButtons = document.getElementsByName('answers'),
                allRadioButtons = radioButtons.length,
                isChecked = false,
                checkedRadio,
                clickedEl = event.target,
                clickedElParent = clickedEl.parentNode,
                i;

            for (i = 0; i < allRadioButtons; i++) {
                if (radioButtons[i].checked) {
                    isChecked = true;
                    checkedRadio = +radioButtons[i].value;
                }
            }

            if (isChecked === false) {
                alert('Please choose the answer!');
            } else {
                clickedElParent.removeChild(clickedEl);
                if (checkedRadio === data.quizContent[control.count].correctAnswer) {
                    display.addAnswer('correct');
                    data.points++;
                } else {
                    display.addAnswer();
                }

                var nextQuestion = document.getElementById('nextQuest'),
                    result = document.getElementById('result');

                if (nextQuestion) {
                    nextQuestion.addEventListener('click', function(event) {
                        control.count++;
                        display.removeAnswer(event);
                        control.update();
                    }, false);
                } else {
                    result.addEventListener('click', function() {
                        display.resultPage();
                        control.init();
                        control.count = 0;
                        data.points = 0;
                    }, false);
                }
            }
        },

        // Used for incrementing/looping through the quiz questions and answers
        count: 0
    };

    control.init();

})();
