var DEBUG = false;
var STAGE_COUNTER = 0; 
var CHAR_ARRAY = [];
var CHAR_INDEX = 0;
var CURR_CHAR = "~";
var TIME_OUT_VAR; //only needed so clearTimeout() will work

var STAGE_ARRAY = [];

// Initialize Firebase
          var config = {
            apiKey: "AIzaSyCGi39mk0zQ2hGLtv3reZi8m7LQrESZjWw",
            authDomain: "elmsadventuretrivianight-ac96a.firebaseapp.com",
            databaseURL: "https://elmsadventuretrivianight-ac96a.firebaseio.com",
            projectId: "elmsadventuretrivianight-ac96a",
            storageBucket: "",
            messagingSenderId: "691633018633"
          };
          firebase.initializeApp(config);

var DATABASE = firebase.database();
var DB_PLAYERS_REF = DATABASE.ref("Players");



function Player(gender, major, yog)
{
    this.dbPlayerId;
    this.dbTimeStartedRef;
    this.dbTimeFinishedRef;
    this.firstName = "N/A";
    this.lastName = "N/A";
    this.gender = gender;
    this.major = major;
    this.yog = yog;

    this.timeStarted = "N/A"; //new Date();
    this.timeFinished = "N/A";
    this.lastTimeAnswered = "N/A";
    this.totalTime = "N/A";

    this.lastQID = "N/A";
    this.lastInputAnswer = "N/A";

    this.points = 0;

    this.getFirstName = function()
    {
        return this.firstName;
    }
    this.setFirstName = function(string)
    {
        this.firstName = string;
    }
    this.getLastName = function()
    {
        return this.lastName;
    }
    this.setLastName = function(string)
    {
        this.lastName = string;
    }
    this.setTimeStarted = function()
    {
        this.timeStarted = new Date();
    }
    this.getTimeStarted = function()
    {
        return this.timeStarted;
    }
    this.setTimeFinished = function()
    {
        this.timeFinished = new Date();
    }
    this.getTimeFinished = function()
    {
        return this.timeFinished;
    }
    this.getPoints = function()
    {
        return this.points;
    }


    this.setName = function(string)
    {
        string = string.trim();

        if (string.includes(" "))
        {
            this.firstName = string.substring(0, string.indexOf(" "));
            this.lastName = string.substring(string.lastIndexOf(" ") + 1, string.length);
        }
        else
        {
            this.firstName = string;
        }
        this.firstName = this.firstName.toLocaleLowerCase();
        this.firstName = (this.firstName.charAt(0).toLocaleUpperCase()) + (this.firstName.substring(1)); 

        if (this.lastName != "")
        {
            this.lastName = this.lastName.toLocaleLowerCase();
            this.lastName = (this.lastName.charAt(0).toLocaleUpperCase()) + (this.lastName.substring(1));  
        }
    }

    this.toString = function()
    {
        return (this.firstName + "|" + this.lastName + "|" + this.gender + "|" + this.major + "|" + this.yog + "|" + this.points + "|" + this.timeStarted + "|" + this.timeFinished)
    }

    this.sendToDb = function() //make sure name is put in first, it isnt in the contructor
    {
        this.dbPlayersId = DB_PLAYERS_REF.push
        ({
            firstName : this.firstName,
            lastName : this.lastName,
            gender : this.gender,
            major : this.major,
            yog : this.yog,
            points : 0,
            timeStarted : this.timeStarted,
            timeFinished : this.timeFinished,
            lastTimeAnswered : this.lastTimeAnswered,
            totalTime : this.totalTime,
            lastQID : this.lastQID
         });
    }

    this.updatePointsInDb = function()
    {
        this.dbPlayersId.update
        ({
            points : this.points
        })
    }

    this.setStartTimeInDb = function()
    {
        this.dbPlayersId.update
        ({
            timeStarted : this.timeStarted
        })
    }

    this.setFinishTimeInDb = function()
    {
        this.dbPlayersId.update
        ({
            timeFinished : this.timeFinished
        })
    }

    this.setLastTimeAnsweredInDb = function()
    {
        this.dbPlayersId.update
        ({
            lastTimeAnswered : this.lastTimeAnswered
        })
    }

    this.setTotalTimeInDb = function()
    {
        this.dbPlayersId.update
        ({
            totalTime : this.totalTime
        })
    }

    this.setlastQIDInDb = function()
    {
        this.dbPlayersId.update
        ({
            lastQID : this.lastQID
        })
    }

    this.pushQuestionToDb = function()
    {
        this.dbPlayersId.push
        ({
            QID : this.lastQID,
            answer : this.lastInputAnswer
        })
    }
}

//-----------------------------------------------------------------------------------------------STAGE CONSTRUCTORS
function Stage(text, styleCode)
{
    this.text = text;
    this.styleCode = styleCode;
    this.viewed = false;

    this.setStageType = function(string)
    {
        this.stageType = string;
    }
    this.getStageType = function()
    {
        return this.stageType;
    }

    this.setText = function(string)
    {
        this.text = string;
    }
    this.getText = function()
    {
        return this.text;
    }

    this.setStyleCode = function(string)
    {
        this.styleCode = string;
    }
    this.getStyleCode = function()
    {
        return this.styleCode;
    }

    this.setViewed = function(bool)
    {
        this.viewed = bool;
    }
    this.getViewed = function()
    {
        return this.viewed;
    }

}

function Textstage(text, styleCode)
{
    Stage.call(this, text, styleCode);
    Object.create(Stage.prototype);
    Textstage.prototype.constructor = Textstage;

    STAGE_ARRAY.push(this);
}

function Inputstage(qID, text, correct, inputType)
{
    Stage.call(this, text, "submit only");
    Object.create(Stage.prototype);
    Inputstage.prototype.constructor = Inputstage;

    this.qID = qID;
    this.correct = correct;
    this.input = "";
    this.inputType = inputType;
    this.answerCorrect = false;

    this.setCorrect = function(string)
    {
        this.correct = string;
    }
    this.getCorrect = function()
    {
        return this.correct;
    }

    this.setInput = function(string)
    {
        this.input = string;
    }
    this.getInput = function()
    {
        return this.input;
    }

    this.setinputType = function(string)
    {
        this.inputType = string;
    }
    this.getInputType = function()
    {
        return this.inputType;
    }

    this.setanswerCorrect = function(bool)
    {
        this.answerCorrect = bool;
    }
    this.getanswerCorrect = function()
    {
        return this.answerCorrect;
    }

    this.getQID = function()
    {
        return this.qID;
    }

    STAGE_ARRAY.push(this);
}

function Multistage(qID, text, btn1txt, btn2txt, btn3txt, btn4txt, correct)
{
    Stage.call(this, text, "multi");
    Object.create(Stage.prototype);
    Multistage.prototype.constructor = Multistage;

    this.qID = qID;
    this.correct = correct;
    this.answerCorrect = false;

    this.btn1txt = btn1txt;
    this.btn2txt = btn2txt;
    this.btn3txt = btn3txt;
    this.btn4txt = btn4txt;

    this.getQID = function()
    {
        return this.qID;
    }

    this.getBtn1Txt = function()
    {
        return this.btn1txt;
    }
    this.getBtn2Txt = function()
    {
        return this.btn2txt;
    }
    this.getBtn3Txt = function()
    {
        return this.btn3txt;
    }
    this.getBtn4Txt = function()
    {
        return this.btn4txt;
    }

    STAGE_ARRAY.push(this);

}

function Boltstage(text)
{
    Stage.call(this, text, "bolt");
    Object.create(Stage.prototype);
    Multistage.prototype.constructor = Boltstage;

    STAGE_ARRAY.push(this);
}

function Infostage()
{
    Stage.call(this, "", "info");
    Object.create(Stage.prototype);
    Multistage.prototype.constructor = Infostage;

    STAGE_ARRAY.push(this);

}

function Displaystage(text)
{
    Stage.call(this, text, "display");
    Object.create(Stage.prototype);
    Multistage.prototype.constructor = Displaystage;

    STAGE_ARRAY.push(this);

}

function Startstage(text)
{
    Stage.call(this, text, "start");
    Object.create(Stage.prototype);
    Multistage.prototype.constructor = Startstage;

    STAGE_ARRAY.push(this);

}

function Endstage(text)
{
    Stage.call(this, text, "end");
    Object.create(Stage.prototype);
    Multistage.prototype.constructor = Endstage;

    STAGE_ARRAY.push(this);

}


//-----------------------------------------------------------------------------------------------NAVIGATION SUBROUTINES

function changeStage(string)
{
    if (string == "forward" && STAGE_COUNTER < (STAGE_ARRAY.length - 1))
    {
        STAGE_COUNTER++;
    }
    else if (string == "backward" && STAGE_COUNTER > 0)
    {
        STAGE_COUNTER--;
    }

    changeStageType(STAGE_ARRAY[STAGE_COUNTER].getStyleCode());// first to avoid style/STAGE_COUNTER conflicts when loading
    processStage(STAGE_COUNTER);                                                                       
    changeText(STAGE_COUNTER);
}


function processStage(num)
{
    var string = STAGE_ARRAY[num].getText();
    if (DEBUG == true)
    {
        console.log("id: " + STAGE_ARRAY[num].qID + " | stageType: " + STAGE_ARRAY[num].getStyleCode());
    }
    CHAR_ARRAY = string.split("");

    if (STAGE_ARRAY[num] instanceof Multistage)
    {
        document.getElementById("blurTarget").setAttribute("style", "-webkit-filter: blur(0px)");

        document.getElementById("ab1").innerHTML = STAGE_ARRAY[num].getBtn1Txt();
        document.getElementById("ab2").innerHTML = STAGE_ARRAY[num].getBtn2Txt();
        document.getElementById("ab3").innerHTML = STAGE_ARRAY[num].getBtn3Txt();
        document.getElementById("ab4").innerHTML = STAGE_ARRAY[num].getBtn4Txt();

    }

    if (STAGE_ARRAY[num] instanceof Inputstage)
    {
        document.getElementById("blurTarget").setAttribute("style", "-webkit-filter: blur(0px)");

        if (STAGE_ARRAY[num].getQID() == 80)
        {
            document.getElementById("questionTextBox").style.fontSize = "2.5vh";//final riddle too large for window otherwise
        }

    }

    if (STAGE_ARRAY[num] instanceof Boltstage)
    {
        document.getElementById("blurTarget").setAttribute("style", "-webkit-filter: blur(5px)");

    }

    if (STAGE_ARRAY[num] instanceof Startstage)
    {
        document.getElementById("blurTarget").setAttribute("style", "-webkit-filter: blur(0px)");

    }

    if (STAGE_ARRAY[num] instanceof Endstage)
    {
        document.getElementById("questionTextBox").style.fontSize = "3.25vh"; //to go back to normal size when 

        PLAYER.timeFinished = new Date();
        PLAYER.setFinishTimeInDb();
        PLAYER.totalTime = (PLAYER.timeFinished.getHours() - PLAYER.timeStarted.getHours()) + " hours and " + (PLAYER.timeFinished.getMinutes() - PLAYER.timeStarted.getMinutes()) + " minutes!";

        document.getElementById("blurTarget").setAttribute("style", "-webkit-filter: blur(0px)");
        document.getElementById("endInfo").innerHTML = ("- You got " + PLAYER.points + " of 47 points!" + "<br>" +"- You played for " + PLAYER.totalTime);

        PLAYER.setTotalTimeInDb();

    }

}

function changeStageType(string)
{
    switch(string){

        case "multi":
            document.getElementById("inputTextBox").style.visibility = "hidden";
            document.getElementById("submitText").style.visibility = "hidden";
            document.getElementById("advanceButton").style.visibility = "hidden";
            document.getElementById("bolt").style.visibility = "hidden";
            document.getElementById("boltTalkBox").style.visibility = "hidden";
            document.getElementById("startButton").style.visibility = "hidden";

            document.getElementById("questionTextBox").style.visibility = "visible";
            document.getElementById("ab1").style.visibility = "visible";
            document.getElementById("ab2").style.visibility = "visible";
            document.getElementById("ab3").style.visibility = "visible";
            document.getElementById("ab4").style.visibility = "visible";


            document.getElementById("ab1").disabled = false;
            document.getElementById("ab2").disabled = false;
            document.getElementById("ab3").disabled = false;
            document.getElementById("ab4").disabled = false;
            break;

        case "bolt":

            document.getElementById("advanceDisplayButton").style.visibility = "hidden";

            document.getElementById("advanceButton").style.visibility = "visible";
            document.getElementById("bolt").style.visibility = "visible";
            document.getElementById("boltTalkBox").style.visibility = "visible";

            document.getElementById("ab1").disabled = true;
            document.getElementById("ab2").disabled = true;
            document.getElementById("ab3").disabled = true;
            document.getElementById("ab4").disabled = true;


            break;

        case "submit only":

            document.getElementById("advanceButton").style.visibility = "hidden";
            document.getElementById("ab1").style.visibility = "hidden";
            document.getElementById("ab2").style.visibility = "hidden";
            document.getElementById("ab3").style.visibility = "hidden";
            document.getElementById("ab4").style.visibility = "hidden";
            document.getElementById("advanceDisplayButton").style.visibility = "hidden";
            document.getElementById("bolt").style.visibility = "hidden";
            document.getElementById("boltTalkBox").style.visibility = "hidden";
            document.getElementById("startButton").style.visibility = "hidden";


            document.getElementById("bolt").style.visibility = "hidden";
            document.getElementById("boltTalkBox").style.visibility = "hidden";

            document.getElementById("inputTextBox").style.visibility = "visible";
            document.getElementById("submitText").style.visibility = "visible";
            document.getElementById("centerBox").style.visibility = "visible";
            break;

        case "display":

            document.getElementById("nameTextBox").style.visibility = "hidden";
            document.getElementById("genderSelect").style.visibility = "hidden";
            document.getElementById("majorSelect").style.visibility = "hidden";
            document.getElementById("yogSelect").style.visibility = "hidden";
            document.getElementById("submitInfoButton").style.visibility = "hidden";

            document.getElementById("questionTextBox").style.visibility = "visible";
            document.getElementById("advanceDisplayButton").style.visibility = "visible";
            break;

        case "info":

            document.getElementById("questionTextBox").style.visibility = "hidden";
            document.getElementById("advanceDisplayButton").style.visibility = "hidden";

            document.getElementById("nameTextBox").style.visibility = "visible";
            document.getElementById("genderSelect").style.visibility = "visible";
            document.getElementById("majorSelect").style.visibility = "visible";
            document.getElementById("yogSelect").style.visibility = "visible";
            document.getElementById("submitInfoButton").style.visibility = "visible";


            break;

        case "start":
            document.getElementById("bolt").style.visibility = "hidden";
            document.getElementById("boltTalkBox").style.visibility = "hidden";
            document.getElementById("advanceDisplayButton").style.visibility = "hidden";
            document.getElementById("advanceButton").style.visibility = "hidden";

            document.getElementById("questionTextBox").style.visibility = "visible";
            document.getElementById("startButton").style.visibility = "visible";


            break;

        case "end":

            document.getElementById("inputTextBox").style.visibility = "hidden";
            document.getElementById("submitText").style.visibility = "hidden";
            document.getElementById("advanceButton").style.visibility = "hidden";
            document.getElementById("centerBox").style.visibility = "hidden";
            document.getElementById("advanceButton").style.visibility = "hidden";
            document.getElementById("ab1").style.visibility = "hidden";
            document.getElementById("ab2").style.visibility = "hidden";
            document.getElementById("ab3").style.visibility = "hidden";
            document.getElementById("ab4").style.visibility = "hidden";
            document.getElementById("bolt").style.visibility = "hidden";
            document.getElementById("boltTalkBox").style.visibility = "hidden";
            document.getElementById("startButton").style.visibility = "hidden";

            document.getElementById("questionTextBox").style.visibility = "visible";
            document.getElementById("endInfo").style.visibility = "visible";

            break;

        default:

    }
}


function waitOnNextChar(interval)
{
    TIME_OUT_VAR = setTimeout(insertChar, interval)
}

 function changeText(num)
{
    if (STAGE_ARRAY[STAGE_COUNTER] instanceof Boltstage)
    {
        clearTimeout(TIME_OUT_VAR);
        CHAR_INDEX = 0;
        CURR_CHAR = CHAR_ARRAY[CHAR_INDEX];
        document.getElementById("boltTalkBox").innerHTML = "";

        if (STAGE_ARRAY[STAGE_COUNTER].getViewed() == false)
        {
            insertChar();
        }
        else
        {
            document.getElementById("boltTalkBox").innerHTML = CHAR_ARRAY.join("");
        }
    }
    else
    {
        document.getElementById("questionTextBox").innerHTML = STAGE_ARRAY[num].getText();
    }
}

function insertChar()
{
    CURR_CHAR = CHAR_ARRAY[CHAR_INDEX];
    if (CHAR_INDEX <= (CHAR_ARRAY.length - 1))
    {
        document.getElementById("boltTalkBox").innerHTML += CURR_CHAR;
        CHAR_INDEX++;
        if (CURR_CHAR == ",")
        {
            waitOnNextChar(150);
        }
        else if (CURR_CHAR == ";")
        {
            waitOnNextChar(175);
        }
        else if (CURR_CHAR == ".")
        {
            waitOnNextChar(500);
        }
        else if (CURR_CHAR == "!")
        {
            waitOnNextChar(500);
        }
        else if (CURR_CHAR == "?")
        {
            waitOnNextChar(500);
        }
        else
        {
            waitOnNextChar(40);
        }
    }
}

function processInput()
{
    if (document.getElementById("inputTextBox").value != "")
    {
        document.getElementById("inputTextBox").value = document.getElementById("inputTextBox").value.toLowerCase();
        document.getElementById("inputTextBox").value = document.getElementById("inputTextBox").value.trim();
        STAGE_ARRAY[STAGE_COUNTER].setInput(document.getElementById("inputTextBox").value);
        document.getElementById("inputTextBox").value = "";
        
        answer();
    }
    else
    {
        window.alert("Please enter an answer in the text box to continue.");
    }
    

}

function fadeoutC() {
    document.getElementById("correct").style.visibility = "hidden";
}
function fadeoutW() {
    document.getElementById("wrong").style.visibility = "hidden";
}

function answer(buttonID)
{
    if (DEBUG == true)
    {
        console.log(STAGE_ARRAY[STAGE_COUNTER].correct);
    }
    if (STAGE_ARRAY[STAGE_COUNTER] instanceof Inputstage)
    {
        if ((STAGE_ARRAY[STAGE_COUNTER].getInput() != "") && (STAGE_ARRAY[STAGE_COUNTER].getInput().includes(STAGE_ARRAY[STAGE_COUNTER].correct)))
        {
            PLAYER.points = PLAYER.points + 2;
            PLAYER.updatePointsInDb();

            PLAYER.lastQID = STAGE_ARRAY[STAGE_COUNTER].getQID();
            PLAYER.lastInputAnswer = STAGE_ARRAY[STAGE_COUNTER].getInput();
            PLAYER.pushQuestionToDb();

            document.getElementById("correct").style.visibility = "visible";
            setTimeout(fadeoutC, 400);
            
            if (DEBUG == true)
            {
                console.log(STAGE_ARRAY[STAGE_COUNTER].getInput() + " = " + STAGE_ARRAY[STAGE_COUNTER].correct);
            }
        }
        else
        {
            PLAYER.lastQID = STAGE_ARRAY[STAGE_COUNTER].getQID();
            PLAYER.lastInputAnswer = STAGE_ARRAY[STAGE_COUNTER].getInput();
            PLAYER.pushQuestionToDb();

            document.getElementById("wrong").style.visibility = "visible";
            setTimeout(fadeoutW, 400);
            if (DEBUG == true)
            {
                console.log(STAGE_ARRAY[STAGE_COUNTER].getInput() + " != " + STAGE_ARRAY[STAGE_COUNTER].correct);
            }
        }

    }
    else if (STAGE_ARRAY[STAGE_COUNTER].correct.includes(document.getElementById(buttonID).innerHTML))
    {
        if (DEBUG == true)
        {
            console.log("button used: " + document.getElementById(buttonID).innerHTML);
        }
        PLAYER.points++;
        PLAYER.updatePointsInDb();
        document.getElementById("correct").style.visibility = "visible";
        setTimeout(fadeoutC, 400);
    }
    else
    {
        document.getElementById("wrong").style.visibility = "visible";
        setTimeout(fadeoutW, 400);
    }
    PLAYER.lastQID = STAGE_ARRAY[STAGE_COUNTER].getQID();
    PLAYER.setlastQIDInDb();

    PLAYER.lastTimeAnswered = new Date();
    PLAYER.setLastTimeAnsweredInDb();

    changeStage('forward');
}

function populateStageArray()
{
    var questionToAdd;
    var questionPath;

    STAGE_ARRAY.length = 0;//emptys array without creating a new reference
    STAGE_COUNTER = 0;

    if (DEBUG == true)
    {
        console.log("now shuffling questionArraysList");
    }
    questionArraysList = fisherYatesShuffle(questionArraysList, 1, false);

    for(var i = 0; i < questionArraysList.length; i++)
    {
        if (DEBUG == true)
        {
            console.log("now shuffling questionArraysList[" + i +"]");
        }
        questionArraysList[i] = fisherYatesShuffle(questionArraysList[i], 3, true); //three from end for Boltstages

        for(var x = 0; x < questionArraysList[i].length; x++)
        {
            questionPath =  questionArraysList[i][x];

            if (questionPath.choices != undefined)//to check for short-answer questions
            {
                if (DEBUG == true)
                {
                    console.log("now shuffling choices array");
                }
                questionArraysList[i][x].choices = fisherYatesShuffle(questionArraysList[i][x].choices, 0, false);
                if (DEBUG == true)
                {
                    console.log("Now Populating STAGE_ARRAY with array" + "[" + i +"]"+ "[" + x +"]: Multistage")
                }
                questionToAdd = new Multistage(questionPath.qID, questionPath.question, questionPath.choices[0], questionPath.choices[1], questionPath.choices[2], questionPath.choices[3], questionPath.correct);
            }
            else if (questionPath.boltText != undefined)
                {
                    if (DEBUG == true)
                    {
                        console.log("Now Populating STAGE_ARRAY with array" + "[" + i +"]"+ "[" + x +"]: Boltstage")
                    }
                    questionToAdd = new Boltstage(questionPath.boltText);
                }
            else if (questionPath.endText != undefined)
                {
                    if (DEBUG == true)
                    {
                        console.log("Now Populating STAGE_ARRAY with array" + "[" + i +"]"+ "[" + x +"]: Endstage")
                    }
                    questionToAdd = new Endstage(questionPath.endText);
                }
            else
            {   
                if (DEBUG == true)
                {
                    console.log("Now Populating STAGE_ARRAY with array" + "[" + i +"]"+ "[" + x +"]: Inputstage");
                }
                questionToAdd = new Inputstage(questionPath.qID, questionPath.question, questionPath.correct, "");
            }
        }
    } 
    changeStage("");
    PLAYER.setTimeStarted();
    PLAYER.setStartTimeInDb();

}

function fisherYatesShuffle(array, unshuffledAtEndInt, shuffleEndToFront)
{
    var newRandom; 
    var temp1;
    var temp2;
    if (array.length <= 0)
    {
        if (DEBUG == true)
        {
            console.log("array given to shuffle is empty")   
        }
        return;
    }
    for(var i = ((array.length - 1) - unshuffledAtEndInt); i != 0; i--)
    {
        newRandom = Math.floor( Math.random() * (i + 1));
        if (DEBUG == true)
        {
            console.log("now swapping entry " + i + " with entry " + newRandom + " i: "+ i);
        }
        temp1 = array[i];
        temp2 = array[newRandom];
        array[i] = temp2;
        array[newRandom] = temp1;
    }
    if (shuffleEndToFront == true)
    for(var x = (array.length - ( 1 + unshuffledAtEndInt)); x < array.length; x++)      //this for takes the unshuffled objects at 
    {                                                                                   //the end and puts them in the front of the
            temp1 = array[x];                                                           //array, in order. make sure every array that
            temp2 = array[((array.length - 1) -  x)];//gets next value to replace at beg// is shuffled has things you WANT to be in the
            array[x] = temp2;                                                           // beginning
            array[((array.length - 1) -  x)] = temp1;
    }
    return array;
}

function initPlayer()
{
    if (document.getElementById("nameTextBox").value != "")
    {
        PLAYER = new Player(document.getElementById("genderSelect").value, document.getElementById("majorSelect").value, document.getElementById("yogSelect").value);
        PLAYER.setName(document.getElementById("nameTextBox").value);
        
        if (DEBUG == true)
        {
            console.log(PLAYER.toString());
        }
        
        PLAYER.sendToDb();

        changeStage("forward");
    }
    else
    {
       window.alert("Please enter your name to continue.") 
    }
}